import React, { useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";

import {
  BuildPriceActions,
  User,
  commonActions,
  api,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";

import ReactModal from "react-modal";
import SubHeader from "../../components/mobile-subheader/SubHeader";
import Tabs from "../../components/my-account/Tabs";
import Configuration from "../../components/my-account/configurations/Configuration";
import Order from "../../components/my-account/orders/Order";
import Booking from "../../components/my-account/bookings/Booking";
import { RootState, store } from "../../app/store";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getFooterAsync } from "../../feature/footerSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/Layout";
import { IFooter } from "../../models/models";

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
    boxShadow: "none",
    padding: "0",
    margin: "20px auto",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "auto",
  },
};
export enum TabNames {
  Activities = "Activities",
  Configuration = "Configuration",
  Bookings = "Bookings",
  Orders = "Orders",
  Vehicle = "Vehicle",
  Service = "Service",
  Users = "Users",
  Logout = "Logout",
}

interface CustomProps {
  user?: User;
  financePopupOpen: boolean;
  downloadBrochurePopupOpen: boolean;
  requestQuotePopupOpen: boolean;
  bookTestDrivePopupOpen: boolean;
  toggleFinancePopUp: typeof commonActions.toggleFinancePopUp;
  toggleDownloadBrochure: typeof commonActions.toggleDownloadBrochure;
  toggleRequestQuote: typeof commonActions.toggleRequestQuote;
  toggleBookTestDrive: typeof commonActions.toggleBookTestDrive;
  locale: string;
  footerData: IFooter;
}

const Dashboard: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [tabName, setTabName] = React.useState<TabNames>(
    TabNames.Configuration
  );
  // const token = useSelector((state: RootState) => state.authState.token);

  const { t } = useTranslation();
  const [bookTestDrivePopupOpen, setBookTestDrivePopupOpen] =
    React.useState(false);
  const handleTabChange = (tabNameValue: TabNames) => {
    setTabName(tabNameValue);
  };
  const onFinanceCalculatorClick = () => {
    props.toggleFinancePopUp();
  };
  const onFinanceCalculatorCancel = () => {
    props.toggleFinancePopUp();
  };

  const onDownloadBrochureClick = () => {
    props.toggleDownloadBrochure();
  };
  const onDownloadBrochureCancel = () => {
    props.toggleDownloadBrochure();
  };
  const onRequestQuoteClick = () => {
    props.toggleRequestQuote();
  };
  const onRequestQuoteCancel = () => {
    props.toggleRequestQuote();
  };
  const onTestDrivePopupClick = () => {
    props.toggleBookTestDrive();
  };
  const onTestDrivePopupCancel = () => {
    props.toggleBookTestDrive();
  };

  const renderFinanceCalculatorModal = () => {
    return (
      <ReactModal
        isOpen={props.financePopupOpen}
        // isOpen={true}
        contentLabel="Finance Calculator"
        style={customStylesPopup}
        onRequestClose={() => onFinanceCalculatorCancel()}
        shouldCloseOnOverlayClick={true}
      >
        {/* <FinanceCalculatorPopUp
          onPopupCancel={() => onFinanceCalculatorCancel()}
          showModel={true}
        /> */}
      </ReactModal>
    );
  };

  const renderTestDriveModal = () => {
    return (
      <ReactModal
        isOpen={props.bookTestDrivePopupOpen}
        contentLabel="Test Drive"
        style={customStylesPopup}
        onRequestClose={() => onTestDrivePopupCancel()}
        shouldCloseOnOverlayClick={true}
      >
        {/* <BookTestDrivePopUp
          onPopupCancel={() => onTestDrivePopupCancel()}
          // showModel={true}
        /> */}
      </ReactModal>
    );
  };

  const renderRequestaQuoteModal = () => {
    return (
      <ReactModal
        isOpen={props.requestQuotePopupOpen}
        // isOpen={true}
        contentLabel="Request a Quote"
        style={customStylesPopup}
        onRequestClose={() => onRequestQuoteCancel()}
        shouldCloseOnOverlayClick={true}
      >
        {/* <RequestQuotePopUp
          onPopupCancel={() => onRequestQuoteCancel()}
          showModel={true}
        /> */}
      </ReactModal>
    );
  };

  const renderDownloadBrochureModal = () => {
    return (
      <ReactModal
        isOpen={props.downloadBrochurePopupOpen}
        // isOpen={true}
        contentLabel="Download Brochure"
        style={customStylesPopup}
        onRequestClose={() => onDownloadBrochureCancel()}
        shouldCloseOnOverlayClick={true}
      >
        {/* <DownloadBrochurePopUp
          onPopupCancel={() => onDownloadBrochureCancel()}
          showModel={true}
          title={'Download brochure'}
        /> */}
      </ReactModal>
    );
  };

  return (
    <Layout
      footerData={props?.footerData}
      avoidFooter={true}
      isAuthenticatedRoute={true}
    >
      {/* <AllPopUp /> */}

      <SubHeader headerText={tabName} />
      <div className="row no-gutters">
        <div className="col-lg col-12 account-menu py-lg-4 border-right">
          <div className="p-lg-3">
            <div className="d-lg-flex d-none align-items-center mb-4 pt-1 pb-2">
              {/* <div className="avatar overflow-hidden mr-2">
                <img
                  src={props.user?.userProfilePicture || noImage}
                  className="img-fluid img-cover rounded-circle"
                  alt="user"
                />
              </div> */}
              <div>
                <h6 className="font-base font-weight-bold mb-0 text-capitalize">
                  {props.user?.userFirstName} {props.user?.userLastName}
                </h6>
                {/* <a href="#" className="font-xs text-gray-700">
                  View Profile
                </a> */}
              </div>
            </div>
            <Tabs
              tabChangeHandler={handleTabChange}
              tabName={tabName}
              isAuthRequired={true}
            />
            <div className="get-support rounded p-4 mt-5 d-lg-block d-none">
              <h6 className="font-base text-gray-700 font-weight-normal mt-3">
                {t("dashboard.Get a Support")}
              </h6>
              <span className="font-base d-block mb-4 pb-2 font-weight-bold">
                +965 98743561
              </span>
              <Image
                src={require("../../styles/images/get-support.png")}
                className="img-fluid"
                alt="Get a Support"
              />
              <div className="mt-3 mb-2 text-center">
                <a
                  href="mailto:honda@alghanim.com"
                  className="btn btn-primary font-md py-2"
                >
                  {t("dashboard.Email to us")}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg col-12 py-4">
          {tabName === TabNames.Configuration && (
            <Configuration></Configuration>
          )}
          {tabName === TabNames.Orders && <Order></Order>}
          {tabName === TabNames.Bookings && <Booking></Booking>}
        </div>
      </div>
      {renderFinanceCalculatorModal()}
      {renderTestDriveModal()}
      {renderRequestaQuoteModal()}
      {renderDownloadBrochureModal()}
    </Layout>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      getProductList: BuildPriceActions.getProductList,
      toggleFinancePopUp: commonActions.toggleFinancePopUp,
      toggleDownloadBrochure: commonActions.toggleDownloadBrochure,
      toggleRequestQuote: commonActions.toggleRequestQuote,
      toggleBookTestDrive: commonActions.toggleBookTestDrive,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.authState.user,
    financePopupOpen: state.commonState.financePopupOpen,
    downloadBrochurePopupOpen: state.commonState.downloadBrochurePopupOpen,
    requestQuotePopupOpen: state.commonState.requestQuotePopupOpen,
    servicePopupOpen: state.commonState.servicePopupOpen,
    bookTestDrivePopupOpen: state.commonState.bookTestDrivePopupOpen,
  };
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
  locale,
  locales,
  query,
}: any) => {
  await Promise.all([store.dispatch(getFooterAsync(locale))]);

  const footer = store.getState().footer.data;

  return {
    props: {
      footerData: footer,
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      locales,
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
