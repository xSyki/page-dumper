import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import NavTabs from '@/components/Molecules/NavTabs/NavTabs'

interface IProjectLayoutProps {
    children: ReactNode
    projectId: number
}

export default function ProjectLayout(props: IProjectLayoutProps) {
    const { children, projectId } = props

    const t = useTranslations('Project')

    return (
        <>
            <NavTabs
                items={[
                    { label: t('pages'), url: `/projects/${projectId}` },
                    {
                        label: t('script'),
                        url: `/projects/${projectId}/script`,
                    },
                ]}
            />
            {children}
        </>
    )
}
