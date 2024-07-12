import { IAppAccount } from '../../../types';
import type { ErrorResponse } from '../../APITypes';
import type InterfaceAPI from '../../InterfaceAPI';
import type IAccountAPI from './IAccountAPI';
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
