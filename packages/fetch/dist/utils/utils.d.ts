import { ErrorResponse } from '../api/APITypes';
import { FirebaseAuthError } from '../types/firebaseAuthAPI';
export declare const isErrorResponse: (result: any) => result is ErrorResponse;
export declare const isFirebaseErrorResponse: (result: any) => result is FirebaseAuthError;
