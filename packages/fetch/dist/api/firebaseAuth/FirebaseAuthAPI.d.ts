import type { ResponseUserInfo, ResponseResetPassword, ResponseVerifyEmail, ResponseSignUp, ResponseSignInWithPassword, ResponseUpdatePassword } from '../../types/firebaseAuthAPI';
import type { FirebaseAPI } from './IAPI';
declare class FirebaseAuthAPI implements FirebaseAPI {
    private fetcher;
    private firebaseKey;
    private FIREBASE_AUTH_URL;
    private BCRYPT_SALT;
    constructor(config: any);
    checkError(response: any): void;
    signUpWithEmailPassword(email: string, password: string, withEncryption?: boolean): Promise<ResponseSignUp>;
    signInWithEmailPassword(email: string, password: string, withEncryption?: boolean): Promise<ResponseSignInWithPassword>;
    getCurrentUser(idToken: string): Promise<ResponseUserInfo>;
    getRefreshIdToken(refreshToken: string): Promise<string>;
    resetPassword(oobReset: string, password: string, withEncryption?: boolean): Promise<ResponseResetPassword>;
    verifyEmail(oobVerify: string): Promise<ResponseVerifyEmail>;
    signInWithCustomToken(customToken: string): Promise<{
        idToken: string;
        refreshToken: string;
    }>;
    updatePassword(idToken: string, password: string): Promise<ResponseUpdatePassword>;
}
export default FirebaseAuthAPI;
