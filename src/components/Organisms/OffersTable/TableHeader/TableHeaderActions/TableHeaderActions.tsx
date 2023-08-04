'use client'

import { useContext, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { putDeleteOffers, putIgnoreOffers, putSendOffers } from 'src/api/offers'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { c } from 'src/utils'

import { OffersContext } from '../../OffersTable'

export default function TableHeaderActions() {
    const t = useTranslations('Index')

    const { offers, checkedOffers, setOffers } = useContext(OffersContext)

    const [isActionsOpen, setIsActionsOpen] = useState(false)

    const actionRef = useRef(null)

    useOnClickOutside(actionRef, () => setIsActionsOpen(false))

    const handleIgnoreOffers = async () => {
        putIgnoreOffers(checkedOffers).catch(() => {
            toast.error(t('error_occurred'))
        })

        setOffers?.((offers) =>
            offers.filter((offer) => !checkedOffers.includes(offer.id))
        )
    }

    const handleDeleteOffers = async () => {
        putDeleteOffers(checkedOffers).catch(() => {
            toast.error(t('error_occurred'))
        })

        setOffers?.((offers) =>
            offers.filter((offer) => !checkedOffers.includes(offer.id))
        )
    }

    const handleSendOffers = async () => {
        putSendOffers(
            offers.filter((offer) => checkedOffers.includes(offer.id))
        ).catch(() => {
            toast.error(t('error_occurred'))
        })

        setOffers?.((offers) =>
            offers.filter((offer) => !checkedOffers.includes(offer.id))
        )
    }

    return (
        <div className="relative" ref={actionRef}>
            <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                type="button"
                onClick={() => setIsActionsOpen(!isActionsOpen)}
            >
                <span className="sr-only">Action button</span>
                Action
                <svg
                    className="ml-2 h-3 w-3"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            <div
                id="dropdownAction"
                className={c(
                    !isActionsOpen && 'hidden',
                    'absolute top-12 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700'
                )}
            >
                <div className="py-1">
                    <button
                        onClick={handleIgnoreOffers}
                        className="tex block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Ignore
                    </button>
                </div>
                <div className="py-1">
                    <button
                        onClick={handleDeleteOffers}
                        className="tex block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Delete
                    </button>
                </div>
                <div className="py-1">
                    <button
                        onClick={handleSendOffers}
                        className="tex block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
