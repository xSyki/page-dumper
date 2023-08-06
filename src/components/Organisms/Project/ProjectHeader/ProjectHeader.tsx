'use client'

import { Project } from '@prisma/client'

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
            </div>
        </div>
    )
}
