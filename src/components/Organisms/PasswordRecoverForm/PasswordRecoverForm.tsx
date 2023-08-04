'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { putPasswordRecover } from 'src/api/creadentials'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface IFormValues {
    password: string
}

export default function PasswordRecoverForm() {
    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const router = useRouter()

    const t = useTranslations('Index')

    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        password: '',
    }

    const validationSchema = object().shape({
        password: string()
            .required(t('required_field'))
            .min(8, t('min_length_8'))
            .max(50, t('max_length_50')),
    })

    const handleSubmit = async (values: IFormValues) => {
        setLoading(true)

        if (!token || typeof token !== 'string') {
            toast.error(t('error_occurred'))
            return
        }

        await putPasswordRecover({ token, password: values.password }).catch(
            () => {
                toast.error(t('error_occurred'))
            }
        )

        setLoading(false)

        router.push('/login')
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                            {t('reset_password')}
                        </h1>
                        <div className="space-y-2 md:space-y-4">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form className="space-y-2 md:space-y-4">
                                    <FormikInput
                                        label={t('password')}
                                        name="password"
                                        type="password"
                                    />
                                    <SubmitButton
                                        label={t('set_new_password')}
                                        loading={loading}
                                        disabled={loading}
                                    />
                                </Form>
                            </Formik>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {t('dont_have_an_account')}
                                {` `}
                                <Link
                                    href="/register"
                                    className="dark:text-primary-500 font-medium text-blue-500 hover:underline"
                                >
                                    {t('sign_up')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
