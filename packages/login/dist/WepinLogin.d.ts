import { WebviewEventHandler, IWepinUser, Platform } from '@wepin/common';
import { Widget } from '@wepin/modal-js';
import { LocaleType } from './types/Locale';
import { ILoginAccessTokenParams, ILoginIdTokenParams, ILoginOauth2Params } from './types/LoginRequest';
import { LoginResult, providerType } from './types/LoginResult';
export declare class WepinLogin {
    version: string;
    type: keyof typeof Platform;
    appId: string;
    private _appKey;
    private _isInitialized;
    private _wepinModal;
    private _wepinStorage;
    private _wepinFetch;
    widget: Widget;
    private _url;
    appEmailVerified: boolean;
    language: LocaleType;
    protected webviewEventHandler: WebviewEventHandler;
    constructor({ appId, appKey }: {
        appId: string;
        appKey: string;
    });
    /**
     *  Initialize Wepin Login Object.
     * @param language 'ko' | 'en' - The language to be displayed on the widget.
     */
    init(language?: LocaleType): Promise<void>;
    /**
     * Finalize wepin login module.
     */
    finalize(): void;
    /**
     * change language
     * @param language 'ko' | 'en' - The language to be displayed on the widget.
     * @returns void
     */
    changeLanguage(language: 'ko' | 'en'): void;
    /**
     * Check if wepin is initialized.
     *
     * @returns boolean
     */
    isInitialized(): boolean;
    private initCookieData;
    private setCookieData;
    /**
     * Webview 가 종료되면 Error 를 발생시키는 메서드
     */
    private throwUserCancel;
    private openLoginWidget;
    private loginOAuth2;
    /**
     * A new window will open and proceed to log in to wepin firebase. Returns firebase login info upon successful login.
     * @param params `{provider: 'google'|'naver'|'discord'|'apple', withLogout?: boolean}`
     * @returns {Promise<LoginResult>}
     **/
    loginWithOauthProvider(params: ILoginOauth2Params): Promise<LoginResult>;
    logout(): Promise<boolean>;
    /**
     * It signs up on the wepin firebase with your email and password. Returns firebase login info upon successful login.
     * @param email User email
     * @param password User password
     * @returns {Promise<LoginResult>}
     **/
    signUpWithEmailAndPassword(email: string, password: string, openWepinWallet?: boolean): Promise<LoginResult>;
    private changePassword;
    private loginWithEmailAndResetPasswordState;
    /**
     * It logs in to the Wepin firebase with your email and password. Returns firebase login info upon successful login.
     * @param email User email
     * @param password User password
     * @returns {Promise<LoginResult>}
     **/
    loginWithEmailAndPassword(email: string, password: string): Promise<LoginResult>;
    private doFirebaseLoginWithCustomToken;
    /**
     *It logs in to the Wepin firebase with external id token. Returns firebase login info upon successful login.
     * @param params '{token: string, sign: string}'
     * @returns {Promise<LoginResult>}
     **/
    loginWithIdToken(params: ILoginIdTokenParams): Promise<LoginResult>;
    /**
     * It logs in to the Wepin firebase with external access token. Returns firebase login info upon successful login.
     * @param params '{provider: 'naver'|'discord', token: string, sign: string}'
     * @returns {Promise<LoginResult>}
     **/
    loginWithAccessToken(params: ILoginAccessTokenParams): Promise<LoginResult>;
    /**
     * This method retrieves the current firebase token's information from the Wepin.
     * @returns {Promise<LoginResult>}
     */
    getRefreshFirebaseToken(): Promise<LoginResult>;
    /**
     * Returns the user's login information.
     * This method with the same as `loginWithUI()` of WepinSDK module, but it doesn't show the widget.
     *
     * Additionally, the parameters for this method should utilize the return values from the `loginWithOauthProvider()`, `loginWithEmailAndPassword()`, `loginWithIdToken()`, and `loginWithAccessToken()` methods.
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
    /**
     * This method retrieves the current logged-in user's information from the Wepin.
     * @returns {Promise<IWepinUser>}
     */
    getCurrentWepinUser(): Promise<IWepinUser>;
    private openWidget;
    private closeWidget;
}
