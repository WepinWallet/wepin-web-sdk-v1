import { LoginProviders } from './LoginProviders';

export interface IWepinSDKAttributes {
    type?: string;
    defaultLanguage?: string;
    defaultCurrency?: string;
    loginProviders?: Array<LoginProviders>;
}
