'use client'

import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { EmailTemplate } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { putEmailTemplate } from 'src/api/email-template'

import Input from '@/components/Atoms/Input/Input'

import EmailTemplateHTML from './EmailTemplateHTML/EmailTemplateHTML'

interface EmailTemplateFormProps {
    emailTemplate: EmailTemplate
}

export default function EmailTemplateForm(props: EmailTemplateFormProps) {
    const t = useTranslations('Index')

    const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>(
        props.emailTemplate
    )

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await putEmailTemplate(emailTemplate).catch(() => {
            toast.error(t('error_occurred'))
        })
    }

    return (
        <form onSubmit={handleSave} className="space-y-4 md:space-y-6">
            <Input
                label={t('subject')}
                value={emailTemplate.subject}
                onChange={(value) =>
                    setEmailTemplate({
                        ...emailTemplate,
                        subject: value,
                    })
                }
                name="subject"
            />
            <EmailTemplateHTML
                html={emailTemplate.html}
                setHtml={(html: string) =>
                    setEmailTemplate((emailTemplate) => ({
                        ...emailTemplate,
                        html,
                    }))
                }
            />
            <div>
                <label
                    htmlFor="text"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    {t('text')}
                </label>
                <textarea
                    value={emailTemplate.text}
                    onChange={(e) =>
                        setEmailTemplate({
                            ...emailTemplate,
                            text: e.target.value,
                        })
                    }
                    id="text"
                    name="text"
                    placeholder=""
                    autoComplete="text"
                    required
                    className="focus:ring-primary-600 focus:border-primary-600 block h-64 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
            </div>
            <button
                className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4"
                type="submit"
            >
                <p>{t('save')}</p>
            </button>
        </form>
    )
}
