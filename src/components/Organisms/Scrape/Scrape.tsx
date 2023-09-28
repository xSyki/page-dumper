'use client'

import { Scrape } from '@prisma/client'
import dynamic from 'next/dynamic'

import DownloadCSV from '@/components/Atoms/DownloadCSV/DownloadCSV'
import DownloadJSON from '@/components/Atoms/DownloadJSON/DownloadJSON'
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
        <main className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-1">
                <DownloadJSON content={scrape.result as BlobPart} />
                <DownloadCSV content={scrape.result} />
            </div>
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
        </main>
    )
}
