import { IWepinStorage } from '@wepin/storage-js';

export declare const getSelectedAddress: (wepinStorage: IWepinStorage, wepinAppId: string, network: string) => Promise<{
    userId: string;
    address: string;
    network: string;
}>;
export declare const setSelectedAddress: (wepinStorage: IWepinStorage, wepinAppId: string, network: string, address: string) => Promise<void>;
