import * as crypto from 'node:crypto'

import { ALPHANUMERIC } from '@/constants/charset'

export function generateString(length: number, charset = ALPHANUMERIC) {
    if (length < 0) {
        throw new Error('length must be positive value')
    }
    if (charset.length > 256) {
        throw new Error("charset can't have more than 256 tokens")
    }

    let result = ''
    const bytes = crypto.randomBytes(length)
    for (let i = 0; i < length; i++) {
        result += charset[bytes[i] % charset.length]
    }
    return result
}
