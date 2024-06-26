import { ChangePinRequestBody, ChangePinResponseBody, FetchWalletInfoResponseBody, GetWalletKeyInfoResponseBody, ResetPinTryCountResponseBody, VerifyPinRequestBody, VerifyPinResponseBody } from '../../../types';
import { ErrorResponse } from '../../APITypes';
import { default as InterfaceAPI } from '../../InterfaceAPI';
import { default as IWalletAPI } from './IWalletAPI';

declare class WalletAPI implements IWalletAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    verifyPin(body: VerifyPinRequestBody): Promise<VerifyPinResponseBody | ErrorResponse>;
    changePin(body: ChangePinRequestBody): Promise<ChangePinResponseBody | ErrorResponse>;
    fetchWalletInfo(params: {
        walletId: string;
    }, queries: {
        userId: string;
    }): Promise<FetchWalletInfoResponseBody | ErrorResponse>;
    getWalletKeyInfo(params: {
        walletId: string;
    }, queries: {
        userId: string;
    }): Promise<GetWalletKeyInfoResponseBody | ErrorResponse>;
    resetPinTryCount(params: {
        walletId: string;
    }, queries: {
        userId: string;
    }): Promise<ResetPinTryCountResponseBody | ErrorResponse>;
}
export default WalletAPI;
