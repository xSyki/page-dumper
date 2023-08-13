'use client'

import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Project, Scrape } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { deleteScrape } from 'src/api/scrape'

import DeleteIcon from '@/assets/icons/trash.svg'
import IconButton from '@/components/Atoms/IconButton/IconButton'
import Table from '@/components/Molecules/Table/Table'
import ProjectLayout from '@/components/Templates/ProjectLayout/ProjectLayout'
import useScrapes from '@/stores/scrapes'

import AddScrape from './AddScrape/AddScrape'

interface IScrapeScrapesProps {
    project: Project
    scrapes?: Scrape[]
}

export default function ScrapeScrapes(props: IScrapeScrapesProps) {
    const { project } = props

    const t = useTranslations('ProjectScrapes')

    const router = useRouter()

    const [{ scrapes }, { setScrapes, deleteScrape: deleteScrapeState }] =
        useScrapes()

    const handleDeleteScrape = async (scrapeId: number) => {
        await deleteScrape(scrapeId)
            .then((id) => {
                deleteScrapeState(id)
            })
            .catch(() => {
                toast.error(t('error'))
            })
    }

    useEffect(() => {
        setScrapes(props.scrapes || [])
    }, [props.scrapes])

    if (!scrapes.length) {
        return (
            <ProjectLayout projectId={project.id}>
                <AddScrape projectId={project.id} />
            </ProjectLayout>
        )
    }

    return (
        <ProjectLayout projectId={project.id}>
            <AddScrape projectId={project.id} />
            <Table
                name="scrapes"
                header={[
                    {
                        label: t('results'),
                    },
                    {
                        label: t('actions'),
                    },
                ]}
                rows={scrapes.map((scrape) => ({
                    onRowClick: (scrape: Scrape) => {
                        router.push(`/scrapes/${scrape.id}`)
                    },
                    className: 'cursor-pointer',
                    rowData: scrape,
                    cells: [
                        {
                            content: JSON.stringify(scrape.result),
                        },
                        {
                            content: (
                                <div className="flex">
                                    <IconButton
                                        onClick={() =>
                                            handleDeleteScrape(scrape.id)
                                        }
                                        Icon={DeleteIcon}
                                    />
                                </div>
                            ),
                        },
                    ],
                }))}
            />
        </ProjectLayout>
    )
}
