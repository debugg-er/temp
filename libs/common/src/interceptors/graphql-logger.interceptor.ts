import { ClsService } from 'nestjs-cls'
import * as util from 'util'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { WinstonLogger } from '@/modules/winston/winston.logger'
import { ClsConfig } from '@/types/core/cls'
import { getRequest, getResponse, isGraphql } from '@/utils/nest-context'

@Injectable()
export class GraphQLLoggerInterceptor implements NestInterceptor {
    private readonly LOG_TEMPLATE = `requester=%s; query=%s; variables=%s; elapsed=%sms`

    constructor(
        private readonly clsService: ClsService<ClsConfig>,
        private readonly logger: WinstonLogger,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler) {
        if (!isGraphql(context)) return next.handle()

        const res = getResponse(context)!
        const start = Date.now()

        res.on('close', () => {
            const requester = this.clsService.get('token.id')
            const {
                body: { query, variables },
            } = getRequest(context)!

            const elapsed = Date.now() - start
            this.logger.debug(util.format(this.LOG_TEMPLATE, requester, query, variables, elapsed))
        })
        return next.handle()
    }
}
