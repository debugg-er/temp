import { ClsModule } from 'nestjs-cls'
import { Auth0Strategy } from '@lib/common/guards/authenticate.guard'
import { WinstonModule } from '@lib/common/modules/winston'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { IdentityController } from './identity.controller'
import { IdentityService } from './identity.service'
import { IdentityConfigSchema } from './types/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: IdentityConfigSchema,
        }),
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true, generateId: true },
        }),
        WinstonModule,
    ],
    controllers: [IdentityController],
    providers: [IdentityService, Auth0Strategy],
})
export class IdentityModule {}
