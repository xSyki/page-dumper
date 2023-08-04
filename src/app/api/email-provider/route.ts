import { EmailProvider } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { boolean, number, object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function PUT(
    req: NextRequest,
    res: NextResponse,
    { token, body: newEmailProvider }: IMiddlewares<EmailProvider>
) {
    const emailProvider = await prisma.emailProvider.findFirst({
        where: {
            id: newEmailProvider.id,
        },
    })

    if (emailProvider?.userId !== token.userId) {
        return NextResponse.json({ status: 403 })
    }

    const updatedEmailProvider = await prisma.emailProvider.update({
        where: {
            id: newEmailProvider.id,
        },
        data: newEmailProvider,
    })

    return NextResponse.json(updatedEmailProvider, { status: 200 })
}

const putHandler = withValidation(withProtect(PUT), {
    bodySchema: object().shape({
        id: string().required(),
        host: string().required(),
        port: number().required(),
        secure: boolean().required(),
        emailPass: string().required(),
        emailUser: string().required(),
        from: string().required(),
    }),
})

export { putHandler as PUT }
