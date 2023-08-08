'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Project } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { postTestScript } from 'src/api/script'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
})

interface IScriptTestResultsProps {
    project: Project
}

export default function ScriptTestResults(props: IScriptTestResultsProps) {
    const { project } = props

    const t = useTranslations('ProjectScript')

    const [results, setResults] = useState('')

    const handleTest = async () => {
        await postTestScript(project.id)
            .then((data) => {
                setResults(data)
            })
            .catch(() => {
                toast.error(t('error'))
            })
    }

    return (
        <section className="flex flex-col flex-1">
            <MonacoEditor
                className="flex-1"
                height="24rem"
                width="100%"
                defaultLanguage="json"
                value={results}
                theme="vs-dark"
                options={{
                    readOnly: true,
                    minimap: {
                        enabled: false,
                    },
                    wordWrap: 'wordWrapColumn',
                    wordWrapColumn: 80,
                    fontSize: 14,
                    domReadOnly: true,
                    scrollBeyondLastLine: false,
                }}
            />
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleTest}
            >
                {t('test')}
            </button>
        </section>
    )
}
