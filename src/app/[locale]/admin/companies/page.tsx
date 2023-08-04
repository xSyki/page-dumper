import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'
import { getDatabaseOrderByQuery } from 'src/utils/database'
import { getSearchParams } from 'src/utils/queryParams'

import Companies from '@/components/Organisms/Companies/Companies'
import AdminLayout from '@/components/Templates/AdminLayout/AdminLayout'
import prisma from '@/lib/prisma'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'AdminPage')

    return seo({
        title: t('companies'),
    })
}

export default async function CompaniesPage(props: IPageProps) {
    const searchParams = getSearchParams(props.searchParams)

    const companies = await prisma.company.findMany({
        ...getDatabaseOrderByQuery(
            ['name', 'nip', 'email'],
            searchParams?.companies,
            {
                name: 'desc',
            }
        ),
    })

    return (
        <AdminLayout>
            <Companies companies={companies} />
        </AdminLayout>
    )
}
