'use client'

import { EmailTemplate } from '@prisma/client'

import Tabs from '@/components/Molecules/Tabs/Tabs'

import EmailTemplateForm from './EmailTemplateForm/EmailTemplateForm'

interface IEmailTemplatesProps {
    emailTemplates: EmailTemplate[]
}

export default function EmailTemplates(props: IEmailTemplatesProps) {
    const { emailTemplates } = props

    return (
        <section>
            <Tabs
                labels={emailTemplates.map(
                    (emailTemplate) => emailTemplate.subject
                )}
                content={emailTemplates.map((emailTemplate) => (
                    <EmailTemplateForm
                        key={emailTemplate.id}
                        emailTemplate={emailTemplate}
                    />
                ))}
            />
        </section>
    )
}
