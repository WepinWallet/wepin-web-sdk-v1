import { GetAccountBalanceResponseBody } from '../../../types/index.js';
import type { ErrorResponse } from '../../APITypes.js';
interface IAccountBalanceAPI {
    getAccountBalance(params: {
        accountId: string;
    }): Promise<GetAccountBalanceResponseBody | ErrorResponse>;
}
export default IAccountBalanceAPI;
