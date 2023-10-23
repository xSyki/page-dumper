import { notFound } from 'next/navigation'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import Project from '@/components/Organisms/Project/Project'
import prisma from '@/lib/prisma'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('project'),
    })
}

export default async function ProjectPage(props: IPageProps<{ id: string }>) {
    const { params } = props

    const id = Number(params.id)

    const project = await prisma.project.findUnique({
        where: {
            id,
        },
    })

    const pages = await prisma.page.findMany({
        where: {
            projectId: id,
        },
        select: {
            id: true,
            url: true,
            content: {
                select: {
                    status: true,
                    content: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            },
        },
    })

    if (!project || !pages) return notFound()

    return (
        <Project
            project={project}
            pages={pages.map((page) => ({
                ...page,
                status: page.content[0]?.status,
                content: !!page.content[0]?.content,
                createdAt: page.content[0]?.createdAt,
            }))}
        />
    )
}
