import React from "react";
import { connect } from "react-redux";
import {
  api,
  CartStateModel,
  commonActions,
  numberWithCommas,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import { useRouter } from "next/router";
import { RouteKeys } from "../../route/route-keys";
import { TabNames } from "../../components/build-vehicle/utils";
import { RootState, store } from "../../app/store";
import Image from "next/image";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { getFooterAsync } from "../../feature/footerSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IFooter } from "../../models/models";

interface CustomProps {
  isMenuOpen: boolean;
  toggleMenu: typeof commonActions.toggleMenu;
  cartData: CartStateModel;
  productData: ProductDetailsStateModel;
  locale: string;
  footerData: IFooter;
}
enum PaymentModes {
  online = "online",
  showroom = "showroom",
}
enum PayAmountTypes {
  fullamount = "fullamount",
  reservation = "reservation",
  other = "other",
}
const PayNow: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const router = useRouter();

  const [paymentMode, setPaymentMode] = React.useState<PaymentModes>(
    PaymentModes.online
  );
  const [payAmountType, setPayAmountType] = React.useState<PayAmountTypes>(
    PayAmountTypes.fullamount
  );
  const [otherAmount, setOtherAmount] = React.useState<number | undefined>(
    undefined
  );
  const [paymentFailed, setPaymentFailed] = React.useState(false);
  const onPaymodeChange = (mode: PaymentModes) => {
    setPaymentMode(mode);
    onPayAmountTypeChange(PayAmountTypes.fullamount);
  };
  const onPayAmountTypeChange = (type: PayAmountTypes) => {
    setPayAmountType(type);
  };
  const onPayNow = async () => {
    let data: any;
    data = {
      cartID: props.cartData.cartID,
      showroomID: props.cartData.showroomID,
      userID: 1,
      payType: paymentMode,
      paymentType: payAmountType,
      // bookingAmount: '100',
      // otherAmount: '700',
    };
    if (
      paymentMode === PaymentModes.online &&
      payAmountType === PayAmountTypes.other
    ) {
      data.otherAmount = otherAmount;
    }
    if (
      paymentMode === PaymentModes.online &&
      payAmountType === PayAmountTypes.reservation
    ) {
      data.bookingAmount = props.cartData.registrationPrice;
    }

    try {
      const response: any = await api.build.createOnlineOrder(data);
      if (paymentMode === PaymentModes.online) {
        if (response?.data) {
          if (response?.data?.url) {
            window.location.href = response?.data?.url;
            setPaymentFailed(false);
          } else {
            setPaymentFailed(true);
          }
        }
      } else {
        router.push(
          `${RouteKeys.PaymentCallback}?order_no=${response?.data?.orderID}`
        );
      }
    } catch (error) {
      setPaymentFailed(true);
    }
  };

  const onOtherAmountChange = (e: any) => {
    const floatRegExp = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

    // if value is not blank, then test the regex

    if (floatRegExp.test(e.target.value)) {
      if (parseFloat(e.target.value) === 0) {
        setOtherAmount(undefined);
      } else {
        setOtherAmount(e.target.value);
      }
    } else if (e.target.value === "") {
      setOtherAmount(undefined);
    }
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
  return (
    <Layout footerData={props?.footerData} isAuthenticatedRoute={true}>
      <div className="row mx-0">
        <div className="col-xl-6 col-lg-5 col-12 py-5 bg-gray-300 text-lg-center px-md-4">
          <div className="d-inline-block text-left py-lg-2">
            <Image
              src={productImage}
              className="img-fluid mb-5"
              alt=""
              width={1600}
              height={900}
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
              <h3 className="mb-0 font-weight-normal">{`${
                props.cartData.productCurrency
              } ${numberWithCommas(props.cartData.netPrice)}`}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-7 col-12 py-lg-5 py-4 px-lg-4">
          <div className="book-form box-sm mx-lg-auto pb-lg-3">
            <h3 className="font-weight-bold text-uppercase">Book Now</h3>
            {props.productData.productDetails && (
              <p className="font-normal text-muted pb-lg-4 pb-3">
                A reservation of{" "}
                {`${props.cartData.productCurrency} ${numberWithCommas(
                  props.productData.productDetails?.bookingAmount
                )}`}{" "}
                will be charged to your credit card as per the Booking
                Conditions.
              </p>
            )}
            {paymentFailed && (
              <div className="alert-danger border border-danger py-3 mb-4 px-3 text-danger font-md row no-gutters align-items-center">
                <div className="col-10">Payment unsuccessfull retry again.</div>
                <div className="col-2 text-right pl-3">
                  <i
                    className="icon-close cursor-pointer font-xs"
                    onClick={() => setPaymentFailed(false)}
                  ></i>
                </div>
              </div>
            )}
            <div className="row gutter-10">
              <div className="col-6 form-group mb-4">
                <input
                  type="radio"
                  id="onlinePayment"
                  name="paymentType"
                  onChange={() => onPaymodeChange(PaymentModes.online)}
                  checked={paymentMode === PaymentModes.online}
                />
                <label htmlFor="onlinePayment" className="w-100 font-lg">
                  Online Payment
                </label>
              </div>
              <div className="col-6 form-group mb-4">
                <input
                  type="radio"
                  id="payAtShowroom"
                  name="paymentType"
                  onChange={() => onPaymodeChange(PaymentModes.showroom)}
                  checked={paymentMode === PaymentModes.showroom}
                />
                <label htmlFor="payAtShowroom" className="w-100 font-lg">
                  Pay at Showroom
                </label>
              </div>
              {paymentMode === PaymentModes.online && (
                <div className="col-12 form-group mb-4">
                  <label className="font-normal text-muted pb-1">
                    Choose Payment Type
                  </label>
                  <div className="border p-lg-4 p-3 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <input
                          type="radio"
                          id="payFull"
                          name="paymentMethod"
                          checked={payAmountType === PayAmountTypes.fullamount}
                          onChange={() =>
                            onPayAmountTypeChange(PayAmountTypes.fullamount)
                          }
                        />
                        <label
                          htmlFor="payFull"
                          className="d-flex w-100 font-base"
                        >
                          Pay Full Amount
                        </label>
                      </div>
                      <span className="font-lg">{`${
                        props.cartData.productCurrency
                      } ${numberWithCommas(props.cartData.netPrice)}`}</span>
                    </div>
                  </div>
                  <div className="border p-lg-4 p-3 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <input
                          type="radio"
                          id="reservation"
                          name="paymentMethod"
                          checked={payAmountType === PayAmountTypes.reservation}
                          onChange={() =>
                            onPayAmountTypeChange(PayAmountTypes.reservation)
                          }
                        />
                        <label
                          htmlFor="reservation"
                          className="font-base w-100"
                        >
                          Reservation
                        </label>
                      </div>
                      {props.productData.productDetails && (
                        <span className="font-lg">{`${
                          props.cartData.productCurrency
                        } ${numberWithCommas(
                          props.productData.productDetails?.bookingAmount
                        )}`}</span>
                      )}
                    </div>
                  </div>
                  <div className="border p-lg-4 p-3 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <input
                          type="radio"
                          id="otherPayment"
                          name="paymentMethod"
                          checked={payAmountType === PayAmountTypes.other}
                          onChange={() =>
                            onPayAmountTypeChange(PayAmountTypes.other)
                          }
                        />
                        <label
                          htmlFor="otherPayment"
                          className="font-base w-100"
                        >
                          Other Payment
                        </label>
                      </div>
                    </div>
                    {payAmountType === PayAmountTypes.other && (
                      <div className="form-group mb-0 mt-2 position-relative pb-3">
                        <label className="font-normal">{`${props.cartData.productCurrency}`}</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={onOtherAmountChange}
                          value={otherAmount}
                        />
                        {/* <span className="message-validation">
                          Amount is required
                        </span> */}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="col-md-7 col-12 mb-4">
                <input
                  type="button"
                  className="btn btn-primary btn-block text-uppercase font-md"
                  value="Pay Now"
                  disabled={
                    payAmountType === PayAmountTypes.other &&
                    otherAmount === undefined
                  }
                  onClick={() => onPayNow()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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

export const getServerSideProps: GetServerSideProps = async ({
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
export default connect(mapStateToProps, mapActionsToProps)(PayNow);
