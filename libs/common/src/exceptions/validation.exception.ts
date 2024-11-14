import { BadRequestException } from '@nestjs/common'

export namespace ValidationException {
    export class ValidationFail extends BadRequestException {}
}
