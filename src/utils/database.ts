import { ParsedQs } from 'qs'

export const getDatabaseOrderByQuery = (
    properties: string[],
    value?: ParsedQs | string | string[] | undefined | ParsedQs[],
    defaultValue?: Record<string, unknown>
) => {
    const defaultReturn = { orderBy: defaultValue } || {}

    if (
        !value ||
        typeof value === 'string' ||
        Array.isArray(value) ||
        !('orderBy' in value)
    )
        return defaultReturn

    if (
        !value.orderBy ||
        typeof value.orderBy === 'string' ||
        Array.isArray(value.orderBy)
    )
        return defaultReturn

    for (const key in value.orderBy) {
        if (properties.includes(key)) {
            if (value.orderBy[key] === 'asc' || value.orderBy[key] === 'desc') {
                return {
                    orderBy: {
                        [key]: value.orderBy[key],
                    },
                }
            }
        }
    }

    return defaultReturn
}
