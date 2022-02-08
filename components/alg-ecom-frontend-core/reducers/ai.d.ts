import { Dispatch } from 'redux';
import { TrackingData } from 'src/api/models/ai';
export declare const aiTypes: {
    AI_REQUEST: string;
    AI_SUCCESS: string;
    AI_ERROR: string;
    TRACKING_REQUEST: string;
    TRACKING_SUCCESS: string;
    TRACKING_ERROR: string;
};
export interface AiState {
    vehicles?: {
        model: string;
        count: number;
    }[];
}
export declare const aiReducer: (state: AiState | undefined, action: any) => AiState;
export declare const aiActions: {
    savePageView: (model: string, count: number) => (dispatch: Dispatch) => Promise<void>;
    sendTrackingCount: (data: TrackingData) => (dispatch: Dispatch) => Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
};
