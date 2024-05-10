import { ErrorResponse } from '../../APITypes';
import { IAppNFT, SupportNetwork } from '../../../types';

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
