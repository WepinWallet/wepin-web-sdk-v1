import type APIRequest from './APIRequest.js';
import type APIResponse from './APIResponse.js';
export declare const APIEvents: {
    readonly request: "request";
    readonly response: "response";
};
export interface EventListenerFunctions {
    [APIEvents.request]: (request: APIRequest<any, unknown, unknown>, middlewareOptions?: any) => void;
    [APIEvents.response]: (response: APIResponse<any, any, any>, middlewareOptions?: any) => void;
}
