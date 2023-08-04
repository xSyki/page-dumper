import { Offer } from '@prisma/client'

import axiosApi from './axiosApi'

export const putIgnoreOffers = async (offerIds: number[]) => {
    return axiosApi.put(`/offers/ignore`, offerIds).then((res) => res.data)
}

export const putDeleteOffers = async (offerIds: number[]) => {
    return axiosApi.put(`/offers/ignore`, offerIds).then((res) => res.data)
}

export const putSendOffers = async (offers: Offer[]) => {
    return axiosApi.put(`/offers/send`, offers).then((res) => res.data)
}

export const postOffer = async (offer: Partial<Offer>) => {
    return axiosApi.post(`/offers`, offer)
}
