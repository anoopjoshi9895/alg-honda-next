import { Dispatch } from 'redux';
import { CombinationDetailsStateModel } from './ViewModel';
export * from './ViewModel';
export declare const combinationDetailsReducer: (state: CombinationDetailsStateModel | undefined, action: any) => CombinationDetailsStateModel;
export declare const combinationDetailsActionTypes: {
    COMBINATION_DETAILS: string;
    COMBINATION_PRICE_DETAILS: string;
};
export declare const CombinationDetailsActions: {
    getCombinationDetails: (prodcuctId: number, customOptionID: number, customOptionVariantID: number, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    getCombinationPrice: (prodcuctId: number, customExteriorID: number, cutomExteriorVariantID: number, customInteriorID: number, cutomInteriorVariantID: number, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
