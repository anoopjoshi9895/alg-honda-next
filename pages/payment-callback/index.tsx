import React from "react";
import { connect } from "react-redux";
import {
  api,
  CartActions,
  commonActions,
  numberWithCommas,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import { useRouter } from "next/router";
import { RouteKeys } from "../../route/route-keys";
import Link from "next/link";
import { RootState, store } from "../../app/store";
import Image from "next/image";
import { useDataLoader } from "../../utils/useDataLoader";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { getFooterAsync } from "../../feature/footerSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IFooter } from "../../models/models";

interface OrderModel {
  Model: string;
  orderTotalAmount: number;
  productCurrency: string;
  productID: number;
  productPreviewImage: string;
  productTitle: string;
}

interface CustomProps {
  isMenuOpen: boolean;
  toggleMenu: typeof commonActions.toggleMenu;
  clearCart: typeof CartActions.clearCart;
  locale: string;
  footerData: IFooter;
}
const PaymentSuccess: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();
  const orderNo = router.query?.order_no?.toString();
  const referenceNumber = router.query?.reference_number?.toString();
  const {
    data: paymentData,
    reload: reloadVerifyOrder,
    loaded: verifyOrderLoaded,
    loading: verifyOrderLoading,
  } = useDataLoader<{ orderID: number; paymentStatus: string }>(() =>
    api.build.verifyOrder(orderNo || "", referenceNumber || "")
  );
  const {
    data: orderData,
    reload: reloadOrderDetails,
    loaded: OrderDetailsLoaded,
    loading: OrderDetailsLoading,
  } = useDataLoader<OrderModel>(() =>
    api.build.getOrderDetails(orderNo || "", referenceNumber || "")
  );
  // if (verifyOrderLoading) {
  //   return <FullPageLoader text={'Payment Verifying'} />;
  // }
  if (paymentData && paymentData?.paymentStatus === "Denied") {
    router.push(`${RouteKeys.PayNow}`);
  }
  if (paymentData && paymentData.paymentStatus === "Recieved") {
    props.clearCart();
  }
  // if (OrderDetailsLoading) {
  //   return <FullPageLoader text={'Data Loading'} />;
  // }

  return (
    <Layout footerData={props?.footerData} isAuthenticatedRoute={true}>
      {orderData && (
        <div className="row mx-0">
          <div className="col-lg-7 col-12 py-5 bg-gray-300 text-lg-center px-md-4">
            <div className="d-inline-block text-left py-lg-2">
              <Image
                src={orderData.productPreviewImage}
                className="img-fluid mb-4"
                alt=""
                width={379}
                height={213}
              />
              <h6 className="font-weight-normal font-normal text-muted text-uppercase pb-4">
                {orderData.productTitle}
              </h6>
              <h3 className="text-uppercase mb-4">
                Booking Request Confirmation
              </h3>
              <div className="d-block mb-lg-4 mb-3">
                <p className="font-lg mb-1 d-flex">
                  <span className="text-muted mr-1">Model:</span>
                  {orderData.Model}
                </p>
                <p className="font-lg mb-1 d-flex">
                  <span className="text-muted mr-1">Net Price:</span>
                  {`${orderData.productCurrency} ${numberWithCommas(
                    orderData.orderTotalAmount
                  )}`}
                </p>
                <div className="box-xs pt-4">
                  <div className="bg-white mb-2">
                    <button className="btn btn-primary text-uppercase btn-block">
                      Download Request Confirmation
                    </button>
                  </div>
                  <div className="bg-white mb-2">
                    <Link href={`${RouteKeys.Home}`} passHref>
                      <button className="btn btn-outline-dark text-uppercase btn-block">
                        Back to Home
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-12 py-lg-5 py-4 px-lg-4 align-self-center">
            <div className="text-center">
              <div className="qr-code mb-4 pb-2">
                {/* <Image
                  src={require("../../styles/images/qr-code.png")}
                  className="img-fluid"
                  height={50}
                  width={50}
                  alt=""
                /> */}
              </div>
              <div className="share-block">
                <h6 className="font-lg font-weight-normal mb-3">
                  Share this Build
                </h6>
                <ul className="row gutter-8 justify-content-center list-unstyled p-0 h6">
                  <li className="col-auto">
                    <a
                      href="#"
                      className="round border rounded-circle d-inline-flex align-items-center justify-content-center"
                      title="Twitter"
                    >
                      <i className="icon-twitter"></i>
                    </a>
                  </li>
                  <li className="col-auto">
                    <a
                      href="#"
                      className="round border rounded-circle d-inline-flex align-items-center justify-content-center"
                      title="Twitter"
                    >
                      <span className="instagram">
                        <i className="icon-instagram"></i>
                      </span>
                    </a>
                  </li>
                  <li className="col-auto">
                    <a
                      href="#"
                      className="round border rounded-circle d-inline-flex align-items-center justify-content-center"
                      title="Facebook"
                    >
                      <i className="icon-facebook"></i>
                    </a>
                  </li>
                  <li className="col-auto">
                    <a
                      href="#"
                      className="round border rounded-circle d-inline-flex align-items-center justify-content-center"
                      title="Linkedin"
                    >
                      <i className="icon-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      toggleMenu: commonActions.toggleMenu,
      clearCart: CartActions.clearCart,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isMenuOpen: state.commonState.headerMenuOpen,
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
export default connect(mapStateToProps, mapActionsToProps)(PaymentSuccess);
