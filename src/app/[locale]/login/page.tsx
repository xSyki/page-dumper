import { useTranslations } from 'next-intl'
import { getTranslator } from 'next-intl/server'
import { IPageProps } from 'src/interfaces/page'
import { seo } from 'src/utils'

import LoginForm from '@/components/Organisms/LoginForm/LoginForm'

export async function generateMetadata({ params: { locale } }: IPageProps) {
    const t = await getTranslator(locale, 'Index')

    return seo({
        title: t('login'),
    })
}

export default function Login() {
    const t = useTranslations('Index')

    return (
        <section className="h-full bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex h-full flex-col items-center justify-center px-6 py-8 lg:py-0">
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                            {t('sign_in_to_your_account')}
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    )
}
