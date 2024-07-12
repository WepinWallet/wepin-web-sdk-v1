import { GetAccountBalanceResponseBody } from '../../../types';
import type { ErrorResponse } from '../../APITypes';
import type InterfaceAPI from '../../InterfaceAPI';
import type IAccountBalanceAPI from './IAccountBalanceAPI';
declare class AccountBalanceAPI implements IAccountBalanceAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    getAccountBalance(params: {
        accountId: string;
    }): Promise<GetAccountBalanceResponseBody | ErrorResponse>;
}
export default AccountBalanceAPI;
