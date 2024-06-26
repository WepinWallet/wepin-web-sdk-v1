import { WebviewResponseMessage } from '../types/LoginMessage';
import { WepinLogin } from '../WepinLogin';

export declare const WebviewResponseHandler: (message: WebviewResponseMessage, wepinSDK: WepinLogin) => void;
