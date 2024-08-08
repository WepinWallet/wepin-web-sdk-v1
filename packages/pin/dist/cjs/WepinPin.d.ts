import { IWepinSDKAttributes, IWepinUser, Platform, WebviewEventHandler } from '@wepin/common';
import { WepinFetch } from '@wepin/fetch-js';
import { WepinLogin } from '@wepin/login-js';
import { IWepinModal, Widget } from '@wepin/modal-js';
import { IWepinStorage } from '@wepin/storage-js';
import { ChangePinBlock, AuthOTP, AuthPinBlock, RegistrationPinBlock } from './types/index.js';
export declare class WepinPin {
    private _login;
    protected modal: IWepinModal;
    protected webviewEventHandler: WebviewEventHandler;
    protected widget?: Widget;
    protected wepinStorage: IWepinStorage;
    protected _isInitialized: boolean;
    protected wepinAppAttributes: IWepinSDKAttributes;
    protected _wepinLifeCycle: 'initializing' | 'initialized' | 'login';
    protected _wepinFetch: WepinFetch;
    protected _userInfo: IWepinUser;
    protected appId: string;
    protected appKey: string;
    protected type: keyof typeof Platform;
    /**
     * @param params
     * @param params.appKey appKey in your workspace app
     */
    constructor(params: {
        appKey: string;
        wepinLogin?: WepinLogin;
    });
    get login(): WepinLogin;
    /**
     * Initialize Wepin Object. It returns widget instance.
     *
     * @param attributes
     * @returns
     */
    init(attributes?: IWepinSDKAttributes): Promise<void>;
    /**
     * checks WepinPin is initialized.
     * @returns true if Wepin SDK is already initialized.
     */
    isInitialized(): boolean;
    private checkExpiredToken;
    finalize(): void;
    private initEventHandler;
    /**
     * widget 이 실행될때 바로 실행시켜야 하는 request 가 있을 때,
     * 날려야 할 request 를 전달해주고 response 를 처리하는 함수
     *
     * @param url
     * @param data
     */
    private openAndRequestWepinWidget;
    private checkLogin;
    /**
     * generate pin block for registration
     *
     * @returns {RegistrationPinBlock}
     */
    generateRegistrationPINBlock(): Promise<RegistrationPinBlock>;
    /**
     * generate pin block for authentication
     *
     * @param count pin block count
     * @returns
     */
    generateAuthPINBlock(count?: number): Promise<AuthPinBlock>;
    /**
     * generate pin block for change pin
     */
    generateChangePINBlock(): Promise<ChangePinBlock>;
    generateAuthOTP(): Promise<AuthOTP>;
}
