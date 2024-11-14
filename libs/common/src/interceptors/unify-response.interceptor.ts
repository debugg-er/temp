import { map, Observable } from 'rxjs'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { isHttp } from '@/utils/nest-context'

@Injectable()
export class UnifyResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (!isHttp(context)) return next.handle()

        const start = Date.now()
        return next.handle().pipe(
            map((data) => ({
                executionMs: Date.now() - start,
                data,
            })),
        )
    }
}
