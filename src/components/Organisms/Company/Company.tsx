'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Company } from '@prisma/client'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { putCompany } from 'src/api/company'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface ICompanyProps {
    company: Company
}

interface IFormValues {
    name: string
    nip: string
    city: string
    street: string
    postalCode: string
    country: string
    houseNumber: string
    email: string
}

export default function Company(props: ICompanyProps) {
    const { name, nip, city, street, postalCode, country, houseNumber, email } =
        props.company

    const t = useTranslations('CompanyPage')

    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        name,
        nip,
        city,
        street,
        postalCode,
        country,
        houseNumber,
        email,
    }

    const validationSchema = object().shape({
        name: string()
            .required(t('required_field'))
            .min(2, t('min_length_2'))
            .max(50, t('max_length_50')),
        nip: string().required(t('required_field')),
        city: string().required(t('required_field')),
        street: string().required(t('required_field')),
        postalCode: string().required(t('required_field')),
        country: string().required(t('required_field')),
        houseNumber: string().required(t('required_field')),
        email: string().required(t('required_field')).email(t('invalid_email')),
    })

    const handleSubmit = async (values: IFormValues) => {
        setLoading(true)

        await putCompany(values).catch(() => toast.error(t('error_occurred')))

        setLoading(false)
        toast.success(t('saved'))
    }

    return (
        <>
            <h1 className="mb-4 text-4xl text-gray-900 dark:text-gray-50">
                {t('company')}
            </h1>
            <section className="mb-4 flex flex-col gap-6">
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form className="flex flex-col gap-4">
                        <FormikInput name="name" label={t('name')} />
                        <FormikInput name="nip" label={t('nip')} />
                        <FormikInput name="city" label={t('city')} />
                        <FormikInput name="street" label={t('street')} />
                        <FormikInput
                            name="postalCode"
                            label={t('postal_code')}
                        />
                        <FormikInput name="country" label={t('country')} />
                        <FormikInput
                            name="houseNumber"
                            label={t('house_number')}
                        />
                        <FormikInput name="email" label={t('email')} />
                        <SubmitButton disabled={loading} label={t('save')} />
                    </Form>
                </Formik>
            </section>
        </>
    )
}
