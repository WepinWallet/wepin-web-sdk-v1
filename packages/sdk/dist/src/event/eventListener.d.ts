import { WepinSDK } from '../WepinSDK';

export declare const getEventListener: (wepinSDK: WepinSDK, options: {
    appKey: string;
    appId: string;
}) => (event: MessageEvent) => void;
