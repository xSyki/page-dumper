import { Offer } from '@prisma/client'

import { IChartProps } from '@/components/Molecules/Analytics/Analytics'

export default function getOffersWithDate(offers: Offer[]): IChartProps {
    const dates = Array.from(
        new Set(
            offers
                .sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                )
                .map((offer) => offer.createdAt.toISOString().split('T')[0])
        )
    )

    return {
        series: [
            {
                name: 'Users',
                data: dates.map(
                    (date) =>
                        offers.filter(
                            (offer) =>
                                new Date(offer.createdAt)
                                    .toISOString()
                                    .split('T')[0] === date
                        ).length
                ),
            },
        ],
        type: 'bar',
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top',
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ['#304758'],
                },
            },
            xaxis: {
                categories: dates,
                position: 'top',
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        },
                    },
                },
                tooltip: {
                    enabled: true,
                },
            },
            yaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                },
            },
        },
    }
}
