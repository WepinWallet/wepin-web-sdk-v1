import { WepinFetch } from '../../WepinFetch';
import { default as ITransactionAPI } from './transaction/ITransactionAPI';
import { default as INFTAPI } from './nft/INFTAPI';
import { default as IAccountBalanceAPI } from './balance/IAccountBalanceAPI';
import { default as IAccountAPI } from './account/IAccountAPI';
import { default as IWalletAPI } from './wallet/IWalletAPI';
import { default as IUserAPI } from './user/IUserAPI';
import { default as IAppAPI } from './app/IAppAPI';

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
