import { WebviewEventHandler, IWepinUser, Platform } from '@wepin/common';
import { Widget } from '@wepin/modal-js';
import { LocaleType } from './types/Locale.js';
import { ILoginAccessTokenParams, ILoginIdTokenParams, ILoginOauth2Params, ISendVerifyEmailParams } from './types/LoginRequest.js';
import { LoginErrorResult, LoginResult } from './types/LoginResult.js';
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
     * @param language string <'ko' | 'en' | 'ja'> - The language to be displayed on the widget.>
     */
    init(language?: LocaleType): Promise<void>;
    /**
     * Finalize wepin login module.
     */
    finalize(): void;
    /**
     * change language
     * @param language string <'ko' | 'en' | 'ja'> - The language to be displayed on the widget.
     * @returns void
     */
    changeLanguage(language: string): void;
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
    private checkProvider;
    /**
     * A new window will open and proceed to log in to Wepin Firebase. Returns Firebase login info upon successful login.
     * If the response contains an `error` value of `required/register_email`, you need to register an email and request email verification using the `sendVerifyEmail` method.
     * @param params `{provider: string, withLogout?: boolean}` - `provider` accepts one of the following values: 'google', 'naver', 'discord', 'apple', 'line', 'facebook'
     * @returns {Promise<LoginResult | LoginErrorResult>}
     **/
    loginWithOauthProvider(params: ILoginOauth2Params): Promise<LoginResult | LoginErrorResult>;
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
     * Logs into Wepin firebase using external tokens (id token or access token).
     * Returns firebase login info upon successful login. If a `required/register_email` error occurs,
     * you need to register an email and request email verification using the `sendVerifyEmail` method.
     * @param params `{ type: 'id' | 'access', provider?: string, token: string, sign: string }`
     * @returns {Promise<LoginResult | LoginErrorResult>}
     **/
    private loginWithToken;
    /**
     * Logs into Wepin firebase with an external id token. Returns firebase login info upon successful login.
     * @param params `{ token: string, sign: string }`
     * @returns {Promise<LoginResult | LoginErrorResult>}
     **/
    loginWithIdToken(params: ILoginIdTokenParams): Promise<LoginResult | LoginErrorResult>;
    /**
     * Logs into Wepin firebase with an external access token. Returns firebase login info upon successful login.
     * @param params `{ provider: 'naver' | 'discord'|'facebook', token: string, sign: string }`
     * @returns {Promise<LoginResult | LoginErrorResult>}
     **/
    loginWithAccessToken(params: ILoginAccessTokenParams): Promise<LoginResult | LoginErrorResult>;
    /**
     * Method for registering an email and requesting email verification.
     * If a `required/register_email` error occurs, you need to register an email and request email verification.
     * Once email verification is complete, you should use the `loginWithAccessToken` or `loginWithIdToken` method to log in again with the AccessToken or IdToken used for the initial login.
     * @param params `{
        email: string,
        provider: LoginProviders,
        idToken?: string,
        accessToken?: string
     }` - The `provider` accepts one of the following values: 'google', 'naver', 'discord', 'apple', 'line', 'facebook'
     * @returns {Promise<boolean>}
     **/
    sendVerifyEmail(params: ISendVerifyEmailParams): Promise<boolean>;
    /**
     * This method retrieves the current firebase token's information from the Wepin.
     * @param prevFBToken LoginResult
     *          - provider 'email'|'apple'|'google'|'discord'|'naver'|'external_token'
     *          - token  `{idToken: string, refreshToken: string}`. this value is response of `@wepin/login-js`
     * @returns {Promise<LoginResult>}
     */
    getRefreshFirebaseToken(prevFBToken?: LoginResult): Promise<LoginResult>;
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
        provider: string;
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
