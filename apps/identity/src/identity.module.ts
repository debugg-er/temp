import { ClsModule } from 'nestjs-cls'
import { Auth0Strategy } from '@lib/common/guards/authenticate.guard'
import { WinstonModule } from '@lib/common/modules/winston'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UserController } from './controllers/user.controller'
import { IdentityController } from './identity.controller'
import { IdentityService } from './identity.service'
import { RepositoryModule } from './repositories/repository.module'
import { UserService } from './services/user.service'
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
        RepositoryModule,
        WinstonModule,
    ],
    controllers: [IdentityController, UserController],
    providers: [IdentityService, Auth0Strategy, UserService],
})
export class IdentityModule {}
