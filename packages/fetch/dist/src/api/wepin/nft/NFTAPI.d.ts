import { default as INFTAPI } from './INFTAPI';
import { default as InterfaceAPI } from '../../InterfaceAPI';
import { ErrorResponse } from '../../APITypes';
import { IAppNFT, SupportNetwork } from '../../../types';

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
