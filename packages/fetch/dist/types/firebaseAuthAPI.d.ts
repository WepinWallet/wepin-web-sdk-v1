export type FirebauseAuthRequest = 'accounts:lookup' | 'token' | 'accounts:resetPassword' | 'accounts:update' | 'accounts:signInWithCustomToken' | 'accounts:signUp' | 'accounts:signInWithPassword';
export interface ResponseUserInfo {
    users: Array<UserInfo>;
}
interface UserInfo {
    localId: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    providerUserInfo: Array<ProviderUserInfo>;
    photoUrl: string;
    passwordHash: string;
    passwordUpdatedAt: any;
    validSince: string;
    disabled: boolean;
    lastLoginAt: string;
    createdAt: string;
    customAuth: boolean;
}
interface ProviderUserInfo {
    providerId: string;
    displayName: string;
    photoUrl: string;
    federatedId: string;
    email: string;
    rawId: string;
    screenName: string;
}
export interface ResponseRefreshToken {
    expires_in: string;
    token_type: string;
    refresh_token: string;
    id_token: string;
    user_id: string;
    project_id: string;
}
export interface ResponseSignInCustomToken {
    expiresIn: string;
    refreshToken: string;
    idToken: string;
}
export interface ResponseResetPassword {
    email: string;
    requestType: string;
}
export interface ResponseVerifyEmail {
    localId: string;
    email: string;
    passwordHash: string;
    providerUserInfo: {
        providerId: string;
        federatedId: string;
    };
}
export interface ResponseSignInWithPassword {
    localId: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string;
}
export interface ResponseSignUp {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}
export interface ResponseUpdatePassword {
    localId: string;
    email: string;
    passwordHash: string;
    providerUserInfo: Array<{
        providerId: string;
        federatedId: string;
    }>;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
}
export interface FirebaseAuthError {
    error: {
        code: number;
        message: string;
    };
}
export {};
