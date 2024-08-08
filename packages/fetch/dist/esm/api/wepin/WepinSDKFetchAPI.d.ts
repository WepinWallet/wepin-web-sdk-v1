import { WepinFetch } from '../../WepinFetch.js';
import APIRequest from '../APIRequest.js';
import type APIResponse from '../APIResponse.js';
import type { URLParams, Headers, RequestData } from '../APITypes.js';
import FetchAPI from '../FetchAPI.js';
import type InterfaceAPI from '../InterfaceAPI.js';
declare class WepinSDKFetchAPI extends FetchAPI implements InterfaceAPI {
    baseUrl: string;
    private params;
    constructor(baseUrl: string, params: {
        appId: string;
        appKey: string;
        domain: string;
        sdk: {
            version: string;
            type: string;
        };
        wepinFetch?: WepinFetch;
    });
    send<THeaders extends Headers | undefined, TData extends RequestData, TURLParams extends URLParams, TAPIRequest extends APIRequest<THeaders, TData, TURLParams>, TAPIResponse extends APIResponse<unknown, any, TAPIRequest>>(request: TAPIRequest, middlewareOptions?: any): Promise<TAPIResponse>;
    private setToken;
    private requestCallback;
    private responseCallback;
}
export default WepinSDKFetchAPI;
