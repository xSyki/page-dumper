import { Scrape } from '@prisma/client'

import axiosApi from './axiosApi'

export const deleteScrape = async (id: number) =>
    axiosApi.delete<number>(`/scrapes/${id}`).then((res) => res.data)

export const postScrape = async (projectId: number, update: boolean) =>
    axiosApi
        .post<Scrape>(`/scrapes`, { projectId, update })
        .then((res) => res.data)
