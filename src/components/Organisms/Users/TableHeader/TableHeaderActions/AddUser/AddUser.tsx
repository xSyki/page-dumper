import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { User } from '@prisma/client'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { postRegister } from 'src/api/user'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import Modal from '@/components/Atoms/Modal/Modal'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface IFormValues {
    name: string
    email: string
    password: string
}

interface IAddUserProps {
    addUser: (user: User) => void
}

export default function AddUser(props: IAddUserProps) {
    const { addUser } = props

    const t = useTranslations('AdminPage')

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)

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
            .then((user) => {
                addUser(user)
                setIsAddUserModalOpen(false)
            })
            .catch(() => {
                toast.error(t('error_occurred'))
            })

        setLoading(false)
    }

    return (
        <>
            <div className="py-1">
                <button
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="tex block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    {t('add')}
                </button>
            </div>
            <Modal
                isOpen={isAddUserModalOpen}
                closeModal={() => setIsAddUserModalOpen(false)}
            >
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
                            disabled={loading}
                        />
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}
