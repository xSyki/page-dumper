'use client'

import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

export interface IChart {
    id: string
    type?:
        | 'line'
        | 'area'
        | 'bar'
        | 'histogram'
        | 'pie'
        | 'donut'
        | 'radialBar'
        | 'scatter'
        | 'bubble'
        | 'heatmap'
        | 'treemap'
        | 'boxPlot'
        | 'candlestick'
        | 'radar'
        | 'polarArea'
        | 'rangeBar'
    series?: ApexOptions['series']
    width?: string | number
    height?: string | number
    options?: ApexOptions
}

export type IChartProps = Partial<IChart>

interface IAnalyticsProps {
    charts: IChartProps[]
}

export default function Analytics(props: IAnalyticsProps) {
    const { charts } = props

    return (
        <section className="grid grid-cols-2">
            {charts?.map((chart: IChartProps) => (
                <Chart key={chart.id} {...chart} />
            ))}
        </section>
    )
}
