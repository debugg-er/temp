import { Request } from 'express'
import { ClsService } from 'nestjs-cls'
import { Observable } from 'rxjs'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { ClsConfig } from '@/types/core/cls'

@Injectable()
export class GetDeviceInterceptor implements NestInterceptor {
    constructor(private readonly clsService: ClsService<ClsConfig>) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>()

        const device = {
            ip: req.socket.remoteAddress,
            userAgent: req.headers['user-agent'],
        }
        this.clsService.set('device', device)

        return next.handle()
    }
}
