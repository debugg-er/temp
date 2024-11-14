import { Request, Response } from 'express'
import { ArgumentsHost, ExecutionContext } from '@nestjs/common'

export function isHttp(context: ExecutionContext | ArgumentsHost) {
    return context.getType() === 'http'
}

export function isGraphql(context: ExecutionContext | ArgumentsHost) {
    return context.getType<string>() === 'graphql'
}

export function getRequest(context: ExecutionContext): Request | null {
    if (isHttp(context)) {
        return context.switchToHttp().getRequest()
    }
    if (isGraphql(context)) {
        // const ctx = GqlExecutionContext.create(context)
        // return ctx.getContext().req
    }
    return null
}

export function getResponse(context: ExecutionContext): Response | null {
    if (isHttp(context)) {
        return context.switchToHttp().getResponse()
    }
    if (isGraphql(context)) {
        // const ctx = GqlExecutionContext.create(context)
        // return ctx.getContext().req.res
    }
    return null
}
