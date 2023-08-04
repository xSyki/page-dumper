'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next-intl/link'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface IFormValues {
    email: string
    password: string
}

export default function LoginForm() {
    const t = useTranslations('Index')

    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        email: '',
        password: '',
    }

    const validationSchema = object().shape({
        email: string().required(t('required_field')).email(t('invalid_email')),
        password: string().required(t('required_field')),
    })

    const handleSubmit = async (values: IFormValues) => {
        setLoading(true)

        await signIn('credentials', {
            redirect: true,
            callbackUrl: '/',
            email: values.email,
            password: values.password,
        })
            .then(() => {
                setLoading(false)
            })
            .catch(() => toast.error(t('error_occurred')))
    }

    return (
        <section className="space-y-2">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                className="space-y-4 md:space-y-6"
            >
                <Form>
                    <FormikInput name="email" label={t('email')} />
                    <FormikInput
                        name="password"
                        label={t('password')}
                        type="password"
                    />
                    <SubmitButton
                        disabled={loading}
                        loading={loading}
                        label={t('sign_in')}
                    />
                </Form>
            </Formik>
            <div className="flex items-center">
                <Link
                    href="/forgot-password"
                    className="dark:text-primary-500 text-sm font-medium text-blue-500 hover:underline"
                >
                    {t('forgot_password')}
                </Link>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t('dont_have_an_account')}{' '}
                <Link
                    href="/register"
                    className="dark:text-primary-500 font-medium text-blue-500 hover:underline"
                >
                    {t('sign_up')}
                </Link>
            </p>
        </section>
    )
}
