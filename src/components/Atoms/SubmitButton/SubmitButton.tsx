import LoadingDots from '../LoadingDots/LoadingDots'

interface ISubmitButtonProps {
    label: string
    disabled?: boolean
    loading?: boolean
}

export default function SubmitButton(props: ISubmitButtonProps) {
    const { label, disabled, loading } = props

    return (
        <button
            disabled={disabled}
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4"
            type="submit"
        >
            {loading ? <LoadingDots color="#808080" /> : <p>{label}</p>}
        </button>
    )
}
