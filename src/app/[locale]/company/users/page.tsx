import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'
import { getDatabaseOrderByQuery } from 'src/utils/database'
import { getSearchParams } from 'src/utils/queryParams'

import CompanyUsers from '@/components/Organisms/CompanyUsers/CompanyUsers'
import CompanyUsersLayout from '@/components/Templates/CompanyLayout/CompanyLayout'
import prisma from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'CompanyPage')

    return seo({
        title: t('users'),
    })
}

export default async function CompanyUsersPage(props: IPageProps) {
    const searchParams = getSearchParams(props.searchParams)

    const session = await getServerSession(authOptions)

    const users = await prisma.user.findMany({
        where: {
            companyId: session?.user.companyId,
        },
        include: {
            company: true,
        },
        ...getDatabaseOrderByQuery(
            ['name', 'email', 'role'],
            searchParams?.users,
            {
                name: 'desc',
            }
        ),
    })

    return (
        <CompanyUsersLayout>
            <CompanyUsers users={users} />
        </CompanyUsersLayout>
    )
}
