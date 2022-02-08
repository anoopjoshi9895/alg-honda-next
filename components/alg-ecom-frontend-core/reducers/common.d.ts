import { Dispatch } from 'redux';
export declare const commonTypes: {
    RESET_DATA: string;
    HEADER_MENU_TOGGLE: string;
    OUTER_CLASS_UPDATE: string;
    REQUEST_CALLBACK_TOGGLE: string;
    BOOK_TEST_DRIVE_TOGGLE: string;
    DOWNLOAD_BROCHURE_TOGGLE: string;
    REQUEST_QUOTE_TOGGLE: string;
    SHEDULE_SHOWROOM_VISIT_TOGGLE: string;
    FINANCE_POPUP_TOGGLE: string;
    SERVICE_POPUP_TOGGLE: string;
    FETCH_PROFILE_REQUEST: string;
    FETCH_PROFILE_SUCCESS: string;
    FETCH_PROFILE_ERROR: string;
};
export interface CommonStateViewModel {
    headerMenuOpen: boolean;
    requestCallbackPopUpOpen: boolean;
    bookTestDrivePopupOpen: boolean;
    downloadBrochurePopupOpen: boolean;
    requestQuotePopupOpen: boolean;
    sheduleShoroomVisitPopupOpen: boolean;
    financePopupOpen: boolean;
    servicePopupOpen: boolean;
    outerClassName: string;
}
export declare const commonReducer: (state: CommonStateViewModel | undefined, action: any) => CommonStateViewModel;
export declare const commonActions: {
    clearData: (onComplete?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    toggleMenu: () => (dispatch: Dispatch) => Promise<void>;
    toggleRequestCallback: () => (dispatch: Dispatch) => Promise<void>;
    toggleBookTestDrive: () => (dispatch: Dispatch) => Promise<void>;
    toggleDownloadBrochure: () => (dispatch: Dispatch) => Promise<void>;
    toggleRequestQuote: () => (dispatch: Dispatch) => Promise<void>;
    toggleSheduleShowroomVisit: () => (dispatch: Dispatch) => Promise<void>;
    toggleFinancePopUp: () => (dispatch: Dispatch) => Promise<void>;
    toggleServicePopUp: () => (dispatch: Dispatch) => Promise<void>;
    updateOuterClassName: (outerClassName: string) => (dispatch: Dispatch) => Promise<void>;
};
declare const _default: {
    types: {
        RESET_DATA: string;
        HEADER_MENU_TOGGLE: string;
        OUTER_CLASS_UPDATE: string;
        REQUEST_CALLBACK_TOGGLE: string;
        BOOK_TEST_DRIVE_TOGGLE: string;
        DOWNLOAD_BROCHURE_TOGGLE: string;
        REQUEST_QUOTE_TOGGLE: string;
        SHEDULE_SHOWROOM_VISIT_TOGGLE: string;
        FINANCE_POPUP_TOGGLE: string;
        SERVICE_POPUP_TOGGLE: string;
        FETCH_PROFILE_REQUEST: string;
        FETCH_PROFILE_SUCCESS: string;
        FETCH_PROFILE_ERROR: string;
    };
    actions: {
        clearData: (onComplete?: (() => void) | undefined) => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        toggleMenu: () => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        toggleRequestCallback: () => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        toggleBookTestDrive: () => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        toggleDownloadBrochure: () => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        toggleRequestQuote: () => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        toggleSheduleShowroomVisit: () => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        toggleFinancePopUp: () => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        toggleServicePopUp: () => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
        updateOuterClassName: (outerClassName: string) => (dispatch: Dispatch<import("redux").AnyAction>) => Promise<void>;
    };
};
export default _default;
