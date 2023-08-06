'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import useGetParams from 'src/hooks/useGetParams'
import { c } from 'src/utils'

import PaginationButtons from '@/components/Atoms/PaginationButtons/PaginationButtons'

import TableSort from './TableSort/TableSort'

export interface IHeaderItem {
    label: ReactNode
    orderBy?: {
        name: string
    }
}

interface IClickableRow<T> {
    onRowClick: (row: T) => void
    rowData: T
    cells: { content: ReactNode }[]
    className?: string
}

interface ITableProps<T> {
    name?: string
    header: IHeaderItem[]
    rows: (
        | {
              cells: { content: ReactNode }[]
              className?: string
          }
        | IClickableRow<T>
    )[]
    pagination?: boolean
}

const maxRowsOptions = [10, 25, 50, 100]

export default function Table<T>(props: ITableProps<T>) {
    const { name, header, pagination } = props

    const t = useTranslations('Index')

    const [rows, setRows] = useState(props.rows)
    const [maxRows, setMaxRows] = useState(10)

    const queryParams = useGetParams()

    useEffect(() => {
        const newRows = pagination ? props.rows.slice(0, maxRows) : props.rows

        setRows(newRows)
    }, [props.rows, maxRows, setMaxRows, pagination])

    return (
        <div>
            <div className="overflow-auto rounded-lg shadow-md">
                <table
                    style={{
                        borderCollapse: 'collapse',
                        borderStyle: 'hidden',
                        borderSpacing: 0,
                    }}
                    className="w-full rounded-lg text-left text-sm text-gray-500 dark:text-gray-300"
                >
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            {header.map((item, index) => (
                                <th key={index} className="px-3 py-2">
                                    <div className="flex-column flex items-center gap-1 dark:">
                                        {item.label}
                                        {name && item.orderBy && (
                                            <TableSort
                                                name={name}
                                                item={item}
                                                queryParams={queryParams}
                                            />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr
                                className={c(
                                    'border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600',
                                    row.className
                                )}
                                key={index}
                                onClick={() => {
                                    if (!('onRowClick' in row)) return
                                    row.onRowClick?.(row.rowData)
                                }}
                            >
                                {row.cells.map((cell, index) => (
                                    <td key={index} className="px-3 py-2">
                                        {cell.content}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pagination ? (
                <div className="flex w-full justify-between p-4">
                    <div></div>
                    <PaginationButtons />
                    <div>
                        <label
                            htmlFor="countries"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            {t('rows_number')}
                        </label>
                        <select
                            onChange={(e) =>
                                e.target.value &&
                                setMaxRows(Number(e.target.value))
                            }
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            {maxRowsOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
