import { IAccountBalance } from './accountBalance.js';
export interface IAppAccount {
    accountId: string;
    address: string;
    eoaAddress?: string;
    addressPath: string;
    coinId?: number;
    contract?: string;
    symbol: string;
    label: string;
    name: string;
    network: string;
    balance: string;
    decimals: number;
    iconUrl: string;
    ids: string;
    accountTokenId?: string;
    cmkId?: number;
    isAA?: boolean;
}
export type WepinAccount = {
    network: string;
    address: string;
    contract?: string;
};
export interface AccountListType extends IAppAccount {
    networkIconUrl?: string;
    isEVM: boolean;
}
export interface WidgetAccountBalance extends IAccountBalance {
    accountId: string;
}
