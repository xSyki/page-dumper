import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import PasswordRecoverForm from '@/components/Organisms/PasswordRecoverForm/PasswordRecoverForm'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('recover_password'),
    })
}

export default function PasswordRecoverPage() {
    return <PasswordRecoverForm />
}
