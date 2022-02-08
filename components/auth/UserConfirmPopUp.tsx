import React from "react";
import { connect } from "react-redux";
import { commonActions } from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import { Controller, useForm } from "react-hook-form";
import UserConfirmForm from "./UserConfirmForm";
import { useTranslation } from "react-i18next";
import { RootState } from "../../app/store";

enum AuthTab {
  signUp = "signUp",
  signIn = "signIn",
}
interface CustomProps {
  onClose: any;
  onSubmit: any;
  // onLogin: any;
  errorMessage?: string;
  // onSocialSubmit?: () => void;
}
const UserConfirmPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const [tabName, setTabName] = React.useState(AuthTab.signIn);
  const [isShowOtpForm, setShowOtpForm] = React.useState(false);
  const [userId, setUserId] = React.useState<number>(0);
  const [userToken, setUserToken] = React.useState<string>("");
  const { control, errors, handleSubmit, watch } = useForm<{
    confirm: string;
  }>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = (data: any) => {
    props.onSubmit?.(data);
  };
  return (
    <>
      <div
        className="fade px-0 small-popup show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: "block" }}
      >
        <div className="m-0 h-100">
          <div className="modal-content rounded-0 h-100 overflow-auto">
            <div className="modal-body p-0">
              <button
                style={{ height: "45px", width: "45px" }}
                type="button"
                className="position-absolute right-0 top-0 zIndex-1 font-sm bg-gray-200 rounded-circle border-0 p-3 m-3 d-inline-block"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.onClose()}
              >
                <i className="icon-close text-muted"></i>
              </button>

              <div className="thankyou-block py-5 ">
                <div className="row mx-0">
                  <div className=" col-12 p-lg-5 p-sm-4 p-3">
                    <h3 className="font-weight-bold text-uppercase">
                      {t("build_vehicle.Verify User")}
                    </h3>
                    <p className="font-normal text-muted mb-4 pb-1">
                      {props?.errorMessage}
                    </p>
                    <UserConfirmForm
                      onSubmit={(data: any) => props.onSubmit(data)}
                    />
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

export default connect(mapStateToProps, mapActionsToProps)(UserConfirmPopUp);
