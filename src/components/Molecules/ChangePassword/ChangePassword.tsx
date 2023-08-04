'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { putPassword } from 'src/api/user'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import Modal from '@/components/Atoms/Modal/Modal'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface IFormValues {
    newPassword: ''
}

export default function ChangePassword() {
    const t = useTranslations('Index')

    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        newPassword: '',
    }

    const validationSchema = object().shape({
        newPassword: string().required().min(8).max(50),
    })

    const handleSubmit = async (values: IFormValues) => {
        setLoading(true)

        await putPassword(values.newPassword)
            .then(() => {
                toast.success(t('saved'))
                setIsChangePasswordOpen(false)
            })
            .catch(() => toast.error(t('error_occurred')))

        setLoading(false)
    }

    return (
        <section>
            <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="dark:text-primary-500 text-sm font-medium text-blue-500 hover:underline"
            >
                {t('change_password')}
            </button>
            <Modal
                isOpen={isChangePasswordOpen}
                closeModal={() => setIsChangePasswordOpen(false)}
            >
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form className="flex flex-col gap-4">
                        <FormikInput
                            name="newPassword"
                            label={t('new_password')}
                        />
                        <SubmitButton disabled={loading} label={t('save')} />
                    </Form>
                </Formik>
            </Modal>
        </section>
    )
}
