import { NextRequest, NextResponse } from 'next/server'
import isValidUrl from 'src/utils/isValidUrl'
import { object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function POST(
    req: NextRequest,
    res: NextResponse,
    {
        token,
        body,
    }: IMiddlewares<{
        name: string
        url: string
    }>
) {
    if (!isValidUrl(body.url)) {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const domain = new URL(body.url).hostname

    const project = await prisma.project.create({
        data: {
            name: body.name,
            domain,
            ownerId: token.userId,
        },
    })

    await prisma.page.create({
        data: {
            projectId: project.id,
            url: body.url,
        },
    })

    return NextResponse.json(project, { status: 200 })
}

const putHandler = withValidation(withProtect(POST), {
    bodySchema: object().shape({
        name: string().required(),
        url: string().url().required(),
    }),
})

export { putHandler as PUT }
