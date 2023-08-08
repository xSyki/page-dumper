'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Project } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { putProjectScript } from 'src/api/script'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
})

interface IScriptEditorProps {
    project: Project
}

export default function ScriptEditor(props: IScriptEditorProps) {
    const { project } = props

    const t = useTranslations('ProjectScript')

    const [script, setScript] = useState(project.script || '')

    const handleSave = async () => {
        await putProjectScript({ id: project.id, script }).catch(() => {
            toast.error(t('error'))
        })
    }

    return (
        <section className="flex flex-col flex-1">
            <MonacoEditor
                className="flex-1"
                height="24rem"
                width="100%"
                defaultLanguage="javascript"
                value={script}
                onChange={(script) => setScript(script || '')}
                theme="vs-dark"
                options={{
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
                onClick={handleSave}
            >
                {t('save')}
            </button>
        </section>
    )
}
