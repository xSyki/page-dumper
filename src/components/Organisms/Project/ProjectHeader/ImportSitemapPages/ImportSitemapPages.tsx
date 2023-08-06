'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { postPagesSitemap } from 'src/api/pages'

import LoadingDots from '@/components/Atoms/LoadingDots/LoadingDots'

interface IImportSitemapPagesProps {
    projectId: number
}

export default function ImportSitemapPage(props: IImportSitemapPagesProps) {
    const { projectId } = props

    const t = useTranslations('Project')

    const [loading, setLoading] = useState(false)

    const handleImportSitemap = () => {
        setLoading(true)

        postPagesSitemap(projectId)
            .catch(() => {
                toast.error(t('error'))
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <button
            onClick={handleImportSitemap}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={loading}
        >
            {loading ? <LoadingDots /> : t('import_sitemap')}
        </button>
    )
}
