import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import NavTabs from '@/components/Molecules/NavTabs/NavTabs'

interface ICompanyLayoutProps {
    children: ReactNode
}

export default function CompanyLayout(props: ICompanyLayoutProps) {
    const { children } = props

    const t = useTranslations('CompanyPage')

    return (
        <>
            <NavTabs
                items={[
                    { label: t('company'), url: '/company' },
                    { label: t('users'), url: '/company/users' },
                ]}
            />
            {children}
        </>
    )
}
