import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import EmailProviders from '@/components/Organisms/EmailProviders/EmailProviders'
import EmailLayout from '@/components/Templates/EmailLayout/EmailLayout'
import prisma from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('email_providers'),
    })
}

export default async function EmailProvidersPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return null
    }

    const emailProviders = await prisma.emailProvider.findMany({
        where: {
            userId: session.user.id,
        },
    })

    return (
        <EmailLayout>
            <EmailProviders emailProviders={emailProviders} />
        </EmailLayout>
    )
}
