import { EncUVD, Hint } from './wepinUtil';
export type RegisterRequestBody = {
    appId: string;
    userId: string;
    loginStatus: 'pinRequired';
    UVD: EncUVD;
    hint: Hint;
} | {
    appId: string;
    userId: string;
    loginStatus: 'registerRequired';
    walletId: string;
    UVD?: EncUVD;
};
/**
 * /theme 으로 현재 app 의 layout 과 theme 조회시 나오는 response
 */
export interface TypeLayoutResponse {
    layout: any;
    palette: any;
    theme: string;
    assets: Record<string, string>;
}
/**
 * id 로 layout 조회시 나오는 response
 */
export interface TypeLayoutByIdResponse {
    id: number;
    layout: TypeWidgetLayout;
}
export interface TypeWidgetLayout {
    widgetLayout: {
        theme: 1 | 2;
        component: 'wallet' | 'nft';
    }[];
}
export interface TypeThemeResponse {
    id: number;
    themeData: {
        name: string;
        assets: unknown;
        palette: unknown;
    };
}
export declare enum AppState {
    Activated = 1,
    Deactivated = 2,
    Recovered = 3
}
export declare enum ProjectPlatformKind {
    web = 1,
    android = 2,
    ios = 3
}
export interface IApp {
    id: string;
    assets: {
        coinId: number;
        tokens: number[];
        nftContracts: number[];
    }[];
    iconImage: string;
    logoImage: string;
    color: string;
    state: AppState;
    category: string;
    name: string;
    desc: string;
    modifiedTime: string;
    createdTime: string;
    layout: object;
    theme: object;
    includeOtherAsset: boolean;
    property: {
        emailVerify: boolean;
    };
    aaState?: boolean;
}
