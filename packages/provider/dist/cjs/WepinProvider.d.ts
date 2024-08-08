import { Platform, WebviewEventHandler, WepinRequestMessage } from '@wepin/common';
import { Widget, IWepinModal } from '@wepin/modal-js';
import { IWepinStorage } from '@wepin/storage-js';
import { BaseProvider } from './BaseProvider.js';
export declare class WepinProvider {
    version: string;
    type: keyof typeof Platform;
    wepinDomain: string;
    wepinAppAttributes: {
        defaultLanguage: string;
        defaultCurrency: string;
    };
    wepinAppId: string;
    private _wepinAppKey;
    private _wepinFetch;
    private _wepinModal;
    private _widget;
    private _wepinStorage;
    _isInitialized: boolean;
    private _url;
    webviewEventHandler: WebviewEventHandler;
    queue: WepinRequestMessage[];
    constructor({ appId, appKey, modal, storage, }: {
        appId: string;
        appKey: string;
        modal?: IWepinModal;
        storage?: IWepinStorage;
    });
    /** @ignore */
    get wepinStorage(): IWepinStorage;
    private initEventHandler;
    private _initQueue;
    /** @ignore */
    get wepinModal(): IWepinModal;
    /** @ignore */
    get wepinWidget(): Widget;
    /** @ignore */
    set wepinWidget(widget: Widget);
    changeLanguage(attributes: {
        language: string;
        currency: string;
    }): void;
    /**
     * Initialize Wepin Provider Object.
     * @param attributes { defaultLanguage: 'ko' | 'en' |'ja', defaultCurrency: 'KRW' | 'USD' | 'JPY'}
     * @returns
     */
    init(attributes?: {
        defaultLanguage: string;
        defaultCurrency: string;
    }): Promise<void>;
    /**
     * Check if wepin provider is initialized.
     *
     * @returns boolean
     */
    isInitialized(): boolean;
    private checkExpiredToken;
    /**
     * It returns a Provider by given network, chainId.
     *
     * @see [Supported Network List](https://docs.wepin.io/kr/wepin/supported-blockchain)
     * @param network - Available chains Wepin helps provide.
     *  It should be lowercase.
     * @returns A EIP-1193 provider
     */
    getProvider(network: string): Promise<BaseProvider>;
    /** @ignore */
    openModal(): Promise<void>;
    /**
     * The `finalize()` method finalizes the Wepin Provider.
     */
    finalize(): Promise<void>;
}
