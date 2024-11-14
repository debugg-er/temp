export const OAuthService = Symbol('OAuthService')

export enum SSOProvider {
    Google,
}

export type SSOProfile = {
    id: string
    firstName: string
    lastName: string
    email: string
    emailVerified: boolean
}

export interface ISSOProvider {
    getProfile(code: string): Promise<{ profile: SSOProfile; raw: Record<string, any> }>
}
