import { Dispatch } from 'redux';
import { ProductDetailsStateModel } from './view-model';
export * from './view-model';
export declare const productDetailsReducer: (state: ProductDetailsStateModel | undefined, action: any) => ProductDetailsStateModel;
export declare const productDetailsActionTypes: {
    PRODUCT_DETAILS: string;
    PRODUCT_DETAILS_CLEAR: string;
};
export declare const ProductDetailsActions: {
    clearProductDetails: () => (dispatch: Dispatch) => Promise<void>;
    getProductDetails: (id: number, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
