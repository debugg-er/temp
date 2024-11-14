import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Config } from '@/types/core/config'

@Injectable()
export class BcryptService {
    constructor(private readonly configService: ConfigService<Config>) {}

    public hash(data: string): Promise<string> {
        const saltRound = this.configService.get('BCRYPT_SALT_ROUND')
        return bcrypt.hash(data, +saltRound)
    }

    public verify(data: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(data, hashed)
    }
}
