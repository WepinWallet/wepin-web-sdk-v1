import { ErrorResponse } from '../api/APITypes';

export declare enum UserJoinStage {
    emailRequire = 1,
    pinRequire = 2,
    complete = 3
}
export declare enum UserState {
    active = 1,
    deleted = 2
}
export interface IAppUser {
    userId: string;
    email: string;
    name: string;
    locale: string;
    currency: string;
    lastAccessDevice: string;
    lastSessionIP: string;
    userJoinStage: UserJoinStage;
    profileImage: string;
    userState: UserState;
    use2FA: number;
}
export interface IProvider {
    isEmailExist: boolean;
    isEmailverified: boolean;
    providerIds: string[];
}
export interface CheckEmailRequestParams {
    email: string;
}
export type CheckEmailResponseBody = IProvider;
export interface GetUserPasswordStateRequestBody {
    email: string;
}
export interface GetUserPasswordStateResponseBody {
    isPasswordResetRequired: boolean;
}
export interface oAuthRequest {
    params: {
        provider: string;
    };
    queries: {
        code: string;
        state: string;
        redirect_url?: string;
    };
}
export interface oAuthResponseBody {
    result: boolean;
    token?: string;
    error?: string;
}
export type VerifyRequestBody = {
    type: string;
    email: string;
    localeId?: number;
};
export type VerifyResponseBody = {
    result: boolean;
    oobVerify?: string;
    oobReset?: string;
};
export type LoginResponseBody = {
    loginStatus: 'complete';
    walletId: string;
    token: {
        refresh: string;
        access: string;
    };
    userInfo: IAppUser;
} | loginFailResponse | ErrorResponse;
export type loginFailResponse = {
    loginStatus: 'pinRequired';
    userInfo: IAppUser;
    token: {
        refresh: string;
        access: string;
    };
} | {
    loginStatus: 'registerRequired';
    pinRequired: boolean;
    walletId: string;
    token: {
        refresh: string;
        access: string;
    };
    userInfo: IAppUser;
};
export interface UpdateUserPasswordStateRequestBody {
    isPasswordResetRequired: boolean;
}
export type UpdateUserPasswordStateResponseBody = UpdateUserPasswordStateRequestBody;
export interface ITermsAccepted {
    termsOfService: boolean;
    privacyPolicy: boolean;
}
export interface UpdateTermsAcceptedRequestBody {
    termsAccepted: ITermsAccepted;
}
export type UpdateTermsAcceptedResponseBody = UpdateTermsAcceptedRequestBody;
export type GetTermsAcceptedResponseBody = UpdateTermsAcceptedRequestBody;
export interface LoginIdTokenRequestBody {
    idToken: string;
    sign: string;
}
export interface LoginAccessTokenRequestBody {
    provider: 'naver' | 'discord';
    accessToken: string;
    sign: string;
}
export interface LoginIdTokenResponseBody {
    result: boolean;
    token?: string;
    error?: string;
}
export type LoginAccessTokenResponseBody = LoginIdTokenResponseBody;
export type GetUserInfoResponseBody = IAppUser;
export interface OauthTokenRequestQuery {
    provider: string;
}
export interface OauthTokenRequestBody {
    code: string;
    state: string;
    clientId: string;
    redirectUri: string;
    codeVerifier?: string;
}
export interface OauthTokenResponseBody {
    id_token?: string;
    access_token?: string;
    token_type: string;
    expires_in?: string | number;
    refresh_token?: string;
    scope?: string;
}
