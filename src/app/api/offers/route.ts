import { Offer } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { array, number, object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function DELETE(
    req: NextRequest,
    res: NextResponse,
    { body: offerIds }: IMiddlewares<number[]>
) {
    await prisma.offer.deleteMany({
        where: {
            id: {
                in: offerIds,
            },
        },
    })

    return NextResponse.json(offerIds, { status: 200 })
}

async function POST(
    req: NextRequest,
    res: NextResponse,
    { token, body: newOffer }: IMiddlewares<Offer>
) {
    const offer = await prisma.offer.create({
        data: {
            ...newOffer,
            userId: token.userId,
        },
    })

    return NextResponse.json(offer, { status: 200 })
}

const postHandler = withValidation(withProtect(POST), {
    bodySchema: object().shape({
        name: string().required(),
        email: string().email().required(),
    }),
})
const deleteHandler = withValidation(withProtect(DELETE), {
    bodySchema: array().of(number().required()),
})

export { deleteHandler as DELETE, postHandler as POST }
