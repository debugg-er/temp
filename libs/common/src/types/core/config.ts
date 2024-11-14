import * as Joi from 'joi'

export enum Environment {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
}

export enum LogLevel {
    Fatal = 'fatal',
    Error = 'error',
    Warn = 'warn',
    Info = 'info',
    Debug = 'debug',
    Verbose = 'verbose',
}

export type Config = {
    NODE_ENV: Environment
    LOG_LEVEL: LogLevel

    PG_URL: string
    REDIS_URL: string

    BCRYPT_SALT_ROUND: number

    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GOOGLE_REDIRECT_URI: string

    JWT_PRIVATE_KEY: string
    JWT_PUBLIC_KEY: string

    ACCESS_TOKEN_COOKIE_NAME: string
    COOKIE_DOMAIN: string

    AUTH0_ISSUER_URL: string
    AUTH0_AUDIENCE: string
}

export const ConfigSchema = Joi.object<Config>({
    NODE_ENV: Joi.string()
        .default(Environment.Development)
        .allow(...Object.values(Environment)),
    LOG_LEVEL: Joi.string()
        .allow(...Object.values(LogLevel))
        .default(LogLevel.Debug),
    PG_URL: Joi.string().required(),
    REDIS_URL: Joi.string().required(),
    BCRYPT_SALT_ROUND: Joi.number().default(10),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    GOOGLE_REDIRECT_URI: Joi.string().required(),
    JWT_PRIVATE_KEY: Joi.string().required(),
    JWT_PUBLIC_KEY: Joi.string().required(),
    ACCESS_TOKEN_COOKIE_NAME: Joi.string().default('access_token'),
    COOKIE_DOMAIN: Joi.string().required(),
    AUTH0_ISSUER_URL: Joi.string().required(),
    AUTH0_AUDIENCE: Joi.string().required(),
})
