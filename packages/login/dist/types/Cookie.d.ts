export interface IWepinLoginCookieData {
    idToken: string;
    refreshToken: string;
    provider: 'google' | 'apple' | 'email' | 'discord' | 'naver' | 'external_token';
}
