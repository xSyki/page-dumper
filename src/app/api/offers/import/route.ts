import { NextRequest, NextResponse } from 'next/server'

import { IMiddlewares, withProtect } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function POST(
    req: NextRequest,
    res: NextResponse,
    { token }: IMiddlewares
) {
    const newOffers = [
        {
            name: 'Offer ' + Math.floor(Math.random() * 100),
            email: 'mikolajsykula@gmail.com',
            userId: token.userId,
        },
    ]

    const offers = await prisma.$transaction(
        newOffers.map((offer) => prisma.offer.create({ data: offer }))
    )

    return NextResponse.json(offers, { status: 200 })
}

const postHandler = withProtect(POST)

export { postHandler as POST }
