import { IUserInfo, IWepinToken, LocalStorageData, LocalStorageKey, LocalStorageType } from './storage';
import { default as WepinStorage } from '../WepinStorage';

export interface IWepinStorage {
    new (): WepinStorage;
    platform: 'web' | 'ios' | 'android';
    getLocalStorageEnabled(): boolean;
    setAllLocalStorage(appId: string, value: LocalStorageType): void;
    setLocalStorage(appId: string, name: LocalStorageKey, value: LocalStorageData): void;
    getLocalStorage(appId: string, name: LocalStorageKey): any;
    getAllLocalStorage(appId: string): any;
    clearLocalStorage(appId: string, name: LocalStorageKey): void;
    clearAllLocalStorage(appId: string): void;
    setLoginUserLocalStorage(appId: string, request: {
        provider: string;
        token: {
            idToken: string;
            refreshToken: string;
        };
    }, response: any): {
        userInfo: IUserInfo;
        connectUser: IWepinToken;
    };
}
