import { WidgetWindowFeatures } from './WidgetWindow';
export declare const getWindowFeaturesOption: (widgetFeatures?: WidgetWindowFeatures) => string;
export declare const getIFrameElement: (widgetFeatures?: {
    isHide: boolean;
}) => HTMLIFrameElement;
export declare const uuidv4: () => string;
