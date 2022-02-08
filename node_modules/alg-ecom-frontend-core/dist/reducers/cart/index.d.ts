import { Dispatch } from 'redux';
import { CartStateModel } from './ViewModel';
export * from './ViewModel';
export declare const cartActionTypes: {
    UPDATE_CART: string;
    GET_CART: string;
    CLEAR_CART: string;
    UPDATE_BASE_PRICE: string;
    UPDATE_DEFAULT_INTERIOR: string;
    UPDATE_COMBINATION_PRICE: string;
    UPDATE_CART_PRODUCT_ID: string;
    UPDATE_SHOW_ROOMID: string;
};
export declare const cartReducer: (state: CartStateModel | undefined, action: any) => CartStateModel;
export declare const CartActions: {
    clearCart: (onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    updateShowRoomId: (id: number) => (dispatch: Dispatch) => Promise<void>;
    addToCart: (cart: CartStateModel, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    getCartDetails: (cartId?: number | undefined, configID?: number | undefined, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
