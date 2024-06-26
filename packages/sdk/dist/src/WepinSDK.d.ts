import { default as SafeEventEmitter } from './utils/safeEventEmitter';
import { modeByAppKey } from './types/modeByAppKey';
import { Account } from './types/Account';
import { WepinLifeCycle } from './types/WepinLifeCycle';
import { Widget, IWepinModal } from '@wepin/modal-js';
import { IWepinUser } from './types/IWepinUser';
import { IWepinStorage } from '@wepin/storage-js';
import { AccountBalanceInfo } from './types/AccountBalanceInfo';
import { WepinRequestMessage } from './types/Message';
import { IWepinSDKAttributes } from './types/IWepinSDKAttributes';

export declare class WepinSDK extends SafeEventEmitter {
    version: string;
    type: 'web' | 'android' | 'ios';
    wepinAppAttributes: IWepinSDKAttributes;
    wepinDomain: string;
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
    private _EL;
    constructor({ appId, appKey, wepinModal, wepinStorage, }: {
        appId: string;
        appKey: string;
        wepinModal?: IWepinModal;
        wepinStorage?: IWepinStorage;
    });
    private setModeByAppKey;
    get modeByAppKey(): modeByAppKey;
    toJSON(): string;
    get wepinStorage(): IWepinStorage;
    /**
     * Initialize Wepin Object. It returns widget instance.
     * @param attributes {type: 'show' | 'hide', defaultLanguage: 'ko' | 'en', defaultCurrency: 'KRW' | 'USD', loginProviders?: Array<LoginProviders>}
     * @returns
     */
    init(attributes?: IWepinSDKAttributes): Promise<void>;
    get wepinWidget(): Widget;
    set wepinWidget(widget: Widget);
    /**
     * Check if wepin is initialized.
     *
     * @returns
     */
    isInitialized(): boolean;
    /**
     * Change the language and currency of the widget.
     * @param language 'ko'|'en'
     * @param currency 'KRW'|'USD'
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
     * It closes widget itself.
     */
    closeWidget(): void;
    private _close;
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
    register(): Promise<IWepinUser>;
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
    }): Promise<unknown>;
    finalize(): Promise<void>;
}
