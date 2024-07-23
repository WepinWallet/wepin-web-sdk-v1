import type { WebviewRequestMessage, WepinResponseMessage } from '../handler/WebviewMessage';
export declare function makeWepinResponseMessage(request: WebviewRequestMessage, state: WepinResponseMessage['body']['state'], data: WepinResponseMessage['body']['data']): WepinResponseMessage;
