import { IAppNFT, SupportNetwork } from '../../../types/index.js';
import type { ErrorResponse } from '../../APITypes.js';
import type InterfaceAPI from '../../InterfaceAPI.js';
import type INFTAPI from './INFTAPI.js';
declare class NFTAPI implements INFTAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    getSupportingNetworkList(): Promise<{
        supportNetworkList: SupportNetwork[];
    } | ErrorResponse>;
    getAppNFTList(queries: {
        walletId: string;
        userId: string;
    }): Promise<{
        nfts: IAppNFT[];
    } | ErrorResponse>;
    refreshAppNFTList(queries: {
        walletId: string;
        userId: string;
    }): Promise<{
        nfts: IAppNFT[];
    } | ErrorResponse>;
}
export default NFTAPI;
