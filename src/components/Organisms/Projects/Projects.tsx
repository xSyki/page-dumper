'use client'

import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Project } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { deleteProject } from 'src/api/project'
import useProjects from 'src/stores/projects'

import DeleteIcon from '@/assets/icons/trash.svg'
import IconButton from '@/components/Atoms/IconButton/IconButton'
import Table from '@/components/Molecules/Table/Table'

import AddProject from './AddProject/AddProject'

interface IProjectsProps {
    projects: Project[]
}

export default function Projects(props: IProjectsProps) {
    const t = useTranslations('Index')

    const [{ projects }, { setProjects, deleteProject: deleteProjectState }] =
        useProjects()

    const handleDeleteProject = async (projectId: number) => {
        await deleteProject(projectId)
            .then((id) => {
                deleteProjectState(id)
            })
            .catch(() => {
                toast.error(t('error'))
            })
    }

    useEffect(() => {
        setProjects(props.projects)
    }, [props.projects])

    if (!props.projects.length) {
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
                    },
                    {
                        label: t('domain'),
                    },
                    {
                        label: t('actions'),
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
                        {
                            content: (
                                <div className="flex">
                                    <IconButton
                                        onClick={() =>
                                            handleDeleteProject(project.id)
                                        }
                                        Icon={DeleteIcon}
                                    />
                                </div>
                            ),
                        },
                    ],
                }))}
            />
        </div>
    )
}
