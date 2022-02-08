import { Dispatch } from 'redux';
import { User } from '../api/models';
export declare const types: {
    LOGIN_REQUEST: string;
    LOGIN_SUCCESS: string;
    LOGIN_ERROR: string;
    FB_LOGIN_REQUEST: string;
    FB_LOGIN_SUCCESS: string;
    FB_LOGIN_ERROR: string;
    GOOGLE_LOGIN_REQUEST: string;
    GOOGLE_LOGIN_SUCCESS: string;
    GOOGLE_LOGIN_ERROR: string;
    LOGOUT: string;
    REDIRECT_SAVE: string;
    REDIRECT_APPLY: string;
    SIGN_UP_REQUEST: string;
    SIGN_UP_SUCCESS: string;
    SIGN_UP_ERROR: string;
};
export interface AuthState {
    isLoading: boolean;
    token?: string;
    redirectTo: string;
    userLogin?: string;
    countryCode?: string;
    startingCode?: string;
    phoneNumber?: string;
    loginError?: string;
    fbLoginError?: string;
    googleLoginError?: string;
    otpError?: string;
    user?: User;
}
export declare const authReducer: (state: AuthState | undefined, action: any) => AuthState;
export declare const authActions: {
    login: (data: {
        userLogin: string;
        password: string;
    }, onSuccess?: ((userID?: number | undefined, userToken?: string | undefined, verified?: boolean | undefined, customerId?: string | undefined) => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    verifyOtp: (data: any, onSuccess?: ((userID?: number | undefined, userToken?: string | undefined, verified?: boolean | undefined, customerId?: string | undefined) => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    fbLogin: (data: any, onSuccess?: ((userID?: number | undefined, userToken?: string | undefined, verified?: boolean | undefined, customerId?: string | undefined) => void) | undefined, onError?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    googleLogin: (data: any, onSuccess?: ((userID?: number | undefined, userToken?: string | undefined, verified?: boolean | undefined, customerId?: string | undefined) => void) | undefined, onError?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    logout: (onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    redirectSave: (to: string) => (dispatch: Dispatch) => Promise<void>;
    redirectApply: () => (dispatch: Dispatch) => {
        type: string;
    };
};
