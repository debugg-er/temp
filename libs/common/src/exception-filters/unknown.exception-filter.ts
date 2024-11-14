import { Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'

import { WinstonLogger } from '@/modules/winston/winston.logger'
import { isGraphql, isHttp } from '@/utils/nest-context'

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: WinstonLogger) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        if (isHttp(host)) {
            return this.handleHttp(exception, host)
        }
        if (isGraphql(host)) {
            return this.handleGraphql(exception, host)
        }
    }

    handleHttp(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        this.logger.error(exception.stack)

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: 'InternalServerError',
            message: 'Internal Server Error',
        })
    }

    handleGraphql(exception: HttpException, __: ArgumentsHost) {
        this.logger.error(exception.stack)
    }
}
