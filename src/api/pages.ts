import { Page, PageContent } from '@prisma/client'

import axiosApi from './axiosApi'

export const postPagesSitemap = async (projectId: number) =>
    axiosApi
        .post<Page[]>(`/pages/sitemap`, {
            projectId,
        })
        .then((res) => res.data)

export const postPagesContent = async (projectId: number) =>
    axiosApi
        .post<PageContent[]>(`/pages/content`, {
            projectId,
        })
        .then((res) => res.data)

export const postCrawlPages = async (projectId: number) =>
    axiosApi
        .post<Page[]>(`/pages/crawl`, {
            projectId,
        })
        .then((res) => res.data)

export const deletePage = async (pageId: number) =>
    axiosApi.delete(`/pages/${pageId}`).then((res) => res.data)
