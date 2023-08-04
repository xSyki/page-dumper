import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import NavTabs from '@/components/Molecules/NavTabs/NavTabs'

interface IAdminLayoutProps {
    children: ReactNode
}

export default function AdminLayout(props: IAdminLayoutProps) {
    const { children } = props

    const t = useTranslations('AdminPage')

    return (
        <>
            <NavTabs
                items={[
                    { label: t('dashboard'), url: '/admin' },
                    { label: t('users'), url: '/admin/users' },
                    { label: t('companies'), url: '/admin/companies' },
                ]}
            />
            {children}
        </>
    )
}
