'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { c } from 'src/utils'

interface INavTabs {
    items: { label: string; url: string }[]
}

export default function NavTabs(props: INavTabs) {
    const { items } = props

    const pathname = usePathname()

    const parsedPathname = pathname.startsWith('/pl')
        ? pathname.slice(3)
        : pathname

    return (
        <section className="w-full">
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                    className="-mb-px flex flex-wrap text-center text-sm font-medium"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                >
                    {items.map(({ label, url }, index) => (
                        <li className="mr-2" role="presentation" key={index}>
                            <Link
                                href={url}
                                className={c(
                                    'inline-block rounded-t-lg border-b-2 p-4 text-gray-900 dark:text-gray-50',
                                    url !== parsedPathname &&
                                        'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                                )}
                                id="profile-tab"
                                data-tabs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
