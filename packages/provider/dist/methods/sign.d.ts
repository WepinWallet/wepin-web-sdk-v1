import { InvalidatedJsonRpcRequest } from '../types/EIP1193';
import { CreateWepinMiddlewareOptions } from '../types/wepinMiddlewareOptions';
/**
 * eth_sign: [address, data]
 * personal_sign: [data, address]
 */
export declare const sign: ({ wepinProvider, network, isPersonal, }: CreateWepinMiddlewareOptions & {
    isPersonal: boolean;
}) => (req: InvalidatedJsonRpcRequest, res: any, next: any, end: any) => void;
