'use client'

import { Page, Project } from '@prisma/client'
import { useTranslations } from 'next-intl'

import Table from '@/components/Molecules/Table/Table'

import ProjectHeader from './ProjectHeader/ProjectHeader'

interface IProjectProps {
    project: Project
    pages: Page[]
}

export default function Project(props: IProjectProps) {
    const { project, pages } = props

    const t = useTranslations('Project')

    return (
        <div>
            <ProjectHeader project={project} />
            <Table
                name="pages"
                header={[
                    {
                        label: t('url'),
                    },
                ]}
                rows={pages.map((page) => ({
                    cells: [
                        {
                            content: page.url,
                        },
                    ],
                }))}
            />
        </div>
    )
}
