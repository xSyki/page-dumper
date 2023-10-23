export const pureUrl = (url: string) => {
    const parsedUrl = new URL(url)

    return parsedUrl.origin + parsedUrl.pathname
}
