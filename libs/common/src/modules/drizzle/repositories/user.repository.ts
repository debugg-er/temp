import { eq } from 'drizzle-orm'
import { Injectable } from '@nestjs/common'

import { NewUser, User, users } from '@/schemas/user'
import { IUserRepository, TUserProfile } from '@/types/repositories/IUserRepository'

import { BaseRepository } from './base.repository'
import { TransactionManager } from './transaction.manager'

@Injectable()
export class UserRepository extends BaseRepository<User, NewUser, User['id']>(users) implements IUserRepository {
    constructor(readonly transactionManager: TransactionManager) {
        super(transactionManager)
    }
    async createUser(data: NewUser): Promise<User> {
        const [newUser] = await this.transactionManager.getTx().insert(users).values(data)
        return newUser
    }

    async isEmailExists(email: string) {
        const user = await this.transactionManager.getTx().query.users.findFirst({
            where: eq(users.email, email),
            columns: {
                id: true,
            },
        })
        return !!user
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.transactionManager.getTx().query.users.findFirst({
            where: eq(users.email, email),
        })
        return user ?? null
    }

    async findUserProfile(id: string): Promise<TUserProfile | null> {
        const userProfile = await this.transactionManager.getTx().query.users.findFirst({
            columns: {
                id: true,
                email: true,
                avatar: true,
                firstName: true,
                lastName: true,
                settings: true,
                ssoMetadata: true,
                verifiedAt: true,
                updatedAt: true,
            },
            where: eq(users.id, id),
        })
        return userProfile ?? null
    }
}
