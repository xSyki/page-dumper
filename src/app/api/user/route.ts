import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function PUT(
    req: NextRequest,
    res: NextResponse,
    { token, body }: IMiddlewares<User>
) {
    const user = await prisma.user.update({
        where: {
            id: token.userId,
        },
        data: body,
    })

    return NextResponse.json(user, { status: 200 })
}

const putHandler = withValidation(withProtect(PUT), {
    bodySchema: object().shape({
        name: string().required(),
        email: string().email().required(),
    }),
})

export { putHandler as PUT }
