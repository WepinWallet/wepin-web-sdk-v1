export type UVD = {
    UVD: string;
    nonce: number;
};
export type EncUVD = {
    seqNum?: number;
    b64SKey: string;
    b64Data: string;
};
export type Hint = {
    version: number;
    length: string;
    data: string;
};
