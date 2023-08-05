'use client'

import { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'

import Table from '@/components/Molecules/Table/Table'

import AddProject from './AddProject/AddProject'

interface IProjectsProps {
    projects: Project[]
}

export default function Projects(props: IProjectsProps) {
    const { projects } = props

    const t = useTranslations()

    if (!projects.length) {
        return (
            <div>
                <AddProject />
            </div>
        )
    }

    return (
        <div>
            <AddProject />
            <Table
                name="projects"
                header={[
                    {
                        label: t('name'),
                        orderBy: { name: 'name' },
                    },
                    {
                        label: t('domain'),
                        orderBy: { name: 'domain' },
                    },
                ]}
                rows={projects.map((project) => ({
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
