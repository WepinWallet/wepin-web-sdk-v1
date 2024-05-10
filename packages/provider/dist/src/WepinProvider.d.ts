import { BaseProvider } from './BaseProvider';
import { WepinRequestMessage } from './types/Message';
import { default as SafeEventEmitter } from './utils/safeEventEmitter';
import { IWepinStorage } from '@wepin/storage-js';
import { Widget, IWepinModal } from '@wepin/modal-js';

export declare class WepinProvider extends SafeEventEmitter {
    version: string;
    type: 'web' | 'ios' | 'android';
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
    private _EL;
    queue: WepinRequestMessage[];
    constructor({ appId, appKey, modal, storage, }: {
        appId: string;
        appKey: string;
        modal?: IWepinModal;
        storage?: IWepinStorage;
    });
    get wepinStorage(): IWepinStorage;
    private _initQueue;
    get wepinModal(): IWepinModal;
    get wepinWidget(): Widget;
    set wepinWidget(widget: Widget);
    changeLanguage(attributes: {
        language: string;
        currency: string;
    }): void;
    init(attributes?: {
        defaultLanguage: string;
        defaultCurrency: string;
    }): Promise<void>;
    isInitialized(): boolean;
    private checkExpiredToken;
    /**
     * It returns a Provider by given network, chainId.
     *
     * @reference https://docs.wepin.io/kr/wepin/supported-blockchain
     * @param network - Available chains Wepin helps provide.
     *  It should be lowercase.
     * @returns A EIP-1193 provider
     */
    getProvider(network: string): Promise<BaseProvider>;
    openModal(): Promise<void>;
    finalize(): void;
}
