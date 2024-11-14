import { User } from '@/schemas/user'

export function getUserFullName(user: User) {
    return [user.firstName, user.lastName].filter(Boolean).join(' ')
}
