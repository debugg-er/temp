import Joi from 'joi'

import { Environment } from '../enums/env'
import { LogLevel } from '../enums/log'

export type TAppConfig = {
    ENV: Environment
}
export const AppConfigSchema = Joi.object<TAppConfig>({
    ENV: Joi.string()
        .default(Environment.Development)
        .allow(...Object.values(Environment)),
})

export type TWinstonConfig = {
    LOG_LEVEL: LogLevel
}
export const WinstonConfigSchema = Joi.object<TWinstonConfig>({
    LOG_LEVEL: Joi.string()
        .allow(...Object.values(LogLevel))
        .default(LogLevel.Debug),
})

export type TAuth0Config = {
    AUTH0_ISSUER_URL: string
    AUTH0_AUDIENCE: string
}
export const Auth0ConfigSchema = Joi.object<TAuth0Config>({
    AUTH0_ISSUER_URL: Joi.string().required(),
    AUTH0_AUDIENCE: Joi.string().required(),
})

export type TDrizzleConfig = {
    PG_URL: string
}
export const DrizzleConfigSchema = Joi.object<TDrizzleConfig>({
    PG_URL: Joi.string().required(),
})
