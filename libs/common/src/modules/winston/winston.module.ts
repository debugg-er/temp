import { Global, Module } from '@nestjs/common'

import { WinstonLogger } from './winston.logger'
import { WinstonService } from './winston.service'

@Global()
@Module({
    providers: [WinstonService, WinstonLogger],
    exports: [WinstonLogger],
})
export class WinstonModule {}
