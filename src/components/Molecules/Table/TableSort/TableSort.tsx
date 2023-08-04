'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import qs, { ParsedQs } from 'qs'
import { c } from 'src/utils'

import ArrowDownIcon from '@/assets/icons/caret-down.svg'
import ArrowUpIcon from '@/assets/icons/caret-up.svg'

import { IHeaderItem } from '../Table'

interface ITableSortProps {
    name: string
    item: IHeaderItem
    queryParams: ParsedQs
}

export default function TableSort(props: ITableSortProps) {
    const { name, item, queryParams } = props

    const pathname = usePathname()

    const queryProperty = queryParams?.[name]

    if (!item?.orderBy?.name) return null

    const isArrowActive = (order: 'asc' | 'desc') => {
        if (
            !queryProperty ||
            typeof queryProperty === 'string' ||
            Array.isArray(queryProperty) ||
            !('orderBy' in queryProperty)
        )
            return

        return (
            (queryProperty.orderBy as unknown as Record<string, string>)?.[
                item.orderBy?.name as string
            ] === order
        )
    }

    return (
        <div>
            <Link
                href={`${pathname}?${qs.stringify({
                    ...queryParams,
                    [name]: { orderBy: { [item.orderBy.name]: 'asc' } },
                })}`}
            >
                <ArrowUpIcon
                    className={c(
                        'hover:color-gray-300 h-3 w-3 flex-shrink-0 fill-gray-400 text-gray-500 transition duration-75 hover:fill-gray-300 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
                        isArrowActive('asc') && 'fill-gray-50'
                    )}
                />
            </Link>
            <Link
                href={{
                    pathname,
                    query: qs.stringify({
                        ...queryParams,
                        [name]: { orderBy: { [item.orderBy?.name]: 'desc' } },
                    }),
                }}
            >
                <ArrowDownIcon
                    className={c(
                        'hover:color-gray-300 h-3 w-3 flex-shrink-0 fill-gray-400 text-gray-500 transition duration-75 hover:fill-gray-300 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
                        isArrowActive('desc') && 'fill-gray-50'
                    )}
                />
            </Link>
        </div>
    )
}
