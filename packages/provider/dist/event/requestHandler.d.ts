import { WepinProvider } from '../WepinProvider';
import { WebviewRequestMessage } from '../types/Message';
/**
 * It handles all the request from the webview.
 *
 * @param message Webview 에서 온 MessageEvent.data
 * @param widget Window | Iframe
 */
export declare const WebviewRequestHandler: (message: WebviewRequestMessage, wepinProvider: WepinProvider, options: {
    appKey: string;
    appId: string;
}) => void;
