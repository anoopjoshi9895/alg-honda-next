import { Dispatch } from 'redux';
import { AllVehicleStateModel } from './ViewModel';
export * from './ViewModel';
export declare const allVehicleModelListReducer: (state: AllVehicleStateModel | undefined, action: any) => AllVehicleStateModel;
export declare const allVehicleModelActionTypes: {
    ALL_VEHICLE_LIST: string;
};
export declare const allVehicleModelActions: {
    getVehicleModelsList: (onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
