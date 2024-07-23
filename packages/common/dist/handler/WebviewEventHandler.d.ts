import SafeEventEmitter from '@metamask/safe-event-emitter';
import { GlobalWhenRequest, GlobalWhenResponse } from '../types/WebviewHandlerTypes';
import { WebviewRequestMessage, WebviewResponseMessage, WepinCommand } from './WebviewMessage';
export type RequestHandlerFunction = (message: WebviewRequestMessage) => void;
export type ResponseHandlerFunction = (message: WebviewResponseMessage) => void;
/**
 * return false if the event is invalid
 */
type CheckValidEventFunction = (event: MessageEvent) => boolean;
export declare class WebviewEventHandler {
    protected eventEmitter: SafeEventEmitter;
    private checkValidEvent;
    constructor(params?: {
        checkValidEvent?: CheckValidEventFunction;
    });
    getEventListenerFunction(): (event: MessageEvent) => void;
    setCheckValidEventFunction(checkInValidEvent: CheckValidEventFunction): void;
    addRequestHandler(command: WepinCommand, handler: RequestHandlerFunction, once?: boolean): void;
    removeRequestHandler(command: WepinCommand, handler: RequestHandlerFunction): void;
    /**
     * Receives an id, not a command, because it needs to handle a response to a specific request
     *
     * @param id
     * @param handler
     * @param once
     * @returns
     */
    addResponseHandler(id: string, handler: ResponseHandlerFunction, once?: boolean): void;
    removeResponseHandler(command: WepinCommand, handler: ResponseHandlerFunction): void;
    /**
     * Add a handler for all requests or responses, not just a specific request or response.
     * Register a function to run before or after a specific request, response, or both.
     *
     * @param handler
     */
    addGlobalHandler<T extends GlobalWhenRequest | GlobalWhenResponse>(when: T, handler: T extends GlobalWhenRequest ? RequestHandlerFunction : ResponseHandlerFunction): void;
    removeGlobalHandler<T extends GlobalWhenRequest | GlobalWhenResponse>(when: T, handler: T extends GlobalWhenRequest ? RequestHandlerFunction : ResponseHandlerFunction): void;
    private handleMessage;
}
export {};
