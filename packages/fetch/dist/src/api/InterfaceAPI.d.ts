import { EventEmitter2, Listener, OnOptions } from 'eventemitter2';
import { default as APIRequest } from './APIRequest';
import { default as APIResponse } from './APIResponse';
import { Headers, URLParams, RequestData } from './APITypes';
import { APIEvents, EventListenerFunctions } from './APIEvents';

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
