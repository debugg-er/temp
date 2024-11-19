import { Repository } from 'typeorm'
import { Global, Module, Type } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserRepository } from './user.repository'
import { UserEntity } from '../entities/user.entity'
import { TIdentityConfig } from '../types/config'

const repositories: Type<Repository<any>>[] = [UserRepository]
const entities = [UserEntity]

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService<TIdentityConfig>) => ({
                type: 'postgres',
                url: configService.get('PG_URL'),
                logging: 'all',
                entities: entities
            }),
        }),
        TypeOrmModule.forFeature(entities),
    ],
    providers: repositories,
    exports: repositories,
})
export class RepositoryModule {}
