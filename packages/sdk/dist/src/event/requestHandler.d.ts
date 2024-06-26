import { WebviewRequestMessage } from '../types/Message';
import { WepinSDK } from '../WepinSDK';

/**
 * It handles all the request from the webview.
 *
 * @param message Webview 에서 온 MessageEvent.data
 * @param widget Window | Iframe
 */
export declare const WebviewRequestHandler: (message: WebviewRequestMessage, wepinSDK: WepinSDK, options: {
    appKey: string;
    appId: string;
}) => void;
