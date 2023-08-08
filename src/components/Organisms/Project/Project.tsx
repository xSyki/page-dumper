'use client'

import { useEffect } from 'react'
import { Page, Project } from '@prisma/client'
import { useTranslations } from 'next-intl'

import Table from '@/components/Molecules/Table/Table'
import usePages from '@/stores/pages'

import ProjectHeader from './ProjectHeader/ProjectHeader'

interface IProjectProps {
    project: Project
    pages: Page[]
}

export default function Project(props: IProjectProps) {
    const { project } = props

    const t = useTranslations('Project')

    const [{ pages }, { setPages }] = usePages()

    useEffect(() => {
        setPages(props.pages)
    }, [props.pages])

    return (
        <div>
            <ProjectHeader project={project} />
            <Table
                name="pages"
                header={[
                    {
                        label: t('url'),
                    },
                    {
                        label: t('content'),
                    },
                    {
                        label: t('status'),
                    },
                ]}
                rows={pages.map((page) => ({
                    cells: [
                        {
                            content: page.url,
                        },
                        {
                            content: page.content,
                        },
                        {
                            content: page.status,
                        },
                    ],
                }))}
            />
        </div>
    )
}
