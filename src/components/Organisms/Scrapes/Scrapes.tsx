'use client'

import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Project, Scrape } from '@prisma/client'
import { JsonArray } from '@prisma/client/runtime/library'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { deleteScrape } from 'src/api/scrape'

import DeleteIcon from '@/assets/icons/trash.svg'
import IconButton from '@/components/Atoms/IconButton/IconButton'
import Table from '@/components/Molecules/Table/Table'
import useScrapes from '@/stores/scrapes'

type ScrapeWithProject = Scrape & { project: Project }

interface IScrapesProps {
    scrapes: ScrapeWithProject[]
}

export default function Scrapes(props: IScrapesProps) {
    const t = useTranslations('Scrapes')

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
        setScrapes(props.scrapes)
    }, [props.scrapes])

    return (
        <div>
            <Table
                name="scrapes"
                header={[
                    {
                        label: t('created_at'),
                    },
                    {
                        label: t('project_name'),
                    },
                    {
                        label: t('results'),
                    },
                    {
                        label: t('actions'),
                    },
                ]}
                rows={scrapes.map((scrape) => ({
                    onRowClick: (scrape: ScrapeWithProject) => {
                        router.push(
                            `/projects/${scrape.project.id}/scrapes/${scrape.id}`
                        )
                    },
                    className: 'cursor-pointer',
                    rowData: scrape,
                    cells: [
                        {
                            content: dayjs(scrape.createdAt).format(
                                'DD-MM-YYYY HH:mm:ss'
                            ),
                        },
                        {
                            content: scrape.project.name,
                        },
                        {
                            content: (scrape.result as JsonArray)?.length,
                        },
                        {
                            content: (
                                <div className="flex">
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation()

                                            handleDeleteScrape(scrape.id)
                                        }}
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
