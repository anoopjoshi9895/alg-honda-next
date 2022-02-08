import React from "react";
import {
  api,
  authActions,
  CartActions,
  CartStateModel,
  LocalStorage,
  numberWithCommas,
  ProductDetailsStateModel,
  ShowRoomModelBV,
  types,
  USER_ID,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  BookNowFormProps,
  SignUpFormProps,
  TabNames,
  EcomProductType,
  calculateDiscount,
  getAppliedDiscount,
  getFinanceCampaignOffer,
  calculateMonthlyPayment,
  getFinancePrinciaplAmount,
} from "../utils";
import ReactModal from "react-modal";
import BookNowPopUp from "./BookNowPopUp";
import BookNowOTPPopUp from "./BookNowOTPPopUp";
import Select from "react-select";
import cloneDeep from "lodash/cloneDeep";
import SignUpOTPPopUp from "./auth/SignUpOTPPopUp";
import Image from "next/image";

import SaveConfigConfirmPopUp from "../action-footer/SaveConfigConfirmPopUp";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import BookNowSignUpConfirmPopUp from "./BookNowSignUpConfirmPopUp";
import { toastr } from "react-redux-toastr";
import ForgotPasswordPopUp from "./ForgotPasswordPopUp";
import { useRouter } from "next/router";
import { RouteKeys } from "../../../utils/route-keys";
import { RootState } from "../../../app/store";
interface OTPFormProps {
  otp: string;
}
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
interface CustomProps {
  onEditClick: any;
  cartData: CartStateModel;
  productData: ProductDetailsStateModel;
  getCartDetails: typeof CartActions.getCartDetails;
  addToCart: typeof CartActions.addToCart;
  updateShowRoomId: typeof CartActions.updateShowRoomId;
  token: string | undefined;
  login: typeof authActions.login;
  dispatch: any;
}
// enum SignUpStep {
//   initial = 'initial',
//   signUpCompleted = 'signUpCompleted',
//   otpVerified = 'otpVerified',
// }
const SummaryTabPane: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();

  const router = useRouter();
  const onEditClick = (tabName: string | TabNames) => {
    props.onEditClick(tabName.toUpperCase());
  };
  const [isUpdating, setUpdating] = React.useState(false);
  const [isLoginOTPActive, setLoginOTPActive] = React.useState(false);
  const [isConfigSuccess, setConfigSuccess] = React.useState(false);
  const [isBookNowActive, setBookNowActive] = React.useState(false);
  const [isAuthActive, setAuthActive] = React.useState(false);
  const [isAuthOTPActive, setAuthOTPActive] = React.useState(false);
  const [userId, setUserId] = React.useState<string | undefined>(undefined);
  const [bookNowError, setBookNowError] = React.useState<string | undefined>(
    undefined
  );
  const [isForgotPasswordActive, setForgotPasswordActive] =
    React.useState(false);
  const [signUpError, setSignUpError] = React.useState<string | undefined>(
    undefined
  );
  const [signUpOTPError, setSignUpOTPError] = React.useState<
    string | undefined
  >(undefined);
  const [bookNowOTPError, setBookNowOTPError] = React.useState<
    string | undefined
  >(undefined);
  const [bookNowData, setBookNowData] = React.useState<
    BookNowFormProps | undefined
  >(undefined);
  const [isUserConfirm, setUserConfirm] = React.useState(false);
  const [signUpData, setSignUpData] = React.useState<
    SignUpFormProps | undefined
  >(undefined);

  const [isSaveConfigConfirm, setIsSaveConfigConfirm] =
    React.useState<boolean>(false);

  const [isSignUpSubmiting, setSignUpSubmiting] = React.useState(false);

  React.useEffect(() => {
    if (
      props.cartData.showroomID === undefined ||
      props.cartData.showroomID === null ||
      props.cartData.showroomID === 0
    ) {
      if (props.productData?.showroomsList?.length > 0) {
        const showroomID = props.productData.showroomsList[1].showroomID;
        props.updateShowRoomId(showroomID);
      }
    }
  }, []);
  const onBookNowCancel = () => {
    setBookNowActive(!isBookNowActive);
  };
  const onBookNowClick = async () => {
    if (props.productData.productDetails) {
      if (!props.cartData.cartID) {
        try {
          const response = await api.build.createCart(
            props.productData.productDetails?.productID,
            props.cartData
          );
          setUpdating(true);

          const resp = await api.build.saveConfig(
            props.productData.productDetails?.productID,
            props.cartData
          );
          setUpdating(false);
          if (response.responsecode === 200) {
            props.getCartDetails(response.data?.cartID);
          }
        } catch (error) {
          // nothing
        }
      } else {
        try {
          setUpdating(true);
          const response = await api.build.updateCart(
            props.productData.productDetails?.productID,
            props.cartData
          );
          const resp = await api.build.saveConfig(
            props.productData.productDetails?.productID,
            props.cartData
          );
          setUpdating(false);
          if (response.responsecode === 200) {
            props.getCartDetails(response.data?.cartID);
          }
        } catch (error) {
          // nothing
        }
      }
    }
    if (props.token) {
      router.push(`${RouteKeys.PayNow}`);
    } else {
      setBookNowData(undefined);
      setBookNowActive(!isBookNowActive);
    }
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
  const onBookNowOTPSubmit = async (data: { otp: string }) => {
    const postData = new FormData();
    if (userId) {
      postData.append("userID", userId);
    }

    postData.append("otp", data.otp);

    const resp = await api.user.verifyOtp(postData);
    if (resp?.responsecode === 200) {
      setUserId(resp?.data?.userToken);
      LocalStorage.setItem(USER_ID, resp?.data?.userToken);
      props.dispatch({ type: types.LOGIN_SUCCESS, data: resp?.data });
      setBookNowActive(false);
      api.setToken(resp?.data?.userToken);
      if (props.productData.productDetails) {
        if (!props.cartData.cartID) {
          try {
            const response = await api.build.createCart(
              props.productData.productDetails?.productID,
              props.cartData
            );
            if (response.responsecode === 200) {
              props.getCartDetails(response.data?.cartID);
            }
          } catch (error) {
            // nothing
          }
        } else {
          try {
            setUpdating(true);
            const response = await api.build.updateCart(
              props.productData.productDetails?.productID,
              props.cartData
            );
            setUpdating(false);
            if (response.responsecode === 200) {
              props.getCartDetails(response.data?.cartID);
            }
          } catch (error) {
            // nothing
          }
        }
      }

      router.push(`${RouteKeys.PayNow}`);
    } else {
      setBookNowOTPError(resp?.message);
    }
  };
  const showShowRoomValue = (value: number | undefined) => {
    // let value = props.cartData?.showroomID;
    if (value) {
      const data = props.productData?.showroomsList?.find(
        (item) => item.showroomID === value
      );
      return data;
    }
    return undefined;
  };
  const onShowRoomChange = (data: ShowRoomModelBV) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    cart.showroomID = data.showroomID;
    props.addToCart(cart);
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
          }
        } catch (error) {
          // do nothing
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
  const onSignUpOTPSubmit = async (data: { otp: string }) => {
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
          // do nothing
        }
      }
    } else {
      setSignUpOTPError(response?.message);
    }
  };
  const onBookNowLoginOTPSubmit = async (data: OTPFormProps) => {
    if (userId) {
      const postData = new FormData();
      if (userId) {
        postData.append("userID", userId);
      }

      postData.append("otp", data.otp);

      const resp = await api.user.verifyOtp(postData);
      if (resp?.responsecode === 200) {
        setUserId(resp?.data?.userToken);
        LocalStorage.setItem(USER_ID, resp?.data?.userToken);
        props.dispatch({ type: types.LOGIN_SUCCESS, data: resp?.data });
        setBookNowActive(false);
        setLoginOTPActive(false);
        api.setToken(resp?.data?.userToken);
        if (props.productData.productDetails) {
          if (!props.cartData.cartID) {
            try {
              setUpdating(true);
              const response = await api.build.createCart(
                props.productData.productDetails?.productID,
                props.cartData
              );
              const res = await api.build.saveConfig(
                props.productData.productDetails?.productID,
                props.cartData
              );
              setUpdating(false);
              if (response.responsecode === 200) {
                props.getCartDetails(response.data?.cartID);
              }
            } catch (error) {
              // nothing
            }
          } else {
            try {
              setUpdating(true);
              const response = await api.build.updateCart(
                props.productData.productDetails?.productID,
                props.cartData
              );
              const res = await api.build.saveConfig(
                props.productData.productDetails?.productID,
                props.cartData
              );
              setUpdating(false);
              if (response.responsecode === 200) {
                props.getCartDetails(response.data?.cartID);
              }
            } catch (error) {
              // nothing
            }
          }
        }
        router.push(`${RouteKeys.PayNow}`);
      } else {
        setBookNowOTPError(resp?.message);
      }
    }
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
  const onBookNowLogin = (data: any) => {
    props.login(
      data,
      async (userID?: number, token?: string, verified?: boolean) => {
        if (userID && token && verified !== undefined) {
          setUserId(userID.toString() || "0");
          if (!verified) {
            setLoginOTPActive(true);
            try {
              const postData = new FormData();
              postData.append("userID", userID.toString());
              const response = await api.user.resendOtp(postData);
            } catch (error) {
              // nothing
            }
          } else {
            if (props.productData.productDetails) {
              if (props.productData.productDetails) {
                if (!props.cartData.cartID) {
                  try {
                    setUpdating(true);
                    const response = await api.build.createCart(
                      props.productData.productDetails?.productID,
                      props.cartData
                    );
                    const resp = await api.build.saveConfig(
                      props.productData.productDetails?.productID,
                      props.cartData
                    );
                    setUpdating(false);
                    if (response.responsecode === 200) {
                      props.getCartDetails(response.data?.cartID);
                    }
                  } catch (error) {
                    // nothing
                  }
                } else {
                  try {
                    setUpdating(true);
                    const response = await api.build.updateCart(
                      props.productData.productDetails?.productID,
                      props.cartData
                    );
                    const resp = await api.build.saveConfig(
                      props.productData.productDetails?.productID,
                      props.cartData
                    );
                    setUpdating(false);
                    if (response.responsecode === 200) {
                      props.getCartDetails(response.data?.cartID);
                    }
                  } catch (error) {
                    // nothing
                  }
                }
              }
              setBookNowActive(false);
              router.push(`${RouteKeys.PayNow}`);
            }
          }

          // setUserToken(token || '');
        }
      }
    );
  };
  const onSocialSubmit = async () => {
    setUserId(props.token);
    LocalStorage.setItem(USER_ID, props.token || "");
    setAuthActive(false);
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

  const combinationData = props.cartData?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productData.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const campaigns = !!props.cartData?.selCampaignDetails?.length
    ? productCombinations?.campaign?.filter(
        (c) =>
          !!props.cartData?.selCampaignDetails?.find(
            (x) => x.campaignID === c.campaignID
          )
      )
    : [];

  const tplOfferPrice = props?.cartData?.tpl
    ? props?.cartData?.tpl?.reduce((prev, cur) => prev + cur.offerPrice, 0)
    : 0;

  const tplSalesPrice = props?.cartData?.tpl
    ? props?.cartData?.tpl?.reduce((prev, cur) => prev + cur.salesPrice, 0)
    : 0;

  const registrationOfferPrice = props?.cartData?.registration
    ? props?.cartData?.registration?.reduce(
        (prev, cur) => prev + cur.offerPrice,
        0
      )
    : 0;

  const registrationSalesPrice = props?.cartData?.registration
    ? props?.cartData?.registration?.reduce(
        (prev, cur) => prev + cur.salesPrice,
        0
      )
    : 0;

  const finace = props?.cartData?.financeDetails?.[0];

  const campaignOffer =
    finace && finace.bankID
      ? getFinanceCampaignOffer(finace.bankID, campaigns)
      : undefined;

  const bank = props.productData?.bankDetails.find(
    (item) => item.bankID === finace?.bankID
  );

  const effectiveInterestRate =
    finace && finace.bankID
      ? (bank?.annualInterestRate || 0) -
        calculateDiscount(
          "percentage",

          campaignOffer?.campDiscountPercentage || 0,

          bank?.annualInterestRate || 0
        )
      : 0;

  const campaignCashBackDiscount =
    campaigns?.reduce(
      (s, c) =>
        s +
        (c.appliedItems

          ?.filter((ai) => ai.productType === EcomProductType.CashBack)

          ?.reduce(
            (t1, ai) =>
              t1 +
              (calculateDiscount(
                ai.campDiscountType,

                ai.campDiscountValue,

                productCombinations?.combinationOfferPrice || 0
              ) || 0),

            0
          ) || 0) +
        (props.cartData.campaignCashbackItems

          ?.filter((cash) => cash.campaignID === c.campaignID)

          ?.reduce((t2, c1) => t2 + c1.cashbackAmount, 0) || 0),

      0
    ) || 0;

  const principalAmount = getFinancePrinciaplAmount(
    props.cartData,

    props.productData,

    campaignCashBackDiscount
  );

  const monthlyPayment = calculateMonthlyPayment(
    principalAmount - (bank?.minDownPayment || 0),

    effectiveInterestRate / 100,

    60
  );

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

  const renderBookNowModal = () => {
    return (
      <ReactModal
        isOpen={isBookNowActive}
        contentLabel="Book Now"
        style={customStyles}
        onRequestClose={onBookNowCancel}
        shouldCloseOnOverlayClick={true}
      >
        {isForgotPasswordActive && (
          <ForgotPasswordPopUp
            onClose={onBookNowCancel}
            onSubmit={() => setForgotPasswordActive(false)}
          />
        )}
        {!isForgotPasswordActive &&
          !isLoginOTPActive &&
          !signUpData &&
          !isUserConfirm &&
          props.productData.productDetails && (
            <BookNowPopUp
              onClose={onBookNowCancel}
              onLogin={onBookNowLogin}
              isSignUpSubmiting={isSignUpSubmiting}
              onForgotPassword={() => setForgotPasswordActive(true)}
              onSocialSubmit={onSocialSubmit}
              onSignUp={onBookNowSubmit}
              productTitle={props.productData.productDetails?.productTitle}
              errorMessage={bookNowError}
              heading={"BOOK NOW"}
              subTitle={"booking"}
            />
          )}
        {isLoginOTPActive && props.productData.productDetails && (
          <BookNowOTPPopUp
            onClose={onBookNowCancel}
            onSubmit={onBookNowLoginOTPSubmit}
            errorMessage={bookNowOTPError}
          />
        )}

        {signUpData && !isUserConfirm && props.productData.productDetails && (
          <BookNowOTPPopUp
            onClose={onBookNowCancel}
            onSubmit={onBookNowOTPSubmit}
            errorMessage={bookNowOTPError}
            phoneNumber={signUpData.phoneNumber}
          />
        )}
        {isUserConfirm && (
          <BookNowSignUpConfirmPopUp
            onClose={onBookNowCancel}
            onSubmit={onSubmitConfirm}
            errorMessage={bookNowError}
          />
        )}
      </ReactModal>
    );
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
        // className="login-popup"
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
  const productMedia =
    props.cartData?.productInfo?.combinationInfo[0]?.combinationMedia.find(
      (item) =>
        item.customOptionName.toLocaleUpperCase() ===
        TabNames.EXTERIOR.toLocaleUpperCase()
    );
  let productImage = "";
  if (productMedia) {
    productImage = productMedia.image;
  }
  const isBrowser =
    typeof window !== "undefined" && typeof window.document !== "undefined";
  return (
    <div
      className="tab-pane fade show active"
      id="crossover-suvs"
      role="tabpanel"
      aria-labelledby="crossover-suvs-tab"
    >
      <div className="container py-5">
        <div className="row py-md-3 pb-md-5 py-5 justify-content-between">
          <div className="col-md-7 col-12">
            <div className="text-center mb-5 pb-3">
              {productImage && (
                <Image
                  src={productImage}
                  className="img-fluid"
                  alt="productImage"
                  width={1600}
                  height={900}
                />
              )}
            </div>
            <h6 className="font-weight-normal text-uppercase mb-4 pb-3">
              {t("build_vehicle.SUMMARY")}
            </h6>
            <div className="border-bottom font-normal py-2 mb-4">
              <div className="row align-items-center">
                <div className="col-12 text-uppercase text-secondary mb-2 font-weight-semibold">
                  {t("dashboard.Base Price")}
                </div>
                <div className="col-sm-9 col-8 text-muted">
                  {props.productData?.productDetails?.productTitle}
                </div>
                {props.cartData?.productInfo?.combinationInfo[0]
                  ?.combinationPrice && (
                  <div className="col-sm-3 col-4 text-right">{`KWD ${numberWithCommas(
                    props.cartData?.productInfo?.combinationInfo[0]
                      ?.combinationPrice
                  )}`}</div>
                )}
              </div>
            </div>
            {props.cartData?.productInfo?.customOptionsInfo?.map((option) => {
              return (
                <div
                  className="border-bottom font-normal py-2 mb-4"
                  key={option?.customOptionID}
                >
                  <div
                    className="row mb-1 align-items-center"
                    key={option.customOptionID}
                  >
                    <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-semibold">
                      {option.customOptionName}
                    </div>
                    <div className="col-sm-3 col-4 text-right mb-3">
                      <a
                        href="javascript:void(0)"
                        className="text-muted text-decoration-underline"
                        onClick={() => onEditClick(option.customOptionName)}
                      >
                        {t("build_vehicle.edit")}
                      </a>
                    </div>
                    <div className="col-sm-9 col-8 text-muted d-flex align-items-center">
                      {productImage && (
                        <div className="position-relative mr-3" style={{width: '32px', height: '32px'}}>
                        <Image
                          src={option.variantThumbImage}
                          className="img-fluid"
                          layout="fill"
                          alt=""
                        />
                        </div>
                      )}
                      {option.variantName}
                    </div>
                    {/* <div className="col-sm-3 col-4 text-right">{`KWD ${option.priceDiff}`}</div> */}
                  </div>
                </div>
              );
            })}
            {!!campaigns?.length && (
              <div className="border-bottom font-normal py-2 mb-4">
                <div className="row mb-1 align-items-center">
                  <div className="col-sm-9 col-8 text-uppercase mb-3 font-weight-semibold">
                    {t("build_vehicle.CAMPAIGNS")}
                  </div>
                  <div className="col-sm-3 col-4 text-right mb-3">
                    <a
                      href="javascript:void(0)"
                      onClick={() => onEditClick(TabNames.CAMPAIGNS)}
                      className="text-muted text-decoration-underline"
                    >
                      {t("build_vehicle.edit")}
                    </a>
                  </div>
                  {campaigns?.map((camp) => {
                    const cashbackTotal =
                      props.cartData?.campaignCashbackItems
                        ?.filter((cash) => cash.campaignID === camp.campaignID)
                        ?.reduce((t1, c) => t1 + c.cashbackAmount, 0) || 0;
                    return (
                      <>
                        <div className="align-items-center col-8 col-sm-12 d-flex mb-2 text-uppercase">
                          {camp.campaignTitle}
                        </div>

                        {camp.appliedItems?.map((item) => {
                          const appliedDiscount =
                            item.productType === EcomProductType.CashBack
                              ? calculateDiscount(
                                  item.campDiscountType,
                                  item.campDiscountValue,
                                  productCombinations?.combinationOfferPrice ||
                                    0
                                )
                              : 0;
                          return (
                            <>
                              <div className="pl-4 align-items-center col-8 col-sm-12 d-flex mb-2 text-muted">
                                {item.campDiscountTitle}
                                {item.productType ===
                                  EcomProductType.CashBack &&
                                  !!appliedDiscount && (
                                    <div className="col text-right font-sm">
                                      {props.cartData.productCurrency}{" "}
                                      {numberWithCommas(appliedDiscount)}
                                    </div>
                                  )}
                              </div>
                            </>
                          );
                        })}
                        {cashbackTotal > 0 && (
                          <div className="pl-4 align-items-center col-8 col-sm-12 d-flex mb-2 mt-3 ">
                            {t("build_vehicle.Campaign Cashbacks")}
                            <div className="col text-right font-sm">
                              {props.cartData.productCurrency}{" "}
                              {numberWithCommas(cashbackTotal)}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
            {props.cartData?.accessoriesInfo &&
              props.cartData?.accessoriesInfo?.length > 0 && (
                <div className="border-bottom font-normal py-2 mb-4">
                  <div className="row mb-1 align-items-center">
                    <div className="col-sm-9 col-8 text-uppercase mb-3 font-weight-semibold">
                      {t("build_vehicle.ACCESSORIES")}
                    </div>
                    <div className="col-sm-3 col-4 text-right mb-3">
                      <a
                        href="javascript:void(0)"
                        onClick={() => onEditClick(TabNames.ACCESSORIES)}
                        className="text-muted text-decoration-underline"
                      >
                        {t("build_vehicle.edit")}
                      </a>
                    </div>
                    {props.cartData?.accessoriesInfo?.map((ins) => {
                      return (
                        <>
                          <div className="col-sm-9 col-8 mb-2">
                            {ins.productTitle}
                            {!!props.cartData?.selCampaignDetails?.length &&
                              ins.salesPrice !== ins.offerPrice && (
                                <div className="font-sm text-muted">
                                  ({t("build_vehicle.ediAs a part of")}{" "}
                                  {props.cartData?.selCampaignDetails
                                    ?.map((c) => c.campaignTitle)
                                    ?.join()}
                                  )
                                </div>
                              )}
                          </div>
                          <div className="col-sm-3 col-4 text-right mb-2">
                            {ins.salesPrice !== ins.offerPrice && (
                              <del>
                                {props.cartData.productCurrency}{" "}
                                {numberWithCommas(ins.salesPrice)}
                              </del>
                            )}{" "}
                            {ins.offerPrice === 0 ? (
                              <span className="text-primary">
                                {t("build_vehicle.Free")}
                              </span>
                            ) : (
                              <>
                                {props.cartData.productCurrency}{" "}
                                {`${numberWithCommas(ins.offerPrice)}`}
                              </>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
            {((props.cartData?.insuranceDetails &&
              props.cartData?.insuranceDetails?.length > 0) ||
              (props.cartData?.serviceDetails &&
                props.cartData?.serviceDetails?.length > 0) ||
              (props.cartData?.customerCare &&
                props.cartData?.customerCare?.length > 0) ||
              (props.cartData?.extendedWarranty &&
                props.cartData?.extendedWarranty?.length > 0)) && (
              <div className="border-bottom font-normal py-2 mb-4">
                <div className="row mb-1 align-items-center">
                  <div className="col-sm-9 col-8 text-uppercase mb-3 font-weight-semibold">
                    {t("dashboard.Insurance & Services")}
                  </div>
                  <div className="col-sm-3 col-4 text-right mb-3">
                    <a
                      href="javascript:void(0)"
                      onClick={() => onEditClick(TabNames.INSURANCES)}
                      className="text-muted text-decoration-underline"
                    >
                      {t("build_vehicle.edit")}
                    </a>
                  </div>
                  {props.cartData?.insuranceDetails?.map((ins) => {
                    const matchingPlan =
                      props.productData?.insurancesList?.find(
                        (c) =>
                          c.productID?.toString() === ins.productID?.toString()
                      );
                    const matchingOption = matchingPlan?.optionsList?.find(
                      (c) =>
                        c.productOptionID === ins?.planDetails?.productOptionID
                    );

                    const addOns = matchingOption?.addons?.filter((a) =>
                      ins?.planDetails?.addons?.find(
                        (x) =>
                          x.packageID === a.packageID &&
                          x.packageOptionID === a.packageOptionID
                      )
                    );

                    return (
                      <>
                        <div className="align-items-center col-8 col-sm-9 mb-2 text-uppercase">
                          {t("build_vehicle.Insurance")}
                          {!!props.cartData?.selCampaignDetails?.length &&
                            ins.salesPrice !== ins.offerPrice && (
                              <div className="font-sm text-muted">
                                ({t("build_vehicle.edit")}As a part of{" "}
                                {props.cartData?.selCampaignDetails
                                  ?.map((c) => c.campaignTitle)
                                  ?.join()}
                                )
                              </div>
                            )}
                        </div>

                        <div className="col-sm-3 col-4 text-right mb-2">
                          {ins.planDetails?.payType === "cash" && (
                            <>
                              {ins.salesPrice !== ins.offerPrice && (
                                <del>
                                  {" "}
                                  KWD {numberWithCommas(ins.salesPrice)}
                                </del>
                              )}{" "}
                              {ins.offerPrice === 0 ? (
                                <span className="text-primary">
                                  {t("build_vehicle.Free")}
                                </span>
                              ) : (
                                <> KWD {numberWithCommas(ins.offerPrice)}</>
                              )}
                            </>
                          )}
                        </div>
                        <div className="pl-4 col-sm-12 col-8 text-muted d-flex align-items-center mb-2">
                          {t("build_vehicle.Name")} : {ins.productTitle}
                          <br></br>
                          {t("build_vehicle.Plan")} :{" "}
                          {matchingOption?.productOptionName}
                          <br></br>
                          {t("build_vehicle.Payment Type")} :{" "}
                          {ins?.planDetails?.payType}
                        </div>
                        {!!addOns?.length && (
                          <div className="pl-4 col-sm-12 col-8 d-flex align-items-center mb-2">
                            {t("build_vehicle.AddOns")} :
                          </div>
                        )}

                        {addOns?.map((add) => {
                          const insAddOn = ins?.planDetails?.addons?.find(
                            (x) =>
                              x.packageID === add.packageID &&
                              x.packageOptionID === add.packageOptionID
                          );
                          return (
                            <>
                              <div className="pl-4 align-items-center col-8 col-sm-9 d-flex mb-2 text-muted">
                                {add.addonName}
                              </div>

                              <div className="col-sm-3 col-4 text-right mb-2">
                                {ins.planDetails?.payType === "cash" && (
                                  <>
                                    {insAddOn?.originalPrice !==
                                      insAddOn?.price && (
                                      <del>
                                        KWD{" "}
                                        {numberWithCommas(
                                          insAddOn?.originalPrice || 0
                                        )}
                                      </del>
                                    )}{" "}
                                    {(insAddOn?.price || 0) === 0 ? (
                                      <span className="text-primary">
                                        {t("build_vehicle.Free")}
                                      </span>
                                    ) : (
                                      <>
                                        KWD{" "}
                                        {numberWithCommas(insAddOn?.price || 0)}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                  {props.cartData?.serviceDetails?.map((ser) => {
                    const matchingPlan = props.productData?.servicesList?.find(
                      (c) =>
                        c.productID?.toString() === ser.productID?.toString()
                    );
                    const matchingOption = matchingPlan?.optionsList?.find(
                      (c) =>
                        c.productOptionID === ser?.planDetails?.productOptionID
                    );

                    const addOns = matchingOption?.addons?.filter((a) =>
                      ser?.planDetails?.addons?.find(
                        (x) =>
                          x.packageID === a.packageID &&
                          x.packageOptionID === a.packageOptionID
                      )
                    );
                    return (
                      <>
                        <div className="mt-2 align-items-center col-8 col-sm-9 mb-2">
                          <div className="text-uppercase">
                            {t("build_vehicle.service_contract")}
                          </div>
                          {!!props.cartData?.selCampaignDetails?.length &&
                            ser.salesPrice !== ser.offerPrice && (
                              <div className="font-sm text-muted">
                                ({t("build_vehicle.As a part of")}{" "}
                                {props.cartData?.selCampaignDetails
                                  ?.map((c) => c.campaignTitle)
                                  ?.join()}
                                )
                              </div>
                            )}
                        </div>
                        <div className="col-sm-3 col-4 text-right">
                          {ser.salesPrice !== ser.offerPrice && (
                            <del> KWD {numberWithCommas(ser.salesPrice)}</del>
                          )}{" "}
                          {ser.offerPrice === 0 ? (
                            <span className="text-primary">
                              {t("build_vehicle.Free")}
                            </span>
                          ) : (
                            <> KWD {`${numberWithCommas(ser.offerPrice)}`}</>
                          )}
                        </div>
                        <div className="pl-4 col-sm-12 col-8 text-muted d-flex align-items-center mb-2">
                          {t("build_vehicle.Name")} : {ser.productTitle}
                          <br></br>
                          {t("build_vehicle.Plan")} :{" "}
                          {matchingOption?.productOptionName}
                          <br></br>
                          {t("build_vehicle.Payment Type")} :{" "}
                          {ser?.planDetails?.payType}
                        </div>
                        {!!addOns?.length && (
                          <div className="pl-4 col-sm-12 col-8 d-flex align-items-center mb-2">
                            {t("build_vehicle.AddOns")} :
                          </div>
                        )}

                        {addOns?.map((add) => {
                          const insAddOn = ser?.planDetails?.addons?.find(
                            (x) =>
                              x.packageID === add.packageID &&
                              x.packageOptionID === add.packageOptionID
                          );
                          return (
                            <>
                              <div className="pl-4 align-items-center col-8 col-sm-9 d-flex mb-2 text-muted">
                                {add.addonName}
                              </div>

                              <div className="col-sm-3 col-4 text-right mb-2">
                                {insAddOn?.originalPrice !==
                                  insAddOn?.price && (
                                  <del>
                                    KWD{" "}
                                    {numberWithCommas(
                                      insAddOn?.originalPrice || 0
                                    )}
                                  </del>
                                )}{" "}
                                {(insAddOn?.price || 0) === 0 ? (
                                  <span className="text-primary">
                                    {t("build_vehicle.Free")}
                                  </span>
                                ) : (
                                  <>
                                    KWD {numberWithCommas(insAddOn?.price || 0)}
                                  </>
                                )}
                              </div>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                  {props.cartData?.customerCare?.map((cus) => {
                    const matchingPlan = props.productData?.servicesList?.find(
                      (c) =>
                        c.productID?.toString() === cus.productID?.toString()
                    );
                    const matchingOption = matchingPlan?.optionsList?.find(
                      (c) =>
                        c.productOptionID === cus?.planDetails?.productOptionID
                    );

                    const addOns = matchingOption?.addons?.filter((a) =>
                      cus?.planDetails?.addons?.find(
                        (x) =>
                          x.packageID === a.packageID &&
                          x.packageOptionID === a.packageOptionID
                      )
                    );
                    return (
                      <>
                        <div className="mt-2 col-8 col-sm-9 mb-2 text-uppercase">
                          {t("build_vehicle.customer_care_packages")}
                          {!!props.cartData?.selCampaignDetails?.length &&
                            cus.salesPrice !== cus.offerPrice && (
                              <div className="font-sm text-muted">
                                ({t("build_vehicle.As a part of")}{" "}
                                {props.cartData?.selCampaignDetails
                                  ?.map((c) => c.campaignTitle)
                                  ?.join()}
                                )
                              </div>
                            )}
                        </div>
                        <div className="col-sm-3 col-4 text-right">
                          {cus.salesPrice !== cus.offerPrice && (
                            <del> KWD {numberWithCommas(cus.salesPrice)}</del>
                          )}{" "}
                          {cus.offerPrice === 0 ? (
                            <span className="text-primary">
                              {t("build_vehicle.Free")}
                            </span>
                          ) : (
                            <> KWD {`${numberWithCommas(cus.offerPrice)}`}</>
                          )}
                        </div>
                        <div className="pl-4 col-sm-12 col-8 text-muted d-flex align-items-center mb-2">
                          {t("build_vehicle.Name")} : {cus.productTitle}
                          {matchingOption?.productOptionName && (
                            <>
                              <br></br>
                              {t("build_vehicle.Plan")} :{" "}
                              {matchingOption?.productOptionName}
                            </>
                          )}
                          <br></br>
                          {t("build_vehicle.Payment Type")} :{" "}
                          {cus?.planDetails?.payType}
                        </div>
                        {!!addOns?.length && (
                          <div className="pl-4 col-sm-12 col-8 d-flex align-items-center mb-2">
                            {t("build_vehicle.AddOns")} :
                          </div>
                        )}

                        {addOns?.map((add) => {
                          const insAddOn = cus?.planDetails?.addons?.find(
                            (x) =>
                              x.packageID === add.packageID &&
                              x.packageOptionID === add.packageOptionID
                          );
                          return (
                            <>
                              <div className="pl-4 align-items-center col-8 col-sm-9 d-flex mb-2 text-muted">
                                {add.addonName}
                              </div>

                              <div className="col-sm-3 col-4 text-right mb-2">
                                {insAddOn?.originalPrice !==
                                  insAddOn?.price && (
                                  <del>
                                    KWD{" "}
                                    {numberWithCommas(
                                      insAddOn?.originalPrice || 0
                                    )}
                                  </del>
                                )}{" "}
                                {(insAddOn?.price || 0) === 0 ? (
                                  <span className="text-primary">
                                    {t("build_vehicle.Free")}
                                  </span>
                                ) : (
                                  <>
                                    KWD {numberWithCommas(insAddOn?.price || 0)}
                                  </>
                                )}
                              </div>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                  {props.cartData?.extendedWarranty?.map((war) => {
                    const matchingPlan = props.productData?.servicesList?.find(
                      (c) =>
                        c.productID?.toString() === war.productID?.toString()
                    );
                    const matchingOption = matchingPlan?.optionsList?.find(
                      (c) =>
                        c.productOptionID === war?.planDetails?.productOptionID
                    );

                    const addOns = matchingOption?.addons?.filter((a) =>
                      war?.planDetails?.addons?.find(
                        (x) =>
                          x.packageID === a.packageID &&
                          x.packageOptionID === a.packageOptionID
                      )
                    );
                    return (
                      <>
                        <div className="mt-2 col-8 col-sm-9 mb-2 text-uppercase">
                          {t("build_vehicle.extended_warranty")}
                          {!!props.cartData?.selCampaignDetails?.length &&
                            war.salesPrice !== war.offerPrice && (
                              <div className="font-sm text-muted">
                                ({t("build_vehicle.As a part of")}{" "}
                                {props.cartData?.selCampaignDetails
                                  ?.map((c) => c.campaignTitle)
                                  ?.join()}
                                )
                              </div>
                            )}
                        </div>
                        <div className="col-sm-3 col-4 text-right">
                          {war.salesPrice !== war.offerPrice && (
                            <del> KWD {numberWithCommas(war.salesPrice)}</del>
                          )}{" "}
                          {war.offerPrice === 0 ? (
                            <span className="text-primary">
                              {t("build_vehicle.Free")}
                            </span>
                          ) : (
                            <> KWD {`${numberWithCommas(war.offerPrice)}`}</>
                          )}
                        </div>
                        <div className="pl-4 col-sm-12 col-8 text-muted d-flex align-items-center mb-2">
                          {t("build_vehicle.Name")} : {war.productTitle}
                          {matchingOption?.productOptionName && (
                            <>
                              <br></br>
                              {t("build_vehicle.Plan")} :{" "}
                              {matchingOption?.productOptionName}
                            </>
                          )}
                          <br></br>
                          {t("build_vehicle.Payment Type")} :{" "}
                          {war?.planDetails?.payType}
                        </div>
                        {!!addOns?.length && (
                          <div className="pl-4 col-sm-12 col-8 d-flex align-items-center mb-2">
                            {t("build_vehicle.AddOns")} :
                          </div>
                        )}

                        {addOns?.map((add) => {
                          const insAddOn = war?.planDetails?.addons?.find(
                            (x) =>
                              x.packageID === add.packageID &&
                              x.packageOptionID === add.packageOptionID
                          );
                          return (
                            <>
                              <div className="pl-4 align-items-center col-8 col-sm-9 d-flex mb-2 text-muted">
                                {add.addonName}
                              </div>

                              <div className="col-sm-3 col-4 text-right mb-2">
                                {insAddOn?.originalPrice !==
                                  insAddOn?.price && (
                                  <del>
                                    KWD{" "}
                                    {numberWithCommas(
                                      insAddOn?.originalPrice || 0
                                    )}
                                  </del>
                                )}{" "}
                                {(insAddOn?.price || 0) === 0 ? (
                                  <span className="text-primary">
                                    {t("build_vehicle.Free")}
                                  </span>
                                ) : (
                                  <>
                                    KWD {numberWithCommas(insAddOn?.price || 0)}
                                  </>
                                )}
                              </div>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
            {props.cartData?.tradeInDetails &&
              props.cartData?.tradeInDetails?.length > 0 && (
                <div className="border-bottom font-normal py-2 mb-4">
                  <div className="row mb-1 align-items-center">
                    <div className="col-sm-9 col-8 text-uppercase mb-3 font-weight-semibold">
                      {t("build_vehicle.TRADEIN")}
                    </div>
                    <div className="col-sm-3 col-4 text-right mb-4">
                      <a
                        href="javascript:void(0)"
                        onClick={() => onEditClick(TabNames.TRADEIN)}
                        className="text-muted text-decoration-underline"
                      >
                        {t("build_vehicle.edit")}
                      </a>
                    </div>
                    {props?.cartData?.tradeInDetails?.map((trd) => {
                      return (
                        <>
                          <div className="col-sm-9 col-8 text-muted d-flex align-items-center mb-2">
                            {`${trd.brand} ${trd.modelCode}`}
                          </div>
                          <div className="col-sm-3 col-4 text-right mb-2"></div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}

            <div className="border-bottom font-normal py-2 mb-4">
              <div className="row mb-1 align-items-center">
                <div className="col-sm-9 col-8 text-uppercase mb-3 font-weight-semibold">
                  {t("dashboard.TPL")}
                  {!!props.cartData?.selCampaignDetails?.length &&
                    tplOfferPrice !== tplSalesPrice && (
                      <div className="font-sm text-muted">
                        ({t("build_vehicle.As a part of")}{" "}
                        {props.cartData?.selCampaignDetails
                          ?.map((c) => c.campaignTitle)
                          ?.join()}
                        )
                      </div>
                    )}
                </div>
                <div className="col-sm-3 col-4 text-right mb-2">
                  {tplSalesPrice !== tplOfferPrice && (
                    <del>
                      {props?.cartData?.productCurrency}{" "}
                      {numberWithCommas(tplSalesPrice)}
                    </del>
                  )}{" "}
                  {tplOfferPrice === 0 ? (
                    <span className="text-primary">
                      {t("build_vehicle.Free")}
                    </span>
                  ) : (
                    <>
                      {props?.cartData?.productCurrency}{" "}
                      {`${numberWithCommas(tplOfferPrice)}`}
                    </>
                  )}
                </div>

                <div className="col-sm-9 col-8 text-uppercase mb-3 font-weight-semibold">
                  {t("dashboard.Registration Amount")}
                  {!!props.cartData?.selCampaignDetails?.length &&
                    registrationOfferPrice !== registrationSalesPrice && (
                      <div className="font-sm text-muted">
                        ({t("build_vehicle.As a part of")}{" "}
                        {props.cartData?.selCampaignDetails
                          ?.map((c) => c.campaignTitle)
                          ?.join()}
                        )
                      </div>
                    )}
                </div>
                <div className="col-sm-3 col-4 text-right mb-2">
                  {registrationSalesPrice !== registrationOfferPrice && (
                    <del>
                      {props?.cartData?.productCurrency}{" "}
                      {numberWithCommas(registrationSalesPrice)}
                    </del>
                  )}{" "}
                  {registrationOfferPrice === 0 ? (
                    <span className="text-primary">
                      {t("build_vehicle.Free")}
                    </span>
                  ) : (
                    <>
                      {props?.cartData?.productCurrency}{" "}
                      {`${numberWithCommas(registrationOfferPrice)}`}
                    </>
                  )}
                </div>
              </div>
            </div>

            {props.cartData?.accessoryPackages &&
              props.cartData?.accessoryPackages?.length > 0 && (
                <div className="border-bottom font-normal py-2 mb-4">
                  <div className="row mb-1 align-items-center">
                    <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-bold">
                      {t("build_vehicle.Accessory Packages")}
                    </div>

                    <div className="col-sm-3 col-4 text-right mb-3">
                      <a
                        href="javascript:void(0)"
                        onClick={() => onEditClick(TabNames.ACCESSORIES)}
                        className="text-primary text-decoration-underline"
                      >
                        {t("build_vehicle.edit")}
                      </a>
                    </div>

                    {props.cartData.accessoryPackages.map((ins) => {
                      const discountData = getAppliedDiscount(
                        props?.productData,
                        productCombinations?.combinationOfferPrice || 0,
                        "accessorypackages",
                        { productID: ins?.packageID },
                        campaigns,
                        props?.cartData
                      );

                      const originalPrice = discountData.originalPrice;
                      const offerPrice =
                        discountData.originalPrice - discountData.discount;

                      return (
                        <>
                          <div className="col-sm-9 col-8 text-muted d-flex align-items-center mb-2">
                            {ins.productTitle}

                            {!!props.cartData?.selCampaignDetails?.length &&
                              originalPrice !== offerPrice && (
                                <span className="text-warning ml-1">
                                  ({t("build_vehicle.As a part of")}{" "}
                                  {props.cartData?.selCampaignDetails

                                    ?.map((c) => c.campaignTitle)

                                    ?.join()}
                                  )
                                </span>
                              )}
                          </div>

                          <div className="col-sm-3 col-4 text-right mb-2">
                            {originalPrice !== offerPrice && (
                              <del>
                                {props.cartData.productCurrency}{" "}
                                {numberWithCommas(originalPrice)}
                              </del>
                            )}{" "}
                            {offerPrice === 0 ? (
                              <span className="text-primary">
                                {t("build_vehicle.Free")}
                              </span>
                            ) : (
                              <>
                                {props.cartData.productCurrency}{" "}
                                {`${numberWithCommas(offerPrice)}`}
                              </>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
            {props.cartData?.coupons && props.cartData?.coupons?.length > 0 && (
              <div className="border-bottom font-normal py-2 mb-4">
                <div className="row mb-1 align-items-center">
                  <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-bold">
                    {t("build_vehicle.Coupons")}
                  </div>

                  {props.cartData.coupons?.map((coupon) => {
                    const campaign = campaigns?.find(
                      (camp) => camp.campaignID === coupon.campaignID
                    );

                    if (!campaign?.couponCashBack) {
                      return <></>;
                    }

                    return (
                      <>
                        <div className="col-sm-9 col-8 text-muted d-flex align-items-center mb-2">
                          {campaign?.couponCashBack?.couponCashbackTitle}
                        </div>

                        <div className="col-sm-3 col-4 text-right mb-2">
                          {props.cartData.productCurrency}{" "}
                          {`${numberWithCommas(coupon.couponCashbackAmount)}`}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {props.cartData?.vouchers && props.cartData?.vouchers?.length > 0 && (
              <div className="border-bottom font-normal py-2 mb-4">
                <div className="row mb-1 align-items-center">
                  <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-bold">
                    {t("build_vehicle.External Vouchers")}
                  </div>

                  {props.cartData.vouchers?.map((voucher) => {
                    return (
                      <>
                        <div className="col-sm-12 col-12 text-muted d-flex align-items-center mb-2">
                          {voucher.cashVoucherTitle}

                          <span className="text-warning ml-1 text-capitalize">
                            ({t("build_vehicle.voucher_text1")} &quot
                            {voucher.campDiscountTitle}&quot{" "}
                            {t("build_vehicle.voucher_text3")})
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="border-bottom font-normal py-2 mb-1">
              <div className="row mb-1 align-items-center">
                <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-semibold">
                  {t("build_vehicle.Finance Information")}
                </div>
                <div className="col-sm-3 col-4 text-right mb-3">
                  <a
                    href="javascript:void(0)"
                    onClick={() => onEditClick(TabNames.FINANCE)}
                    className="text-muted text-decoration-underline"
                  >
                    {t("build_vehicle.edit")}
                  </a>
                </div>
                {props.cartData?.financeDetails &&
                  props.cartData?.financeDetails?.length > 0 && (
                    <>
                      <div className="col-sm-9 col-8 text-muted d-flex align-items-center mb-3">
                        {t("dashboard.Term (months)")}
                      </div>
                      <div className="col-sm-3 col-4 text-right mb-3">
                        {props.cartData.financeDetails[0].term}
                      </div>
                      <div className="col-sm-9 col-8 text-muted d-flex flex-wrap align-items-center">
                        {t("dashboard.Annual Interest Rate")}
                        <div className="font-xs w-100">{`*Provided by ${props.cartData?.financeDetails[0].bankName}`}</div>
                      </div>
                      <div className="col-sm-3 col-4 text-right">{`${effectiveInterestRate} %`}</div>

                      {(campaignOffer?.campaignID || 0) > 0 && (
                        <>
                          {(campaignOffer?.campCashback || 0) > 0 && (
                            <>
                              <div className="col-sm-9 col-8 text-muted d-flex flex-wrap align-items-center">
                                {t("build_vehicle.Campaign Cashback")}
                              </div>

                              <div className="col-sm-3 col-4 text-right">{`${
                                props.cartData.productCurrency
                              } ${numberWithCommas(
                                (campaignOffer?.campCashback || 0)?.toFixed(2)
                              )}`}</div>
                            </>
                          )}

                          {(campaignOffer?.numOfFreeEmi || 0) > 0 && (
                            <>
                              <div className="col-sm-9 col-8 text-muted d-flex flex-wrap align-items-center">
                                {t("build_vehicle.No of Free EMIs")}
                              </div>

                              <div className="col-sm-3 col-4 text-right">
                                {campaignOffer?.numOfFreeEmi}
                              </div>
                            </>
                          )}

                          {(campaignOffer?.campDiscountPercentage || 0) > 0 && (
                            <>
                              <div className="col-sm-9 col-8 text-muted d-flex flex-wrap align-items-center">
                                {t("build_vehicle.Interest Rate Discount")}
                              </div>

                              <div className="col-sm-3 col-4 text-right">
                                {campaignOffer?.campDiscountPercentage}%
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
              </div>
            </div>
            {props?.cartData?.financeDetails &&
              props?.cartData?.financeDetails?.length > 0 && (
                <div className="border-bottom font-normal py-3 mb-3">
                  <div className="row mb-1 align-items-center">
                    <div className="col-sm-9 col-8 font-xs text-muted">
                      {t("build_vehicle.monthly_payment")}
                    </div>
                    <div className="col-sm-3 col-4 text-right">{`${
                      props.cartData.productCurrency
                    } ${numberWithCommas(monthlyPayment?.toFixed(2))}`}</div>
                  </div>
                </div>
              )}

            <div className="font-normal py-2 mb-4">
              <div className="row mb-1 align-items-center">
                {(props.cartData?.totalDiscount || 0) > 0 && (
                  <>
                    <div className="col-sm-9 col-8 text-uppercase text-primary mb-4">
                      {t("build_vehicle.Discount")}
                    </div>

                    <div className="col-sm-3 col-4 text-right mb-4 font-xl">
                      {props.cartData.productCurrency}{" "}
                      {numberWithCommas(props.cartData?.totalDiscount || 0)}
                    </div>
                  </>
                )}
                <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-semibold">
                  {t("dashboard.Total Price")}
                </div>
                <div className="col-sm-3 col-4 text-right mb-4 font-xl">
                  {props.cartData.productCurrency}{" "}
                  {props.cartData?.productInfo?.tradeInDiscount > 0 && (
                    <>
                      <del>
                        {numberWithCommas(
                          props.cartData.netPrice +
                            props.cartData?.productInfo?.tradeInDiscount -
                            (props.cartData.totalDiscount || 0)
                        )}
                      </del>{" "}
                    </>
                  )}
                  {numberWithCommas(
                    props.cartData.netPrice -
                      (props.cartData.totalDiscount || 0)
                  )}
                </div>
              </div>
            </div>
            <div className="">
              {/* <a
                href=""
                className="align-items-center btn btn-outline-secondary mb-4 py-2 mr-4"
              >
                <span className="py-1 d-flex align-items-center w-100">
                  <i className="icon-download font-xl mr-3"></i>Download Product
                  Brochure
                </span>
              </a> */}
              <a className="align-items-center btn btn-outline-secondary mb-4 position-relative py-2 share-btn">
                <span className="py-1 d-flex align-items-center w-100">
                  <i className="icon-share font-xl mr-3"></i>
                  {t("build_vehicle.Share this")}
                </span>
                {isBrowser && (
                  <div className="position-absolute left-0 d-flex bg-white px-3 py-2 rounded border shadow share-dropdown">
                    <ul className="row gutter-8 justify-content-center list-unstyled p-0 h6 share-block mb-0">
                      <li className="col-auto">
                        <WhatsappShareButton
                          className="round border rounded-circle d-inline-flex align-items-center justify-content-center"
                          title="WhatsApp"
                          url={`${window.location.origin.toString()}${
                            router.pathname
                          }`}
                        >
                          <i className="icon-whatsapp ">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </WhatsappShareButton>
                      </li>
                      <li className="col-auto">
                        <TwitterShareButton
                          className="round border rounded-circle d-inline-flex align-items-center justify-content-center"
                          title="Twitter"
                          url={`${window.location.origin.toString()}${
                            router.pathname
                          }`}
                        >
                          <i className="icon-twitter"></i>
                        </TwitterShareButton>
                      </li>
                      <li className="col-auto">
                        <InstapaperShareButton
                          className="round border rounded-circle d-inline-flex align-items-center justify-content-center instagram"
                          title="instagram"
                          url={`${window.location.origin.toString()}${
                            router.pathname
                          }`}
                        >
                          <i className="icon-instagram"></i>
                        </InstapaperShareButton>
                      </li>
                      <li className="col-auto">
                        <FacebookShareButton
                          className="round border rounded-circle d-inline-flex align-items-center justify-content-center"
                          title="Facebook"
                          url={`${window.location.origin.toString()}${
                            router.pathname
                          }`}
                        >
                          <i className="icon-facebook"></i>
                        </FacebookShareButton>
                      </li>
                      <li className="col-auto">
                        <LinkedinShareButton
                          className="round border rounded-circle d-inline-flex align-items-center justify-content-center"
                          title="Linkedin"
                          url={`${window.location.origin.toString()}${
                            router.pathname
                          }`}
                        >
                          <i className="icon-linkedin"></i>
                        </LinkedinShareButton>
                      </li>
                    </ul>
                  </div>
                )}
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-5 col-12">
            <div className="pl-md-4 sticky-element">
              <h3 className="text-uppercase mb-4">
                {props.productData.productDetails?.productTitle}
              </h3>
              <div className="d-md-block d-flex align-items-baseline mb-lg-4 mb-3 pb-lg-2 order-lg-0 order-first">
                <p className="font-xs text-muted mb-0 mr-md-0 mr-1 d-inline-block">
                  {t("build_vehicle.Net Price")}
                </p>
                <span className="tooltip position-relative mr-1">
                  <i className="icon-info text-primary font-xs ml-1 cursor-pointer"></i>
                  <div className="tooltip-content font-weight-normal text-muted font-normal position-absolute border border-secondary bg-white zIndex-1 px-3 py-4">
                    {t("build_vehicle.net_price_popupText")}
                  </div>
                </span>
                <h3 className="mb-0 font-weight-normal">
                  {props.cartData.productCurrency}{" "}
                  {props.cartData?.productInfo?.tradeInDiscount > 0 && (
                    <>
                      <del>
                        {numberWithCommas(
                          props.cartData.netPrice +
                            props.cartData?.productInfo?.tradeInDiscount -
                            (props.cartData.totalDiscount || 0)
                        )}
                      </del>{" "}
                    </>
                  )}
                  {numberWithCommas(
                    props.cartData.netPrice -
                      (props.cartData.totalDiscount || 0)
                  )}
                </h3>
              </div>
              <div className="mb-4 pb-2">
                <label className="font-normal" htmlFor="showroom">
                  {t("build_vehicle.Showroom")}
                </label>
                {props.cartData?.showroomID !== undefined &&
                  props.cartData?.showroomID !== 0 && (
                    <Select
                      placeholder={"Show Room"}
                      key={"showRoom"}
                      getOptionLabel={(option) => `${option.showroomName}`}
                      getOptionValue={(option) => `${option.showroomID}`}
                      // options={years}
                      isSearchable={false}
                      // defaultValue={props.productData.showroomsList[0]}
                      value={
                        showShowRoomValue(props.cartData?.showroomID) ||
                        undefined
                      }
                      options={props.productData.showroomsList}
                      onChange={(value) => {
                        if (value) {
                          onShowRoomChange(value);
                        }
                      }}
                      className="font-normal h-auto select position-relative zIndex-9"
                    />
                  )}
                {/* <select className="form-control" name="" id="showroom">
                  <option value="">Safat Al Rai</option>
                  <option value="">Safat Al Rai</option>
                  <option value="">Safat Al Rai</option>
                </select> */}
              </div>
              <button
                disabled={isUpdating}
                className="btn btn-primary btn-block text-uppercase font-md"
                onClick={() => onBookNowClick()}
              >
                {t("build_vehicle.Book Now")}
              </button>

              <button
                className="btn btn-primary btn-block text-uppercase font-md mb-4"
                // disabled={isUpdating}
                onClick={() => onSaveConfig()}
              >
                {t("build_vehicle.save configuration")}
              </button>
              {isConfigSuccess && (
                <div
                  className="alert-success border border-success py-3 my-2 px-3 text-success font-md row no-gutters align-items-center"
                  onAnimationEnd={() => setConfigSuccess(false)}
                >
                  <div className="col-10">
                    {t("build_vehicle.Saved configuration successfully")}
                  </div>
                  <div className="col-2 text-right pl-3">
                    <i
                      className="icon-close cursor-pointer font-xs"
                      onClick={() => setConfigSuccess(false)}
                    ></i>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {renderBookNowModal()}
      {renderAuthModal()}
      {renderAuthOTPModal()}
      {renderSaveConfigConfirmModal()}
    </div>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      addToCart: CartActions.addToCart,
      getCartDetails: CartActions.getCartDetails,
      login: authActions.login,
      updateShowRoomId: CartActions.updateShowRoomId,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    cartData: state.cartState,
    productData: state.productDetailsState,
    token: state.authState.token,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SummaryTabPane);
