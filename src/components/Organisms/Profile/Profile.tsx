'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { putUser } from 'src/api/user'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'
import ChangeLanguage from '@/components/Molecules/ChangeLanguage/ChangeLanguage'
import ChangePassword from '@/components/Molecules/ChangePassword/ChangePassword'
import ThemeSwitcher from '@/components/Molecules/ThemeSwitcher/ThemeSwitcher'

interface IProfileProps {
    profile: {
        name: string
        email: string
    }
}

interface IFormValues {
    name: string
    email: string
}

export default function Profile(props: IProfileProps) {
    const { name, email } = props.profile

    const t = useTranslations('Index')

    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        name,
        email,
    }

    const validationSchema = object().shape({
        name: string()
            .required(t('required_field'))
            .min(2, t('min_length_2'))
            .max(50, t('max_length_50')),
        email: string().required(t('required_field')).email(t('invalid_email')),
    })

    const handleSubmit = async (values: IFormValues) => {
        setLoading(true)

        await putUser(values)
            .then((res) => res.data)
            .catch(() => toast.error(t('error_occurred')))

        setLoading(false)
        toast.success(t('saved'))
    }

    return (
        <>
            <h1 className="mb-4 text-4xl text-gray-900 dark:text-gray-50">
                {t('profile')}
            </h1>
            <section className="mb-4 flex w-96 flex-col gap-6">
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form className="flex flex-col gap-4">
                        <FormikInput name="name" label={t('name')} />
                        <FormikInput name="email" label={t('email')} />
                        <SubmitButton disabled={loading} label={t('save')} />
                    </Form>
                </Formik>
            </section>
            <ChangePassword />
            <ChangeLanguage />
            <ThemeSwitcher />
        </>
    )
}
