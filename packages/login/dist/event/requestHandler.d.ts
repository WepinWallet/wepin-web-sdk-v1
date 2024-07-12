import { WepinLogin } from '../WepinLogin';
import { WebviewRequestMessage } from '../types/LoginMessage';
/**
 * It handles all the request from the webview.
 *
 * @param message Webview 에서 온 MessageEvent.data
 * @param widget Window | Iframe
 */
export declare const WebviewRequestHandler: (message: WebviewRequestMessage, wepinSDK: WepinLogin) => void;
