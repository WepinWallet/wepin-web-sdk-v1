import { default as SafeEventEmitter } from './utils/safeEventEmitter';
import { Widget } from '@wepin/modal-js';
import { LoginResult, providerType } from './types/LoginResult';
import { ILoginAccessTokenParams, ILoginIdTokenParams, ILoginOauth2Params } from './types/LoginRequest';
import { LocaleTpe } from './types/Locale';
import { IWepinUser } from './types/IWepinUser';

export declare class WepinLogin extends SafeEventEmitter {
    version: string;
    type: 'web' | 'ios' | 'android';
    appId: string;
    private _appKey;
    private _isInitialized;
    private _wepinModal;
    private _wepinStorage;
    private _wepinFetch;
    widget: Widget;
    private _url;
    appEmailVerified: boolean;
    language: LocaleTpe;
    constructor({ appId, appKey }: {
        appId: string;
        appKey: string;
    });
    init(language?: LocaleTpe): Promise<void>;
    finalize(): void;
    changeLanguage(language: 'ko' | 'en'): void;
    isInitialized(): boolean;
    private initCookieData;
    private setCookieData;
    /**
     * Webview 가 종료되면 Error 를 발생시키는 메서드
     */
    private throwUserCancel;
    private openLoginWidget;
    private loginOAuth2;
    loginWithOauthProvider(params: ILoginOauth2Params): Promise<LoginResult>;
    logout(): Promise<boolean>;
    signUpWithEmailAndPassword(email: string, password: string, openWepinWallet?: boolean): Promise<LoginResult>;
    private changePassword;
    private loginWithEmailAndResetPasswordState;
    loginWithEmailAndPassword(email: string, password: string): Promise<LoginResult>;
    private doFirebaseLoginWithCustomToken;
    loginWithIdToken(params: ILoginIdTokenParams): Promise<LoginResult>;
    loginWithAccessToken(params: ILoginAccessTokenParams): Promise<LoginResult>;
    /**
     * Returns the user's login information.
     * This method with the same as `loginWithUI()`, but it doesn't show the widget.
     *
     * This method must be used in conjunction with the `@wepin/login-js` module.
     * Additionally, the parameters for this method should utilize the return values from the `loginWithOauthProvider()`, `loginWithEmailAndPassword()`, `loginWithIdToken()`, and `loginWithAccessToken()` methods within the `@wepin/login-js` module.
     * @param provider 'email'|'apple'|'google'|'discord'|'naver'|'external_token'
     * @param token  `{idToken: string, refreshToken: string}`. this value is response of `@wepin/login-js`
     * @returns {Promise<IWepinUser>}
     * @example
     * ```typescript
     * import { WepinLogin } from '@wepin/login-js'
     * const wepinLogin = WepinLogin({ appId: 'appId', appKey: 'appKey' })
     * const res = await wepinLogin.loginWithOauthProvider({ provider: 'google' })
     * wepinLogin.loginWepin(res).then((userInfo) => {
     * console.log(userInfo)
     * })
     **/
    loginWepin({ provider, token, }: {
        provider: providerType;
        token: {
            idToken: string;
            refreshToken: string;
        };
    }): Promise<IWepinUser>;
    private openWidget;
    private closeWidget;
}
