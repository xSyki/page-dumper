import { NextRequest, NextResponse } from 'next/server'
import { array, number } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function PUT(
    req: NextRequest,
    res: NextResponse,
    { body: offerIds }: IMiddlewares<number[]>
) {
    await prisma.offer.updateMany({
        where: {
            id: {
                in: offerIds,
            },
        },
        data: {
            ignored: true,
        },
    })

    return NextResponse.json(offerIds, { status: 200 })
}

const putHandler = withValidation(withProtect(PUT), {
    bodySchema: array().of(number().required()),
})

export { putHandler as PUT }
