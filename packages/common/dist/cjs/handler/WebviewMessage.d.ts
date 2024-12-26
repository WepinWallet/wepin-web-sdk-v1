type WepinCommonCommand = 'ready_to_widget' | 'close_wepin_widget' | 'set_local_storage';
type WepinGetSdkRequestCommand = 'send_transaction_without_provider' | 'register_wepin' | 'register_user_email';
type WepinSDKCommand = 'set_user_email' | 'get_sdk_request' | WepinGetSdkRequestCommand;
type WepinLoginCommand = 'set_token';
type WepinProviderCommand = 'request_enable' | 'sign_transaction' | 'send_transaction' | 'sign_all_transactions' | 'sign_typed_data' | 'sign' | 'wallet_switchEthereumChain' | 'provider_request' | 'dequeue_request';
type WepinPinCommand = 'pin_register' | 'pin_auth' | 'pin_change' | 'pin_otp';
export type WepinCommand = WepinCommonCommand | WepinSDKCommand | WepinLoginCommand | WepinProviderCommand | WepinPinCommand;
export interface WebviewRequestMessage {
    header: {
        request_from: 'wepin_widget';
        request_to: 'web';
        id: number;
    };
    body: {
        command: WepinCommand;
        parameter: any;
    };
}
export interface WebviewResponseMessage {
    header: {
        response_from: 'wepin_widget';
        response_to: 'web';
        id: number;
    };
    body: {
        command: WepinCommand;
        state: 'ERROR' | 'SUCCESS';
        data: any;
    };
}
export interface WepinRequestMessage {
    header: {
        request_from: 'web';
        request_to: 'wepin_widget';
        id: number;
    };
    body: {
        command: WepinCommand;
        parameter: any;
    };
}
export interface WepinResponseMessage {
    header: {
        response_from: 'web';
        response_to: 'wepin_widget';
        id: number;
    };
    body: {
        command: WepinCommand;
        state: 'ERROR' | 'SUCCESS';
        data: any;
    };
}
export declare function isWebviewRequestMessage(obj: any): obj is WebviewRequestMessage;
export declare function isWebviewResponseMessage(obj: any): obj is WebviewResponseMessage;
export declare function isWepinRequestMessage(obj: any): obj is WepinRequestMessage;
export declare function isWepinResponseMessage(obj: any): obj is WepinResponseMessage;
export {};
