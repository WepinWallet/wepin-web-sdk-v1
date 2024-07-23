import { WepinResponseMessage } from '../types/Message';
import { Widget } from './Widget';
export declare class WidgetFrame extends Widget {
    static scrollPosition: number;
    private originalMetaContent;
    private originalBodyOverflow;
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
    protected _closeWebview(): void;
    protected _post(message: WepinResponseMessage): void;
}
