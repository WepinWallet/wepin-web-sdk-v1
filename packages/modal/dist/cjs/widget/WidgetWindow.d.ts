import { WepinResponseMessage } from '../types/Message.js';
import { Widget } from './Widget.js';
export interface WidgetWindowFeatures {
    width: number;
    height: number;
    sLeft: number;
    sTop: number;
}
export declare class WidgetWindow extends Widget {
    private constructor();
    private static timer;
    static openNew({ url, EL, widgetFeatures, }: {
        url: string;
        EL: (event: MessageEvent<any>) => void;
        widgetFeatures?: WidgetWindowFeatures;
    }): Promise<WidgetWindow>;
    protected expand(): void;
    protected shrink(): void;
    protected _closeWebview(): void;
    protected _post(message: WepinResponseMessage): void;
}
