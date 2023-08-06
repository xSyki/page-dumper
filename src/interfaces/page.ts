export interface IPageProps<T = undefined> {
    params: {
        locale: string
    } & T
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}
