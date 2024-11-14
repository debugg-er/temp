import { ClsService } from 'nestjs-cls'
import { Inject, Injectable } from '@nestjs/common'

import { IUserRepository } from '@/types/repositories/IUserRepository'

@Injectable()
export class UserService {
    constructor(
        private readonly clsService: ClsService,
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
    ) {}

    async getAuthenticatedUserProfile() {
        const userId = this.clsService.get('token.id')
        return this.userRepository.findUserProfile(userId)
    }
}
