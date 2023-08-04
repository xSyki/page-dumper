'use client'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
})

import { useTranslations } from 'next-intl'

interface IEmailTemplateHTMLProps {
    html: string
    setHtml: (html: string) => void
}

export default function EmailTemplateHTML(props: IEmailTemplateHTMLProps) {
    const { html, setHtml } = props

    const t = useTranslations('Index')

    return (
        <div>
            <label
                htmlFor="html"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                {t('html')}
            </label>
            <div className="flex overflow-hidden rounded-xl">
                <MonacoEditor
                    className="flex-1"
                    height="24rem"
                    width="50%"
                    defaultLanguage="html"
                    value={html}
                    onChange={(html) => setHtml(html || '')}
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
                <div
                    className="h-96 flex-1 overflow-y-scroll bg-gray-700 p-8 text-gray-50"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    )
}
