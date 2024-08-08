import type { WebviewRequestMessage, WepinResponseMessage } from '../handler/WebviewMessage.js';
export declare function makeWepinResponseMessage(request: WebviewRequestMessage, state: WepinResponseMessage['body']['state'], data: WepinResponseMessage['body']['data']): WepinResponseMessage;
