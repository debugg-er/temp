import { RedisModule } from '@liaoliaots/nestjs-redis'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthCacheStore } from './stores/auth.store'

@Global()
@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                config: {
                    url: configService.get('REDIS_URL'),
                },
            }),
        }),
    ],
    providers: [AuthCacheStore],
    exports: [AuthCacheStore],
})
export class RedisCacheModule {}
