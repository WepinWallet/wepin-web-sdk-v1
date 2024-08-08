import { GetAccountBalanceResponseBody } from '../../../types/index.js';
import type { ErrorResponse } from '../../APITypes.js';
import type InterfaceAPI from '../../InterfaceAPI.js';
import type IAccountBalanceAPI from './IAccountBalanceAPI.js';
declare class AccountBalanceAPI implements IAccountBalanceAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    getAccountBalance(params: {
        accountId: string;
    }): Promise<GetAccountBalanceResponseBody | ErrorResponse>;
}
export default AccountBalanceAPI;
