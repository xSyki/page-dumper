import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import emailProvider from 'src/__mocks__/emailProvider'
import emailTemplate from 'src/__mocks__/emailTemplate'
import { object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'

import prisma from '../../../../lib/prisma'

async function POST(
    req: NextRequest,
    res: NextResponse,
    { body: { name, email, password }, token }: IMiddlewares<User>
) {
    const exists = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (exists) {
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
            role: 'MANAGER',
            emailTemplates: {
                create: [emailTemplate],
            },
            emailProviders: {
                create: [
                    {
                        ...emailProvider,
                        emailUser: email,
                        from: `"${name}" <${email}>`,
                    },
                ],
            },
            company: {
                connect: {
                    id: token.companyId,
                },
            },
        },
    })

    return NextResponse.json(user)
}

const postHandler = withValidation(withProtect(POST, ['ADMIN']), {
    bodySchema: object().shape({
        name: string().required(),
        email: string().email().required(),
        password: string().required().min(8).max(50),
    }),
})

export { postHandler as POST }
