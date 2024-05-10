export interface ITokenBalance {
    contract: string;
    name?: string;
    decimals: number;
    symbol: string;
    tokenId: number;
    balance: string;
}
export interface IAccountBalance {
    decimals: number;
    symbol: string;
    tokens: ITokenBalance[];
    balance: string;
}
export type GetAccountBalanceResponseBody = IAccountBalance;
