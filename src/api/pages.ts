import { Page } from '@prisma/client'

import axiosApi from './axiosApi'

export const postPagesSitemap = async (projectId: number) =>
    axiosApi
        .post<Page[]>(`/pages/sitemap`, {
            projectId,
        })
        .then((res) => res.data)
