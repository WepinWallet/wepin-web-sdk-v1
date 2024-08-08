export type EncUVD = {
    /**
     * Values to check for when using PIN numbers to ensure they are used in order
     */
    seqNum?: number;
    /**
     * A key that encrypts data encrypted with the wepin's public key.
     */
    b64SKey: string;
    /**
     * data encrypted with the original key in b64SKey
     */
    b64Data: string;
};
