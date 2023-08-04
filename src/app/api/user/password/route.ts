import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function PUT(
    req: NextRequest,
    res: NextResponse,
    { token, body: password }: IMiddlewares<string>
) {
    const user = await prisma.user.update({
        where: {
            id: token.userId,
        },
        data: {
            password: await hash(password, 10),
        },
    })

    return NextResponse.json(user, { status: 200 })
}

const putHandler = withValidation(withProtect(PUT), {
    bodySchema: string().required().min(8).max(50),
})

export { putHandler as PUT }
