export const c = (...classNames: (string | boolean | null | undefined)[]) => {
    return classNames.reduce<string>((total, className, index) => {
        if (className && typeof className !== 'boolean') {
            return index === 0 ? className : total + ' ' + className
        }

        return total
    }, '')
}
