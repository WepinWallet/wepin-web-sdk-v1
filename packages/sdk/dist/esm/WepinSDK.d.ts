import SafeEventEmitter from '@metamask/safe-event-emitter';
import { modeByAppKey, WebviewEventHandler, Platform, WepinRequestMessage, IWepinSDKAttributes, IWepinUser, LoginProviders } from '@wepin/common';
import type { Widget, IWepinModal } from '@wepin/modal-js';
import { IFirebaseWepin, IWepinToken } from '@wepin/storage-js';
import { IWepinStorage } from '@wepin/storage-js';
import { Account } from './types/Account.js';
import { AccountBalanceInfo } from './types/AccountBalanceInfo.js';
import { WepinLifeCycle } from './types/WepinLifeCycle.js';
export declare class WepinSDK extends SafeEventEmitter {
    version: string;
    /** @ignore */
    type: keyof typeof Platform;
    /** @ignore */
    wepinAppAttributes: IWepinSDKAttributes;
    /** @ignore */
    wepinDomain: string;
    /** @ignore */
    specifiedEmail: string;
    private _wepinLifeCycle;
    private _isInitialized;
    private _modeByAppKey;
    private _wepinAppId;
    private _wepinAppKey;
    private _widget;
    private _wepinModal;
    private _wepinStorage;
    private _wepinFetch;
    private _accountInfo;
    private _detailAccount;
    private _userInfo;
    protected webviewEventHandler: WebviewEventHandler;
    constructor({ appId, appKey, wepinModal, wepinStorage, }: {
        appId: string;
        appKey: string;
        wepinModal?: IWepinModal;
        wepinStorage?: IWepinStorage;
    });
    private initEventHandler;
    private get wepinLifeCycle();
    private set wepinLifeCycle(value);
    /** @ignore */
    get modeByAppKey(): modeByAppKey;
    /** @ignore */
    toJSON(): string;
    /** @ignore */
    get wepinStorage(): IWepinStorage;
    /**
     * Initialize Wepin Object.
     * @param attributes {type: 'hide', defaultLanguage: 'ko' | 'en' | 'ja', defaultCurrency: 'KRW' | 'USD' | 'JPY', loginProviders?: Array<LoginProviders>}
     * @returns
     */
    init(attributes?: IWepinSDKAttributes): Promise<void>;
    /** @ignore */
    get wepinWidget(): Widget;
    /** @ignore */
    set wepinWidget(widget: Widget);
    /**
     * Check if wepin is initialized.
     *
     * @returns boolean
     */
    isInitialized(): boolean;
    /**
     * Change the language and currency of the widget.
     * @param language 'ko'|'en' | 'ja'
     * @param currency 'KRW'|'USD' | 'JPY'
     * @returns
     * @example
     * ```typescript
     * wepin.changeLanguage({
     *  currency: 'USD',
     * language: 'en'
     * })
     * ```
     * @example
     * ```typescript
     * wepin.changeLanguage({
     * currency: 'KRW',
     * language: 'ko'
     * })
     * ```
     * @example
     * ```typescript
     * wepin.changeLanguage({
     * currency: 'JPY',
     * language: 'ja'
     * })
     * ```
     */
    changeLanguage({ currency, language, }: {
        currency: string;
        language: string;
    }): void;
    /**
     * It opens widget window.
     */
    openWidget(): Promise<void>;
    private _open;
    /**
     * Method that opens the widget and responds with No request for get_sdk_request
     */
    private openWithoutRequestWepinWidget;
    /**
     * A function that passes in a request to be fired when the widget is launched and handles the response when there is a request that needs to be fired immediately.
     *
     * @param url
     * @param data
     */
    private openAndRequestWepinWidget;
    /**
     * It closes widget itself.
     */
    closeWidget(): void;
    private _close;
    /** @ignore */
    setToken(token: {
        accessToken: string;
        refreshToken: string;
    }): Promise<void>;
    private checkExpiredToken;
    /**
     * Returns the user's login information.
     *
     * @param email Encourage users to log in with the email specified in the app.
     * @returns {Promise<IWepinUser>}
     * @example
     * ```typescript
     * wepin.loginWithUI().then((userInfo) => {
     *  console.log(userInfo)
     * })
     * ```
     * @example
     * ```typescript
     * wepin.loginWithUI({ email: 'abc@abc.com' }).then((userInfo) => {
     *  console.log(userInfo)
     * })
     * ```
     */
    loginWithUI(options?: {
        email?: string;
    }): Promise<IWepinUser>;
    private getWepinUserInfo;
    /**
     * Register the user with Wepin. After joining and logging in, the Register page of the Wepin widget opens and registers (wipe and account creation) the Wepin service. Available only if the life cycle of the WepinSDK is login_before_register.
     *
     * @returns {Promise<IWepinUser>}
     */
    register(): Promise<IWepinUser>;
    /**
     * If the oauth provider account does not have an email registered, the function will take an email from Wepin and register it.
     */
    registerUserEmail(params: {
        provider: LoginProviders;
        idToken?: string;
        accessToken?: string;
    }): Promise<IWepinUser>;
    /**
     * Function to handle user logout.
     *
     * @returns {Promise<void>}
     */
    logout(): Promise<void>;
    /**
     * Returns available account list. It can be only usable after widget login.
     * It returns all the accounts once parameter is empty.
     *
     * @param options
     *    - networks: list of network wanted to get return
     *    - withEoa: If AA accounts are included, whether to include EOA accounts
     * @returns
     */
    getAccounts(options?: {
        networks?: string[];
        withEoa?: boolean;
    }): Promise<Account[]>;
    /** @ignore */
    setUserInfo(userInfo: IWepinUser, withEmit?: boolean): void;
    /**
     * Returns lifecycle of wepin.
     * The lifecycle of the wepin is defined as follows.
     *  - 'not_initialized': if wepin is not initialized
     *  - 'initializing': if wepin is initializing
     *  - 'initialized': if wepin is initialized
     *  - 'before_login': if wepin is initialized but the user is not logged in
     *  - 'login': if the user is logged in
     *  - 'login_before_register': if the user is email logged in but the user is NOT registered in wepin
     *
     * @returns Promise<WepinLifeCycle>
     */
    getStatus(): Promise<WepinLifeCycle>;
    /**
     * Returns balance info of account. It can be only usable after login.
     * It returns all the nft once networks parameter is empty.
     *
     * @param account
     * @returns Promise<AccountBalanceInfo>
     */
    getBalance(account?: {
        network: string;
        address: string;
    }[]): Promise<AccountBalanceInfo[]>;
    private wepinRequest;
    /** @ignore */
    getSDKRequest(): WepinRequestMessage | undefined;
    /**
     * Returns the send transaction information. It can be only usable after widget login.
     *
     * @param account account info
     * @param options send options
     * @returns send transaction response info
     */
    send({ account, txData, }: {
        account: Account;
        txData?: {
            toAddress: string;
            amount: string;
        };
    }): Promise<{
        txId: any;
    }>;
    /**
     * The `getLoginSession()` method returns the login session information.
     */
    getLoginSession(prevToken?: {
        firebaseToken: IFirebaseWepin;
        wepinToken: IWepinToken;
    }): Promise<{
        firebaseToken: IFirebaseWepin;
        wepinToken: IWepinToken;
    }>;
    /**
     * The `finalize()` method finalizes the Wepin SDK.
     */
    finalize(): Promise<void>;
}
