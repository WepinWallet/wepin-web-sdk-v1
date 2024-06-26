import { IAppAccount } from '../../../types';
import { ErrorResponse } from '../../APITypes';

interface IAccountAPI {
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
export default IAccountAPI;
