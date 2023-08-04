'use client'

import { useTranslations } from 'next-intl'

import ArrowLeftIcon from '@/assets/icons/arrow-back.svg'
import ArrowRightIcon from '@/assets/icons/arrow-forward.svg'

interface IPaginationButtonsProps {
    onBackClick?: () => void
    onNextClick?: () => void
    pageDetails?: {
        from: number
        to: number
        total: number
    }
}

export default function PaginationButtons(props: IPaginationButtonsProps) {
    const { onBackClick, onNextClick, pageDetails } = props

    const t = useTranslations('Index')

    return (
        <div className="flex flex-col items-center">
            {pageDetails ? (
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    {t('showing')}{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageDetails.from}
                    </span>{' '}
                    {t('to')}{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageDetails.to}
                    </span>{' '}
                    {t('of')}{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageDetails.total}
                    </span>{' '}
                    {t('entries')}
                </span>
            ) : null}
            <div className="xs:mt-0 mt-2 inline-flex">
                <button
                    disabled={!onBackClick}
                    onClick={onBackClick}
                    className="flex h-8 items-center justify-center rounded-l bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <ArrowLeftIcon className="mr-2 h-3 w-3" />
                    {t('prev')}
                </button>
                <button
                    disabled={!onNextClick}
                    onClick={onNextClick}
                    className="flex h-8 items-center justify-center rounded-r border-0 border-l border-gray-700 bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {t('next')}
                    <ArrowRightIcon className="ml-2 h-3 w-3" />
                </button>
            </div>
        </div>
    )
}
