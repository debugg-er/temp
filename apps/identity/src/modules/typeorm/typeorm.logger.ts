import { Logger } from 'typeorm'
import { WinstonLogger } from '@lib/common/modules/winston'

export class TypeOrmLogger implements Logger {
    constructor(private readonly logger: WinstonLogger) {}

    logQuery(query: string, parameters?: any[]) {
        let message = `query: ${query}`
        if (parameters) {
            message += `, parameters: [${parameters.join(', ')}]`
        }
        this.logger.debug(message)
    }
    logQueryError(error: string | Error, query: string, parameters?: any[]) {
        this.logQuery(query, parameters)
        this.logger.error(error)
    }
    logQuerySlow(time: number, query: string, parameters?: any[]) {
        this.logQuery(query, parameters)
        this.logger.log(time)
    }
    logSchemaBuild() {
        throw new Error('Method not implemented.')
    }
    logMigration() {
        throw new Error('Method not implemented.')
    }
    log(level: 'log' | 'info' | 'warn', message: any) {
        switch (level) {
            case 'log':
                return this.logger.debug(message)
            case 'info':
                return this.logger.log(message)
            case 'warn':
                return this.logger.warn(message)
        }
    }
}
