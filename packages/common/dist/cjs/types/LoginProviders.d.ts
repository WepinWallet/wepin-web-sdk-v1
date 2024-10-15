export declare const OAUTH2: readonly ["google", "apple", "naver", "discord", "facebook", "line"];
export type LoginProviders = (typeof OAUTH2)[number] | string;
