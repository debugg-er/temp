import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { TDrizzleConfig } from '@lib/core/types/config'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { WinstonLogger } from '../winston/winston.logger'

import * as schema from '@/schemas/schema'

@Injectable()
export class DrizzleService< {
    private db: PostgresJsDatabase<typeof schema>

    constructor(
        private readonly configService: ConfigService<TDrizzleConfig, true>,
        private readonly logger: WinstonLogger,
    ) {
        const postgresClient = postgres(this.configService.get('PG_URL'))
        this.db = drizzle(postgresClient, {
            schema,
            logger: {
                logQuery: (query, params) => {
                    let log = `query=${query}`
                    if (params) {
                        log += `; params=${params}`
                    }
                    this.logger.debug(log)
                },
            },
        })
    }

    getDb() {
        return this.db
    }
}
