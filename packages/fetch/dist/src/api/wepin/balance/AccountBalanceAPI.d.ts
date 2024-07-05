import { ErrorResponse } from '../../APITypes';
import { default as IAccountBalanceAPI } from './IAccountBalanceAPI';
import { default as InterfaceAPI } from '../../InterfaceAPI';
import { GetAccountBalanceResponseBody } from '../../../types';

declare class AccountBalanceAPI implements IAccountBalanceAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    getAccountBalance(params: {
        accountId: string;
    }): Promise<GetAccountBalanceResponseBody | ErrorResponse>;
}
export default AccountBalanceAPI;
