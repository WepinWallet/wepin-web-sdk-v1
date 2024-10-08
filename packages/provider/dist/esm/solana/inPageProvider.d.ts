import { BaseProvider } from '../BaseProvider.js';
import { WepinProvider } from '../WepinProvider.js';
import { RpcUrlType } from '../types/info.js';
export default class InPageProvider extends BaseProvider {
    constructor({ network, rpcUrl, chainId, wepinProvider, }: {
        network: string;
        rpcUrl: RpcUrlType[];
        chainId?: string;
        wepinProvider: WepinProvider;
    });
    static generate(params: {
        network: string;
        address?: string;
        wepinProvider: WepinProvider;
    }): Promise<InPageProvider>;
}
