export interface EthSignTransactionParams {
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
export interface EthSignMessageParams {
    type: 'msg_sign';
    txData: {
        data: string;
    };
}
export interface EthSignDataParams {
    type: 'sign_data';
    txData: {
        version: 'V1' | 'V3' | 'V4';
        data: any;
    };
}
