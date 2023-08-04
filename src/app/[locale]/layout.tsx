import { ReactNode, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import AuthStatus from '@/components/Atoms/AuthStatus/AuthStatus'
import Layout from '@/components/Templates/Layout/Layout'

import { ThemeProvider } from '../theme-provider'

import '@/styles/globals.css'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

export async function generateMetadata() {
    return {
        icons: [
            {
                rel: 'icon',
                url: '/favicon.ico',
                type: 'image/x-icon',
            },
            {
                rel: 'apple-touch-icon',
                url: '/favicon.ico',
            },
        ],
        themeColor: '#111827',
    }
}

interface IRootLayoutProps {
    children: ReactNode
    params: { locale: string }
}

export default async function RootLayout(props: IRootLayoutProps) {
    const { children, params } = props
    const { locale } = params

    let messages

    try {
        messages = (await import(`../../messages/${locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <html lang={locale}>
            <body className={inter.variable}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <Toaster />
                        <Suspense fallback="Loading...">
                            <AuthStatus />
                        </Suspense>
                        <Layout>{children}</Layout>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
