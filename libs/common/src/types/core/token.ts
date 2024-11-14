export enum TokenType {
    AccessToken = 'access_token',
}

export type TokenPayload = {
    type: TokenType
    id: string
}
