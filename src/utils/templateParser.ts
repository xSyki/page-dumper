export function templateParser(
    template: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: Record<string, Record<string, any>>
): string {
    let output = template
    const regex = /\{{(.*?)\}}/g

    let match
    while ((match = regex.exec(template))) {
        const [object, property] = match[0]
            .replaceAll('{', '')
            .replaceAll('}', '')
            .trim()
            .split('.')

        const value = context?.[object]?.[property]

        if (value != null) {
            output = output.replace(match[0], String(value))
        }
    }

    return output
}
