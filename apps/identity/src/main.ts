import * as path from 'path'
import { ReflectionService } from '@grpc/reflection'
import { WinstonLogger } from '@lib/common/modules/winston'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { IdentityModule } from './identity.module'

// import { AppModule } from '@/app/app.module'

const port = process.env.PORT ?? 8080

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(IdentityModule, {
        transport: Transport.GRPC,
        bufferLogs: true,
        options: {
            url: `0.0.0.0:${port}`,
            package: 'identity',
            protoPath: [
                path.join(__dirname, '../../../proto/identity/user.proto'),
                path.join(__dirname, '../../../proto/identity/workspace.proto'),
            ],
            onLoadPackageDefinition: (pkg, server) => {
                new ReflectionService(pkg).addToServer(server)
            },
        },
    })
    const logger = await app.resolve(WinstonLogger)
    app.useLogger(logger)

    if ((module as any).hot) {
        ;(module as any).hot.accept()
        ;(module as any).hot.dispose(() => app.close())
    }

    await app.listen()
}
bootstrap()
