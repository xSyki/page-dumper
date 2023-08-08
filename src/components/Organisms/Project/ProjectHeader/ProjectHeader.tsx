'use client'

import { Project } from '@prisma/client'

import DownloadPagesContent from './DownloadPagesContent/DownloadPagesContent'
import ImportSitemapPage from './ImportSitemapPages/ImportSitemapPages'

interface IProjectHeaderProps {
    project: Project
}

export default function ProjectHeader(props: IProjectHeaderProps) {
    const { id, name, domain } = props.project

    return (
        <div>
            <div>
                <div>{name}</div>
                <div>{domain}</div>
            </div>
            <div>
                <ImportSitemapPage projectId={id} />
                <DownloadPagesContent projectId={id} />
            </div>
        </div>
    )
}
