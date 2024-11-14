import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { IdentityService } from './identity.service'

@Controller()
export class IdentityController {
    constructor(private readonly identityService: IdentityService) {}

    @GrpcMethod()
    getHello(): string {
        return this.identityService.getHello()
    }
}
