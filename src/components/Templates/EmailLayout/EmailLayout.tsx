import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import NavTabs from '@/components/Molecules/NavTabs/NavTabs'

interface IEmailLayoutProps {
    children: ReactNode
}

export default function EmailLayout(props: IEmailLayoutProps) {
    const { children } = props

    const t = useTranslations('EmailPage')

    return (
        <>
            <NavTabs
                items={[
                    { label: t('templates'), url: '/email' },
                    { label: t('providers'), url: '/email/providers' },
                ]}
            />
            {children}
        </>
    )
}
