export interface VerifyData {
    UVD: EncUVD;
    otpCode?: OTP;
}
export interface EncUVD {
    b64SKey: string;
    b64Data: string;
}
export interface Hint {
    version?: number;
    length: string | number;
    data: string;
}
export interface OTP {
    code: string;
    recovery: boolean;
}
export interface RemainTime {
    hours: number;
    minutes: number;
}
export interface pinSDKParams {
    loginStatus: string;
    pinRequired?: boolean;
    token?: string;
    sign?: string;
}
export interface openPinOptions {
    type: 'create' | 'verify';
    useGuide?: boolean;
    token?: string;
    isNotRegister?: boolean;
    from?: string;
    sdkParams?: pinSDKParams;
}
