import React from "react";
import { useTranslation } from "react-i18next";
import ReactModal from "react-modal";
import BookServicePopUp from "./BookServicePopUp";
import {
  allVehicleModelActions,
  AllVehicleStateModel,
  commonActions,
  ShowRoomDetailsModel,
  showRoomListActions,
} from "alg-ecom-frontend-core";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import BookTestDrivePopUp from "./popup/BookTestDrivePopUp";
import FinanceCalculatorPopUp from "./popup/FinanceCalculatorPopUp";
import RequestQuotePopUp from "./popup/RequestQuotePopUp";
import DownloadBrochurePopUp from "./popup/DownloadBrochurePopUp";
import RequestCallbackPopUp from "./popup/RequestCallbackPopUp";
import { useRouter } from "next/router";
import { RootState } from "../app/store";
export const customStylesPopup: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "1140px",
    width: "100%",
    border: "0",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
    padding: "0",
    margin: "20px auto",
  },
  overlay: {
    zIndex: 100000,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "auto",
  },
};

interface CustomProps {
  servicePopupOpen: boolean;
  bookTestDrivePopupOpen: boolean;
  toggleRequestCallback: typeof commonActions.toggleRequestCallback;
  toggleBookTestDrive: typeof commonActions.toggleBookTestDrive;
  toggleDownloadBrochure: typeof commonActions.toggleDownloadBrochure;
  toggleRequestQuote: typeof commonActions.toggleRequestQuote;
  toggleSheduleShowroomVisit: typeof commonActions.toggleSheduleShowroomVisit;
  toggleFinancePopUp: typeof commonActions.toggleFinancePopUp;
  toggleServicePopUp: typeof commonActions.toggleServicePopUp;
  vehicleModels: AllVehicleStateModel;
  showroomsList: ShowRoomDetailsModel[];
  getVehicleModelsList: typeof allVehicleModelActions.getVehicleModelsList;
  getShowRoomList: typeof showRoomListActions.getShowRoomList;
  financePopupOpen: boolean;
  downloadBrochurePopupOpen: boolean;
  requestQuotePopupOpen: boolean;
  requestCallbackPopUpOpen: boolean;
}

const AllPopUp: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const hash = router.asPath;
  const hashValue: any = hash?.split("#")?.[1];

  const commonState = useSelector((state: RootState) => state.commonState);
  React.useEffect(() => {
    if (hashValue === PopupValues.requestAQuote) {
      onRequestQuoteClick();
    } else if (hashValue === PopupValues.downloadBrochure) {
      onDownloadBrochureClick();
    } else if (hashValue === PopupValues.bookTestDrive) {
      onTestDrivePopupClick();
    } else if (hashValue === PopupValues.financeCalculator) {
      onFinancePopupClick();
    } else if (hashValue === PopupValues.requestACallback) {
      onCallbackPopupClick();
    } else if (hashValue === PopupValues.bookService) {
      onServicePopupClick();
    }
  }, [hashValue]);

  React.useEffect(() => {
    if (
      !commonState.requestQuotePopupOpen &&
      hashValue === PopupValues.requestAQuote
    ) {
      router.back();
    }
    if (
      !commonState.bookTestDrivePopupOpen &&
      hashValue === PopupValues.bookTestDrive
    ) {
      router.back();
    }
    if (
      !commonState.downloadBrochurePopupOpen &&
      hashValue === PopupValues.downloadBrochure
    ) {
      router.back();
    }
    if (
      !commonState.financePopupOpen &&
      hashValue === PopupValues.financeCalculator
    ) {
      router.back();
    }
    if (
      !commonState.requestCallbackPopUpOpen &&
      hashValue === PopupValues.requestACallback
    ) {
      router.back();
    }
  }, [
    commonState.requestQuotePopupOpen,
    commonState.bookTestDrivePopupOpen,
    commonState.downloadBrochurePopupOpen,
    commonState.financePopupOpen,
    commonState.requestCallbackPopUpOpen,
  ]);
  const onDownloadBrochureClick = () => {
    props.toggleDownloadBrochure();
  };
  const onRequestQuoteClick = () => {
    props.toggleRequestQuote();
  };
  const onServicePopupCancel = () => {
    props.toggleServicePopUp();
  };
  const onServicePopupClick = () => {
    props.toggleServicePopUp();
  };

  const onTestDrivePopupCancel = () => {
    props.toggleBookTestDrive();
  };
  const onTestDrivePopupClick = () => {
    props.toggleBookTestDrive();
  };
  const onFinancePopupCancel = () => {
    props.toggleFinancePopUp();
  };
  const onFinancePopupClick = () => {
    props.toggleFinancePopUp();
  };

  const onRequestQuoteCancel = () => {
    props.toggleRequestQuote();
  };
  const onDownloadBrochureCancel = () => {
    props.toggleDownloadBrochure();
  };
  const renderBookServiceModal = () => {
    return (
      <ReactModal
        isOpen={props.servicePopupOpen}
        contentLabel="Test Drive"
        style={customStylesPopup}
        onRequestClose={onServicePopupCancel}
        shouldCloseOnOverlayClick={true}
      >
        {/* {props.productData?.productDetails !== undefined && ( */}
        <BookServicePopUp
          onPopupCancel={onServicePopupCancel}
          productID={1}
          showroomsList={props.showroomsList}
          // productDetails={props.productData?.productDetails}
        />
        {/* )} */}
      </ReactModal>
    );
  };

  const renderFinanceModal = () => {
    return (
      <ReactModal
        isOpen={props.financePopupOpen}
        contentLabel="financePopupOpen"
        style={customStylesPopup}
        onRequestClose={onFinancePopupCancel}
        shouldCloseOnOverlayClick={true}
      >
        <FinanceCalculatorPopUp
          onPopupCancel={onFinancePopupCancel}
          showroomsList={props.showroomsList}
        />
      </ReactModal>
    );
  };

  const renderTestDriveModal = () => {
    return (
      <ReactModal
        isOpen={props.bookTestDrivePopupOpen}
        contentLabel="Test Drive"
        style={customStylesPopup}
        onRequestClose={onTestDrivePopupCancel}
        shouldCloseOnOverlayClick={true}
      >
        <BookTestDrivePopUp
          onPopupCancel={onTestDrivePopupCancel}
          // productID={1}
          showroomsList={props.showroomsList}
          // productDetails={props.productData?.productDetails}
        />
        {/* )} */}
      </ReactModal>
    );
  };

  const renderRequestQuoteModal = () => {
    return (
      <ReactModal
        isOpen={props.requestQuotePopupOpen}
        contentLabel="Request aquote"
        style={customStylesPopup}
        onRequestClose={onRequestQuoteCancel}
        shouldCloseOnOverlayClick={true}
      >
        <RequestQuotePopUp
          onPopupCancel={onRequestQuoteCancel}
          showroomsList={props.showroomsList}
        />
      </ReactModal>
    );
  };

  const renderDownloadBrochureModal = () => {
    return (
      <ReactModal
        isOpen={props.downloadBrochurePopupOpen}
        contentLabel="Download brochure"
        style={customStylesPopup}
        onRequestClose={onDownloadBrochureCancel}
        shouldCloseOnOverlayClick={true}
      >
        <DownloadBrochurePopUp
          onPopupCancel={onDownloadBrochureCancel}
          title={"Download brochure"}
          showroomsList={props.showroomsList}
        />
      </ReactModal>
    );
  };

  const onCallbackPopupClick = () => {
    props.toggleRequestCallback();
  };

  const renderCallbackModal = () => {
    return (
      <ReactModal
        isOpen={props.requestCallbackPopUpOpen}
        contentLabel="Callback"
        style={customStylesPopup}
        onRequestClose={onCallbackPopupClick}
        shouldCloseOnOverlayClick={true}
      >
        <RequestCallbackPopUp
          onPopupCancel={onCallbackPopupClick}
          title={"Request a callback"}
          showroomsList={props.showroomsList}
        />
      </ReactModal>
    );
  };

  React.useEffect(() => {
    if (
      props.vehicleModels?.modelsList === undefined ||
      props.vehicleModels?.modelsList?.length === 0
    ) {
      props.getVehicleModelsList();
    }
    if (
      props.showroomsList === undefined ||
      props.showroomsList?.length === 0
    ) {
      props.getShowRoomList();
    }
  }, []);
  return (
    <>
      {renderBookServiceModal()}
      {renderFinanceModal()}
      {renderDownloadBrochureModal()}
      {renderRequestQuoteModal()}
      {renderTestDriveModal()}
      {renderCallbackModal()}
    </>
  );
};
const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      toggleRequestCallback: commonActions.toggleRequestCallback,
      toggleBookTestDrive: commonActions.toggleBookTestDrive,
      toggleDownloadBrochure: commonActions.toggleDownloadBrochure,
      toggleRequestQuote: commonActions.toggleRequestQuote,
      toggleSheduleShowroomVisit: commonActions.toggleSheduleShowroomVisit,
      toggleFinancePopUp: commonActions.toggleFinancePopUp,
      toggleServicePopUp: commonActions.toggleServicePopUp,
      getShowRoomList: showRoomListActions.getShowRoomList,
      getVehicleModelsList: allVehicleModelActions.getVehicleModelsList,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    servicePopupOpen: state.commonState.servicePopupOpen,
    financePopupOpen: state.commonState.financePopupOpen,
    bookTestDrivePopupOpen: state.commonState.bookTestDrivePopupOpen,
    showroomsList: state.showRoomState.showroomsList,
    vehicleModels: state.allVehicleState,
    downloadBrochurePopupOpen: state.commonState.downloadBrochurePopupOpen,
    requestQuotePopupOpen: state.commonState.requestQuotePopupOpen,
    requestCallbackPopUpOpen: state.commonState.requestCallbackPopUpOpen,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AllPopUp);
export enum PopupValues {
  requestAQuote = "requestAQuote",
  downloadBrochure = "downloadBrochure",
  bookTestDrive = "bookTestDrive",
  financeCalculator = "financeCalculator",
  requestACallback = "requestACallback",
  bookService = "bookService",
}
