'use client'

import { Scrape } from '@prisma/client'
import dynamic from 'next/dynamic'

import ProjectLayout from '@/components/Templates/ProjectLayout/ProjectLayout'
import { ScrapeWithProject } from '@/stores/scrapes'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
})

interface IScrapeProps {
    scrape: ScrapeWithProject
}

export default function Scrape(props: IScrapeProps) {
    const { scrape } = props

    return (
        <ProjectLayout projectId={scrape.project.id}>
            <MonacoEditor
                className="flex-1"
                height="36rem"
                width="100%"
                defaultLanguage="json"
                value={JSON.stringify(scrape.result, null, 4)}
                theme="vs-dark"
                options={{
                    minimap: {
                        enabled: false,
                    },
                    wordWrap: 'wordWrapColumn',
                    wordWrapColumn: 80,
                    fontSize: 14,
                    domReadOnly: true,
                    readOnly: true,
                    scrollBeyondLastLine: false,
                }}
            />
        </ProjectLayout>
    )
}
