import { FirebaseAuthError } from '../types/firebaseAuthAPI';
import { ErrorResponse } from '../api/APITypes';

export declare const isErrorResponse: (result: any) => result is ErrorResponse;
export declare const isFirebaseErrorResponse: (result: any) => result is FirebaseAuthError;
export declare const uuidv4: () => string;
export declare const getBaseUrl: (appKey: string) => "https://sdk.wepin.io/v1" | "https://stage-sdk.wepin.io/v1" | "https://dev-sdk.wepin.io/v1" | "https://local-sdk.wepin.io/v1";
