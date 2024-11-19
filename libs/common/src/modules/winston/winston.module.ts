import { Global, Module } from '@nestjs/common'

import { WinstonLogger } from './winston.logger'
import { WinstonService } from './winston.service'

@Global()
@Module({
    providers: [WinstonService, WinstonLogger],
    exports: [WinstonService, WinstonLogger],
})
export class WinstonModule {}
