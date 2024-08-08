import { EncPinHint } from './EncPinHint.js';
import { EncUVD } from './EncUVD.js';
export interface RegistrationPinBlock {
    /**
     * encrypted PIN
     */
    UVD: EncUVD;
    /**
     * Hints in the encrypted PIN
     */
    hint: EncPinHint;
}
