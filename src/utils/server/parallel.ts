export async function parallel<T>(
    promises: Promise<T>[],
    limit: number = 10
): Promise<T[]> {
    const pagination: Promise<T>[][] = promises.reduce(
        (acc: Promise<T>[][], curr, i) => {
            if (!(i % limit)) {
                acc.push(promises.slice(i, i + limit))
            }
            return acc
        },
        []
    )

    const results: T[] = []

    for (const promise of pagination) {
        results.push(...(await Promise.all(promise)))
    }

    return results
}
