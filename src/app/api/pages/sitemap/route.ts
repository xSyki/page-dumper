import { NextRequest, NextResponse } from 'next/server'
import Sitemapper from 'sitemapper'
import { number, object } from 'yup'

import { IMiddlewares, withProtect, withValidation } from '@/lib/middlewares'
import prisma from '@/lib/prisma'
import findSitemaps from '@/utils/server/findSitemaps'

async function POST(
    req: NextRequest,
    res: NextResponse,
    {
        token,
        body,
    }: IMiddlewares<{
        projectId: number
    }>
) {
    const { projectId } = body

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    })

    if (!project || project.ownerId !== token.userId) {
        return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const sitemapUrls = await findSitemaps(project.domain)

    const sitemapsPromise = sitemapUrls.map(async (sitemapUrl) =>
        new Sitemapper({
            url: sitemapUrl,
            timeout: 6000,
        }).fetch()
    )

    const sitemaps = await Promise.all(sitemapsPromise)

    const urls = sitemaps.map((sitemap) => sitemap.sites).flat(1)

    const uniqueUrls = [...new Set(urls)]

    // const pages = await prisma.page.createMany({
    //     data: uniqueUrls.map((url) => ({
    //         projectId,
    //         url,
    //     })),
    //     skipDuplicates: true,

    // })

    const pages = await prisma.$transaction(
        uniqueUrls.map((url) =>
            prisma.page.create({
                data: {
                    projectId,
                    url,
                },
            })
        )
    )

    return NextResponse.json(pages, { status: 200 })
}

const postHandler = withValidation(withProtect(POST), {
    bodySchema: object().shape({
        projectId: number().required(),
    }),
})

export { postHandler as POST }
