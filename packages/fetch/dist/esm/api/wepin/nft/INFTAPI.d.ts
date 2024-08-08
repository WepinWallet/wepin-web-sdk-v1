import { IAppNFT, SupportNetwork } from '../../../types/index.js';
import type { ErrorResponse } from '../../APITypes.js';
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
