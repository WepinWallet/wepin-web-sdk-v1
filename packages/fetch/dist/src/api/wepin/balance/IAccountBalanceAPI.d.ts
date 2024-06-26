import { GetAccountBalanceResponseBody } from '../../../types';
import { ErrorResponse } from '../../APITypes';

interface IAccountBalanceAPI {
    getAccountBalance(params: {
        accountId: string;
    }): Promise<GetAccountBalanceResponseBody | ErrorResponse>;
}
export default IAccountBalanceAPI;
