import { Logger } from 'winston'
import { LogLevel } from '@lib/core/enums/log'
import { Inject, Injectable, LoggerService, Scope } from '@nestjs/common'
import { INQUIRER } from '@nestjs/core'

import { WinstonService } from './winston.service'

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLogger implements LoggerService {
    private readonly logger: Logger

    constructor(@Inject(INQUIRER) parentClass: any, winstonService: WinstonService) {
        this.logger = winstonService.getLogger(parentClass?.constructor?.name)
    }

    fatal(message: any) {
        this.logger.log(LogLevel.Fatal, message)
    }
    error(message: any) {
        this.logger.log(LogLevel.Error, message)
    }
    warn(message: any) {
        this.logger.log(LogLevel.Warn, message)
    }
    log(message: any) {
        this.logger.log(LogLevel.Info, message)
    }
    debug(message: any) {
        this.logger.log(LogLevel.Debug, message)
    }
    verbose(message: any) {
        this.logger.log(LogLevel.Verbose, message)
    }
}
