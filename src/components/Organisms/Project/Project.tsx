'use client'

import { useEffect } from 'react'
import { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'

import CheckmarkIcon from '@/assets/icons/checkmark-circle.svg'
import Table from '@/components/Molecules/Table/Table'
import ProjectLayout from '@/components/Templates/ProjectLayout/ProjectLayout'
import usePages, { IPagePreview } from '@/stores/pages'

import ProjectHeader from './ProjectHeader/ProjectHeader'

interface IProjectProps {
    project: Project
    pages: IPagePreview[]
}

export default function Project(props: IProjectProps) {
    const { project } = props

    const t = useTranslations('Project')

    const [{ pages }, { setPages }] = usePages()

    useEffect(() => {
        setPages(props.pages)
    }, [props.pages])

    return (
        <ProjectLayout projectId={project.id}>
            <div>
                <ProjectHeader project={project} />
                <Table
                    name="pages"
                    header={[
                        {
                            label: t('index'),
                        },
                        {
                            label: t('url'),
                        },
                        {
                            label: t('status'),
                        },
                        {
                            label: t('content'),
                        },
                    ]}
                    rows={pages.map((page, index) => ({
                        cells: [
                            {
                                content: index + 1,
                            },
                            {
                                content: page.url,
                            },
                            {
                                content: page.status,
                            },
                            {
                                content: page.content && (
                                    <CheckmarkIcon className="h-6 w-6 flex-shrink-0 fill-gray-400 text-gray-500 dark:text-gray-400" />
                                ),
                            },
                        ],
                    }))}
                />
            </div>
        </ProjectLayout>
    )
}
