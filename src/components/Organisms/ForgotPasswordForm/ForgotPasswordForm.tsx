'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { postPasswordRecover } from 'src/api/creadentials'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface IFormValues {
    email: string
}

interface IForgotPasswordFormProps {
    canRegister: boolean
}

export default function ForgotPasswordForm(props: IForgotPasswordFormProps) {
    const { canRegister } = props

    const t = useTranslations('Index')

    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        email: '',
    }

    const validationSchema = object().shape({
        email: string().required(t('required_field')).email(t('invalid_email')),
    })

    const handleSubmit = async (values: IFormValues) => {
        setLoading(true)

        await postPasswordRecover(values.email).catch(() => {
            toast.error(t('error_occurred'))
        })

        setLoading(false)

        toast.success(t('email_sent'))
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                            {t('forgot_password')}
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                className="space-y-4 md:space-y-6"
                            >
                                <Form>
                                    <FormikInput
                                        name="email"
                                        label={t('email')}
                                    />
                                    <SubmitButton
                                        label={t('recover_password')}
                                        disabled={loading}
                                        loading={loading}
                                    />
                                </Form>
                            </Formik>
                            {canRegister && (
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    {t('dont_have_an_account')}{' '}
                                    <Link
                                        href="/register"
                                        className="dark:text-primary-500 font-medium text-blue-500 hover:underline"
                                    >
                                        {t('sign_up')}
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
