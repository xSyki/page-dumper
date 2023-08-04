export interface IPageProps {
    params: {
        locale: string
    }
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}
