import qs from 'qs'

export const getSearchParams = (searchParams?: {
    [key: string]: string | string[] | undefined
}) => {
    return searchParams
        ? qs.parse(
              `${Object.keys(searchParams)
                  .filter((key) => searchParams[key] !== undefined)
                  .map((key) => {
                      return `${key}=${searchParams[key]}`
                  })
                  .join('&')}`
          )
        : undefined
}
