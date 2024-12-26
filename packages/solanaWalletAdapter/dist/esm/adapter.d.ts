import { BaseMessageSignerWalletAdapter, SendTransactionOptions, TransactionOrVersionedTransaction, WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { Connection, PublicKey, TransactionSignature, TransactionVersion } from '@solana/web3.js';
export interface WepinWalletAdapterConfig {
    appId: string;
    appKey: string;
    attributes?: {
        defaultLanguage: string;
        defaultCurrency: string;
    };
    network?: string;
}
export declare const WepinWalletName: WalletName<"Wepin">;
export declare class WepinSolanaWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<string>;
    url: string;
    icon: string;
    supportedTransactionVersions: ReadonlySet<TransactionVersion>;
    private _wepinProvider;
    private _provider;
    private _readyState;
    private _publicKey;
    private _connecting;
    private _network;
    private _config;
    get publicKey(): PublicKey;
    get connecting(): boolean;
    get readyState(): WalletReadyState;
    constructor(config: WepinWalletAdapterConfig);
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signTransaction<T extends TransactionOrVersionedTransaction<this['supportedTransactionVersions']>>(transaction: T): Promise<T>;
    sendTransaction<T extends TransactionOrVersionedTransaction<this['supportedTransactionVersions']>>(transaction: T, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signAllTransactions<T extends TransactionOrVersionedTransaction<this['supportedTransactionVersions']>>(transactions: T[]): Promise<T[]>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
