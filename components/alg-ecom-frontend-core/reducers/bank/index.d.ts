import { Dispatch } from 'redux';
import { BankListStateModel } from './ViewModel';
export * from './ViewModel';
export declare const bankListReducer: (state: BankListStateModel | undefined, action: any) => BankListStateModel;
export declare const bankListActionTypes: {
    BANK_LIST: string;
};
export declare const bankListActions: {
    getBankList: (onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
