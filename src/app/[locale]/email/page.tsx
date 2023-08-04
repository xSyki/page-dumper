import { getServerSession } from 'next-auth'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import EmailTemplates from '@/components/Organisms/EmailTemplates/EmailTemplates'
import EmailLayout from '@/components/Templates/EmailLayout/EmailLayout'
import prisma from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]/route'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('email_templates'),
    })
}

export default async function EmailTemplatesPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return null
    }

    const emailTemplates = await prisma.emailTemplate.findMany({
        where: {
            userId: session.user.id,
        },
    })

    return (
        <EmailLayout>
            <EmailTemplates emailTemplates={emailTemplates} />
        </EmailLayout>
    )
}
