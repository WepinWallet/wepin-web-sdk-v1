import { WepinRequestMessage, WepinResponseMessage } from '../types/Message.js';
type WebviewType = Window | HTMLIFrameElement;
/**
 * Basically, Widget has control over Webview.
 * Client must not handle this object directly.
 * It Also has informations about Webview itself.
 */
export declare abstract class Widget {
    private static _webview;
    readonly id: string;
    readonly url: string;
    readonly type: 'Frame' | 'Window';
    readonly isHide: boolean;
    isWidgetReady: boolean;
    private EL;
    protected _open: boolean;
    get isOpen(): boolean;
    static getWebview(id: string): WebviewType;
    static clearWebview(id: string): void;
    static clearAllWebview(): void;
    protected constructor(url: string, webview: HTMLIFrameElement | Window, type: 'Frame' | 'Window', EL: (event: MessageEvent<any>) => void, isHide?: boolean);
    protected abstract expand(): void;
    protected abstract shrink(): void;
    protected abstract _post(message: WepinResponseMessage | WepinRequestMessage): void;
    protected abstract _closeWebview(): Promise<void>;
    close(): Promise<void>;
    response(data: WepinResponseMessage): void;
    request(data: WepinRequestMessage): void;
}
export {};
