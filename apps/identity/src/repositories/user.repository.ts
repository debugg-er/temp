import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { UserEntity } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        repository: Repository<UserEntity>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner)
    }
}
