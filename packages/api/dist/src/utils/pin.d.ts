import { WepinFetch } from '@wepin/fetch-js';

export declare const getUVD: (pin: string, wepinFetch: WepinFetch, options?: {
    type?: 'create' | 'verify';
    walletId?: string;
    userId?: string;
}) => Promise<{
    UVD: {
        b64SKey: string;
        b64Data: string;
    };
    hint: {
        version: number;
        length: string;
        data: string;
    };
    nextUVD?: undefined;
} | {
    UVD: {
        b64SKey: string;
        b64Data: string;
    };
    nextUVD: {
        b64SKey: string;
        b64Data: string;
    };
    hint?: undefined;
}>;
