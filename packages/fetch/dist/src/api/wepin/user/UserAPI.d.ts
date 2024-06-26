import { ErrorResponse } from '../../APITypes';
import { default as IUserAPI } from './IUserAPI';
import { default as InterfaceAPI } from '../../InterfaceAPI';
import { CheckEmailRequestParams, CheckEmailResponseBody, GetTermsAcceptedResponseBody, GetUserInfoResponseBody, GetUserPasswordStateRequestBody, GetUserPasswordStateResponseBody, LoginAccessTokenRequestBody, LoginAccessTokenResponseBody, LoginIdTokenRequestBody, LoginIdTokenResponseBody, LoginResponseBody, UpdateTermsAcceptedRequestBody, UpdateTermsAcceptedResponseBody, UpdateUserPasswordStateRequestBody, UpdateUserPasswordStateResponseBody, VerifyRequestBody, VerifyResponseBody, oAuthRequest, oAuthResponseBody } from '../../../types';

declare class UserAPI implements IUserAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    checkEmailExist(queries: CheckEmailRequestParams): Promise<CheckEmailResponseBody | ErrorResponse>;
    getUserPasswordState(queries: GetUserPasswordStateRequestBody): Promise<GetUserPasswordStateResponseBody | ErrorResponse>;
    oAuth(queries: oAuthRequest['queries'], params: oAuthRequest['params']): Promise<oAuthResponseBody | ErrorResponse>;
    verify(body: VerifyRequestBody): Promise<VerifyResponseBody | ErrorResponse>;
    login(body: {
        idToken: string;
    }): Promise<LoginResponseBody>;
    updateUserPasswordState(params: {
        userId: string;
    }, body: UpdateUserPasswordStateRequestBody): Promise<UpdateUserPasswordStateResponseBody | ErrorResponse>;
    updateTermsAccepted(params: {
        userId: string;
    }, body: UpdateTermsAcceptedRequestBody): Promise<UpdateTermsAcceptedResponseBody | ErrorResponse>;
    refreshToken(params: {
        userId: string;
    }): Promise<{
        token: string;
    } | ErrorResponse>;
    fetchKey(params: {
        userId: string;
    }): Promise<{
        pubKey: string;
    } | ErrorResponse>;
    getTermsAccepted(params: {
        userId: string;
    }): Promise<GetTermsAcceptedResponseBody | ErrorResponse>;
    logout(params: {
        userId: string;
    }): Promise<any>;
    getFirebaseConfig(): Promise<string | ErrorResponse>;
    loginOAuthIdToken(body: LoginIdTokenRequestBody): Promise<LoginIdTokenResponseBody | ErrorResponse>;
    loginOAuthAccessToken(body: LoginAccessTokenRequestBody): Promise<LoginAccessTokenResponseBody | ErrorResponse>;
    getUserInfo(params: {
        userId: string;
    }): Promise<GetUserInfoResponseBody | ErrorResponse>;
}
export default UserAPI;
