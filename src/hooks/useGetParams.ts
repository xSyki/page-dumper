import { useSearchParams } from 'next/navigation'
import qs from 'qs'

export default function useGetParams() {
    const searchParams = useSearchParams()
    const queryParams = qs.parse(searchParams.toString())

    return queryParams
}
