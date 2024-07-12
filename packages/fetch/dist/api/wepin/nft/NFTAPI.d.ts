import { IAppNFT, SupportNetwork } from '../../../types';
import type { ErrorResponse } from '../../APITypes';
import type InterfaceAPI from '../../InterfaceAPI';
import type INFTAPI from './INFTAPI';
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
