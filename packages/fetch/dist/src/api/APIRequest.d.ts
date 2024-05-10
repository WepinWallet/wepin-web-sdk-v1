import { APIRequestConstructorParameter, RequestMethod, Headers, RequestData, URLParams } from './APITypes';

declare class APIRequest<THeaders extends Headers | undefined = undefined, TData extends RequestData = unknown, TURLParams extends URLParams | unknown = unknown> {
    data?: TData;
    headers?: THeaders;
    url: string;
    query?: TURLParams;
    withCredentials: boolean;
    method: RequestMethod;
    constructor({ data, headers, url, query, withCredentials, method, }: APIRequestConstructorParameter<THeaders, TData, TURLParams>);
}
export default APIRequest;
