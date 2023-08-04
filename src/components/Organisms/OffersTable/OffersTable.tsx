'use client'

import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import { Offer } from '@prisma/client'
import { useTranslations } from 'next-intl'

import Table from '@/components/Molecules/Table/Table'

import OfferRowActions from './OfferRowActions/OfferRowActions'
import OfferRowCheckbox from './OfferRowActions/OfferRowChecbox'
import TableHeader from './TableHeader/TableHeader'

export const OffersContext = createContext<{
    offers: Offer[]
    setOffers?: Dispatch<SetStateAction<Offer[]>>
    checkedOffers: number[]
    setCheckedOffers?: Dispatch<SetStateAction<number[]>>
}>({ offers: [], checkedOffers: [] })

interface OffersTableProps {
    offers: Offer[]
}

export default function OffersTable(props: OffersTableProps) {
    const [offers, setOffers] = useState<Offer[]>(props.offers)
    const [checkedOffers, setCheckedOffers] = useState<number[]>([])

    const t = useTranslations('Index')

    useEffect(() => {
        setOffers(props.offers)
    }, [props.offers])

    const toggleAllOffers = () => {
        if (checkedOffers.length === offers.length) {
            setCheckedOffers([])
        } else {
            setCheckedOffers(offers.map((offer) => offer.id))
        }
    }

    return (
        <OffersContext.Provider
            value={{
                offers,
                setOffers,
                checkedOffers,
                setCheckedOffers,
            }}
        >
            <div className="relative w-full overflow-x-auto">
                <TableHeader />
                <Table
                    name="offers"
                    pagination
                    header={[
                        {
                            label: (
                                <>
                                    <input
                                        checked={
                                            checkedOffers.length ===
                                            offers.length
                                        }
                                        onChange={toggleAllOffers}
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                    />
                                    <label
                                        htmlFor="checkbox-table-search-1"
                                        className="sr-only"
                                    >
                                        {t('checkbox')}
                                    </label>
                                </>
                            ),
                        },
                        {
                            label: t('name'),
                            orderBy: {
                                name: 'name',
                            },
                        },
                        {
                            label: t('email'),
                            orderBy: {
                                name: 'email',
                            },
                        },
                        {
                            label: t('actions'),
                        },
                    ]}
                    rows={offers.map((offer) => ({
                        cells: [
                            {
                                content: <OfferRowCheckbox offer={offer} />,
                            },
                            { content: offer.name },
                            { content: offer.email },
                            {
                                content: <OfferRowActions offer={offer} />,
                            },
                        ],
                    }))}
                />
            </div>
        </OffersContext.Provider>
    )
}
