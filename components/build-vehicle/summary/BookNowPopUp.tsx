import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  CartStateModel,
  commonActions,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import { TabNames } from "../utils";
import SignUpForm from "./auth/SignUpForm";
import Login from "./auth/Login";
import { useTranslation } from "react-i18next";
import FacobookButton from "../../auth/FacobookButton";
import GoogleButton from "../../auth/GoogleButton";
import UpdatePhone from "../../auth/UpdatePhone";
import { RootState } from "../../../app/store";
import Image from "next/image";

enum AuthTab {
  signUp = "signUp",
  signIn = "signIn",
}
interface CustomProps {
  onClose: any;
  errorMessage?: string;
  productTitle: string;
  cartData: CartStateModel;
  productData: ProductDetailsStateModel;
  onSocialSubmit?: () => void;
  onSignUp: any;
  onLogin: any;
  isSignUpSubmiting?: boolean;
  heading: string;
  subTitle: string;
  onForgotPassword?: any;
}
const BookNowPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const [tabName, setTabName] = React.useState(AuthTab.signIn);
  const [isShowOtpForm, setShowOtpForm] = React.useState(false);
  const [userId, setUserId] = React.useState<number>(0);
  const [userToken, setUserToken] = React.useState<string>("");
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
  const onGoogleSubmit = (userID?: number, token?: string) => {
    if (!userID) {
      props.onSocialSubmit?.();
    } else {
      setUserId(userID || 0);
      setUserToken(token || "");
      setShowOtpForm(true);
    }
  };
  return (
    <>
      <div className="modal-body p-0">
        <button
          type="button"
          className="position-absolute right-0 top-0 zIndex-1 font-sm bg-transparent border-0 p-3"
          onClick={() => props.onClose()}
        >
          <i className="icon-close text-muted"></i>
        </button>
        <div className="row mx-0">
          <div className="col-lg-5 col-12 p-lg-5 p-sm-4 p-3 bg-gray-300">
            <Image
              src={productImage}
              className="img-fluid mb-5"
              alt="product Image"
              width={379}
              height={213}
            />
            <h3 className="font-weight-normal text-uppercase">
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
              <h3 className="mb-0 font-weight-normal">{`${props.productData.productDetails?.productCurrency} ${props.cartData.netPrice}`}</h3>
            </div>
          </div>
          <div className="col-lg-7 col-12 p-lg-5 p-sm-4 p-3">
            <div className="book-form">
              <div className="container p-0 account-outer">
                <div className="account-box-inner">
                  <h3 className="font-weight-bold text-uppercase">
                    {props.heading}
                  </h3>
                  <p className="font-normal text-muted mb-4">
                    {`Let's start booking your ${props.productData.productDetails?.productTitle}. Kindly fill in your details below.`}
                  </p>
                </div>
                <div className="account-box bg-white px-3 py-4">
                  <div className="account-box-inner">
                    {!isShowOtpForm ? (
                      <>
                        <div className="border-bottom">
                          <ul
                            className="nav tab-underline tab-underline--primary p-0 mb-0 row"
                            id="account-tab"
                            role="tablist"
                          >
                            <li
                              className="cursor-pointer nav-item col-auto mr-lg-3"
                              role="presentation"
                            >
                              <a
                                className={classnames({
                                  "nav-link": true,
                                  "active text-primary":
                                    tabName === AuthTab.signIn,
                                })}
                                data-toggle="pill"
                                role="tab"
                                aria-controls="login"
                                aria-selected="false"
                                onClick={() => setTabName(AuthTab.signIn)}
                              >
                                {t("common.Log in")}
                              </a>
                            </li>
                            <li
                              className="cursor-pointer nav-item col-auto mr-lg-3"
                              role="presentation"
                            >
                              <a
                                className={classnames({
                                  "nav-link": true,
                                  "active text-primary":
                                    tabName === AuthTab.signUp,
                                })}
                                data-toggle="pill"
                                role="tab"
                                aria-controls="signup"
                                aria-selected="true"
                                onClick={() => setTabName(AuthTab.signUp)}
                              >
                                {t("common.Sign up")}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="account-tab-container pt-4">
                          <div className="tab-content" id="account-tabContent">
                            <div
                              className={classnames({
                                "tab-pane fade": true,
                                "show active": tabName === AuthTab.signIn,
                              })}
                              id="login"
                              role="tabpanel"
                              aria-labelledby="login-tab"
                            >
                              <Login
                                login={(data: any) => props.onLogin(data)}
                                onForgotPassword={() =>
                                  props?.onForgotPassword?.()
                                }
                              ></Login>

                              <div className="row gutter-5 align-items-center my-4 py-2">
                                <div className="col">
                                  <div className="border-top"></div>
                                </div>
                                <div className="col-auto">
                                  <span className="d-flex text-muted text-uppercase font-normal">
                                    {t("common.Or")}
                                  </span>
                                </div>
                                <div className="col">
                                  <div className="border-top"></div>
                                </div>
                              </div>
                              <div className="social-links font-sm text-center">
                                <FacobookButton
                                  onSubmit={props.onSocialSubmit}
                                  title={t("common.Continue with Facebook")}
                                ></FacobookButton>
                                <GoogleButton
                                  onSubmit={onGoogleSubmit}
                                  title={t("common.Continue with Google")}
                                ></GoogleButton>
                              </div>
                            </div>
                            <div
                              className={classnames({
                                "tab-pane fade": true,
                                "show active": tabName === AuthTab.signUp,
                              })}
                              id="signup"
                              role="tabpanel"
                              aria-labelledby="signup-tab"
                            >
                              <SignUpForm
                                onSubmit={(data) => props.onSignUp(data)}
                                errorMessage={props.errorMessage}
                                isSignUpSubmiting={props.isSignUpSubmiting}
                              />

                              <div className="row gutter-5 align-items-center my-4 py-2">
                                <div className="col">
                                  <div className="border-top"></div>
                                </div>
                                <div className="col-auto">
                                  <span className="d-flex text-muted text-uppercase font-normal">
                                    {t("common.Or")}
                                  </span>
                                </div>
                                <div className="col">
                                  <div className="border-top"></div>
                                </div>
                              </div>
                              <div className="social-links font-sm text-center">
                                <FacobookButton
                                  onSubmit={props.onSocialSubmit}
                                  title={t("common.Sign up with Facebook")}
                                ></FacobookButton>
                                <GoogleButton
                                  onSubmit={onGoogleSubmit}
                                  title={t("common.Sign up with Google")}
                                ></GoogleButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <UpdatePhone
                        userID={userId}
                        userToken={userToken}
                        onSubmit={props.onSocialSubmit}
                      ></UpdatePhone>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      toggleMenu: commonActions.toggleMenu,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isMenuOpen: state.commonState.headerMenuOpen,
    cartData: state.cartState,
    productData: state.productDetailsState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(BookNowPopUp);
