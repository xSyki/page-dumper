import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import Company from '@/components/Organisms/Company/Company'
import CompanyLayout from '@/components/Templates/CompanyLayout/CompanyLayout'
import prisma from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'CompanyPage')

    return seo({
        title: t('company'),
    })
}

export default async function CompanyPage() {
    const session = await getServerSession(authOptions)

    const company = await prisma.company.findUnique({
        where: {
            id: session?.user.companyId,
        },
    })

    if (!company) {
        return null
    }

    return (
        <CompanyLayout>
            <Company company={company} />
        </CompanyLayout>
    )
}
