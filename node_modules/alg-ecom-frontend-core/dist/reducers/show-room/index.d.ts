import { Dispatch } from 'redux';
import { ShowRoomListStateModel } from './ViewModel';
export * from './ViewModel';
export declare const showRoomListReducer: (state: ShowRoomListStateModel | undefined, action: any) => ShowRoomListStateModel;
export declare const showRoomListActionTypes: {
    SHOWROOM_LIST: string;
};
export declare const showRoomListActions: {
    getShowRoomList: (onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
