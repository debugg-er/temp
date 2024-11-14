import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const WORKSPACE_ID_LENGTH = 7

export enum EWorkspaceType {
    Personal = 'personal',
    Defined = 'defined',
}

const workspaceTypeEnum = pgEnum('WorkspaceType', [EWorkspaceType.Personal, EWorkspaceType.Defined])

export const workspaces = pgTable('workspaces', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    type: workspaceTypeEnum('type').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: uuid('created_by').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    updatedBy: uuid('updated_by').notNull(),
})

export type Workspace = typeof workspaces.$inferSelect
export type NewWorkspace = typeof workspaces.$inferInsert
