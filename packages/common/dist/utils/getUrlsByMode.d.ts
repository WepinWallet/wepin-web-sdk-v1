import { modeByAppKey } from '../types/modeByAppKey';
export declare function getUrlsByMode(modeByAppKey: modeByAppKey): {
    wepinWebview: string;
    sdkBackend: string;
    wallet: string;
};
