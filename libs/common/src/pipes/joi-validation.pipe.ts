import * as Joi from 'joi'
import { Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common'

import { ValidationException } from '@/exceptions/validation.exception'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    static readonly DEFAULT_VALIDATION_OPTIONS: Joi.AsyncValidationOptions = {
        abortEarly: false,
    }

    constructor(
        private schema: Joi.ObjectSchema,
        private options?: Joi.AsyncValidationOptions,
    ) {}

    async transform(value: any) {
        try {
            return await this.schema.validateAsync(value, {
                ...JoiValidationPipe.DEFAULT_VALIDATION_OPTIONS,
                ...this.options,
            })
        } catch (err) {
            if (err instanceof Joi.ValidationError) {
                const errorMessages = err.details.map((detail) => detail.message)
                throw new ValidationException.ValidationFail(errorMessages.join(', '))
            }
            throw new InternalServerErrorException('Validation Error', err)
        }
    }
}
