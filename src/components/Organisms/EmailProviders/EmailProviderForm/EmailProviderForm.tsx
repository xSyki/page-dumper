'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { EmailProvider } from '@prisma/client'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { putEmailProvider } from 'src/api/email-provider'
import { boolean, number, object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface IEmailProviderFormProps {
    emailProvider: EmailProvider
}

interface IFormValues {
    host: string
    port: number
    secure: boolean
    emailUser: string
    emailPass: string
    from: string
}

export default function EmailProviderForm(props: IEmailProviderFormProps) {
    const { id, host, port, secure, emailUser, emailPass, from } =
        props.emailProvider

    const t = useTranslations('Index')

    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        host,
        port,
        secure,
        emailUser,
        emailPass,
        from,
    }

    const validationSchema = object().shape({
        host: string().required(t('required_field')),
        port: number().required(t('required_field')),
        secure: boolean().required(t('required_field')),
        emailUser: string().required(t('required_field')),
        emailPass: string().required(t('required_field')),
        from: string().required(t('required_field')),
    })

    const handleSave = async (values: IFormValues) => {
        setLoading(true)

        await putEmailProvider({ id, ...values })
            .then(() => {
                toast.success('Saved')
            })
            .catch(() => {
                toast.error(t('error_occurred'))
            })

        setLoading(false)
    }

    return (
        <section className="space-y-2">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSave}
                className="space-y-4 md:space-y-6"
            >
                <Form>
                    <FormikInput name="host" label={t('host')} />
                    <FormikInput name="emailUser" label={t('user')} />
                    <FormikInput name="port" label={t('port')} type="number" />
                    <FormikInput
                        name="secure"
                        label={t('secure')}
                        type="checkbox"
                    />
                    <FormikInput
                        name="emailPass"
                        label={t('password')}
                        type="password"
                    />
                    <FormikInput name="from" label={t('from')} />
                    <SubmitButton
                        loading={loading}
                        label={t('save')}
                        disabled={loading}
                    />
                </Form>
            </Formik>
        </section>
    )
}
