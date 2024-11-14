import { AsyncLocalStorage } from 'async_hooks'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { Injectable } from '@nestjs/common'

import * as schema from '@/schemas/schema'
import { IsolationLevel, ITransactionManager } from '@/types/repositories/ITransactionManager'

import { DrizzleService } from '../drizzle.service'

const DbAsyncStore = new AsyncLocalStorage<PostgresJsDatabase<typeof schema>>()

@Injectable()
export class TransactionManager implements ITransactionManager {
    constructor(private readonly drizzleService: DrizzleService) {}

    run<T>(action: () => Promise<T>, options?: { isolationLevel?: IsolationLevel }): Promise<T> {
        const db = this.drizzleService.getDb()
        return db.transaction((tx) => DbAsyncStore.run(tx, action), {
            isolationLevel: options?.isolationLevel ?? 'read committed',
        })
    }

    getTx() {
        const tx = DbAsyncStore.getStore()
        if (tx) return tx
        return this.drizzleService.getDb()
    }
}
