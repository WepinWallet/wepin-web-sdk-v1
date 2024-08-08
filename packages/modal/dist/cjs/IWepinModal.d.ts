import { Platform } from '@wepin/common';
import { WidgetFrame } from './widget/WidgetFrame.js';
import { WidgetWindow } from './widget/WidgetWindow.js';
export interface IWepinModal {
    platformType: keyof typeof Platform;
    domain: string;
    openAuthBrowser(url: string, EL: (event: MessageEvent<any>) => void): Promise<WidgetWindow>;
    openModal(url: string, EL: (event: MessageEvent<any>) => void, options?: {
        isHide?: boolean;
    }): Promise<WidgetFrame>;
    closeAuthBrowser(): void;
    closeModal(): void;
}
