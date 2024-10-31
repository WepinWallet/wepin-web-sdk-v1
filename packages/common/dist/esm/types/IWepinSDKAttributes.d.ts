import { LoginProviders } from './LoginProviders.js';
export interface IWepinSDKAttributes {
    /**
     * This determines how the widget is displayed when Wepin is initiated. The default value is 'hide' and currently, only 'hide' is supported.
     */
    type?: string;
    /**
     * This sets the language displayed on the widget. The default value is 'en', but you can also set it to 'ko' or 'ja'.
     */
    defaultLanguage?: string;
    /**
     * This sets the currency displayed on the widget. The default value is 'USD', but you can also set it to 'KRW' or 'JPY'.
     */
    defaultCurrency?: string;
    /**
     * An array of login providers to configure the widget.
     * - If not provided, all available login providers will be displayed on the widget.
     * - If an empty array is provided, only the email login function is available. (from version v0.0.3)
     */
    loginProviders?: Array<LoginProviders>;
}
