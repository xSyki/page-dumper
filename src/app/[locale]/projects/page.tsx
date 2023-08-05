import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import Projects from '@/components/Organisms/Projects/Projects'
import prisma from '@/lib/prisma'

import { authOptions } from '../../api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('projects'),
    })
}

export default async function Home() {
    const session = await getServerSession(authOptions)

    const projects = await prisma.project.findMany({
        where: {
            ownerId: session?.user?.id,
        },
    })

    return <Projects projects={projects} />
}
