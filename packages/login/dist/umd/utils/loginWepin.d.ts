import type { IWepinUser } from '@wepin/common';
import { type WepinFetch } from '@wepin/fetch-js';
import type { IWepinStorage } from '@wepin/storage-js';
export declare const checkExistFirebaseLoginSession: (appId: string, wepinFetch: WepinFetch, storage: IWepinStorage) => Promise<boolean>;
export declare const checkExistWepinLoginSession: (appId: string, wepinFetch: WepinFetch, storage: IWepinStorage) => Promise<boolean>;
export declare const getLoginUserStorage: (appId: string, storage: IWepinStorage) => Promise<IWepinUser | null>;
