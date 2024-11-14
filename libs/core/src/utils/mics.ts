export const isNil = (value: any): value is undefined | null => value === null || value === undefined

export function sleep(milliseconds: number) {
    let timeoutId: NodeJS.Timeout
    return {
        promise: new Promise((resolve) => (timeoutId = setTimeout(resolve, milliseconds))),
        cancel: () => clearTimeout(timeoutId),
    }
}
