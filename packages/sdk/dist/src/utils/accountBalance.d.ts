import { IAccountBalance, IAppAccount } from '@wepin/fetch-js';
import { AccountBalanceInfo } from '../types/AccountBalanceInfo';

/**
 * aa_accounts에 해당하는 coin, token의 경우, 계정리스트의 account를 aa_account값으로 대체하거나 account와 aa_account를 모두 포함시킨다.
 * @param accountList accounts와 aa_accounts를 가진 accountList
 * @param withEoa (optional) eoa 계정을 계정리스트에 포함할지 여부
 */
export declare const filterAccountBalance: (accountList: IAppAccount[], dAccount: IAppAccount, balance: IAccountBalance) => AccountBalanceInfo;
export declare const getBalanceWithDecimal: (balance: string, decimals: number) => string;
