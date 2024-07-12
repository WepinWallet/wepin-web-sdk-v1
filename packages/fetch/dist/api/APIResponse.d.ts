import type APIRequest from './APIRequest';
import type { APIResponseConstructorParameter, Headers, ResponseData } from './APITypes';
declare class APIResponse<THeader extends Headers | undefined | unknown = unknown, TData extends ResponseData | unknown = unknown, TAPIRequest = APIRequest> {
    data: TData;
    status: number;
    headers?: THeader;
    request: TAPIRequest;
    constructor({ data, status, headers, request, }: APIResponseConstructorParameter<THeader, TData, TAPIRequest>);
}
export default APIResponse;
