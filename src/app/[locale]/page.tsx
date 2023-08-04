import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'
import { getSearchParams } from 'src/utils/queryParams'

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

    return <div className="flex">Hello</div>
}
