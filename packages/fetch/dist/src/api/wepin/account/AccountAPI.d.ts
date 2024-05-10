import { IAppAccount } from '../../../types';
import { default as IAccountAPI } from './IAccountAPI';
import { default as InterfaceAPI } from '../../InterfaceAPI';
import { ErrorResponse } from '../../APITypes';

declare class AccountAPI implements IAccountAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    readdress(body: {
        userId: string;
        walletId: string;
        accountId: string;
    }): Promise<{
        result: boolean;
        message?: string;
    } | ErrorResponse>;
    getAppAccountList(queries: {
        walletId: string;
        userId: string;
        localeId: number;
    }): Promise<{
        walletId: string;
        accounts: IAppAccount[];
        aa_accounts: IAppAccount[];
    } | ErrorResponse>;
}
export default AccountAPI;
