import { Injectable } from '@nestjs/common'

import { Payload } from '../proto/user'
import { UserRepository } from '../repositories/user.repository'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async storeUser(data: Payload) {
        await this.userRepository.insert({
            email: data.user.email,
            lastName: data.user.userId,
        })
    }
}
