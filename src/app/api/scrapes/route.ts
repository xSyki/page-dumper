import { Page } from '@prisma/client'
import axios from 'axios'
import { load } from 'cheerio'
import { NextRequest, NextResponse } from 'next/server'
import { boolean, number, object } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'
import { parallel } from '@/utils/server/parallel'

async function POST(
    req: NextRequest,
    res: NextResponse,
    {
        token,
        body,
    }: IMiddlewares<{
        projectId: number
        update: boolean
    }>
) {
    const { projectId, update } = body

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    })

    if (project?.ownerId !== token.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!project.script) {
        return NextResponse.json({ error: 'No script' }, { status: 400 })
    }

    let pages: Page[]

    if (update) {
        const oldPages = await prisma.page.findMany({
            where: {
                projectId,
            },
        })

        const responses = await parallel(
            oldPages.map((page) => axios.get<string>(page.url)),
            project.parallelLimit
        )

        pages = await prisma.$transaction(
            responses.map((response, i) =>
                prisma.page.update({
                    where: {
                        id: oldPages[i].id,
                    },
                    data: {
                        content: response.data,
                        status: response.status,
                        contentUpdatedAt: new Date(),
                    },
                })
            )
        )
    } else {
        pages = await prisma.page.findMany({
            where: {
                projectId,
            },
        })
    }

    const results: unknown[] = []

    pages.map((page) => {
        if (!page.content || !project.script) {
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const $ = load(page.content)

        results.push((() => eval(project.script))())
    })

    const scrape = await prisma.scrape.create({
        data: {
            projectId,
            result: JSON.stringify(results, null, 4),
        },
    })

    return NextResponse.json(scrape, { status: 200 })
}

const psotHandler = withValidation(withProtect(POST), {
    bodySchema: object().shape({
        projectId: number().required(),
        update: boolean().required(),
    }),
})

export { psotHandler as POST }
