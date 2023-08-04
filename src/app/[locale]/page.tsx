import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'
import { getDatabaseOrderByQuery } from 'src/utils/database'
import { getSearchParams } from 'src/utils/queryParams'

import OffersTable from '@/components/Organisms/OffersTable/OffersTable'
import prisma from '@/lib/prisma'

import { authOptions } from '../api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('offers'),
    })
}

export default async function Home(props: IPageProps) {
    const searchParams = getSearchParams(props.searchParams)

    const session = await getServerSession(authOptions)

    const offers = await prisma.offer.findMany({
        where: {
            sent: false,
            ignored: false,
            userId: session?.user.id,
        },
        ...getDatabaseOrderByQuery(['name', 'email'], searchParams?.offers, {
            createdAt: 'desc',
        }),
    })

    return (
        <div className="flex">
            <OffersTable offers={offers} />
        </div>
    )
}
