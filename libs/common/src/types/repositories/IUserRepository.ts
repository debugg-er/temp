import { NewUser, User } from '@/schemas/user'

import { IBaseRepository } from './IBaseRepository'

export type TUserProfile = Pick<
    User,
    'id' | 'email' | 'avatar' | 'firstName' | 'lastName' | 'settings' | 'ssoMetadata' | 'verifiedAt' | 'updatedAt'
>

export const IUserRepository = Symbol('IUserRepository')
export interface IUserRepository extends IBaseRepository<User, NewUser, User['id']> {
    isEmailExists(email: string): Promise<boolean>
    findUserByEmail(email: string): Promise<User | null>
    findUserProfile(id: string): Promise<TUserProfile | null>
}
