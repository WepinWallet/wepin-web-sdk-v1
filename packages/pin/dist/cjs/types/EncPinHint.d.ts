export interface EncPinHint {
    /**
     * The version of the hint
     */
    version: number;
    /**
     * The length of the hint
     */
    length: string;
    /**
     * encrypted hint data
     */
    data: string;
}
