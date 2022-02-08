import { Dispatch } from 'redux';
import { IAction, IActionWithPayload } from 'src/utils/action-utils';
import { ProductModelStateModel } from './ViewModel';
export * from './ViewModel';
export declare const productModelsReducer: (state: ProductModelStateModel | undefined, action: any) => ProductModelStateModel;
export declare const productModelActionTypes: {
    PRODUCT_MODELS: string;
    PRODUCT_MODELS_CLEAR: string;
    PRODUCT_MODELS_SET_LOADING: string;
};
export declare const productModelsActions: {
    getProductModels: (onSuccess?: (() => void) | undefined, vehType?: string | undefined) => (dispatch: Dispatch) => Promise<void>;
};
declare type ProductModelsSetLoadingActionType = IActionWithPayload<typeof productModelActionTypes.PRODUCT_MODELS_SET_LOADING, boolean>;
declare type ProductModelsResetActionType = IAction<typeof productModelActionTypes.PRODUCT_MODELS_CLEAR>;
export declare const productModelsResetSettingsAction: () => ProductModelsResetActionType;
export declare const productModelsSetLoadingAction: (data: boolean) => ProductModelsSetLoadingActionType;
