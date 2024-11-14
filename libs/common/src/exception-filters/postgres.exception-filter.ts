import { Response } from 'express'
import { PostgresError as EPgError } from 'pg-error-enum'
import { PostgresError } from 'postgres'
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'

@Catch(PostgresError)
export class PostgresExceptionFilter implements ExceptionFilter {
    catch(exception: PostgresError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        if (exception.code === EPgError.T_R_SERIALIZATION_FAILURE) {
            return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                code: 'ConcurrentException',
                message: 'Concurrent updates, please try again later',
            })
        }

        throw exception
    }
}
