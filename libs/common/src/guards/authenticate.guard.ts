import { passportJwtSecret } from 'jwks-rsa'
import { Strategy } from 'passport-jwt'
import { Metadata } from '@grpc/grpc-js'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'

import { TAuth0Config } from '@lib/core/types/config'

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy) {
    constructor(
        readonly configService: ConfigService<TAuth0Config, true>,
        // readonly clsService: ClsService<ClsConfig>,
    ) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${configService.getOrThrow('AUTH0_ISSUER_URL')}.well-known/jwks.json`,
            }),

            jwtFromRequest: ({ args: [_, metadata] }) => {
                metadata = metadata as Metadata
                const [auth] = metadata.get('authorization')
                const [__, token] = auth.split(' ')
                // console.log(token)
                return token
            },
            audience: configService.getOrThrow('AUTH0_AUDIENCE'),
            issuer: `${configService.getOrThrow('AUTH0_ISSUER_URL')}`,
            algorithms: ['RS256'],
        })
    }

    validate(payload: any): unknown {
        return payload
    }
}

@Injectable()
export class Auth0Guard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext): any {
        return context.switchToRpc()
    }
}
