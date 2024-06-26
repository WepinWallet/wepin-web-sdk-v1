import { IAppNFT, SupportNetwork } from '../../../types';
import { ErrorResponse } from '../../APITypes';

interface INFTAPI {
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
export default INFTAPI;
