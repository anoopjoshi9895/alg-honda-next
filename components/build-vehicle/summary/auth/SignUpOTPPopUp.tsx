import React from "react";
import classnames from "classnames";
import Select from "react-select";
import { connect } from "react-redux";
import {
  CartStateModel,
  commonActions,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import SignUpOTPForm from "./SignUpOTPForm";
import { RootState } from "../../../../app/store";
const years = [
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];

interface CustomProps {
  onClose: any;
  onSubmit: any;
  errorMessage?: string;
  phoneNumber?: string;
  cartData: CartStateModel;
  productData: ProductDetailsStateModel;
}
const SignUpOTPPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  return (
    <>
      <div className="modal-body p-0">
        <button
          type="button"
          className="position-absolute right-0 top-0 zIndex-1 font-sm bg-transparent border-0 p-3"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => props.onClose()}
        >
          <i className="icon-close text-muted"></i>
        </button>
        <div className="row mx-0">
          <div className="col-lg-12 col-12 p-lg-5 p-sm-4 p-3">
            <div className="book-form">
              <h3 className="font-weight-bold text-uppercase">Enter OTP</h3>
              <p className="font-normal text-muted mb-4 pb-1">
                Please type the verification code sent to
                {/* +{props.phoneNumber} */}
              </p>
              <SignUpOTPForm
                onSubmit={(data) => props.onSubmit(data)}
                errorMessage={props.errorMessage}
              />
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

export default connect(mapStateToProps, mapActionsToProps)(SignUpOTPPopUp);
