import { EncUVD, Hint } from './wepinUtil';
export declare enum WalletPinState {
    normal = 1,
    resetRequest = 2,
    resetAvailable = 3,
    blocked = 4
}
export declare enum WalletState {
    created = 1,
    verified = 2,
    blocked = 3,
    exported = 4
}
export interface IWallet {
    id: string;
    userId: string;
    label: string;
    defaultWallet: boolean;
    state: WalletState;
    pinState: WalletPinState;
    createdTime: string;
    exportedTime: string;
    order: number;
    createdBy: string;
}
export interface VerifyPinRequestBody {
    userId: string;
    walletId: string;
    UVD: EncUVD;
}
export interface VerifyPinResponseBody {
    status: string;
    walletId: string;
    pinVerified: boolean;
}
export interface ChangePinRequestBody {
    userId: string;
    walletId: string;
    UVD: EncUVD;
    newUVD: EncUVD;
    hint: Hint;
}
export interface ChangePinResponseBody {
    status: boolean;
}
export interface FetchWalletInfoResponseBody {
    walletId: string;
    createTime: string;
    createdBy: string;
    label: string;
}
export interface GetWalletKeyInfoResponseBody {
    status: string;
    walletId: string;
    maxTryCnt: number;
    remainTryCnt: number;
    b64PubKey: string;
    nonce: number;
    recvResetCmd: boolean;
    lockTime: string;
    releaseTimestamp?: string;
    isBlocked: boolean;
}
export interface ResetPinTryCountResponseBody {
    status: string;
    walletId: string;
    maxTryCnt: number;
    remainPinTryCnt: number;
    recvResetCmd: boolean;
    lockTime: string;
    releaseTimestamp: string;
}
