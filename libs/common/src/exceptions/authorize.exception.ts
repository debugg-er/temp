import { UnauthorizedException } from '@nestjs/common'

export namespace AuthorizeException {
    export class MissingCredential extends UnauthorizedException {
        constructor() {
            super('Missing credential. Please provide credential in Authorization header or cookie.')
        }
    }
    export class InvalidAuthorizationHeaderFormat extends UnauthorizedException {
        constructor() {
            super(
                'Invalid authorization header format. the format of authorization header is "Authorization: <auth-scheme> <authorization-parameters>".',
            )
        }
    }
    export class UnsupportedAuthScheme extends UnauthorizedException {
        constructor() {
            super('Unsupported auth scheme.')
        }
    }
    export class InvalidAccessToken extends UnauthorizedException {
        constructor() {
            super('Invalid access token.')
        }
    }
}
