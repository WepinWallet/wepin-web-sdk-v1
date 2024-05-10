export interface TokenBalanceInfo {
    contract: string;
    symbol: string;
    balance: string;
}
export interface AccountBalanceInfo {
    network: string;
    address: string;
    symbol: string;
    balance: string;
    tokens: TokenBalanceInfo[];
}
