import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const userSessions = pgTable('user_sessions', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    token: text('token').notNull(),
    expiredAt: timestamp('expired_at', { withTimezone: true }).notNull(),
    loginAt: timestamp('login_at', { withTimezone: true }).notNull(),
    ip: text('ip'),
    userAgent: text('user_agent'),
    userId: uuid('user_id').notNull(),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
})

export type UserSession = typeof userSessions.$inferSelect
export type NewUserSession = typeof userSessions.$inferInsert
