import { LocaleTpe } from './types/Locale';
import { ILoginAccessTokenParams, ILoginIdTokenParams, ILoginOauth2Params } from './types/LoginRequest';
import { LoginResult } from './types/LoginResult';
import { Widget } from '@wepin/modal-js';
import { default as SafeEventEmitter } from './utils/safeEventEmitter';

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
    private openWidget;
    private closeWidget;
}
