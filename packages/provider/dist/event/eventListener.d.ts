import { WepinProvider } from '../WepinProvider';
export declare const getEventListener: (wepinProvider: WepinProvider, options: {
    appKey: string;
    appId: string;
}) => (event: MessageEvent) => void;
