import { InvalidatedJsonRpcRequest } from '../types/EIP1193.js';
import { CreateWepinMiddlewareOptions } from '../types/wepinMiddlewareOptions.js';
export declare const solanaSignAllTransactions: ({ wepinProvider, network }: CreateWepinMiddlewareOptions) => (req: InvalidatedJsonRpcRequest, res: any, next: any, end: any) => void;
