import { Repository } from 'typeorm'
import { WinstonLogger, WinstonService } from '@lib/common/modules/winston'
import { Global, Module, Type } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmLogger } from './typeorm.logger'
import { UserEntity } from '../../entities/user.entity'
import { UserRepository } from '../../repositories/user.repository'
import { IdentityConfigService } from '../../types/config'

const repositories: Type<Repository<any>>[] = [UserRepository]
const entities = [UserEntity]

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService, WinstonService],
            useFactory: (configService: IdentityConfigService, winstonService: WinstonService) => ({
                type: 'postgres',
                logger: new TypeOrmLogger(new WinstonLogger(TypeOrmLogger.prototype, winstonService)),
                url: configService.get('PG_URL'),
                logging: 'all',
                entities: entities,
            }),
        }),
        TypeOrmModule.forFeature(entities),
    ],
    providers: repositories,
    exports: repositories,
})
export class TypeOrmReposirotyModule {}
