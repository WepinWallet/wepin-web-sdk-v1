import type { ResponseResetPassword, ResponseSignInWithPassword, ResponseSignUp, ResponseUpdatePassword, ResponseUserInfo, ResponseVerifyEmail } from '../../types/firebaseAuthAPI';
export interface FirebaseAPI {
    getCurrentUser(idToken: string): Promise<ResponseUserInfo>;
    getRefreshIdToken(refreshToken: string): Promise<string>;
    resetPassword(oobReset: string, password: string): Promise<ResponseResetPassword>;
    verifyEmail(oobVerify: string): Promise<ResponseVerifyEmail>;
    signInWithCustomToken(customToken: string): Promise<{
        idToken: string;
        refreshToken: string;
    }>;
    signInWithEmailPassword(email: string, password: string): Promise<ResponseSignInWithPassword>;
    signUpWithEmailPassword(email: string, password: string): Promise<ResponseSignUp>;
    updatePassword(idToken: string, password: string): Promise<ResponseUpdatePassword>;
}
