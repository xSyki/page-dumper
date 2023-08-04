'use client'

import { EmailProvider } from '@prisma/client'

import Tabs from '@/components/Molecules/Tabs/Tabs'

import EmailProviderForm from './EmailProviderForm/EmailProviderForm'

interface IEmailProvidersProps {
    emailProviders: EmailProvider[]
}

export default function EmailProviders(props: IEmailProvidersProps) {
    const { emailProviders } = props

    return (
        <section>
            <Tabs
                labels={emailProviders.map((emailProvider) =>
                    emailProvider.from.split('" ')[0].replaceAll('"', '')
                )}
                content={emailProviders.map((emailProvider) => (
                    <EmailProviderForm
                        key={emailProvider.id}
                        emailProvider={emailProvider}
                    />
                ))}
            />
        </section>
    )
}
