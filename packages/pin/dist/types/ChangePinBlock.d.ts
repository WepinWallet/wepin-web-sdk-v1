import { EncPinHint } from './EncPinHint';
import { EncUVD } from './EncUVD';
export interface ChangePinBlock {
    /**
     * The user's existing encrypted PIN
     */
    UVD: EncUVD;
    /**
     * The user's new encrypted PIN
     */
    newUVD: EncUVD;
    hint: EncPinHint;
    otp?: string;
}
