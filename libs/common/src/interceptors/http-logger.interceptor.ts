import { Request, Response } from 'express'
import { ClsService } from 'nestjs-cls'
import * as util from 'util'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { WinstonLogger } from '@/modules/winston/winston.logger'
import { ClsConfig } from '@/types/core/cls'
import { isHttp } from '@/utils/nest-context'

@Injectable()
export class HTTPLoggerInterceptor implements NestInterceptor {
    private readonly LOG_TEMPLATE = `requester=%s; method=%s; pathname=%s; statusCode=%s; elapsed=%sms`

    constructor(
        private readonly clsService: ClsService<ClsConfig>,
        private readonly logger: WinstonLogger,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler) {
        if (!isHttp(context)) return next.handle()

        const response = context.switchToHttp().getResponse<Response>()
        const start = Date.now()
        response.on('close', () => {
            const { method, originalUrl } = context.switchToHttp().getRequest<Request>()
            const { statusCode } = context.switchToHttp().getResponse<Response>()
            const requester = this.clsService.get('token.id')

            const elapsed = Date.now() - start
            this.logger.debug(util.format(this.LOG_TEMPLATE, requester, method, originalUrl, statusCode, elapsed))
        })
        return next.handle()
    }
}
