import { Field } from 'formik'
import { useTranslations } from 'next-intl'

interface IFormikRadioProps {
    label: string
    options: string[]
    name: string
}

export default function FormikRadio(props: IFormikRadioProps) {
    const { label, options, name } = props

    const t = useTranslations('Forms')

    return (
        <div className="flex flex-col gap-2">
            <div className="block text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </div>
            <div className="flex flex-col gap-1">
                {options.map((option) => (
                    <label className="flex gap-2" key={option}>
                        <Field type="radio" name={name} value={option} />
                        {t(option)}
                    </label>
                ))}
            </div>
        </div>
    )
}
