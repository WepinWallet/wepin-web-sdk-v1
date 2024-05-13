import { WepinFetch } from '@wepin/fetch-js';

export declare const checkAndVerifyEmail: ({ isRequireVerified, email, locale, wepinFetch, wepinUrl, openWepinWallet, }: {
    isRequireVerified: boolean;
    email: string;
    locale: string;
    wepinFetch: WepinFetch;
    wepinUrl: URL;
    openWepinWallet?: boolean;
}) => Promise<{
    oobReset: string;
    oobVerify: string;
}>;
export declare const signUpEmail: ({ oobReset, oobVerify, email, password, wepinFetch, }: {
    oobReset: string;
    oobVerify: string;
    email: string;
    password: string;
    wepinFetch: WepinFetch;
}) => Promise<void>;
