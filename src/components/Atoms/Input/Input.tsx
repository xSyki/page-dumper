interface IInputProps {
    value: string
    onChange: (value: string) => void
    name: string
    label: string
}

export default function Input(props: IInputProps) {
    const { value, onChange, name, label } = props

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                id={name}
                name={name}
                type={name}
                placeholder=""
                autoComplete={name}
                required
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            />
        </div>
    )
}
