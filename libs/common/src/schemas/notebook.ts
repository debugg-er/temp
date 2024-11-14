import { sql } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const notebooks = pgTable('notebooks', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    title: text('title').notNull(),
    order: integer('order').notNull(),
    workspaceId: text('workspace_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    createdBy: uuid('created_by').notNull(),
    updatedBy: uuid('updated_by').notNull(),
})

export type Notebook = typeof notebooks.$inferSelect
export type NewNotebook = typeof notebooks.$inferInsert
