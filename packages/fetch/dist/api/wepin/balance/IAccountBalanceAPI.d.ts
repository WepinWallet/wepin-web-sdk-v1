import { GetAccountBalanceResponseBody } from '../../../types';
import type { ErrorResponse } from '../../APITypes';
interface IAccountBalanceAPI {
    getAccountBalance(params: {
        accountId: string;
    }): Promise<GetAccountBalanceResponseBody | ErrorResponse>;
}
export default IAccountBalanceAPI;
