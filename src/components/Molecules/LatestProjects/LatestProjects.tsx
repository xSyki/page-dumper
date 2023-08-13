'use client'

import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import Table from '../Table/Table'

interface ILatestProjectsProps {
    projects: Project[]
}

export default function LatestProjects(props: ILatestProjectsProps) {
    const { projects } = props

    const router = useRouter()

    const t = useTranslations('Index')

    return (
        <div className="flex flex-col gap-1">
            <h2>{t('latest_projects')}</h2>
            <Table
                name="projects"
                header={[
                    {
                        label: t('name'),
                    },
                    {
                        label: t('domain'),
                    },
                ]}
                rows={projects.map((project) => ({
                    onRowClick: (project: Project) => {
                        router.push(`/projects/${project.id}`)
                    },
                    className: 'cursor-pointer',
                    rowData: project,
                    cells: [
                        {
                            content: project.name,
                        },
                        {
                            content: project.domain,
                        },
                    ],
                }))}
            />
        </div>
    )
}
