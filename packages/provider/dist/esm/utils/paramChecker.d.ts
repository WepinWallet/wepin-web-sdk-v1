import { Transaction } from '@solana/web3.js';
export declare const signTransactionParameterChecker: (param: object) => boolean;
export declare const parsingSolanaTransaction: (transaction: string) => {
    from: string;
    to: string;
    value?: undefined;
} | {
    from: string;
    to: string;
    value: string;
};
export declare const decodeTransaction: (inputTransaction: string, transaction: string) => Transaction;
