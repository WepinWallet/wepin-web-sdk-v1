import { providerType } from '@wepin/common';
export interface FBToken {
    idToken: string;
    refreshToken: string;
}
export interface LoginResult {
    provider: providerType;
    token: FBToken;
}
export interface LoginErrorResult {
    provider?: providerType;
    error: string;
    idToken?: string;
    accessToken?: string;
}
