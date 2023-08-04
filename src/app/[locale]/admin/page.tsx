import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'
import getAdminAnalytics from 'src/utils/server/getAdminAnalytics'

import Admin from '@/components/Organisms/Admin/Admin'
import AdminLayout from '@/components/Templates/AdminLayout/AdminLayout'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'AdminPage')

    return seo({
        title: t('admin'),
    })
}

export default async function AdminPage() {
    const charts = await getAdminAnalytics()

    return (
        <AdminLayout>
            <Admin charts={charts} />
        </AdminLayout>
    )
}
