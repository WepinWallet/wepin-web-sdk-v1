import EventEmitter from 'eventemitter2';
import type { Listener, OnOptions } from 'eventemitter2';
import type { APIEvents, EventListenerFunctions } from './APIEvents';
import type APIRequest from './APIRequest';
import APIResponse from './APIResponse';
import type { URLParams, Headers, RequestData } from './APITypes';
import type InterfaceAPI from './InterfaceAPI';
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
