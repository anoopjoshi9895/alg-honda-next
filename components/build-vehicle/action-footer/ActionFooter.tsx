import React from "react";
import {
  api,
  authActions,
  CartActions,
  CartStateModel,
  commonActions,
  LocalStorage,
  ShowRoomModelBV,
  ProductViewModelBV,
  ProductDetailsStateModel,
  USER_ID,
  types,
  CombinationDetailsStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { toastr } from "react-redux-toastr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import { TabNames, SignUpFormProps, BookNowOTPFormProps } from "../utils";
import ReactModal from "react-modal";
import BookTestDrivePopUp from "./BookTestDrivePopUp";
import ShowRoomVisitPopUp from "./ShowRoomVisitPopUp";
import RequestCallbackPopUp from "./RequestCallbackPopUp";
import RequestQuotePopUp from "./RequestQuotePopUp";
import DownloadBrochurePopUp from "./DownloadBrochurePopUp";
import SignUpOTPPopUp from "../summary/auth/SignUpOTPPopUp";
import SaveConfigConfirmPopUp from "./SaveConfigConfirmPopUp";

import BookNowSignUpConfirmPopUp from "../summary/BookNowSignUpConfirmPopUp";
import BookNowOTPPopUp from "../summary/BookNowOTPPopUp";
import BookNowPopUp from "../summary/BookNowPopUp";
import ForgotPasswordPopUp from "../summary/ForgotPasswordPopUp";
import cloneDeep from "lodash/cloneDeep";
import { RootState } from "../../../app/store";

export const customStyles: ReactModal.Styles = {
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
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
  getCartDetails: typeof CartActions.getCartDetails;
  onNext: any;
  activeTab: TabNames;
  requestCallbackPopUpOpen: boolean;
  bookTestDrivePopupOpen: boolean;
  downloadBrochurePopupOpen: boolean;
  requestQuotePopupOpen: boolean;
  sheduleShoroomVisitPopupOpen: boolean;
  toggleRequestCallback: typeof commonActions.toggleRequestCallback;
  toggleBookTestDrive: typeof commonActions.toggleBookTestDrive;
  toggleDownloadBrochure: typeof commonActions.toggleDownloadBrochure;
  toggleRequestQuote: typeof commonActions.toggleRequestQuote;
  toggleSheduleShowroomVisit: typeof commonActions.toggleSheduleShowroomVisit;
  productID: number;
  showroomsList: ShowRoomModelBV[];
  productDetails: ProductViewModelBV | undefined;
  token: string | undefined;
  productData: ProductDetailsStateModel;
  login: typeof authActions.login;
  dispatch: any;
  combinationStateData: CombinationDetailsStateModel;
}

export const customAuthStyles: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "700px",
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
export const customAuthOTPStyles: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "500px",
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

const ActionFooter: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [isQuickLinkActive, setQuickLinkActive] = React.useState(false);
  const [isConfigSuccess, setConfigSuccess] = React.useState(false);
  const [signUpData, setSignUpData] = React.useState<
    SignUpFormProps | undefined
  >(undefined);
  const [bookNowError, setBookNowError] = React.useState<string | undefined>(
    undefined
  );
  const [isUpdating, setUpdating] = React.useState(false);
  const [isBookNowActive, setBookNowActive] = React.useState(false);
  const [isAuthActive, setAuthActive] = React.useState(false);
  const [bookNowOTPError, setBookNowOTPError] = React.useState<
    string | undefined
  >(undefined);
  const [isForgotPasswordActive, setForgotPasswordActive] =
    React.useState(false);
  const [isLoginOTPActive, setLoginOTPActive] = React.useState(false);
  const [isUserConfirm, setUserConfirm] = React.useState(false);

  const [userId, setUserId] = React.useState<string | undefined>(undefined);
  const [isAuthOTPActive, setAuthOTPActive] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState<string | undefined>(
    undefined
  );
  const [signUpOTPError, setSignUpOTPError] = React.useState<
    string | undefined
  >(undefined);

  const [isSaveConfigConfirm, setIsSaveConfigConfirm] =
    React.useState<boolean>(false);

  const [isSignUpSubmiting, setSignUpSubmiting] = React.useState(false);

  const combinationData =
    props.cartData?.productInfo?.combinationInfo?.[0] ||
    props.productData?.productDetails?.combinations?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productData?.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const onNext = () => {
    switch (props.activeTab) {
      case TabNames.EXTERIOR:
        props.onNext(TabNames.INTERIOR);
        break;
      case TabNames.INTERIOR:
        props.onNext(
          !!productCombinations?.campaign?.length
            ? TabNames.CAMPAIGNS
            : TabNames.ACCESSORIES
        );
        // onSave();
        break;
      case TabNames.CAMPAIGNS:
        props.onNext(TabNames.ACCESSORIES);
        // onSave();
        break;
      case TabNames.ACCESSORIES:
        props.onNext(TabNames.INSURANCES);
        // onSave();
        break;
      case TabNames.INSURANCES:
        props.onNext(TabNames.TRADEIN);
        // onSave();
        break;
      case TabNames.TRADEIN:
        props.onNext(TabNames.FINANCE);
        // onSave();
        break;
      case TabNames.FINANCE:
        props.onNext(TabNames.SUMMARY);
        // onSave();
        break;
    }
  };
  const onPrevious = () => {
    switch (props.activeTab) {
      case TabNames.INTERIOR:
        props.onNext(TabNames.EXTERIOR);
        break;
      case TabNames.CAMPAIGNS:
        props.onNext(TabNames.INTERIOR);
        break;
      case TabNames.ACCESSORIES:
        props.onNext(
          !!productCombinations?.campaign?.length
            ? TabNames.CAMPAIGNS
            : TabNames.INTERIOR
        );
        break;
      case TabNames.INSURANCES:
        props.onNext(TabNames.ACCESSORIES);
        break;
      case TabNames.TRADEIN:
        props.onNext(TabNames.INSURANCES);
        break;
      case TabNames.FINANCE:
        props.onNext(TabNames.TRADEIN);
        break;
      case TabNames.SUMMARY:
        props.onNext(TabNames.FINANCE);
        break;
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: { target: any }) => {
    if (
      wrapperRef &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      setQuickLinkActive(false);
    }
  };
  const onSave = async () => {
    if (props.cartData.cartID !== undefined) {
      try {
        const response = await api.build.updateCart(
          props.productID,
          props.cartData
        );
        if (response.responsecode === 200) {
          props.getCartDetails(response.data?.cartID);
        }
      } catch (error) {
        //
      }
    } else {
      try {
        const response = await api.build.createCart(
          props.productID,
          props.cartData
        );
        if (response.responsecode === 200) {
          props.getCartDetails(response.data?.cartID);
        }
      } catch (error) {
        //
      }
    }
  };

  const setSaveConfigConfirm = (confirm: string) => {
    setIsSaveConfigConfirm(false);
    onAuthActive(confirm);
  };

  const onSaveConfig = () => {
    const configID = props.cartData?.configID;
    if (configID) {
      setIsSaveConfigConfirm(true);
    } else {
      onAuthActive();
    }
  };

  const onAuthActive = async (insertConfig?: string) => {
    if (props.token) {
      if (props.productData.productDetails) {
        try {
          setUpdating(true);
          const response = await api.build.saveConfig(
            props.productData.productDetails?.productID,
            props.cartData,
            insertConfig
          );
          setUpdating(false);

          if (response.responsecode === 200) {
            props.getCartDetails(response.data?.cartID);
            setConfigSuccess(true);
            toastr.success("Success", "Saved configuration successfully");
          }
        } catch (error) {
          //
        }
      }
    } else {
      setSignUpData(undefined);
      setAuthActive(true);
    }
  };

  const onAuthCancel = () => {
    setSignUpData(undefined);
    setAuthActive(false);
  };
  const onAuthOTPActive = () => {
    setSignUpData(undefined);
    setAuthOTPActive(true);
  };
  const onAuthOTPCancel = () => {
    setSignUpData(undefined);
    setAuthOTPActive(false);
  };

  const onTestDrivePopupCancel = () => {
    props.toggleBookTestDrive();
  };
  const onVisitPopupCancel = () => {
    props.toggleSheduleShowroomVisit();
  };
  const onTestDrivePopupClick = () => {
    props.toggleBookTestDrive();
    setQuickLinkActive(!isQuickLinkActive);
  };
  const onVisitPopupClick = () => {
    props.toggleSheduleShowroomVisit();
    setQuickLinkActive(!isQuickLinkActive);
  };
  const onCallbackPopupCancel = () => {
    props.toggleRequestCallback();
  };
  const onCallbackPopupClick = () => {
    props.toggleRequestCallback();
    setQuickLinkActive(!isQuickLinkActive);
  };
  const onDownloadBrochureCancel = () => {
    props.toggleDownloadBrochure();
  };
  const onDownloadBrochureClick = () => {
    props.toggleDownloadBrochure();
    setQuickLinkActive(!isQuickLinkActive);
  };
  const onRequestQuoteCancel = () => {
    props.toggleRequestQuote();
  };
  const onRequestQuoteClick = () => {
    props.toggleRequestQuote();
    setQuickLinkActive(!isQuickLinkActive);
  };

  const onSignUpSubmit = async (data: SignUpFormProps) => {
    const postData = new FormData();
    postData.append("userFirstName", data.firstName);
    postData.append("userLastName", data.lastName);
    postData.append("userEmail", data.email);
    postData.append("userPhone", data.phoneNumber);
    postData.append("userPassword", data.password);
    setSignUpSubmiting(true);
    const response = await api.user.signUp(postData);
    if (response.responsecode === 200) {
      setUserId(response?.data?.userID);
      setSignUpData(data);
      LocalStorage.setItem(USER_ID, response?.data?.userID);
      setAuthActive(false);
      setAuthOTPActive(true);
      setSignUpSubmiting(false);
    } else {
      setSignUpError(response?.data?.message);
      setSignUpSubmiting(false);
    }
  };
  const onSignUpOTPSubmit = async (data: BookNowOTPFormProps) => {
    const postData = new FormData();
    if (userId) {
      postData.append("userID", userId);
    }

    postData.append(
      "otp",
      `${data?.digit1}${data?.digit2}${data?.digit3}${data?.digit4}`
    );

    const response = await api.user.verifyOtp(postData);
    if (response?.responsecode === 200) {
      setUserId(response?.data?.userToken);
      LocalStorage.setItem(USER_ID, response?.data?.userToken);
      props.dispatch({ type: types.LOGIN_SUCCESS, data: response?.data });
      setAuthActive(false);
      setAuthOTPActive(false);
      api.setToken(response?.data?.userToken);
      if (props.productData.productDetails) {
        try {
          setUpdating(true);

          const resp = await api.build.saveConfig(
            props.productData.productDetails?.productID,
            props.cartData
          );
          setUpdating(false);

          if (resp.responsecode === 200) {
            props.getCartDetails(resp.data?.cartID);
            setConfigSuccess(true);
          }
        } catch (error) {
          //
        }
      }
    } else {
      setSignUpOTPError(response?.message);
    }
  };
  const onLogin = (data: any) => {
    props.login(data, async () => {
      if (props.productData.productDetails) {
        try {
          setUpdating(true);

          const response = await api.build.saveConfig(
            props.productData.productDetails?.productID,
            props.cartData
          );
          setUpdating(false);

          if (response.responsecode === 200) {
            props.getCartDetails(response.data?.cartID);
            setConfigSuccess(true);
          }
        } catch (error) {
          //
        }
      }
      setAuthActive(false);
    });
  };
  const onSocialSubmit = async () => {
    setUserId(props.token);
    LocalStorage.setItem(USER_ID, props.token || "");
    setAuthActive(false);
    if (props.productData.productDetails) {
      try {
        const response = await api.build.saveConfig(
          props.productData.productDetails?.productID,
          props.cartData
        );
        if (response.responsecode === 200) {
          props.getCartDetails(response.data?.cartID);
          setConfigSuccess(true);
          toastr.success("Success", "Saved configuration successfully");
        }
      } catch (error) {
        //
      }
    }
  };
  const renderSaveConfigConfirmModal = () => {
    return (
      <ReactModal
        isOpen={isSaveConfigConfirm}
        contentLabel="Save Donfig"
        className="small-popup"
        style={customStyles}
        onRequestClose={() => setIsSaveConfigConfirm(false)}
        shouldCloseOnOverlayClick={true}
      >
        <SaveConfigConfirmPopUp
          onPopupCancel={() => setIsSaveConfigConfirm(false)}
          onConfirmConfig={(configInsert) => setSaveConfigConfirm(configInsert)}
        />
      </ReactModal>
    );
  };

  const renderTestDriveModal = () => {
    return (
      <ReactModal
        isOpen={props.bookTestDrivePopupOpen}
        contentLabel="Test Drive"
        style={customStyles}
        onRequestClose={onTestDrivePopupCancel}
        shouldCloseOnOverlayClick={true}
      >
        <BookTestDrivePopUp
          productID={props.productID}
          onPopupCancel={onTestDrivePopupCancel}
          showroomsList={props.showroomsList}
          productDetails={props.productDetails}
        />
      </ReactModal>
    );
  };
  const renderVisitModal = () => {
    return (
      <ReactModal
        isOpen={props.sheduleShoroomVisitPopupOpen}
        contentLabel="Showroom Visit"
        style={customStyles}
        onRequestClose={onVisitPopupCancel}
        shouldCloseOnOverlayClick={true}
      >
        <ShowRoomVisitPopUp
          productID={props.productID}
          onPopupCancel={onVisitPopupCancel}
          showroomsList={props.showroomsList}
          productDetails={props.productDetails}
        />
      </ReactModal>
    );
  };
  const renderCallbackModal = () => {
    return (
      <ReactModal
        isOpen={props.requestCallbackPopUpOpen}
        contentLabel="Callback"
        style={customStyles}
        onRequestClose={onCallbackPopupCancel}
        shouldCloseOnOverlayClick={true}
      >
        {props.productDetails && (
          <RequestCallbackPopUp
            onPopupCancel={onCallbackPopupCancel}
            title={"Request a callback"}
            productID={props.productID}
            showroomsList={props.showroomsList}
            productTitle={props.productDetails?.productTitle}
            productImage={props.productDetails?.previewImage}
          />
        )}
      </ReactModal>
    );
  };
  const renderDownloadBrochureModal = () => {
    return (
      <ReactModal
        isOpen={props.downloadBrochurePopupOpen}
        contentLabel="Download brochure"
        style={customStyles}
        onRequestClose={onDownloadBrochureCancel}
        shouldCloseOnOverlayClick={true}
      >
        {props.productDetails && (
          <DownloadBrochurePopUp
            onPopupCancel={onDownloadBrochureCancel}
            title={"Download brochure"}
            productID={props.productID}
            showroomsList={props.showroomsList}
            productDetails={props.productDetails}
            productTitle={props.productDetails?.productTitle}
            productImage={props.productDetails?.previewImage}
          />
        )}
      </ReactModal>
    );
  };
  const renderRequestQuoteModal = () => {
    return (
      <ReactModal
        isOpen={props.requestQuotePopupOpen}
        contentLabel="Request aquote"
        style={customStyles}
        onRequestClose={onRequestQuoteCancel}
        shouldCloseOnOverlayClick={true}
      >
        <RequestQuotePopUp
          productID={props.productID}
          onPopupCancel={onRequestQuoteCancel}
          showroomsList={props.showroomsList}
          productDetails={props.productDetails}
        />
      </ReactModal>
    );
  };
  const onConfigLogin = (data: any) => {
    props.login(
      data,
      async (userID?: number, token?: string, verified?: boolean) => {
        if (userID && token && verified !== undefined) {
          if (!verified) {
            setLoginOTPActive(true);
            setUserId(userID.toString() || "0");
            try {
              const postData = new FormData();
              postData.append("userID", userID.toString());
              const response = await api.user.resendOtp(postData);
            } catch (error) {
              // nothing
            }
          } else {
            if (props.productData.productDetails) {
              try {
                setUpdating(true);
                const response = await api.build.saveConfig(
                  props.productData.productDetails?.productID,
                  props.cartData
                );
                setUpdating(false);
                if (response.responsecode === 200) {
                  props.getCartDetails(response.data?.cartID);
                  toastr.success("Success", "Saved configuration successfully");
                  setConfigSuccess(true);
                }
              } catch (error) {
                //
              }
            }
            setAuthActive(false);
          }

          // setUserToken(token || '');
        }
      }
    );
  };

  const onBookNowSubmit = async (data: SignUpFormProps) => {
    const postData = new FormData();
    postData.append("userFirstName", data.firstName);
    postData.append("userLastName", data.lastName);
    postData.append("userEmail", data.email);
    postData.append("userPhone", data.phoneNumber);
    postData.append("userGender", data.gender);
    postData.append("userPassword", data.password);
    postData.append("booking", "no");
    setSignUpData(data);
    try {
      const response = await api.user.signUp(postData);
      if (response.responsecode === 200) {
        setUserConfirm(false);
        setUserId(response?.data?.userID);
        setSignUpData(data);
      } else if (response?.responsecode === 409) {
        setUserConfirm(true);
        setBookNowError(response?.message);
        setSignUpData(data);
      } else {
        setSignUpData(data);
        setBookNowError(response?.message);
      }
    } catch (error: any) {
      if (error?.response?.data?.meta?.responsecode === 409) {
        setSignUpData(data);
        setUserConfirm(true);
        setBookNowError(error?.response?.data?.meta?.message);
      } else {
        setSignUpData(data);
        setBookNowError(error?.response?.data?.meta?.message);
      }
    }
  };
  const onConfigLoginOTPSubmit = async (data: OTPFormProps) => {
    if (userId) {
      const postData = new FormData();
      if (userId) {
        postData.append("userID", userId);
      }

      postData.append("otp", data.otp);

      const response = await api.user.verifyOtp(postData);
      if (response?.responsecode === 200) {
        setUserId(response?.data?.userToken);
        LocalStorage.setItem(USER_ID, response?.data?.userToken);
        props.dispatch({ type: types.LOGIN_SUCCESS, data: response?.data });
        setBookNowActive(false);
        setLoginOTPActive(false);
        api.setToken(response?.data?.userToken);
        if (props.productData.productDetails) {
          try {
            setUpdating(true);
            const resp = await api.build.saveConfig(
              props.productData.productDetails?.productID,
              props.cartData
            );
            setUpdating(false);
            if (resp.responsecode === 200) {
              props.getCartDetails(resp.data?.cartID);
              toastr.success("Success", "Saved configuration successfully");
              setConfigSuccess(true);
            }
          } catch (error) {
            //
          }
        }
        setAuthActive(false);
      } else {
        setBookNowOTPError(response?.message);
      }
    }
  };
  const onSubmitConfirm = async (data: { confirm: string }) => {
    const signupData = cloneDeep(signUpData);
    const postData = new FormData();

    if (signupData) {
      postData.append("userFirstName", signupData.firstName);
      postData.append("userLastName", signupData.lastName);
      postData.append("userEmail", signupData.email);
      postData.append("userPhone", signupData.phoneNumber);
      postData.append("userGender", signupData.gender);
      postData.append("userPassword", signupData.password);
      postData.append("booking", "no");
      postData.append("dupConfirm", data.confirm);
      try {
        const response = await api.user.signUp(postData);
        if (response.responsecode === 200) {
          setUserConfirm(false);
          setSignUpError(undefined);
          setUserId(response?.data?.userID);
        } else if (response?.responsecode === 409) {
          setUserConfirm(true);
          setSignUpError(response?.message);
        } else {
          setSignUpError(response?.message);
        }
      } catch (error: any) {
        if (error?.response?.data?.meta?.responsecode === 409) {
          setUserConfirm(true);
          setSignUpError(error?.response?.data?.meta?.message);
        } else {
          setSignUpError(error?.response?.data?.meta?.message);
        }
      }
    }
  };
  const renderAuthModal = () => {
    return (
      <ReactModal
        isOpen={isAuthActive}
        contentLabel="Auth"
        style={customStyles}
        onRequestClose={onAuthCancel}
        shouldCloseOnOverlayClick={true}
        // className="login-popup"
      >
        {isForgotPasswordActive && (
          <ForgotPasswordPopUp
            onClose={onAuthCancel}
            onSubmit={() => setForgotPasswordActive(false)}
          />
        )}
        {!isForgotPasswordActive &&
          !isLoginOTPActive &&
          !signUpData &&
          !isUserConfirm &&
          props.productData.productDetails && (
            <BookNowPopUp
              onClose={onAuthCancel}
              onLogin={onConfigLogin}
              isSignUpSubmiting={isSignUpSubmiting}
              onForgotPassword={() => setForgotPasswordActive(true)}
              onSocialSubmit={onSocialSubmit}
              onSignUp={onBookNowSubmit}
              productTitle={props.productData.productDetails?.productTitle}
              errorMessage={bookNowError}
              heading={"save configuration"}
              subTitle={"saving configuration"}
            />
          )}
        {isLoginOTPActive && props.productData.productDetails && (
          <BookNowOTPPopUp
            onClose={onAuthCancel}
            onSubmit={onConfigLoginOTPSubmit}
            errorMessage={bookNowOTPError}
          />
        )}
        {signUpData && !isUserConfirm && props.productData.productDetails && (
          <BookNowOTPPopUp
            onClose={onAuthCancel}
            onSubmit={onSignUpOTPSubmit}
            errorMessage={bookNowOTPError}
            phoneNumber={signUpData.phoneNumber}
          />
        )}
        {isUserConfirm && (
          <BookNowSignUpConfirmPopUp
            onClose={onAuthCancel}
            onSubmit={onSubmitConfirm}
            errorMessage={bookNowError}
          />
        )}
      </ReactModal>
    );
  };
  const renderAuthOTPModal = () => {
    return (
      <ReactModal
        isOpen={isAuthOTPActive}
        contentLabel="AuthOTP"
        style={customAuthOTPStyles}
        onRequestClose={onAuthOTPCancel}
        shouldCloseOnOverlayClick={true}
      >
        {signUpData && (
          <SignUpOTPPopUp
            onClose={onAuthOTPCancel}
            onSubmit={onSignUpOTPSubmit}
            errorMessage={signUpOTPError}
            phoneNumber={signUpData.phoneNumber}
            // phoneNumber={''}
          />
        )}
      </ReactModal>
    );
  };

  return (
    <>
      <div className="bg-white border-top bottom-0 build-footer container-fluid left-0 position-fixed py-lg-4 zIndex-99">
        <div className="row align-items-center">
          <div className="col-auto d-lg-flex d-none">
            <div
              className={classnames({
                "quick-access position-relative d-lg-flex d-none mr-4": true,
                active: isQuickLinkActive,
              })}
              ref={wrapperRef}
            >
              <div
                onClick={() => setQuickLinkActive(!isQuickLinkActive)}
                className="d-inline-flex font-md text-uppercase text-secondary align-items-center cursor-pointer font-weight-bold"
              >
                <span className="icon-expand1 mr-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </span>
                {t("build_vehicle.Quick Access")}
                <i className="font-xxs icon-chevron-up ml-2"></i>
              </div>
              <div className="quick-access-popup bg-white position-absolute top-0 left-0">
                <ul className="list-unstyled p-0  m-0 font-md font-weight-bold">
                  <li>
                    <a
                      href={`https://api.whatsapp.com/send/?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NO}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 border-bottom d-flex align-items-center"
                    >
                      {/* <i className="icon-chat font-lg mr-3"></i> */}
                      <i className="icon-whatsapp font-lg mr-3">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      {t("common.live_chat")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      className="px-4 py-3 border-bottom d-flex align-items-center"
                      onClick={() => onCallbackPopupClick()}
                    >
                      <i className="icon-callback font-lg mr-3"></i>
                      {t("common.request_a_callback")}
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="javascript:void(0)"
                      className="px-4 py-3 border-bottom d-flex align-items-center"
                    >
                      <i className="icon-download font-lg mr-3"></i>{t('common.download_brochure')}
                    </a>
                  </li> */}

                  <li>
                    <a
                      href="javascript:void(0)"
                      rel="noreferrer"
                      className="px-4 py-3 border-bottom d-flex align-items-center"
                      onClick={() => onTestDrivePopupClick()}
                    >
                      <i className="icon-test-drive font-lg mr-3"></i>
                      {t("build_vehicle.Book a Test Drive")}
                    </a>
                  </li>
                  {props.productDetails?.brochure && (
                    <li>
                      <a
                        href="javascript:void(0)"
                        rel="noreferrer"
                        className="px-4 py-3 border-bottom d-flex align-items-center"
                        onClick={() => onDownloadBrochureClick()}
                      >
                        <i className="icon-download font-lg mr-3"></i>
                        {t("common.download_brochure")}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href="javascript:void(0)"
                      rel="noreferrer"
                      className="px-4 py-3 border-bottom d-flex align-items-center"
                      onClick={() => onRequestQuoteClick()}
                    >
                      <i className="icon-quote font-lg mr-3"></i>
                      {t("build_vehicle.Request a Quote")}
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="javascript:void(0)"
                      className="px-4 py-3 d-flex align-items-center"
                      onClick={() => onVisitPopupClick()}
                    >
                      <i className="icon-schedule font-lg mr-3"></i>
                      {t('build_vehicle.Schedule a Showroom Visit')}
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="col px-lg-3 px-0 d-flex align-items-center justify-content-lg-end justify-content-between flex-wrap">
            <div className="d-flex build-footer-btn-block">
              {props.activeTab !== TabNames.EXTERIOR && (
                <button
                  onClick={() => onPrevious()}
                  className="btn btn-outline-secondary font-md text-capitalize px-lg-4 px-3 mr-2 d-xl-inline-block d-none"
                >
                  <i className="icon-chevron-left mr-2 font-xxs"></i>
                  {t("build_vehicle.Previous")}
                </button>
              )}
              {props.cartData && props.cartData?.cartID && (
                <button
                  type="button"
                  disabled={isUpdating}
                  className="btn btn-primary font-md text-capitalize px-lg-4 px-3 mr-lg-2 col"
                  onClick={() => onSaveConfig()}
                >
                  {t("build_vehicle.Save")}
                </button>
              )}

              {props.activeTab !== TabNames.EXTERIOR &&
                props.activeTab !== TabNames.SUMMARY && (
                  <button
                    onClick={() => props.onNext(TabNames.SUMMARY)}
                    className="btn btn-primary font-md text-capitalize px-lg-4 px-3 mr-lg-2 col"
                  >
                    {t("build_vehicle.Summary")}
                  </button>
                )}
              {props.activeTab !== TabNames.SUMMARY &&
                props.combinationStateData?.isFound && (
                  <button
                    onClick={() => onNext()}
                    className="btn btn-primary font-md text-capitalize px-lg-4 px-3 col"
                  >
                    {t("build_vehicle.Next")}
                  </button>
                )}
            </div>
          </div>
        </div>
        {renderTestDriveModal()}
        {renderVisitModal()}
        {renderCallbackModal()}
        {renderDownloadBrochureModal()}
        {renderRequestQuoteModal()}
        {renderAuthModal()}
        {renderAuthOTPModal()}
        {renderSaveConfigConfirmModal()}
      </div>
      <a
        href={`https://api.whatsapp.com/send/?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NO}`}
        className="icon-whatsapp whatapp buildpage d-none"
        target="_blank"
        rel="noreferrer"
      >
        <span className="path1"></span>
        <span className="path2"></span>
      </a>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      addToCart: CartActions.addToCart,
      toggleRequestCallback: commonActions.toggleRequestCallback,
      toggleBookTestDrive: commonActions.toggleBookTestDrive,
      toggleDownloadBrochure: commonActions.toggleDownloadBrochure,
      toggleRequestQuote: commonActions.toggleRequestQuote,
      toggleSheduleShowroomVisit: commonActions.toggleSheduleShowroomVisit,
      getCartDetails: CartActions.getCartDetails,
      login: authActions.login,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    bookTestDrivePopupOpen: state.commonState.bookTestDrivePopupOpen,
    requestCallbackPopUpOpen: state.commonState.requestCallbackPopUpOpen,
    downloadBrochurePopupOpen: state.commonState.downloadBrochurePopupOpen,
    requestQuotePopupOpen: state.commonState.requestQuotePopupOpen,
    sheduleShoroomVisitPopupOpen:
      state.commonState.sheduleShoroomVisitPopupOpen,
    cartData: state.cartState,
    token: state.authState.token,
    productData: state.productDetailsState,
    combinationStateData: state.combinationState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ActionFooter);
interface OTPFormProps {
  otp: string;
}
