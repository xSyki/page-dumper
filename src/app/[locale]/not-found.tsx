'use client'

import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
    const t = useTranslations('NotFoundPage')

    return (
        <section className="flex h-full w-full items-center justify-center">
            <p className="text-4xl text-gray-50">{t('not_found')}</p>
        </section>
    )
}
