import type { IAppAccount } from '@wepin/fetch-js';
import { Account } from '../types/Account.js';
export declare const getAccountSDK: (accountList: IAppAccount[]) => Account[];
/**
 * aa_accounts에 해당하는 coin, token의 경우, 계정리스트의 account를 aa_account값으로 대체하거나 account와 aa_account를 모두 포함시킨다.
 * @param accountList accounts와 aa_accounts를 가진 accountList
 * @param withEoa (optional) eoa 계정을 계정리스트에 포함할지 여부
 */
export declare const filterAccountList: (accountList: {
    accounts: IAppAccount[];
    aa_accounts: IAppAccount[];
}, withEoa?: boolean) => IAppAccount[];
