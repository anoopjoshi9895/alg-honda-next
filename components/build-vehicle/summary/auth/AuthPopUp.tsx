import React from "react";
import classnames from "classnames";
import Select from "react-select";
import { connect } from "react-redux";
import {
  authActions,
  CartStateModel,
  commonActions,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import BookNowForm from "../BookNowForm";
import Login from "./Login";
// import 'assets/sass/login.scss';
import SignUpForm from "./SignUpForm";
import { RootState } from "../../../../app/store";
import FacobookButton from "../../../auth/FacobookButton";
import GoogleButton from "../../../auth/GoogleButton";
import UpdatePhone from "../../../auth/UpdatePhone";
const years = [
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];
enum AuthTab {
  signUp = "signUp",
  signIn = "signIn",
}
interface CustomProps {
  onClose: any;
  onSignUp: any;
  onLogin: any;
  errorMessage?: string;
  productTitle: string;
  cartData: CartStateModel;
  productData: ProductDetailsStateModel;
  isSignUpSubmiting?: boolean;
  onSocialSubmit?: () => void;
}
const AuthPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [tabName, setTabName] = React.useState(AuthTab.signIn);
  const [isShowOtpForm, setShowOtpForm] = React.useState(false);

  const [userId, setUserId] = React.useState<number>(0);

  const [userToken, setUserToken] = React.useState<string>("");

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
        <div className="account-outer bg-gray-300">
          <div className="container p-0">
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
                              active: tabName === AuthTab.signIn,
                            })}
                            data-toggle="pill"
                            role="tab"
                            aria-controls="login"
                            aria-selected="false"
                            onClick={() => setTabName(AuthTab.signIn)}
                          >
                            Log in
                          </a>
                        </li>
                        <li
                          className="cursor-pointer nav-item col-auto mr-lg-3"
                          role="presentation"
                        >
                          <a
                            className={classnames({
                              "nav-link": true,
                              active: tabName === AuthTab.signUp,
                            })}
                            data-toggle="pill"
                            role="tab"
                            aria-controls="signup"
                            aria-selected="true"
                            onClick={() => setTabName(AuthTab.signUp)}
                          >
                            Sign up
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
                          ></Login>

                          <div className="row gutter-5 align-items-center my-4 py-2">
                            <div className="col">
                              <div className="border-top"></div>
                            </div>
                            <div className="col-auto">
                              <span className="d-flex text-muted text-uppercase font-normal">
                                Or
                              </span>
                            </div>
                            <div className="col">
                              <div className="border-top"></div>
                            </div>
                          </div>
                          <div className="social-links font-sm text-center">
                            <FacobookButton
                              onSubmit={props.onSocialSubmit}
                              title="Continue with Facebook"
                            ></FacobookButton>
                            <GoogleButton
                              onSubmit={onGoogleSubmit}
                              title="Continue with Google"
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
                                Or
                              </span>
                            </div>
                            <div className="col">
                              <div className="border-top"></div>
                            </div>
                          </div>
                          <div className="social-links font-sm text-center">
                            <FacobookButton
                              onSubmit={props.onSocialSubmit}
                              title="Sign up with Facebook"
                            ></FacobookButton>
                            <GoogleButton
                              onSubmit={onGoogleSubmit}
                              title="Sign up with Google"
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

export default connect(mapStateToProps, mapActionsToProps)(AuthPopUp);
