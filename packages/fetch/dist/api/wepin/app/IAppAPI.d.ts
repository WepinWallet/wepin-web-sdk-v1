import { IApp, ProjectPlatformKind, RegisterRequestBody, TypeLayoutByIdResponse, TypeLayoutResponse, TypeThemeResponse, ICoinInfo } from '../../../types';
import type { ErrorResponse } from '../../APITypes';
interface IAppAPI {
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
export default IAppAPI;
