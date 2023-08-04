import { User } from '@prisma/client'

import { IChartProps } from '@/components/Molecules/Analytics/Analytics'

export default function getUsersByRoleChart(users: User[]): IChartProps {
    const roles = Array.from(new Set(users.map((user) => user.role)))

    return {
        series: [
            {
                name: 'Users',
                data: roles.map(
                    (role) => users.filter((user) => user.role === role).length
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
                categories: roles,
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
