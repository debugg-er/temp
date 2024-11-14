export function omit<T extends object, K extends keyof T>(object: T, properties: K[]): Omit<T, K> {
    const newObject = { ...object }
    for (const property of properties) {
        delete newObject[property]
    }
    return newObject
}
