'use client'

import { Project } from '@prisma/client'

import CrawlPages from './CrawlPages/CrawlPages'
import DownloadPagesContent from './DownloadPagesContent/DownloadPagesContent'
import ImportSitemapPage from './ImportSitemapPages/ImportSitemapPages'

interface IProjectHeaderProps {
    project: Project
}

export default function ProjectHeader(props: IProjectHeaderProps) {
    const { id, name, domain } = props.project

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
                <div className="text-2xl">{name}</div>-
                <div className="text-2xl">{domain}</div>
            </div>
            <div>
                <ImportSitemapPage projectId={id} />
                <DownloadPagesContent projectId={id} />
                <CrawlPages projectId={id} />
            </div>
        </div>
    )
}
