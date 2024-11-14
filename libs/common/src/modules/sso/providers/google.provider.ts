import axios, { AxiosInstance } from 'axios'

import { ISSOProvider } from '../sso.type'

export type GoogleSSOConfig = {
    clientId: string
    clientSecret: string
    redirectUri: string
}

export class GoogleSSOProvider implements ISSOProvider {
    private googleHttpClient: AxiosInstance

    constructor(private config: GoogleSSOConfig) {
        this.googleHttpClient = axios.create({
            baseURL: 'https://oauth2.googleapis.com',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    async getProfile(code: string) {
        const {
            data: { id_token },
        } = await this.googleHttpClient.post('/token', {
            code,
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            redirect_uri: this.config.redirectUri,
            grant_type: 'authorization_code',
        })
        const { data: tokenInfo } = await this.googleHttpClient.get('/tokeninfo', {
            params: { id_token },
        })

        return {
            raw: tokenInfo,
            profile: {
                id: tokenInfo.sub,
                firstName: tokenInfo.given_name ?? '',
                lastName: tokenInfo.family_name ?? '',
                email: tokenInfo.email,
                emailVerified: tokenInfo.email_verified === 'true',
            },
        }
    }
}
