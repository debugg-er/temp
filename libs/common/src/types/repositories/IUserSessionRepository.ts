import { NewUserSession, UserSession } from '@/schemas/user-session'

import { IBaseRepository } from './IBaseRepository'

export const IUserSessionRepository = Symbol('IUserSessionRepository')
export interface IUserSessionRepository extends IBaseRepository<UserSession, NewUserSession, UserSession['id']> {
    getSessionByToken(token: string): Promise<UserSession | null>
    updateRevokedAt(token: string, revokedAt: Date): Promise<void>
}
