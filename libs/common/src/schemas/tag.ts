import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const tags = pgTable('tags', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    color: text('color'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    createdBy: uuid('created_by').notNull(),
    updatedBy: uuid('updated_by').notNull(),
    workspaceId: text('workspace_id').notNull(),
})

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert
