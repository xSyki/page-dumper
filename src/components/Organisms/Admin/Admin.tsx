'use client'

import Analytics, {
    IChartProps,
} from '@/components/Molecules/Analytics/Analytics'

interface IAdminProps {
    charts: IChartProps[]
}

export default function Admin(props: IAdminProps) {
    const { charts } = props

    return (
        <>
            <Analytics charts={charts} />
        </>
    )
}
