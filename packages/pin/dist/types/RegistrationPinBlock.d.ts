import { EncPinHint } from './EncPinHint';
import { EncUVD } from './EncUVD';
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
