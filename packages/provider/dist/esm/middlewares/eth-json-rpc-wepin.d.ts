import { CreateWepinMiddlewareOptions } from '../types/wepinMiddlewareOptions.js';
/**
 * Methods handling RPC requests would be proceeded on Wepin widget
 *
 * @param wepin Wepin Object to connect with
 * @param network network string injected by client when getting provider
 * @returns
 */
export declare const createWepinMiddleware: ({ wepinProvider, network, }: CreateWepinMiddlewareOptions) => import("json-rpc-engine").JsonRpcMiddleware<unknown, unknown>;
