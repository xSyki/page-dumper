import { load } from 'cheerio'
import { NextRequest, NextResponse } from 'next/server'
import { number, object } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function POST(
    req: NextRequest,
    res: NextResponse,
    {
        token,
        body,
    }: IMiddlewares<{
        projectId: number
    }>
) {
    const { projectId } = body

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

    const pages = await prisma.page.findMany({
        where: {
            projectId,
        },
        include: {
            content: {
                orderBy: { createdAt: 'desc' },
                take: 1,
            },
        },
        take: 10,
    })

    let results: unknown[] = []

    pages.map((page) => {
        if (!page.content[0] || !project.script) {
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const $ = load(page.content[0].content)

        results.push((() => eval(project.script))())
    })

    results = results.filter((result) => result)

    return NextResponse.json(JSON.stringify(results, null, 4), { status: 200 })
}

const postHandler = withValidation(withProtect(POST), {
    bodySchema: object().shape({
        projectId: number().required(),
    }),
})

export { postHandler as POST }
