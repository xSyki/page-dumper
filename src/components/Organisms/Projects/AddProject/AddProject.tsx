'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Project } from '@prisma/client'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { postProject } from 'src/api/project'
import useProjects from 'src/stores/projects'
import { object, string } from 'yup'

import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import Modal from '@/components/Atoms/Modal/Modal'
import SubmitButton from '@/components/Atoms/SubmitButton/SubmitButton'

interface IFormValues {
    name: ''
    url: ''
}

export default function AddProject() {
    const t = useTranslations('Index')

    const [, { addProject }] = useProjects()

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const initialValues: IFormValues = {
        name: '',
        url: '',
    }

    const validationSchema = object().shape({
        name: string().required(),
        url: string().url().required(),
    })

    const handleSubmit = async (values: IFormValues) => {
        setLoading(true)

        await postProject(values)
            .then((project: Project) => {
                addProject(project)
            })
            .catch(() => {
                toast.error(t('error'))
            })
            .finally(() => {
                setLoading(false)
                setIsOpen(false)
            })
    }

    return (
        <div>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setIsOpen(true)}
            >
                {t('add_project')}
            </button>
            <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form className="flex flex-col gap-4">
                        <FormikInput name="name" label={t('name')} />
                        <FormikInput name="url" label={t('url')} />
                        <SubmitButton
                            disabled={loading}
                            label={t('add_project')}
                        />
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}
