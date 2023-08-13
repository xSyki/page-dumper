import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import Scrapes from '@/components/Organisms/Scrapes/Scrapes'
import prisma from '@/lib/prisma'

import { authOptions } from '../../api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Scrapes')

    return seo({
        title: t('scrapes'),
    })
}

export default async function ScrapesPage() {
    const session = await getServerSession(authOptions)

    const scrapes = await prisma.scrape.findMany({
        where: {
            project: {
                ownerId: session?.user?.id,
            },
        },
        include: {
            project: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return <Scrapes scrapes={scrapes} />
}
