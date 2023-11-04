'use client'

import { useEffect } from 'react'
import { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'

import CheckmarkIcon from '@/assets/icons/checkmark-circle.svg'
import IconButton from '@/components/Atoms/IconButton/IconButton'
import Table from '@/components/Molecules/Table/Table'
import ProjectLayout from '@/components/Templates/ProjectLayout/ProjectLayout'
import usePages, { IPagePreview } from '@/stores/pages'

import TrashIcon from '../../../assets/icons/trash.svg'

import ProjectHeader from './ProjectHeader/ProjectHeader'

interface IProjectProps {
    project: Project
    pages: IPagePreview[]
}

export default function Project(props: IProjectProps) {
    const { project } = props

    const t = useTranslations('Project')

    const [{ pages }, { setPages, deletePage }] = usePages()

    useEffect(() => {
        setPages(props.pages)
    }, [props.pages])

    const handleDeletePage = async (page: IPagePreview) => {
        await deletePage(page.id)
    }

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
                        {
                            label: t('actions'),
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
                            {
                                content: (
                                    <IconButton
                                        Icon={TrashIcon}
                                        onClick={() => handleDeletePage(page)}
                                    />
                                ),
                            },
                        ],
                    }))}
                />
            </div>
        </ProjectLayout>
    )
}
