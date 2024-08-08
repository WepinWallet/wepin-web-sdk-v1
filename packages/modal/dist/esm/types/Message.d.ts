export interface WepinRequestMessage {
    header: {
        request_from: 'web';
        request_to: 'wepin_widget';
        id: number;
    };
    body: {
        command: string;
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
        command: string;
        state: 'ERROR' | 'SUCCESS';
        data: any;
    };
}
