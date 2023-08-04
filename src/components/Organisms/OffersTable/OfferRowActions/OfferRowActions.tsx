'use client'

import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Offer } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { putDeleteOffers, putIgnoreOffers, putSendOffers } from 'src/api/offers'

import BanIcon from '@/assets/icons/ban.svg'
import SendIcon from '@/assets/icons/send.svg'
import TrashIcon from '@/assets/icons/trash.svg'
import IconButton from '@/components/Atoms/IconButton/IconButton'

import { OffersContext } from '../OffersTable'

interface IOfferRowProps {
    offer: Offer
}

export default function OfferRowActions(props: IOfferRowProps) {
    const { offer } = props

    const t = useTranslations('Index')

    const { setOffers } = useContext(OffersContext)

    const handleIgnoreOffer = async () => {
        const ids = [offer.id]

        putIgnoreOffers(ids).catch(() => {
            toast.error(t('error_occurred'))
        })

        setOffers?.((offers) =>
            offers.filter((offer) => !ids.includes(offer.id))
        )
    }

    const handleDeleteOffer = async () => {
        const ids = [offer.id]

        putDeleteOffers([offer.id]).catch(() => {
            toast.error(t('error_occurred'))
        })

        setOffers?.((offers) =>
            offers.filter((offer) => !ids.includes(offer.id))
        )
    }

    const handleSendOffer = async () => {
        const ids = [offer.id]

        putSendOffers([offer]).catch(() => {
            toast.error(t('error_occurred'))
        })

        setOffers?.((offers) =>
            offers.filter((offer) => !ids.includes(offer.id))
        )
    }

    return (
        <div className="flex gap-4">
            <IconButton Icon={BanIcon} onClick={handleIgnoreOffer} />
            <IconButton Icon={TrashIcon} onClick={handleDeleteOffer} />
            <IconButton Icon={SendIcon} onClick={handleSendOffer} />
        </div>
    )
}
