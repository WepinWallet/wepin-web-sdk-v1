import type { IWepinUser } from '@wepin/common';
import { type WepinFetch } from '@wepin/fetch-js';
import type { IWepinStorage } from '@wepin/storage-js';
import { LoginResult } from '../types/LoginResult.js';
export declare const refreshFirebaseToken: (appId: string, wepinFetch: WepinFetch, storage: IWepinStorage, prevFBToken: LoginResult) => Promise<boolean>;
export declare const checkExistFirebaseLoginSession: (appId: string, wepinFetch: WepinFetch, storage: IWepinStorage) => Promise<boolean>;
export declare const checkExistWepinLoginSession: (appId: string, wepinFetch: WepinFetch, storage: IWepinStorage) => Promise<boolean>;
export declare const getLoginUserStorage: (appId: string, storage: IWepinStorage) => Promise<IWepinUser | null>;
