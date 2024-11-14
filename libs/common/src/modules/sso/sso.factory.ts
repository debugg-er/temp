import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { GoogleSSOProvider } from './providers/google.provider'
import { ISSOProvider, SSOProvider } from './sso.type'

@Injectable()
export class SSOFactory {
    constructor(private readonly configService: ConfigService) {}

    getProvider(provider: SSOProvider): ISSOProvider {
        switch (provider) {
            case SSOProvider.Google:
                return new GoogleSSOProvider({
                    clientId: this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
                    clientSecret: this.configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
                    redirectUri: this.configService.getOrThrow('GOOGLE_REDIRECT_URI'),
                })
            default:
                throw new Error('Not Implemented')
        }
    }
}
