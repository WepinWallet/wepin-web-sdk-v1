export default class Utils {
    static isMobile(): boolean;
    static uuidv4(): string;
    static checkSameNumber: (pin: string, times: number, isRegisterRequired: boolean) => boolean;
    static checkError: (result: any) => void;
}
