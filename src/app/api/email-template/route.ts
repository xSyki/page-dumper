import { EmailTemplate } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function PUT(
    req: NextRequest,
    res: NextResponse,
    { token, body: newEmailTemplate }: IMiddlewares<EmailTemplate>
) {
    const emailTemplate = await prisma.emailTemplate.findFirst({
        where: {
            id: newEmailTemplate.id,
        },
    })

    if (emailTemplate?.userId !== token.userId) {
        return NextResponse.json({ status: 403 })
    }

    const updatedEmailTemplate = await prisma.emailTemplate.update({
        where: {
            id: emailTemplate.id,
        },
        data: newEmailTemplate,
    })

    return NextResponse.json(updatedEmailTemplate, { status: 200 })
}

const putHandler = withValidation(withProtect(PUT, ['ADMIN']), {
    bodySchema: object().shape({
        id: string().required(),
        subject: string().required(),
        html: string().required(),
        text: string().required(),
    }),
})

export { putHandler as PUT }
