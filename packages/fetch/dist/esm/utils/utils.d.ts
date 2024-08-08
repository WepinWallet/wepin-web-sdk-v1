import { ErrorResponse } from '../api/APITypes.js';
import { FirebaseAuthError } from '../types/firebaseAuthAPI.js';
export declare const isErrorResponse: (result: any) => result is ErrorResponse;
export declare const isFirebaseErrorResponse: (result: any) => result is FirebaseAuthError;
