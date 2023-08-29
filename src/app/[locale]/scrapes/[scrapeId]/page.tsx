import { notFound } from 'next/navigation'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import Scrape from '@/components/Organisms/Scrape/Scrape'
import prisma from '@/lib/prisma'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('project'),
    })
}

export default async function ScrapePage(
    props: IPageProps<{ id: string; scrapeId: string }>
) {
    const { params } = props

    const scrapeId = Number(params.scrapeId)

    const scrape = await prisma.scrape.findUnique({
        where: {
            id: scrapeId,
        },
        include: {
            project: true,
        },
    })

    if (!scrape) return notFound()

    return <Scrape scrape={scrape} />
}
