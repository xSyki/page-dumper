import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import Home from '@/components/Organisms/Home/Home'
import prisma from '@/lib/prisma'

import { authOptions } from '../api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('dashboard'),
    })
}

export default async function HomePage() {
    const session = await getServerSession(authOptions)

    const latestProjects = await prisma.project.findMany({
        take: 5,
        orderBy: {
            createdAt: 'desc',
        },
        where: {
            ownerId: session?.user?.id,
        },
    })

    const latestScrapes = await prisma.scrape.findMany({
        take: 5,
        where: {
            project: {
                ownerId: session?.user?.id,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            project: true,
        },
    })

    return (
        <Home latestProjects={latestProjects} latestScrapes={latestScrapes} />
    )
}
