import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AppService } from './app.service'

@ApiTags('/')
@Controller('/')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/health-check')
    healthCheck() {
        return this.appService.healthCheck()
    }
}
