import { and, eq, sql } from 'drizzle-orm'
import { PgTableWithColumns } from 'drizzle-orm/pg-core'

import { IBaseRepository } from '@/types/repositories/IBaseRepository'

import { TransactionManager } from './transaction.manager'

export const BaseRepository = <T, TNew, TId>(table: PgTableWithColumns<any>) => {
    return class implements IBaseRepository<T, TNew, TId> {
        constructor(readonly transactionManager: TransactionManager) {}

        async create(data: TNew): Promise<T> {
            const [newRow] = await this.transactionManager
                .getTx()
                .insert(table)
                .values(data as any)
                .returning()
            return newRow as any
        }

        async createMany(data: TNew[]): Promise<T[]> {
            return this.transactionManager.getTx().insert(table).values(data)
        }

        async findById(id: TId): Promise<T | null> {
            const db = this.transactionManager.getTx()
            const whereClause = this.buildIdWhereClause(id)
            const [firstRow] = await db.select().from(table).where(whereClause).limit(1)
            return (firstRow ?? null) as T | null
        }
        async exists(id: TId): Promise<boolean> {
            const db = this.transactionManager.getTx()
            const whereClause = this.buildIdWhereClause(id)
            const [firstRow] = await db
                .select({ existed: sql`1` })
                .from(table)
                .where(whereClause)
                .limit(1)
            return !!firstRow
        }

        buildIdWhereClause(id: TId) {
            if (typeof id === 'object') {
                const conditions = Object.entries(id as any).map(([column, value]) => eq(table[column], value))
                return and(...conditions)
            }
            return eq(table.id, id)
        }
    }
}
