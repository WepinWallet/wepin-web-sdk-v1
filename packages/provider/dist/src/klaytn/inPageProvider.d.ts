import { BaseProvider } from '../BaseProvider';
import { WepinProvider } from '..';
import { RpcUrlType } from '../types/info';

export default class InPageProvider extends BaseProvider {
    constructor({ network, rpcUrl, chainId, wepinProvider, }: {
        network: string;
        rpcUrl: RpcUrlType[];
        chainId: string;
        wepinProvider: WepinProvider;
    });
    static generate(params: {
        network: string;
        address?: string;
        wepinProvider: WepinProvider;
    }): Promise<InPageProvider>;
}
