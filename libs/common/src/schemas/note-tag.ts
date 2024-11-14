import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

export const noteTags = pgTable(
    'note_tags',
    {
        noteId: uuid('note_id').notNull(),
        tagId: uuid('tag_id').notNull(),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.noteId, table.tagId] }),
    }),
)

export type NoteTag = typeof noteTags.$inferSelect
export type NewNoteTag = typeof noteTags.$inferInsert
