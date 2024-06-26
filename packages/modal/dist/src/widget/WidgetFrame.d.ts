import { Widget } from './Widget';
import { WepinResponseMessage } from '../types/Message';

export declare class WidgetFrame extends Widget {
    static scrollPosition: number;
    private constructor();
    static openNew({ url, EL, widgetOptions, }: {
        url: string;
        EL: (event: MessageEvent<any>) => void;
        widgetOptions?: {
            isHide?: boolean;
        };
    }): Promise<WidgetFrame>;
    protected expand(): void;
    protected shrink(): void;
    protected _closeWebview(): void;
    protected _post(message: WepinResponseMessage): void;
}
