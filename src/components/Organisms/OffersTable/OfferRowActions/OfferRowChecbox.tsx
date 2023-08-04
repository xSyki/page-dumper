'use client'

import { useContext } from 'react'
import { Offer } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { OffersContext } from '../OffersTable'

interface IOfferRowCheckboxProps {
    offer: Offer
}

export default function OfferRowCheckbox(props: IOfferRowCheckboxProps) {
    const { offer } = props

    const { checkedOffers, setCheckedOffers } = useContext(OffersContext)

    const t = useTranslations('Index')

    return (
        <div className="flex items-center">
            <input
                checked={checkedOffers.includes(offer.id)}
                onChange={() =>
                    setCheckedOffers?.((checkedOffers) =>
                        checkedOffers.includes(offer.id)
                            ? checkedOffers.filter((id) => id !== offer.id)
                            : [...checkedOffers, offer.id]
                    )
                }
                id="checkbox-table-search-1"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
            />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
                {t('checkbox')}
            </label>
        </div>
    )
}
