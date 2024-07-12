import { WepinFetch } from '../../WepinFetch';
import APIRequest from '../APIRequest';
import type APIResponse from '../APIResponse';
import type { URLParams, Headers, RequestData } from '../APITypes';
import FetchAPI from '../FetchAPI';
import type InterfaceAPI from '../InterfaceAPI';
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
