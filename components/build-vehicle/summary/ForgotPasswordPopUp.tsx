import React from "react";
import { connect } from "react-redux";
import {
  CartStateModel,
  commonActions,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import { TabNames } from "../utils";
import ForgotPassword from "../../auth/forgot-password/ForgotPassword";
import { RootState } from "../../../app/store";
import Image from "next/image";

interface CustomProps {
  onClose: any;
  onSubmit: any;
  phoneNumber?: string;
  cartData: CartStateModel;
  productData: ProductDetailsStateModel;
}
const ForgotPasswordPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
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
                Net Price
              </p>
              <span className="tooltip position-relative mr-1">
                <i className="icon-info text-primary font-xs ml-1 cursor-pointer"></i>
                <div className="tooltip-content font-weight-normal text-muted font-normal position-absolute border border-secondary bg-white zIndex-1 px-3 py-4">
                  Supporting document for the respective promotion category to
                  be uploaded for verification and approval.
                </div>
              </span>
              <h3 className="mb-0 font-weight-normal">{`${props.productData.productDetails?.productCurrency} ${props.cartData.netPrice}`}</h3>
            </div>
          </div>
          <div className="col-lg-7 col-12 p-lg-5 p-sm-4 p-3">
            <div className="book-form">
              <ForgotPassword onReset={() => props?.onSubmit()} />
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

export default connect(mapStateToProps, mapActionsToProps)(ForgotPasswordPopUp);
