'use client'

import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Form, Formik, FormikHelpers } from 'formik'
import { useTranslations } from 'next-intl'
import { postOffer } from 'src/api/offers'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'
import Title from '@/components/Atoms/Title/Title'

import { OffersContext } from '../../OffersTable/OffersTable'

interface IFormValues {
    name: string
    email: string
}

export default function ManualAdd() {
    const t = useTranslations('Index')

    const { setOffers } = useContext(OffersContext)

    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        name: '',
        email: '',
    }

    const validationSchema = object().shape({
        name: string()
            .required(t('required_field'))
            .min(2, t('min_length_2'))
            .max(50, t('max_length_50')),
        email: string().required(t('required_field')).email(t('invalid_email')),
    })

    const handleSubmit = async (
        values: IFormValues,
        helpers: FormikHelpers<IFormValues>
    ) => {
        setLoading(true)

        const offer = await postOffer(values)
            .then((res) => res.data)
            .catch(() => toast.error(t('error_occurred')))

        setOffers?.((offers) => [offer, ...offers])

        helpers.resetForm()
        setLoading(false)
    }

    return (
        <div className="w-96">
            <Title as="h2">{t('add_offer')}</Title>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-4">
                    <FormikInput name="name" label={t('name')} />
                    <FormikInput name="email" label={t('email')} />
                    <SubmitButton disabled={loading} label={t('add')} />
                </Form>
            </Formik>
        </div>
    )
}
