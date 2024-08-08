export interface FBToken {
    idToken: string;
    refreshToken: string;
}
export type providerType = 'google' | 'apple' | 'email' | 'discord' | 'naver' | 'external_token';
export interface LoginResult {
    provider: providerType;
    token: FBToken;
}
