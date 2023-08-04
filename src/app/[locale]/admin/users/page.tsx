import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'
import { getDatabaseOrderByQuery } from 'src/utils/database'
import { getSearchParams } from 'src/utils/queryParams'

import Users from '@/components/Organisms/Users/Users'
import AdminLayout from '@/components/Templates/AdminLayout/AdminLayout'
import prisma from '@/lib/prisma'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'AdminPage')

    return seo({
        title: t('users'),
    })
}

export default async function UsersPage(props: IPageProps) {
    const searchParams = getSearchParams(props.searchParams)

    const users = await prisma.user.findMany({
        ...getDatabaseOrderByQuery(
            ['name', 'email', 'role'],
            searchParams?.users,
            {
                name: 'desc',
            }
        ),
    })

    return (
        <AdminLayout>
            <Users users={users} />
        </AdminLayout>
    )
}
