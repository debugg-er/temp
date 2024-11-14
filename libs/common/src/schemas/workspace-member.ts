import { pgEnum, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export enum EWorkspaceRole {
    Admin = 'workspace_admin',
    Member = 'workspace_member',
}

const workspaceRoleEnum = pgEnum('WorkspaceRole', [EWorkspaceRole.Admin, EWorkspaceRole.Member])

export const workspaceMembers = pgTable(
    'workspace_members',
    {
        workspaceId: text('workspace_id').notNull(),
        userId: uuid('user_id').notNull(),
        role: workspaceRoleEnum('role').notNull(),
        addedAt: timestamp('added_at', { withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
        removedAt: timestamp('removed_at', { withTimezone: true }),
        addedBy: uuid('added_by').notNull(),
        updatedBy: uuid('updated_by').notNull(),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.workspaceId, table.userId] }),
    }),
)

export type WorkspaceMember = typeof workspaceMembers.$inferSelect
export type NewWorkspaceMember = typeof workspaceMembers.$inferInsert
