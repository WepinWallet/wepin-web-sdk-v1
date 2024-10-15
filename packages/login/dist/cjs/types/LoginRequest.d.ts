import { LoginProviders } from '@wepin/common';
import { LoginErrorResult } from './LoginResult.js';
export interface ILoginOauth2Params {
    provider: LoginProviders;
    withLogout?: boolean;
}
export interface ILoginIdTokenParams {
    token: string;
    sign?: string;
}
export interface ILoginAccessTokenParams extends ILoginIdTokenParams {
    provider: string;
}
export interface ISendVerifyEmailParams extends Omit<LoginErrorResult, 'error'> {
    email: string;
}
