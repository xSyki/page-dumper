'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next-intl/client'
import Link from 'next-intl/link'
import { postRegister } from 'src/api/user'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface IFormValues {
    name: string
    email: string
    password: string
}

interface IRegisterFormProps {
    canRegister: boolean
}

export default function RegisterForm(props: IRegisterFormProps) {
    const { canRegister } = props

    const t = useTranslations('Index')

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        name: '',
        email: '',
        password: '',
    }

    const validationSchema = object().shape({
        name: string()
            .required(t('required_field'))
            .min(2, t('min_length_2'))
            .max(50, t('max_length_50')),
        email: string().required(t('required_field')).email(t('invalid_email')),
        password: string()
            .required(t('required_field'))
            .min(8, t('min_length_8'))
            .max(50, t('max_length_50')),
    })

    const handleSubmit = async (values: IFormValues) => {
        setLoading(true)

        const { name, email, password } = values

        await postRegister({
            name,
            email,
            password,
        })
            .then(() => {
                router.push('/login')
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
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
            >
                <Form>
                    <FormikInput name="name" label={t('name')} />
                    <FormikInput name="email" label={t('email')} />
                    <FormikInput
                        name="password"
                        label={t('password')}
                        type="password"
                    />
                    <SubmitButton
                        loading={loading}
                        label={t('sign_up')}
                        disabled={loading || !canRegister}
                    />
                </Form>
            </Formik>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t('have_an_account')}{' '}
                <Link
                    href="/login"
                    className="dark:text-primary-500 font-medium text-blue-500 hover:underline"
                >
                    {t('sign_in')}
                </Link>
            </p>
        </section>
    )
}
