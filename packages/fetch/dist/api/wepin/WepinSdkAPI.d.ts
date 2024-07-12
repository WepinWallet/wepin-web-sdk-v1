import { WepinFetch } from '../../WepinFetch';
import type IAccountAPI from './account/IAccountAPI';
import type IAppAPI from './app/IAppAPI';
import type IAccountBalanceAPI from './balance/IAccountBalanceAPI';
import type INFTAPI from './nft/INFTAPI';
import type ITransactionAPI from './transaction/ITransactionAPI';
import type IUserAPI from './user/IUserAPI';
import type IWalletAPI from './wallet/IWalletAPI';
declare class WepinSdkAPI {
    app: IAppAPI;
    user: IUserAPI;
    wallet: IWalletAPI;
    account: IAccountAPI;
    balance: IAccountBalanceAPI;
    nft: INFTAPI;
    transaction: ITransactionAPI;
    constructor(baseUrl: string, params: {
        appId: string;
        appKey: string;
        domain: string;
        sdk: {
            version: string;
            type: string;
        };
        wepinFetch?: WepinFetch;
    });
}
export default WepinSdkAPI;
