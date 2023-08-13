import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { number, object } from 'yup'

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
    }>
) {
    const { projectId } = body

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    })

    if (!project || project.ownerId !== token.userId) {
        return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const pages = await prisma.page.findMany({
        where: {
            projectId,
        },
    })

    const responses = await parallel(
        pages.map((page) => axios.get<string>(page.url)),
        project.parallelLimit
    )

    const pageContents = await prisma.$transaction(
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

    return NextResponse.json(pageContents, { status: 200 })
}

const postHandler = withValidation(withProtect(POST), {
    bodySchema: object().shape({
        projectId: number().required(),
    }),
})

export { postHandler as POST }
