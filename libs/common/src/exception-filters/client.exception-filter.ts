import { Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import * as exception from '@nestjs/common/exceptions'

import { WinstonLogger } from '@/modules/winston/winston.logger'
import { isGraphql, isHttp } from '@/utils/nest-context'

@Catch(
    exception.BadRequestException,
    exception.UnauthorizedException,
    exception.NotFoundException,
    exception.ForbiddenException,
    exception.NotAcceptableException,
    exception.RequestTimeoutException,
    exception.ConflictException,
    exception.GoneException,
    exception.HttpVersionNotSupportedException,
    exception.PayloadTooLargeException,
    exception.UnsupportedMediaTypeException,
    exception.UnprocessableEntityException,
    exception.NotImplementedException,
    exception.ImATeapotException,
    exception.MethodNotAllowedException,
)
export class ClientExceptionFilter implements ExceptionFilter {
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
        const status = exception.getStatus()

        this.logger.debug(exception.stack)

        response.status(status).json({
            code: exception.constructor.name,
            message: exception.message,
        })
    }

    handleGraphql(exception: HttpException, __: ArgumentsHost) {
        this.logger.debug(exception.stack)
    }
}
