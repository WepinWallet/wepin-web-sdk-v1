import { LocalStorageData, LocalStorageKey, LocalStorageType } from './types/storage';

export default class WepinStorage {
    #private;
    static platform: 'web' | 'ios' | 'android';
    static getLocalStorageEnabled(): boolean;
    static setAllLocalStorage(appId: string, value: LocalStorageType): void;
    static setLocalStorage(appId: string, name: LocalStorageKey, value: LocalStorageData): void;
    static getLocalStorage(appId: string, name: LocalStorageKey): any;
    static getAllLocalStorage(appId: string): any;
    static clearLocalStorage(appId: string, name: LocalStorageKey): void;
    static clearAllLocalStorage(appId: string): void;
    static setLoginUserLocalStorage(appId: string, request: {
        provider: string;
        token: {
            idToken: string;
            refreshToken: string;
        };
    }, response: any): {
        userInfo: any;
        connectUser: any;
    };
}
