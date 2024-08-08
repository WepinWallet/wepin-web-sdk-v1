export type LocalStorageType = {
    [key in LocalStorageKey]?: LocalStorageData;
};
export type LocalStorageKey = 'firebase:wepin' | 'oauth_provider_pending' | 'wallet_id' | 'user_id' | 'wepin:connectUser' | 'user_info' | 'app_language' | 'user_status' | 'selectedAddress';
export type LocalStorageData = IFirebaseWepin | oauthProvider | string | IWepinToken | IUserInfo | IAppLanguage | IUserStatus | IWepinProviderSelectedAddress;
export type oauthProvider = //string
'google' | 'apple' | 'email' | 'naver' | 'discord' | 'external_token';
export interface IFirebaseWepin {
    provider: oauthProvider;
    idToken: string;
    refreshToken: string;
}
export interface IWepinToken {
    accessToken: string;
    refreshToken: string;
}
export type IUserInfo = {
    status: 'success' | 'fail';
    userInfo?: {
        userId: string;
        email: string;
        provider: oauthProvider;
        use2FA: boolean;
    };
    walletId?: string;
};
export interface IAppLanguage {
    locale: string;
    currency?: string;
}
export interface IUserStatus {
    loginStatus: 'complete' | 'pinRequired' | 'registerRequired';
    pinRequired?: boolean;
}
export interface ISelectedAddress {
    userId: string;
    address: string;
    network: string;
}
export type IWepinProviderSelectedAddress = ISelectedAddress[];
