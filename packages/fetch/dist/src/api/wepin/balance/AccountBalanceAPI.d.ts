import { GetAccountBalanceResponseBody } from '../../../types';
import { default as InterfaceAPI } from '../../InterfaceAPI';
import { default as IAccountBalanceAPI } from './IAccountBalanceAPI';
import { ErrorResponse } from '../../APITypes';

declare class AccountBalanceAPI implements IAccountBalanceAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    getAccountBalance(params: {
        accountId: string;
    }): Promise<GetAccountBalanceResponseBody | ErrorResponse>;
}
export default AccountBalanceAPI;
