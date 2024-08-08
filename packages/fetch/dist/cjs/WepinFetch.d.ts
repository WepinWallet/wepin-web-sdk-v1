import { IWepinStorage } from '@wepin/storage-js';
import FirebaseAuthAPI from './api/firebaseAuth/FirebaseAuthAPI.js';
import WepinSdkAPI from './api/wepin/WepinSdkAPI.js';
export declare class WepinFetch {
    version: string;
    appId: string;
    private sdk;
    private _appKey;
    private _isInitialized;
    private _token;
    private _domain;
    private _wepinStorage;
    wepinApi: WepinSdkAPI;
    wepinFirebaseApi: FirebaseAuthAPI;
    constructor({ appId, appKey, domain, sdk, storage, }: {
        appId: string;
        appKey: string;
        domain: string;
        sdk: {
            version: string;
            type: string;
        };
        storage?: IWepinStorage;
    });
    init(): Promise<void>;
    isInitialized(): boolean;
    private static getFirebaseConfig;
    Token(): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    setToken(token?: {
        accessToken: string;
        refreshToken: string;
    }): Promise<void>;
}
