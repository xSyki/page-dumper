import { Offer } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { createTransport } from 'nodemailer'
import { templateParser } from 'src/utils'
import { array, number, object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function PUT(
    req: NextRequest,
    res: NextResponse,
    { token, body: offers }: IMiddlewares<Offer[]>
) {
    const userId = token.userId

    const offersIds = offers.map((offer) => offer.id)

    const user = await prisma.user
        .findUnique({
            where: {
                id: userId,
            },
        })
        .then((user) => {
            if (!user) {
                throw new Error('User not found')
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })

    const emailProvider = await prisma.emailProvider.findFirst({
        where: {
            userId: userId,
        },
    })

    const emailTemplate = await prisma.emailTemplate.findFirst({
        where: {
            userId: userId,
        },
    })

    if (!emailProvider || !emailTemplate) {
        throw new Error("Email provider or template doesn't exist")
    }

    const transporter = createTransport({
        host: emailProvider.host,
        port: emailProvider.port,
        secure: emailProvider.secure,
        auth: {
            user: emailProvider.emailUser,
            pass: emailProvider.emailPass,
        },
    })

    const mailsPromises = offers.map((offer) =>
        transporter.sendMail({
            from: emailProvider.from,
            to: offer.email,
            subject: templateParser(emailTemplate.subject, {
                offer,
                user,
            }),
            text: templateParser(emailTemplate.text, {
                offer,
                user,
            }),
            html: templateParser(emailTemplate.html, {
                offer,
                user,
            }),
        })
    )

    await Promise.all(mailsPromises)

    await prisma.offer.updateMany({
        where: {
            id: {
                in: offersIds,
            },
        },
        data: {
            sent: true,
        },
    })

    return NextResponse.json(offersIds, { status: 200 })
}

const putHandler = withValidation(withProtect(PUT), {
    bodySchema: array().of(
        object().shape({
            id: number().required(),
            name: string().required(),
            email: string().email().required(),
            userId: number().required(),
        })
    ),
})

export { putHandler as PUT }
