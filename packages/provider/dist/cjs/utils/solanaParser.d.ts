import { Transaction, VersionedTransaction } from '@solana/web3.js';
export declare const parsingSolanaTransaction: (serializedTransaction: string) => {
    from: string;
    to?: undefined;
    value?: undefined;
} | {
    from: string;
    to: string;
    value: string;
} | {
    from: string;
    to: string;
    value?: undefined;
};
export declare const decodeTransaction: (inputTransaction: string, transaction: string) => Transaction | VersionedTransaction;
