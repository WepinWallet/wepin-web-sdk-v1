import type { EventEmitter2, Listener, OnOptions } from 'eventemitter2';
import type { APIEvents, EventListenerFunctions } from './APIEvents.js';
import type APIRequest from './APIRequest.js';
import type APIResponse from './APIResponse.js';
import type { Headers, URLParams, RequestData } from './APITypes.js';
interface InterfaceAPI extends EventEmitter2 {
    send: <THeaders extends Headers | undefined, TData extends RequestData, TURLParams extends URLParams, TAPIRequest extends APIRequest<THeaders, TData, TURLParams>, TAPIResponse extends APIResponse<unknown, unknown, TAPIRequest>>(request: TAPIRequest, middlewareOptions?: any) => Promise<TAPIResponse>;
    baseUrl?: string;
    addListener<T extends keyof typeof APIEvents>(event: T, listener: EventListenerFunctions[T]): this | Listener;
    on<T extends keyof typeof APIEvents>(event: T, listener: EventListenerFunctions[T], options?: true | OnOptions): this | Listener;
    prependListener<T extends keyof typeof APIEvents>(event: T, listener: EventListenerFunctions[T], options?: boolean | OnOptions): this | Listener;
    once<T extends keyof typeof APIEvents>(event: T, listener: EventListenerFunctions[T], options?: boolean | OnOptions): this | Listener;
    emit<T extends keyof typeof APIEvents>(event: T, ...values: Parameters<EventListenerFunctions[T]>): boolean;
    emitAsync<T extends keyof typeof APIEvents>(event: T, ...values: Parameters<EventListenerFunctions[T]>): Promise<any[]>;
}
export default InterfaceAPI;
