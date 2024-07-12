import { WepinSDK } from '../WepinSDK';
import { WebviewRequestMessage } from '../types/Message';
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
