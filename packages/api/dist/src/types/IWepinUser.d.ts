export type providerType = 'google' | 'apple' | 'email' | 'discord' | 'naver' | 'external_token';
export interface IWepinUser {
    status: 'success' | 'fail';
    userInfo?: UserInfo;
    walletId?: string;
}
interface UserInfo {
    userId: string;
    email: string;
    provider: providerType;
    use2FA: boolean;
}
export {};
