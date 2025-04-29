import { WepinResponseMessage } from '../types/Message.js';
import { Widget } from './Widget.js';
declare global {
    interface Window {
        __WEPIN_ORIGINAL_PAGE_INFO__: {
            metaContent: string | null;
            bodyOverflow: string | null;
        } | null;
        __WEPIN_FRAME_QUEUE__: string[];
    }
}
export declare class WidgetFrame extends Widget {
    static scrollPosition: number;
    private static validateQueue;
    private constructor();
    static openNew({ url, EL, widgetOptions, }: {
        url: string;
        EL: (event: MessageEvent<any>) => void;
        widgetOptions?: {
            isHide?: boolean;
        };
    }): Promise<WidgetFrame>;
    private setParentStyle;
    private recoverParentStyle;
    protected expand(): void;
    protected shrink(): void;
    protected _closeWebview(): Promise<void>;
    protected _post(message: WepinResponseMessage): void;
}
