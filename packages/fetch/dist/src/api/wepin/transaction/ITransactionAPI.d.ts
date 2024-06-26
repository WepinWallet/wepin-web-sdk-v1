import { EthSendTransactionResult, EthSignDataParams, EthSignMessageParams, EthSignMessageResult, EthSignTransactionParams, EthSignTransactionResult, PrepareTxParams, prepareTransactionResult } from '../../../types';
import { ErrorResponse } from '../../APITypes';

interface ITransactionAPI {
    sign(body: EthSignTransactionParams | EthSignMessageParams | EthSignDataParams): Promise<ErrorResponse | EthSignTransactionResult | EthSignMessageResult>;
    broadCast(body: EthSignTransactionParams): Promise<ErrorResponse | EthSendTransactionResult>;
    prepareTransaction(body: PrepareTxParams): Promise<ErrorResponse | Partial<prepareTransactionResult>>;
    checkAddressValidation(queries: {
        userId: string;
        coinId: number;
        address: string;
    }): Promise<ErrorResponse | {
        result: boolean;
    }>;
}
export default ITransactionAPI;
