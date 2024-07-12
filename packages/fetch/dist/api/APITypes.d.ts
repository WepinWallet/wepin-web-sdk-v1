export type APIResponseConstructorParameter<Header, TData extends ResponseData | unknown, TAPIRequest> = {
    data: TData;
    status: number;
    headers?: Header;
    request: TAPIRequest;
};
export type ErrorResponse = {
    statusCode: number;
    status?: number;
    timestamp: string;
    path: string;
    message: string;
    remainPinTryCnt?: number;
    code: number;
    validationError?: string;
};
export type APIRequestConstructorParameter<Header, TData extends RequestData, URLParams> = {
    data?: TData;
    headers?: Header;
    url: string;
    query?: URLParams;
    withCredentials?: boolean;
    method: RequestMethod;
};
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type URLParams = {
    [index: string]: string;
} | undefined | unknown;
export type Headers = Record<string, string>;
export type ResponseData = Record<string, any> | undefined;
export type RequestData = Record<string, any> | unknown | undefined;
