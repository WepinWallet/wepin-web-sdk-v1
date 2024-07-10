import { SafeEventEmitter } from '../utils/SafeEventEmitter';
import { WebviewRequestMessage, WebviewResponseMessage, WepinCommand, WepinResponseMessage } from './WebviewMessage';
export type RequestHandlerFunction = (message: WebviewRequestMessage) => void;
export type ResponseHandlerFunction = (message: WebviewResponseMessage) => void;
export declare class WebviewEventHandler {
    protected eventEmitter: SafeEventEmitter;
    getEventListenerFunction(checkValidEvent?: () => boolean): (event: MessageEvent) => void;
    addRequestHandler(command: WepinCommand, handler: RequestHandlerFunction, once?: boolean): void;
    removeRequestHandler(command: WepinCommand, handler: RequestHandlerFunction): void;
    addResponseHandler(command: WepinCommand, handler: ResponseHandlerFunction, once?: boolean): void;
    removeResponseHandler(command: WepinCommand, handler: ResponseHandlerFunction): void;
    makeWepinResponseMessage(request: WebviewRequestMessage, state: WepinResponseMessage['body']['state'], data: WepinResponseMessage['body']['data']): WepinResponseMessage;
    private handleMessage;
}
