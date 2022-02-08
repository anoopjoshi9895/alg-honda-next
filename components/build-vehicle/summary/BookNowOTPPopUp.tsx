import React from "react";
import { connect } from "react-redux";
import {
  CartStateModel,
  commonActions,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import BookNowOTPForm from "./BookNowOTPForm";
import { TabNames } from "../utils";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../app/store";
import Image from "next/image";
interface CustomProps {
  onClose: any;
  onSubmit: any;
  errorMessage?: string;
  phoneNumber?: string;
  cartData: CartStateModel;
  productData: ProductDetailsStateModel;
}
const BookNowOTPPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
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
              <h3 className="font-weight-bold text-uppercase">
                {t("build_vehicle.Enter OTP")}
              </h3>
              <p className="font-normal text-muted mb-4 pb-1">
                {t("build_vehicle.Please type the verification code sent to")}
                {/* +{props.phoneNumber} */}
              </p>
              <BookNowOTPForm
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

export default connect(mapStateToProps, mapActionsToProps)(BookNowOTPPopUp);
