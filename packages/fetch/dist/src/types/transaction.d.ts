import { WepinAccount } from './account';
import { EncUVD, OTP } from './wepinUtil';

export interface prepareTransactionResult {
    tokenId?: number;
    contract?: string;
    balance: string;
    decimals: number;
    symbol: string;
    detail?: {
        gasLimit: number;
        gasPrice: {
            high: number;
            medium: number;
            low: number;
        };
        nonce: number;
    };
}
export interface PrepareTxParams {
    userId: string;
    accountId: string;
    contract?: string;
    to: string | null;
    amount?: string;
    data?: string;
    tokenId?: string;
    isNft?: 'ERC1155' | 'ERC721';
}
export interface EthSignTransactionParams extends BaseSignParams {
    type: 'transaction';
    txData: {
        gasLimit: string;
        gasPrice: string;
        to: string;
        nonce: number;
        amount: string;
        data: string;
    };
}
export interface EthSignMessageParams extends BaseSignParams {
    type: 'msg_sign';
    txData: {
        data: string;
    };
}
export interface EthSignDataParams extends BaseSignParams {
    type: 'sign_data';
    txData: {
        version: 'V1' | 'V3' | 'V4';
        data: any;
    };
}
export interface EthSignMessageResult {
    signatureResult: string;
    transaction: {
        data: string;
        coinId: number;
        address: string;
    };
}
export interface BaseSignParams {
    userId: string;
    walletId: string;
    type: 'transaction' | 'msg_sign' | 'sign_data';
    pin: EncUVD;
    otpCode?: OTP;
    accountId: string;
    contract?: string;
    tokenId?: string;
    isNft?: string;
}
export interface EthSignTransactionResult {
    signatureResult: {
        sign: {
            r: string;
            s: string;
            v: string;
        };
        signedTx: string;
    };
    transaction: {
        address: string;
        amount: string;
        chainId: string;
        coinId: number;
        data: string;
        gasLimit: number;
        gasPrice: string;
        input: string;
        nonce: number;
        to: string;
        toOrigin: string;
        txTypeDb: {
            id: number;
            name: string;
        };
        value: string;
    };
}
export interface EthSendTransactionResult extends EthSignTransactionResult {
    broadcastData: string;
    txid: string;
}
export interface BroadCastParams extends BaseSignParams {
    signatureResult: EthSignTransactionResult['signatureResult'];
    transaction: EthSignTransactionResult['transaction'];
}
export interface SignTransactionParams {
    from: string;
    to?: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data: string;
    nonce?: string;
}
export interface WepinSignTransactionParams extends SignTransactionParams {
    account: WepinAccount;
}
