'use client'

import { ReactNode, useState } from 'react'
import { c } from 'src/utils'

interface ITabs {
    labels: string[]
    content: ReactNode[]
    className?: string
}

export default function Tabs(props: ITabs) {
    const { labels, content, className } = props

    const [tabIndex, setTabIndex] = useState(0)

    return (
        <section className={c('w-full', className)}>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                    className="-mb-px flex flex-wrap text-center text-sm font-medium"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                >
                    {labels.map((label, index) => (
                        <li className="mr-2" role="presentation" key={index}>
                            <button
                                onClick={() => setTabIndex(index)}
                                className={c(
                                    'inline-block rounded-t-lg border-b-2 p-4 text-gray-900 dark:text-gray-50',
                                    index !== tabIndex &&
                                        ' border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                                )}
                                id="profile-tab"
                                data-tabs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="myTabContent">
                {content.map((content, index) => (
                    <div
                        key={index}
                        className={c(
                            index !== tabIndex && 'hidden',
                            'rounded-lg bg-gray-50 p-4 dark:bg-gray-800'
                        )}
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        {content}
                    </div>
                ))}
            </div>
        </section>
    )
}
