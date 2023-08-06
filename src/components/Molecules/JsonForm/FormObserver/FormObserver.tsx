import { useEffect } from 'react'
import { useFormikContext } from 'formik'

interface IFormObserverProps<T> {
    onChange?: (values: T) => Promise<void> | void
}

export default function FormObserver<T>(props: IFormObserverProps<T>) {
    const { onChange } = props

    const { values } = useFormikContext<T>()

    useEffect(() => {
        if (onChange) {
            onChange(values)
        }
    }, [values])

    return null
}
