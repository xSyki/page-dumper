import { NextRequest, NextResponse } from 'next/server'
import { number, object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function PUT(
    req: NextRequest,
    res: NextResponse,
    {
        token,
        body,
    }: IMiddlewares<{
        id: number
        script: string
    }>
) {
    const { id, script } = body

    const project = await prisma.project.findUnique({
        where: {
            id,
        },
    })

    if (project?.ownerId !== token.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const newProject = await prisma.project.update({
        where: {
            id,
        },
        data: {
            script,
        },
    })

    return NextResponse.json(newProject, { status: 200 })
}

const putHandler = withValidation(withProtect(PUT), {
    bodySchema: object().shape({
        id: number().required(),
        script: string().required(),
    }),
})

export { putHandler as PUT }
