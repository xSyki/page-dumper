'use client'

import { ReactNode, useState } from 'react'
import { JsonSchema } from '@jsonforms/core'
import { Form, Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { v4 as uuidv4 } from 'uuid'
import { Schema } from 'yup'

import FormikCheckbox from '@/components/Atoms/FormikCheckbox/FormikCheckbox'
import FormikInput from '@/components/Atoms/FormikInput/FormikInput'
import FormikRadio from '@/components/Atoms/FormikRadio/FormikRadio'

import FormikMultiSelect from '../../Atoms/FormikMultiSelect/FormikMultiSelect'

import FormObserver from './FormObserver/FormObserver'

interface IJsonFormProps<T> {
    jsonSchema: JsonSchema
    validationSchema: Schema
    initialValues: T
    onSubmit?: (values: T) => Promise<void> | void
    onChange?: (values: T) => Promise<void> | void
    submitButton?: (loading: boolean) => ReactNode
}

export default function JsonForm<T extends Record<string, unknown>>(
    props: IJsonFormProps<T>
) {
    const {
        validationSchema,
        initialValues,
        onSubmit,
        onChange,
        submitButton,
    } = props

    const t = useTranslations('Index')

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values: T) => {
        setLoading(true)

        if (onSubmit) {
            await onSubmit(values)
        }

        setLoading(false)
    }

    const handleChange = async (values: T) => {
        if (onChange) {
            await onChange(values)
        }
    }

    const renderForm = (schema: JsonSchema, name?: string): ReactNode => {
        const { type } = schema

        switch (type) {
            case 'object':
                const properties = schema?.properties

                return properties
                    ? Object.keys(properties).map((key) => {
                          return renderForm(
                              properties[key],
                              name ? name + '.' + key : key
                          )
                      })
                    : null
            case 'string':
                return (
                    <FormikInput
                        key={uuidv4()}
                        name={name || (schema.title as string)}
                        label={t(schema.title)}
                    />
                )
            case 'integer':
                return (
                    <FormikInput
                        key={uuidv4()}
                        name={name || (schema.title as string)}
                        label={t(schema.title)}
                        type="number"
                    />
                )
            case 'array':
                if (!schema.uniqueItems) return null

                const options = (
                    schema.items as {
                        oneOf: { const: string; title: string }[]
                    }
                ).oneOf

                return (
                    <FormikMultiSelect
                        key={uuidv4()}
                        name={name || (schema.title as string)}
                        label={t(schema.title)}
                        options={options}
                    />
                )
            case 'boolean':
                return (
                    <FormikCheckbox
                        key={uuidv4()}
                        name={name || (schema.title as string)}
                        label={t(schema.title)}
                    />
                )
            case 'radio':
                return (
                    <FormikRadio
                        key={uuidv4()}
                        name={name || (schema.title as string)}
                        label={t(schema.title)}
                        options={schema.enum as string[]}
                    />
                )
            default:
                return null
        }
    }

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <Form className="flex flex-col gap-4">
                <FormObserver onChange={handleChange} />
                {renderForm(props.jsonSchema)}
                {submitButton ? submitButton(loading) : null}
            </Form>
        </Formik>
    )
}
