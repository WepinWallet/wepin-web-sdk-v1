import { OAUTH2 } from '../const/Provider';
export interface ILoginOauth2Params {
    provider: (typeof OAUTH2)[number];
    withLogout?: boolean;
}
export interface ILoginIdTokenParams {
    token: string;
    sign: string;
}
export interface ILoginAccessTokenParams extends ILoginIdTokenParams {
    provider: 'naver' | 'discord';
}
