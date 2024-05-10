export declare enum OnChainState {
    active = 1,
    inactive = 2
}
export declare enum CoinState {
    active = 1,
    disable = 2
}
export declare enum CoinFeeType {
    Ethereum = 1,
    EVM_fixprice = 2,
    Solana = 3,
    Tron = 4,
    Near = 5
}
type Nullable<T> = T | null;
export interface ICoinInfo {
    id: number;
    name: string;
    network: string;
    coreNetwork: string;
    feeType: CoinFeeType;
    bipPath: string;
    chainId?: Nullable<string>;
    decimals?: Nullable<number>;
    state: CoinState;
    isTestnet: number;
    cmkId?: Nullable<number>;
    coinGeckoId?: Nullable<string>;
    color: string;
    symbol: string;
    order: number;
    iconUrl: string;
    explorerUrl: string;
    explorerAddress?: Nullable<string>;
    explorerTransaction?: Nullable<string>;
    explorerContract?: Nullable<string>;
    defaultAccountState: OnChainState;
    detail?: Record<string, unknown>;
    property?: Record<string, unknown>;
}
export {};
