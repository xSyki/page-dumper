'use client'

import { useLocale } from 'next-intl'
import Link from 'next-intl/link'
import { c } from 'src/utils'

export default function ChangeLanguage() {
    const locale = useLocale()

    return (
        <div className="inline-flex cursor-pointer items-center rounded-md p-2 dark:text-gray-800">
            <Link
                className={c(
                    'rounded-l-md px-4 py-2 text-gray-200',
                    locale === 'en' ? 'bg-blue-600' : 'bg-gray-400'
                )}
                href="/profile"
                locale="en"
            >
                EN
            </Link>
            <Link
                className={c(
                    'rounded-r-md px-4 py-2 text-gray-200',
                    locale === 'pl' ? 'bg-blue-600' : 'bg-gray-400'
                )}
                href="/profile"
                locale="pl"
            >
                PL
            </Link>
        </div>
    )
}
