import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { object, string } from 'yup'

import { IMiddlewares, withValidation } from '@/lib/middlewares'

import prisma from '../../../../lib/prisma'

async function POST(
    req: NextRequest,
    res: NextResponse,
    { body: { name, email, password } }: IMiddlewares<User>
) {
    const users = await prisma.user.findMany()

    if (users.length) {
        return NextResponse.json(
            { error: 'User already exists' },
            { status: 400 }
        )
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: await hash(password, 10),
            role: 'ADMIN',
        },
    })

    return NextResponse.json(user)
}

const postHandler = withValidation(POST, {
    bodySchema: object().shape({
        name: string().required(),
        email: string().email().required(),
        password: string().required().min(8).max(50),
    }),
})

export { postHandler as POST }
