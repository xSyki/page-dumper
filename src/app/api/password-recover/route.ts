import { render } from '@react-email/components'
import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { decode, encode } from 'next-auth/jwt'
import { getTranslator } from 'next-intl/server'
import { object, string } from 'yup'

import PasswordRecoverEmail from '@/emails/password-recover'
import PasswordResetEmail from '@/emails/password-reset'
import { sendMail } from '@/lib/mail'
import { IMiddlewares, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function POST(
    req: NextRequest,
    res: NextResponse,
    { body: email }: IMiddlewares<string>
) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (!user) {
        return NextResponse.json({ status: 404 })
    }

    const t = await getTranslator('en', 'Index')

    const emailHtml = render(
        PasswordRecoverEmail({
            title: t('recover_password'),
            name: user.name,
            cta: t('reset_password_cta'),
            description: t('reset_password_warning'),
            url: `${process.env.SITE_URL}/password-recover?token=${await encode(
                {
                    token: {
                        userId: user.id,
                        email,
                        name: user.name,
                    },
                    secret: process.env.NEXTAUTH_SECRET as string,
                }
            )}`,
        })
    )

    sendMail({
        to: email,
        subject: t('recover_password'),
        html: emailHtml,
    })

    return NextResponse.json(user, { status: 200 })
}

async function PUT(
    req: NextRequest,
    res: NextResponse,
    {
        body: { token, password },
    }: IMiddlewares<{ token: string; password: string }>
) {
    const decodedToken = await decode({
        token,
        secret: process.env.NEXTAUTH_SECRET as string,
    })

    if (!decodedToken) {
        return NextResponse.json({ status: 400 })
    }

    const { userId, email } = decodedToken

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!user) {
        return NextResponse.json({ status: 404 })
    }

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: await hash(password, 10),
        },
    })

    const t = await getTranslator('en', 'Index')

    const resetEmail = render(
        PasswordResetEmail({
            title: t('password_changed'),
            name: user.name,
            description: t('password_reset_description'),
        })
    )

    sendMail({
        to: email || '',
        subject: t('password_changed'),
        html: resetEmail,
    })

    return NextResponse.json(user, { status: 200 })
}

const postHandler = withValidation(POST, {
    bodySchema: string().email().required(),
})

const putHandler = withValidation(PUT, {
    bodySchema: object().shape({
        token: string().required(),
        password: string().required().min(8).max(50),
    }),
})

export { postHandler as POST, putHandler as PUT }
