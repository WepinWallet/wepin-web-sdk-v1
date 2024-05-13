type WepinGetSdkRequestCommand = 'send_transaction_without_provider';
type WepinCommand = 'ready_to_widget' | 'close_wepin_widget' | 'set_local_storage' | 'set_user_email' | 'get_sdk_request' | WepinGetSdkRequestCommand;
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
export {};
