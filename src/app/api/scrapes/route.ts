import { Page, PageContent } from '@prisma/client'
import { JsonArray } from '@prisma/client/runtime/library'
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

    let pageContents: (PageContent & { page: Page })[]

    const pages = await prisma.page.findMany({
        where: {
            projectId,
        },
    })

    if (update) {
        const responses = await parallel(
            pages.map((page) => axios.get<string>(page.url)),
            project.parallelLimit
        )

        pageContents = await prisma.$transaction(
            responses.map((response, i) =>
                prisma.pageContent.create({
                    data: {
                        pageId: pages[i].id,
                        content: response.data,
                        status: response.status,
                        projectId: project.id,
                    },
                    include: {
                        page: true,
                    },
                })
            )
        )
    } else {
        const pagesWithContent = await prisma.page.findMany({
            where: {
                projectId,
                content: {
                    some: {},
                },
            },
            include: {
                content: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        })

        pageContents = pagesWithContent.map((page) => ({
            ...page.content[0],
            page,
        }))
    }

    const result: JsonArray = []

    pageContents.map((pageContent) => {
        if (!pageContent.content || !project.script) {
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const $ = load(pageContent.content)

        result.push({
            ...(() => eval(project.script))(),
            pageId: pageContent.page.id,
            url: pageContent.page.url,
        })
    })

    const scrape = await prisma.scrape.create({
        data: {
            projectId,
            result: result.filter((result) => result),
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
