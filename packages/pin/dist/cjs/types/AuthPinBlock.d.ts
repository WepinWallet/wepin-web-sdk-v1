import { EncUVD } from './EncUVD.js';
export interface AuthPinBlock {
    /**
     * encypted pin list
     */
    UVDs: EncUVD[];
    /**
     * If OTP authentication is required, include the OTP.
     */
    otp?: string;
}
