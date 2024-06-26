import { WepinRequestMessage } from '../types/Message';
import { CreateWepinMiddlewareOptions } from '../types/wepinMiddlewareOptions';

export declare const makeRequestID: () => number;
export declare const requestFactory: ({ wepinProvider, network, req, res, next, end, command, parameter, }: {
    wepinProvider: CreateWepinMiddlewareOptions["wepinProvider"];
    network: CreateWepinMiddlewareOptions["network"];
    req: any;
    res: any;
    next: any;
    end: any;
    command: WepinRequestMessage["body"]["command"];
    parameter: any;
}) => void;
