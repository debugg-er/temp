import * as fs from 'fs'
import { ClsModule } from 'nestjs-cls'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { NoteModule } from './note/note.module'
import { NotebookModule } from './notebook/notebook.module'
import { UserModule } from './user/user.module'
import { WorkspaceModule } from './workspace/workspace.module'

import { RedisCacheModule } from '@/cache/redis-cache.module'
import { ClientExceptionFilter } from '@/exception-filters/client.exception-filter'
import { PostgresExceptionFilter } from '@/exception-filters/postgres.exception-filter'
import { UnknownExceptionFilter } from '@/exception-filters/unknown.exception-filter'
import { ValidationException } from '@/exceptions/validation.exception'
import { Auth0Strategy } from '@/guards/authenticate.guard'
import { DrizzleModule } from '@/modules/drizzle/drizzle.module'
import { WinstonModule } from '@/modules/winston/winston.module'
import { Config, ConfigSchema } from '@/types/core/config'

@Module({
    imports: [
        // Global modules
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: ConfigSchema,
        }),
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true, generateId: true },
        }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<Config>) => ({
                privateKey: fs.readFileSync(configService.getOrThrow('JWT_PRIVATE_KEY')),
                publicKey: fs.readFileSync(configService.getOrThrow('JWT_PUBLIC_KEY')),
                signOptions: {
                    algorithm: 'RS256',
                },
            }),
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        WinstonModule,
        DrizzleModule,
        RedisCacheModule,

        // App modules
        UserModule,
        WorkspaceModule,
        NotebookModule,
        NoteModule,
    ],
    controllers: [AppController],
    providers: [
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: UnifyResponseInterceptor,
        // },
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: HTTPLoggerInterceptor,
        // },
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: GraphQLLoggerInterceptor,
        // },
        {
            provide: APP_FILTER,
            useClass: UnknownExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: PostgresExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: ClientExceptionFilter,
        },
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                exceptionFactory: (errors) =>
                    new ValidationException.ValidationFail(
                        errors.flatMap((err) => Object.values(err.constraints ?? [])).join(', '),
                    ),
            }),
        },

        Auth0Strategy,
        AppService,
    ],
})
export class AppModule {}
