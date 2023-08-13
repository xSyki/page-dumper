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
        10
    )

    const newPages = await prisma.$transaction(
        responses.map((response, i) =>
            prisma.page.update({
                where: {
                    id: pages[i].id,
                },
                data: {
                    content: response.data,
                    status: response.status,
                    contentUpdatedAt: new Date(),
                },
            })
        )
    )

    return NextResponse.json(newPages, { status: 200 })
}

const postHandler = withValidation(withProtect(POST), {
    bodySchema: object().shape({
        projectId: number().required(),
    }),
})

export { postHandler as POST }
