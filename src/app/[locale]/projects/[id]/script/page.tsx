import { notFound } from 'next/navigation'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import ProjectScript from '@/components/Organisms/ProjectScript/ProjectScript'
import prisma from '@/lib/prisma'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('project'),
    })
}

export default async function ProjectScriptPage(
    props: IPageProps<{ id: string }>
) {
    const { params } = props

    const id = Number(params.id)

    const project = await prisma.project.findUnique({
        where: {
            id,
        },
    })

    if (!project) return notFound()

    return <ProjectScript project={project} />
}
