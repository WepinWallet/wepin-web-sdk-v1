import { default as InterfaceAPI } from '../../InterfaceAPI';
import { default as IAppAPI } from './IAppAPI';
import { ErrorResponse } from '../../APITypes';
import { IApp, ProjectPlatformKind, RegisterRequestBody, TypeLayoutByIdResponse, TypeLayoutResponse, TypeThemeResponse, ICoinInfo } from '../../../types';

declare class AppAPI implements IAppAPI {
    private fetcher;
    private basePath;
    constructor(fetcher: InterfaceAPI);
    getThemeById(params: {
        id: number;
    }): Promise<TypeThemeResponse | ErrorResponse>;
    getLayoutById(params: {
        id: number;
    }): Promise<TypeLayoutByIdResponse | ErrorResponse>;
    getAppInfo(queries: {
        platform: ProjectPlatformKind;
        withNetwork: boolean;
    }): Promise<{
        stage: number;
        appInfo: IApp;
    } | ErrorResponse>;
    getAppCoins(queries: {
        localeId: number;
    }): Promise<{
        coins: ICoinInfo[];
    } | ErrorResponse>;
    getAppTheme(): Promise<TypeLayoutResponse | ErrorResponse>;
    register(body: RegisterRequestBody): Promise<{
        success: boolean;
        walletId: string;
    } | ErrorResponse>;
}
export default AppAPI;
