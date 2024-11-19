import Joi from 'joi'
import {
    Auth0ConfigSchema,
    DrizzleConfigSchema,
    TAuth0Config,
    TDrizzleConfig,
    TWinstonConfig,
    WinstonConfigSchema,
} from '@lib/core/types/config'
import { ConfigService } from '@nestjs/config'

export type TIdentityConfig = TDrizzleConfig & TAuth0Config & TWinstonConfig

export const IdentityConfigSchema: Joi.ObjectSchema<TIdentityConfig> = Joi.object()
    .concat(DrizzleConfigSchema)
    .concat(Auth0ConfigSchema)
    .concat(WinstonConfigSchema)

export type IdentityConfigService = ConfigService<TIdentityConfig, true>
