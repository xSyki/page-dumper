'use client'

import { ErrorMessage, useFormikContext } from 'formik'
import { c } from 'src/utils'

import CustomSelect from '@/components/Atoms/CustomSelect/CustomSelect'

interface IOption {
    value: string | number
    label: string
}

interface IFormikMultiSelectProps {
    name: string
    label: string
    options: {
        const: string | number
        title: string
    }[]
    placeholder?: string
}

export default function FormikMultiSelect(props: IFormikMultiSelectProps) {
    const { name, label, placeholder } = props

    const { values, setFieldValue } = useFormikContext()

    const options = props.options.map((option) => ({
        value: option.const,
        label: option.title,
    }))

    const getValue = (name: string) => {
        const properties = name.split('.')

        let value = values

        properties.forEach((property) => {
            value = (value as Record<string, string[]>)[property]
        })

        return (value as string[]).map((option: string) =>
            options.find((o) => o.value === option)
        ) as IOption[]
    }

    const handleOnChange = (newValues: readonly IOption[] | null) => {
        if (!newValues) return

        setFieldValue(
            name,
            newValues.map((option) => option.value)
        )
    }

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <CustomSelect
                isMulti
                classNames={{
                    control: ({ isFocused }) =>
                        c(
                            isFocused
                                ? controlStyles.focus
                                : controlStyles.nonFocus,
                            controlStyles.base
                        ),
                    placeholder: () => placeholderStyles,
                    input: () => selectInputStyles,
                    valueContainer: () => valueContainerStyles,
                    singleValue: () => singleValueStyles,
                    multiValue: () => multiValueStyles,
                    multiValueLabel: () => multiValueLabelStyles,
                    multiValueRemove: () => multiValueRemoveStyles,
                    indicatorsContainer: () => indicatorsContainerStyles,
                    clearIndicator: () => clearIndicatorStyles,
                    indicatorSeparator: () => indicatorSeparatorStyles,
                    dropdownIndicator: () => dropdownIndicatorStyles,
                    menu: () => menuStyles,
                    groupHeading: () => groupHeadingStyles,
                    option: ({ isFocused, isSelected }) =>
                        c(
                            isFocused && optionStyles.focus,
                            isSelected && optionStyles.selected,
                            optionStyles.base
                        ),
                    noOptionsMessage: () => noOptionsMessageStyles,
                }}
                options={options}
                value={getValue(name)}
                placeholder={placeholder}
                onChange={handleOnChange}
            />
            <div className="h-4 text-red-600">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

const controlStyles = {
    base: 'border rounded-lg bg-white hover:cursor-pointer bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 border',
    focus: 'ring-primary-600 border-primary-600 dark:border-blue-500 dark:ring-blue-500',
    nonFocus: '',
}
const placeholderStyles = ''
const selectInputStyles = ''
const valueContainerStyles = ''
const singleValueStyles = ''
const multiValueStyles = ''
const multiValueLabelStyles = ''
const multiValueRemoveStyles = ''
const indicatorsContainerStyles = ''
const clearIndicatorStyles = ''
const indicatorSeparatorStyles = ''
const dropdownIndicatorStyles = ''
const menuStyles = ''
const groupHeadingStyles = ''
const optionStyles = {
    base: '',
    focus: '',
    selected: '',
}
const noOptionsMessageStyles = ''
