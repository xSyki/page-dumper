import { NextRequest, NextResponse } from 'next/server'

import { withProtect } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function DELETE(req: NextRequest, res: NextResponse) {
    const id = Number((res as unknown as { params: { id: string } }).params.id)

    await prisma.offer.deleteMany({
        where: {
            userId: id,
        },
    })

    await prisma.emailProvider.deleteMany({
        where: {
            userId: id,
        },
    })

    await prisma.emailTemplate.deleteMany({
        where: {
            userId: id,
        },
    })

    await prisma.user.delete({
        where: {
            id,
        },
    })

    return NextResponse.json(id, { status: 200 })
}

const deleteHandler = withProtect(DELETE, ['ADMIN'])

export { deleteHandler as DELETE }
