import { sql } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export enum ENoteStatus {
    Editable = 'editable',
    Locked = 'locked',
    Archived = 'archived',
}

const noteStatusEnum = pgEnum('NoteStatus', [ENoteStatus.Editable, ENoteStatus.Locked, ENoteStatus.Archived])

export const notes = pgTable('notes', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    title: text('title').notNull(),
    content: text('content').notNull(),
    status: noteStatusEnum('status').default(ENoteStatus.Editable).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdBy: uuid('created_by').notNull(),
    updatedBy: uuid('updated_by').notNull(),
    notebookId: uuid('notebook_id').notNull(),
})

export type Note = typeof notes.$inferSelect
export type NewNote = typeof notes.$inferInsert
