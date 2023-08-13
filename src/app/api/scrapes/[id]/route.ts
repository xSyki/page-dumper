import { NextRequest, NextResponse } from 'next/server'

import { IMiddlewares, withProtect } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function DELETE(
    req: NextRequest,
    res: NextResponse,
    { token }: IMiddlewares
) {
    const id = Number((res as unknown as { params: { id: string } }).params.id)

    const scrape = await prisma.scrape.findUnique({
        where: {
            id,
        },
        include: {
            project: {
                select: {
                    ownerId: true,
                },
            },
        },
    })

    if (scrape?.project.ownerId !== token.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.scrape.deleteMany({
        where: {
            id,
        },
    })

    return NextResponse.json(id, { status: 200 })
}

const deleteHandler = withProtect(DELETE)

export { deleteHandler as DELETE }
