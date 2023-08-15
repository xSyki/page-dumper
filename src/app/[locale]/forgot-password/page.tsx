import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import ForgotPasswordForm from '@/components/Organisms/ForgotPasswordForm/ForgotPasswordForm'
import prisma from '@/lib/prisma'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('forgot_password'),
    })
}

export default async function ForgotPasswordPage() {
    const usersCount = await prisma.user.count()

    return <ForgotPasswordForm canRegister={!usersCount} />
}
