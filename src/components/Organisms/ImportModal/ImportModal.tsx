'use client'

import { useContext, useState } from 'react'
import { Offer } from '@prisma/client'
import { useTranslations } from 'next-intl'
import axiosApi from 'src/api/axiosApi'

import Modal from '@/components/Atoms/Modal/Modal'
import Tabs from '@/components/Molecules/Tabs/Tabs'

import { OffersContext } from '../OffersTable/OffersTable'

import ManualAdd from './ManualAdd.tsx/ManualAdd'

export default function ImportModal() {
    const t = useTranslations('Index')

    const { setOffers } = useContext(OffersContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleImportNewOffers = async () => {
        const newOffers = await axiosApi
            .post<Offer[]>('/offers/import')
            .then((res) => res.data)

        setOffers?.((offers) => [...newOffers, ...offers])
    }

    return (
        <>
            <button
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setIsModalOpen(true)}
            >
                {t('import')}
            </button>
            <Modal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                popupClassName="w-max"
            >
                <Tabs
                    labels={[t('import'), t('add_manual')]}
                    content={[
                        <button
                            key={0}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                            onClick={handleImportNewOffers}
                        >
                            {t('import')}
                        </button>,
                        <ManualAdd key={1} />,
                    ]}
                />
            </Modal>
        </>
    )
}
