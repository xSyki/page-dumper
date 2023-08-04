'use client'

import { useEffect, useState } from 'react'
import { Company } from '@prisma/client'
import { useTranslations } from 'next-intl'

import Table from '@/components/Molecules/Table/Table'

interface ICompaniesProps {
    companies: Company[]
}

export default function Companies(props: ICompaniesProps) {
    const [companies, setCompanies] = useState<Company[]>(props.companies)

    const t = useTranslations('AdminPage')

    useEffect(() => {
        setCompanies(props.companies)
    }, [props.companies])

    return (
        <>
            <Table
                name="companies"
                header={[
                    {
                        label: t('created_at'),
                    },
                    {
                        label: t('name'),
                        orderBy: {
                            name: 'name',
                        },
                    },
                    {
                        label: t('nip'),
                        orderBy: {
                            name: 'nip',
                        },
                    },
                    {
                        label: t('address'),
                    },
                    {
                        label: t('email'),
                        orderBy: {
                            name: 'email',
                        },
                    },
                ]}
                rows={companies.map((company) => ({
                    cells: [
                        {
                            content: new Date(company.createdAt)
                                .toISOString()
                                .split('T')[0],
                        },
                        {
                            content: company.name,
                            orderBy: {
                                name: 'name',
                            },
                        },
                        {
                            content: company.nip,
                            orderBy: {
                                name: 'nip',
                            },
                        },
                        {
                            content: (
                                <div>
                                    <p>
                                        {company.postalCode} {company.city}
                                    </p>
                                    <p>
                                        {company.street}
                                        {company.houseNumber}
                                    </p>
                                    <p>{company.country}</p>
                                </div>
                            ),
                        },
                        {
                            content: company.email,
                            orderBy: {
                                name: 'email',
                            },
                        },
                    ],
                }))}
            />
        </>
    )
}
