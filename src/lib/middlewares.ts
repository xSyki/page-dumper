import { NextRequest, NextResponse } from 'next/server'
import { getToken, JWT } from 'next-auth/jwt'
import { Schema } from 'yup'

export interface IMiddlewares<T = undefined> {
    token: JWT
    body: T
}

export function withProtect<T>(
    handler: (
        req: NextRequest,
        res: NextResponse,
        middlewares: IMiddlewares<T>
    ) => Promise<NextResponse>,
    roles: string[] = ['ADMIN', 'EMPLOYEE']
) {
    return async (
        req: NextRequest,
        res: NextResponse,
        middlewares: IMiddlewares<T>
    ) => {
        const token = await getToken({ req })

        if (!token || !roles.includes(token.role as string)) {
            return NextResponse.json({ status: 401 })
        }

        return handler(req, res, { ...middlewares, token })
    }
}

export function withValidation<T>(
    handler: (
        req: NextRequest,
        res: NextResponse,
        middlewares: IMiddlewares<T>
    ) => Promise<NextResponse>,
    { bodySchema }: { bodySchema?: Schema }
) {
    return async (
        req: NextRequest,
        res: NextResponse,
        middlewares: IMiddlewares<T>
    ) => {
        try {
            const body = await req.json()

            if (bodySchema) {
                await bodySchema.validate(body)
            }

            return handler(req, res, { ...middlewares, body })
        } catch (err) {
            return NextResponse.json({ status: 400, body: err })
        }
    }
}
