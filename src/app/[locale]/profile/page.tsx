import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import Profile from '@/components/Organisms/Profile/Profile'
import prisma from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('profile'),
    })
}

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    const profile = await prisma.user.findUnique({
        where: {
            id: session?.user.id,
        },
    })

    if (!profile) {
        return null
    }

    return <Profile profile={profile} />
}
