import { InvalidatedJsonRpcRequest } from '../types/EIP1193';
import { CreateWepinMiddlewareOptions } from '../types/wepinMiddlewareOptions';

export declare const switchEthereumChain: ({ wepinProvider, network }: CreateWepinMiddlewareOptions) => (req: InvalidatedJsonRpcRequest, res: any, next: any, end: any) => any;
