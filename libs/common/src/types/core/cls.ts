import { ClsStore as NativeClsStore } from 'nestjs-cls'

import { TokenPayload } from './token'

export interface ClsConfig extends NativeClsStore {
    token: TokenPayload
    device: {
        ip?: string
        userAgent?: string
    }
}
