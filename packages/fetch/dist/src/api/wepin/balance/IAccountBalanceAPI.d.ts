import { ErrorResponse } from '../../APITypes';
import { GetAccountBalanceResponseBody } from '../../../types';

interface IAccountBalanceAPI {
    getAccountBalance(params: {
        accountId: string;
    }): Promise<GetAccountBalanceResponseBody | ErrorResponse>;
}
export default IAccountBalanceAPI;
