import { WepinFetch } from '../../WepinFetch.js';
import type IAccountAPI from './account/IAccountAPI.js';
import type IAppAPI from './app/IAppAPI.js';
import type IAccountBalanceAPI from './balance/IAccountBalanceAPI.js';
import type INFTAPI from './nft/INFTAPI.js';
import type ITransactionAPI from './transaction/ITransactionAPI.js';
import type IUserAPI from './user/IUserAPI.js';
import type IWalletAPI from './wallet/IWalletAPI.js';
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
