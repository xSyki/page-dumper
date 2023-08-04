'use client'

import { ErrorMessage, Field } from 'formik'
import { c } from 'src/utils'

interface IInputProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
    type?: string
}

export default function FormikInput(props: IInputProps) {
    const { name, label, placeholder, required, type } = props

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <Field
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                className={c(
                    'focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm',
                    type === 'checkbox' && 'w-max'
                )}
                type={type}
            />
            <div className="h-4 text-red-600">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}
