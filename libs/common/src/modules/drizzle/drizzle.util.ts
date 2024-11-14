import { sql } from 'drizzle-orm'
import { PgSelect } from 'drizzle-orm/pg-core'

import { TPagination, TSort } from '@/types/core/query'

// TODO: Fix type here
export function withPagination<T extends PgSelect>(qb: T, pagination: TPagination) {
    let qbOffsetLimit = qb
        .offset(pagination.offset ?? 0)
        .limit(pagination.limit)
        .$dynamic()
    if (pagination.sort) {
        qbOffsetLimit = qbOffsetLimit.orderBy(convertToOrderBy(pagination.sort)) as any
    }
    return qbOffsetLimit
}

export function convertToOrderBy(sort: TSort<string>) {
    const orders = Object.entries(sort).map(([column, ordering]) => column + ' ' + ordering)
    return sql.raw(orders.join(', '))
}
