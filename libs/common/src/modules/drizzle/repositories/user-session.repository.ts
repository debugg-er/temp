import { eq } from 'drizzle-orm'
import { Injectable } from '@nestjs/common'

import { NewUserSession, UserSession, userSessions } from '@/schemas/user-session'
import { IUserSessionRepository } from '@/types/repositories/IUserSessionRepository'

import { BaseRepository } from './base.repository'
import { TransactionManager } from './transaction.manager'

@Injectable()
export class UserSessionRepository
    extends BaseRepository<UserSession, NewUserSession, UserSession['id']>(userSessions)
    implements IUserSessionRepository
{
    constructor(readonly transactionManager: TransactionManager) {
        super(transactionManager)
    }

    async getSessionByToken(token: string): Promise<UserSession | null> {
        const session = await this.transactionManager.getTx().query.userSessions.findFirst({
            where: eq(userSessions.token, token),
        })
        return session ?? null
    }

    updateRevokedAt(_token: string, _revokedAt: Date): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
