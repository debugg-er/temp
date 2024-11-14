import { sql } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export enum ENoteShareScope {
    Read = 'read',
    Write = 'write',
}

const noteShareScopeEnum = pgEnum('NoteShareScope', [ENoteShareScope.Read, ENoteShareScope.Write])

export const noteShares = pgTable('note_shares', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    sharePath: text('share_path').notNull(),
    noteId: uuid('note_id').notNull(),
    scope: noteShareScopeEnum('scope').notNull(),
    expiredAt: timestamp('expired_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    createdBy: uuid('created_by').notNull(),
    updatedBy: uuid('updated_by').notNull(),
})

export type NoteShare = typeof noteShares.$inferSelect
export type NewNoteShare = typeof noteShares.$inferInsert
