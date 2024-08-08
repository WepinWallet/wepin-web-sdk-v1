import { IAppAccount } from '../../../types/index.js';
import type { ErrorResponse } from '../../APITypes.js';
import type InterfaceAPI from '../../InterfaceAPI.js';
import type IAccountAPI from './IAccountAPI.js';
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
