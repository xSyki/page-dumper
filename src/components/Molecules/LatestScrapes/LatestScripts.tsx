'use client'

import { JsonArray } from '@prisma/client/runtime/library'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { ScrapeWithProject } from '@/stores/scrapes'

import Table from '../Table/Table'

interface ILatestScrapesProps {
    scrapes: ScrapeWithProject[]
}

export default function LatestScrapes(props: ILatestScrapesProps) {
    const { scrapes } = props

    const router = useRouter()

    const t = useTranslations('Index')

    return (
        <div className="flex flex-col gap-1">
            <h2>{t('latest_scrapes')}</h2>
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
                ]}
                rows={scrapes.map((scrape) => ({
                    onRowClick: (scrape: ScrapeWithProject) => {
                        router.push(`/scrapes/${scrape.id}`)
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
                    ],
                }))}
            />
        </div>
    )
}
