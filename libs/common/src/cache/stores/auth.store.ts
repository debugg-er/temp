import Redis from 'ioredis'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthCacheStore {
    constructor(
        @InjectRedis() private readonly redis: Redis, // or // @InjectRedis(DEFAULT_REDIS_NAMESPACE) private readonly redis: Redis
    ) {}

    async blacklistToken(token: string) {
        const added = await this.redis.sadd('tokenBlacklist', token)
        return added === 1
    }

    async isTokenInBlacklist(token: string) {
        const result = await this.redis.sismember('tokenBlacklist', token)
        return result === 1
    }
}
