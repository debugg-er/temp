import { sql } from 'drizzle-orm'
import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    email: text('email').notNull(),
    password: text('password'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    avatar: text('avatar'),
    ssoMetadata: jsonb('sso_metadata'),
    settings: jsonb('settings'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    deactivatedAt: timestamp('deactivated_at', { withTimezone: true }),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
