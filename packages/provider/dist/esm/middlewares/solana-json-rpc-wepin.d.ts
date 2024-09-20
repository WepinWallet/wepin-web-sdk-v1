import { CreateWepinMiddlewareOptions } from '../types/wepinMiddlewareOptions.js';
export declare const createWepinMiddleware: ({ wepinProvider, network, }: CreateWepinMiddlewareOptions) => import("json-rpc-engine").JsonRpcMiddleware<unknown, unknown>;
