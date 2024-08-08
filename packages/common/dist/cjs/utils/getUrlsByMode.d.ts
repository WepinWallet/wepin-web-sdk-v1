import { modeByAppKey } from '../types/modeByAppKey.js';
export declare function getUrlsByMode(modeByAppKey: modeByAppKey): {
    wepinWebview: string;
    sdkBackend: string;
    wallet: string;
};
