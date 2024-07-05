import { default as EventEmitter, Listener, OnOptions } from 'eventemitter2';
import { APIEvents, EventListenerFunctions } from './APIEvents';
import { default as APIRequest } from './APIRequest';
import { default as APIResponse } from './APIResponse';
import { URLParams, Headers, RequestData } from './APITypes';
import { default as InterfaceAPI } from './InterfaceAPI';

declare class FetchAPI extends EventEmitter implements InterfaceAPI {
    baseUrl?: string;
    constructor(baseUrl?: string);
    send<THeaders extends Headers | undefined, TData extends RequestData, TURLParams extends URLParams, TAPIRequest extends APIRequest<THeaders, TData, TURLParams>, TAPIResponse extends APIResponse<unknown, any, TAPIRequest>>(request: TAPIRequest, middlewareOptions?: any): Promise<TAPIResponse>;
    private getUrlWithParams;
    private convertHeadersToPlainObject;
    addListener<T extends keyof typeof APIEvents>(event: T, listener: EventListenerFunctions[T]): this | Listener;
    on<T extends keyof typeof APIEvents>(event: T, listener: EventListenerFunctions[T], options?: boolean | OnOptions): this | Listener;
    prependListener<T extends keyof typeof APIEvents>(event: T, listener: EventListenerFunctions[T], options?: boolean | OnOptions): this | Listener;
    once<T extends keyof typeof APIEvents>(event: T, listener: EventListenerFunctions[T], options?: true | OnOptions): this | Listener;
    emit<T extends keyof typeof APIEvents>(event: T, ...values: Parameters<EventListenerFunctions[T]>): boolean;
    emitAsync<T extends keyof typeof APIEvents>(event: T, ...values: Parameters<EventListenerFunctions[T]>): Promise<any[]>;
}
export default FetchAPI;
