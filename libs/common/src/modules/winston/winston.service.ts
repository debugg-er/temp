import colors from 'colors/safe'
import { ClsService } from 'nestjs-cls'
import { createLogger, format, Logger, transports } from 'winston'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { LogLevel } from '@lib/core/enums/log'
import { TWinstonConfig } from '@lib/core/types/config'

@Injectable()
export class WinstonService {
    private readonly loggerInstance: Logger

    constructor(
        private readonly configService: ConfigService<TWinstonConfig>,
        private readonly clsService: ClsService,
    ) {
        colors.enable()
        colors.setTheme({
            [LogLevel.Fatal]: ['black', 'bgRed'],
            [LogLevel.Error]: 'red',
            [LogLevel.Warn]: 'yellow',
            [LogLevel.Info]: 'green',
            [LogLevel.Debug]: 'blue',
            [LogLevel.Verbose]: 'grey',
        })

        this.loggerInstance = createLogger({
            level: this.configService.getOrThrow('LOG_LEVEL'),
            levels: {
                [LogLevel.Fatal]: 0,
                [LogLevel.Error]: 1,
                [LogLevel.Warn]: 2,
                [LogLevel.Info]: 3,
                [LogLevel.Debug]: 4,
                [LogLevel.Verbose]: 5,
            },
            transports: [this.getConsoleTransport()],
        })
    }

    getLogger(context = '') {
        return this.loggerInstance.child({ context })
    }

    private getConsoleTransport() {
        const bracket = (str: unknown) => `[${str}]`
        return new transports.Console({
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf((params) => {
                    const colerationId = colors.yellow(bracket(this.getColleratedId().padEnd(8, ' ')))
                    const level = colors.bold(colors[params.level](params.level.toUpperCase().padEnd(7, ' ')))
                    const context = colors.yellow(bracket(params.context))
                    const message = colors[params.level](params.message)

                    return `${params.timestamp} ${colerationId} ${level} ${context} - ${message}`
                }),
            ),
        })
    }
    private getColleratedId() {
        return this.clsService.isActive() ? this.clsService.getId() : '-'
    }
}
