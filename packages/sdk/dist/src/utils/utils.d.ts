import { modeByAppKey } from '../types/modeByAppKey';

export default class Utils {
    static isMobile(): boolean;
    static messages(modeByAppKey: modeByAppKey): {
        hasValidOrigin: (message: MessageEvent) => boolean;
    };
    static getUrls(modeByAppKey: modeByAppKey): {
        wepinWebview: string;
    };
    static uuidv4(): string;
    static checkSameNumber: (pin: string, times: number, isRegisterRequired: boolean) => boolean;
}
