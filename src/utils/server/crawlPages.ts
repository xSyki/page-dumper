import { Project } from '@prisma/client'
import axios from 'axios'
import { load } from 'cheerio'

import isValidUrl from '../isValidUrl'
import { pureUrl } from '../pureUrl'

import { parallel } from './parallel'

interface ICrawlPage {
    content: string
    status: number | null
    page: {
        url: string
    }
}

export async function crawlPages(
    project: Project,
    pages: ICrawlPage[],
    newPages: ICrawlPage[] = pages
): Promise<ICrawlPage[]> {
    const pagesUrls = pages.map((page) => page.page.url)

    const urls: string[] = []

    newPages.map((page) => {
        const $ = load(page.content)

        const links = $('a')

        links.each((i, link) => {
            const href = $(link).attr('href')

            if (!href) {
                return
            }

            const parsedHref = href.replace(/#.*$/, '')

            if (parsedHref.startsWith('/')) {
                const url = `${project.domain}${parsedHref}`

                if (!isValidUrl(url)) {
                    return
                }

                urls.push(pureUrl(url))

                return
            }

            if (parsedHref.startsWith(project.domain)) {
                urls.push(parsedHref)

                if (!isValidUrl(parsedHref)) {
                    return
                }

                urls.push(pureUrl(parsedHref))

                return
            }
        })
    })

    const uniqueUrls = [...new Set(urls)].filter(
        (url) => !pagesUrls.includes(url)
    )

    if (uniqueUrls.length === 0) {
        return []
    }

    const responses = await parallel(
        uniqueUrls.map((url) => axios.get<string>(url)),
        project.parallelLimit
    )

    const newPageContent: ICrawlPage[] = responses.map((response, i) => ({
        content:
            response.headers['content-type'] === 'text/html; charset=utf-8'
                ? response.data
                : '',
        status: response.status,
        page: {
            url: uniqueUrls[i],
        },
    }))

    const allPages = [...pages, ...newPageContent]

    newPageContent.push(
        ...(await crawlPages(project, allPages, newPageContent))
    )

    return newPageContent
}
