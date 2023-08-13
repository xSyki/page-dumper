import { NextRequest, NextResponse } from 'next/server'

import { IMiddlewares, withProtect } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function DELETE(
    req: NextRequest,
    res: NextResponse,
    { token }: IMiddlewares
) {
    const id = Number((res as unknown as { params: { id: string } }).params.id)

    const project = await prisma.project.findUnique({
        where: {
            id,
        },
    })

    if (project?.ownerId !== token.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.scrape.deleteMany({
        where: {
            projectId: id,
        },
    })

    await prisma.pageContent.deleteMany({
        where: {
            projectId: id,
        },
    })

    await prisma.page.deleteMany({
        where: {
            projectId: id,
        },
    })

    await prisma.project.delete({
        where: {
            id,
        },
    })

    return NextResponse.json(id, { status: 200 })
}

const deleteHandler = withProtect(DELETE)

export { deleteHandler as DELETE }
