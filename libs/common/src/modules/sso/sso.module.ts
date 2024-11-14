import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { SSOFactory } from './sso.factory'

@Module({
    imports: [ConfigModule],
    providers: [SSOFactory],
    exports: [SSOFactory],
})
export class SSOModule {}
