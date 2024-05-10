import { ICoinInfos } from './types/fetch/IApp';
import { EthSignDataParams, EthSignMessageParams, EthSignTransactionParams } from './types/Transaction';
import { AccountBalanceInfo } from './types/AccountBalanceInfo';
import { NFTInfo } from './types/NFTInfo';
import { IWepinStorage } from '@wepin/storage-js';
import { IWepinUser, providerType } from './types/IWepinUser';
import { OTP, IApp } from '@wepin/fetch-js';
import { WepinLifeCycle } from './types/WepinLifeCycle';
import { Account } from './types/Account';
import { modeByAppKey } from './types/modeByAppKey';
import { default as SafeEventEmitter } from './utils/safeEventEmitter';

export declare class WepinAPI extends SafeEventEmitter {
    version: string;
    type: 'web' | 'ios' | 'android';
    wepinDomain: string;
    private _wepinLifeCycle;
    private _isInitialized;
    private _modeByAppKey;
    private _wepinAppId;
    private _wepinAppKey;
    private _wepinFetch;
    private _wepinStorage;
    private _accountInfo;
    private _nftInfo;
    private _detailAccount;
    private _detailNft;
    private _userInfo;
    constructor({ appId, appKey, options, }: {
        appId: string;
        appKey: string;
        options?: {
            domain: string;
            platformType: 'ios' | 'android';
            storage?: IWepinStorage;
        };
    });
    private setModeByAppKey;
    get modeByAppKey(): modeByAppKey;
    toJSON(): string;
    /**
     * Initialize Wepin Object.
     * @returns
     */
    init(): Promise<void>;
    setInitialized(isInitialized: boolean): void;
    /**
     * Check if wepin is initialized.
     *
     * @returns
     */
    isInitialized(): boolean;
    private setToken;
    private checkExpiredToken;
    getAppInfo(withNetwork?: boolean): Promise<{
        stage: number;
        appInfo: IApp;
    }>;
    getAppCoins(locale?: 'ko' | 'en'): Promise<ICoinInfos>;
    getAppSupportedNFTs(): Promise<{
        supportNetworkList: import('@wepin/fetch-js/dist/src/types').SupportNetwork[];
    }>;
    /**
     * Returns the user's login information.
     *
     * This method must be used in conjunction with the `@wepin/login-js` module.
     * Additionally, the parameters for this method should utilize the return values from the `loginWithOauthProvider()`, `loginWithEmailAndPassword()`, `loginWithIdToken()`, and `loginWithAccessToken()` methods within the `@wepin/login-js` module.
     * @param provider 'email'|'apple'|'google'|'discord'|'naver'|'external_token'
     * @param token  `{idToken: string, refreshToken: string}`. this value is response of `@wepin/login-js`
     * @returns {Promise<IWepinUser>}
     * @exception `Wepin.login: registerRequired` : If this error occurs, you have to perform the `register(pin)` method.
     * @example
     * ```typescript
     * import { WepinLogin } from '@wepin/login-js'
     * const wepinLogin = WepinLogin({ appId: 'appId', appKey: 'appKey' })
     * const res = await wepinLogin.loginWithOauthProvider({ provider: 'google' })
     * wepinApi.login(res.provider, res.token).then((userInfo) => {
     * console.log(userInfo)
     * })
     **/
    login(provider: providerType, token: {
        idToken: string;
        refreshToken: string;
    }): Promise<IWepinUser>;
    register(pin: string): Promise<IWepinUser>;
    refreshSession(): Promise<boolean>;
    /**
     * Function to handle user logout.
     *
     * @returns {Promise<void>}
     */
    logout(): Promise<void>;
    /**
     * Returns available account list. It can be only usable after login.
     * It returns all the accounts once parameter is empty.
     *
     * @param options
     *    - locale: 'ko' | 'en'
     *    - networks: list of network wanted to get return
     *    - withEoa: If AA accounts are included, whether to include EOA accounts
     *    - force: refresh account list
     * @returns
     */
    getAccounts(options?: {
        locale?: 'ko' | 'en';
        networks?: string[];
        withEoa?: boolean;
        force?: boolean;
    }): Promise<{
        address: string;
        network: string;
    }[]>;
    /**
     * Returns available nft list. It can be only usable after login.
     * It returns all the nft once networks parameter is empty.
     *
     * @param options
     *    - networks: list of network wanted to get return
     *    - force: refresh nft list
     * @returns Promise<NFTInfo[]>
     * @example
     * ```typescript
     * const nftList = await wepin.getNfts()
     * console.log(nftList)
     * ```
     */
    getNfts(options?: {
        networks?: string[];
        force?: boolean;
    }): Promise<NFTInfo[]>;
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
    private isNftInfo;
    checkAddressValidation({ account, address, }: {
        account: {
            network: string;
            address: string;
        };
        address: string;
    }): Promise<boolean>;
    private getPrepareParams;
    private isEvmAccount;
    prepareTransaction({ account, to, amount, data, }: {
        account: Account | NFTInfo;
        to: string;
        amount: string;
        data?: string;
    }): Promise<{
        gasLimit: number;
        gasPrice: {
            high: number;
            medium: number;
            low: number;
        };
        nonce: number;
    }>;
    signAndBroadcast({ account, txData, pin, otpCode, }: {
        account: Account;
        txData: {
            to: string;
            amount: string;
            nonce: number;
            data?: string;
            gasLimit: string;
            gasPrice: string;
        };
        pin: string;
        otpCode?: OTP;
    }): Promise<{
        txId: string;
    }>;
    sign({ account, signData, pin, otpCode, }: {
        account: Account;
        signData: EthSignTransactionParams | EthSignMessageParams | EthSignDataParams;
        pin: string;
        otpCode?: OTP;
    }): Promise<{
        signatureResult: any;
    }>;
    resetPINRetryCount(): Promise<any>;
    verifyPIN(pin: string): Promise<boolean>;
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
    finalize(): void;
}
