import { Company } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { object, string } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'

async function PUT(
    req: NextRequest,
    res: NextResponse,
    { token, body: newCompany }: IMiddlewares<Company>
) {
    const companyId = token.companyId

    const updatedCompany = await prisma.company.update({
        where: {
            id: companyId,
        },
        data: newCompany,
    })

    return NextResponse.json(updatedCompany, { status: 200 })
}

const putHandler = withValidation(withProtect(PUT, ['ADMIN', 'MANAGER']), {
    bodySchema: object().shape({
        name: string().required().min(2).max(50),
        nip: string().required(),
        city: string().required(),
        street: string().required(),
        postalCode: string().required(),
        country: string().required(),
        houseNumber: string().required(),
        email: string().required().email(),
    }),
})

export { putHandler as PUT }
