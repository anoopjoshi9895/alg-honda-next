import { Dispatch } from 'redux';
export declare const TradeInActions: {
    getModelYearList: (onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    getBrandList: (year: number, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    getModelList: (year: number, brand: string, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    getTrimList: (modelyear: number, brand: string, modelCode: string, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
