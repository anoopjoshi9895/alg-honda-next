import * as React from "react";
import {
  api,
  UserConfigDetails,
  UserOrderDetails,
  numberWithCommas,
  ProductDetailsActions,
  ProductDetailsStateModel,
  CampaignModel,
} from "alg-ecom-frontend-core";
import moment from "moment";
import { format } from "date-fns";
import List from "./List";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { useTranslation } from "react-i18next";
import { calculateDiscount, EcomProductType } from "../../build-vehicle/utils";
import { RootState } from "../../../app/store";
import { useDataLoader } from "../../../utils/useDataLoader";
export interface CustomProps {
  configId: number;
  backClick: () => void;
  productData: ProductDetailsStateModel;
  getProductDetails: typeof ProductDetailsActions.getProductDetails;
}

export interface StateProps {
  isAuthenticationCompleted: boolean;
}

const ConfigDetails: React.FunctionComponent<CustomProps> = (props) => {
  const { t } = useTranslation();
  const { data: orderDetails, loading } = useDataLoader<UserConfigDetails>(() =>
    api.user.getConfigurationDetails(props.configId)
  );
  const [campaigns, setCampaigns] = React.useState<
    CampaignModel[] | undefined
  >();
  React.useEffect(() => {
    if (props.productData?.productDetails && orderDetails) {
      const combinations = props.productData?.productDetails?.combinations;
      const campaignIDs = orderDetails?.selCampaignDetails?.map(
        (c) => c.campaignID
      );
      if (campaignIDs?.length) {
        const combination = combinations?.find((co) =>
          co.campaign?.find((c) => campaignIDs.includes(c.campaignID))
        );
        const appliedCampaign = combination?.campaign?.find((c) =>
          campaignIDs.includes(c.campaignID)
        );
        if (appliedCampaign) {
          setCampaigns([appliedCampaign]);
        }
      }
    }
  }, [props.productData?.productDetails, orderDetails]);

  React.useEffect(() => {
    if (orderDetails?.productID) {
      props.getProductDetails(orderDetails?.productID);
    }
  }, [orderDetails?.productID]);
  if (loading) {
    return (
      <div className="text-center">
        {/* <ContainerLoader text={'Loading details...'} /> */}
      </div>
    );
  }
  const calculateDateDifference = (d1: Date, d2: Date) => {
    const date1 = moment(d1, "DD-MM-YYYY");
    const date2 = moment(d2, "DD-MM-YYYY");
    return date2.diff(date1, "days");
  };

  const matchingPlan = props.productData?.insurancesList?.find(
    (c) =>
      c.productID?.toString() ===
      orderDetails?.insuranceDetails?.[0]?.productID?.toString()
  );
  const matchingOption = matchingPlan?.optionsList?.find(
    (c) =>
      c.productOptionID ===
      orderDetails?.insuranceDetails?.[0]?.planDetails?.productOptionID
  );

  const insuranceAddOns = matchingOption?.addons?.filter((a) =>
    orderDetails?.insuranceDetails?.[0]?.planDetails?.addons?.find(
      (x: any) =>
        x.packageID === a.packageID && x.packageOptionID === a.packageOptionID
    )
  );

  const tplOfferPrice = orderDetails?.tpl
    ? orderDetails?.tpl?.reduce((prev, cur) => prev + cur.offerPrice, 0)
    : 0;

  const tplSalesPrice = orderDetails?.tpl
    ? orderDetails?.tpl?.reduce((prev, cur) => prev + cur.salesPrice, 0)
    : 0;

  const registrationOfferPrice = orderDetails?.registration
    ? orderDetails?.registration?.reduce(
        (prev, cur) => prev + cur.offerPrice,
        0
      )
    : 0;

  const registrationSalesPrice = orderDetails?.registration
    ? orderDetails?.registration?.reduce(
        (prev, cur) => prev + cur.salesPrice,
        0
      )
    : 0;

  return orderDetails && orderDetails ? (
    <div className="px-lg-4 px-3 py-3">
      <div className="dashboard-head">
        <div className="row gutter-10 align-items-xl-center justify-content-end">
          <div className="col-12 mb-2 pb-1">
            <div
              onClick={props.backClick}
              className="d-inline-flex align-item-center text-muted font-xs font-weight-bold text-uppercase cursor-pointer"
            >
              <i className="icon-arrow-left mr-2 font-weight-bold align-self-center"></i>
              {t("dashboard.Back")}
            </div>
          </div>
          <div className="col-xl mb-xl-0 mb-3">
            <h5 className="mb-1 d-flex align-items-center">
              <span className="text-uppercase font-xxl">
                {/* {orderDetails.configID} */}
                {orderDetails.productTitle}
              </span>
              <span className="ml-sm-1 mt-sm-0 mt-1">
                <span className="status pending">
                  {orderDetails.orderStatus}
                </span>
              </span>
            </h5>
            <div className="font-xs text-muted">
              {orderDetails?.addedDate &&
                format(
                  new Date(orderDetails.addedDate),
                  "MMM dd, yyyy, hh:mm a"
                )}{" "}
              {orderDetails.addedDate
                ? `(${calculateDateDifference(
                    new Date(orderDetails.addedDate),
                    new Date()
                  )} days ago)`
                : ""}
            </div>
          </div>
          <div className="col-xl-auto">
            {/* <a
              href=""
              className="btn border border-primary font-normal px-3 py-2 cursor-pointer mr-2 mb-lg-0 mb-2"
              data-toggle="modal"
              data-target="#uploadFinanceModal"
            >
              <span className="py-1 d-block">Upload Finance LPO W</span>
            </a>
            <a
              href=""
              className="btn btn-primary text-uppercase font-normal px-3 py-2 cursor-pointer mb-lg-0 mb-2"
            >
              <span className="py-1 d-block">Make Payment</span>
            </a> */}
          </div>
        </div>
      </div>
      <div className="border rounded px-3 py-4 mt-4">
        <div className="px-lg-1 line-height-normal">
          <div className="border-bottom">
            <div className="row gutter-12 pt-3 pb-5 align-items-center">
              <div className="col-md col-12 mb-md-0 mb-4">
                <h6 className="font-md mb-1">{orderDetails?.productTitle}</h6>
                <span className="text-muted font-xxs mr-3 text-uppercase">
                  {t("dashboard.Color")} : {orderDetails?.Exterior}
                </span>
                {orderDetails?.Interior && (
                  <span className="text-muted font-xxs mr-3 text-uppercase">
                    {t("dashboard.Trim")} : {orderDetails?.trim}
                  </span>
                )}
                {orderDetails?.vinNumber && (
                  <span className="text-muted font-xxs text-uppercase">
                    {t("dashboard.VIN")} : {orderDetails?.vinNumber}
                  </span>
                )}
              </div>
              <div className="col-md-3 col-sm-6 col-12 mb-sm-0 mb-4">
                <div className="d-flex align-items-center">
                  {/* <div className="avatar overflow-hidden mr-2 pr-1">
                    <img
                      src="images/user.png"
                      className="img-fluid img-cover w-100 h-100 rounded-circle"
                      alt="user"
                    />
                  </div>
                  <div>
                    <h6 className="font-normal font-weight-normal mb-0">
                      Ahamd Dagher
                    </h6>
                    <span className="text-muted font-xs">Sales Executive</span>
                  </div> */}
                </div>
              </div>
              <div className="col-md-auto col-sm-6 col-12">
                {/* <a
                  href=""
                  className="d-flex align-items-center font-normal py-1"
                >
                  <i className="icon-download-2 mr-2 pr-1 font-xxl font-weight-bold"></i>
                  Download Order Confimation
                </a>
                <a
                  href=""
                  className="d-flex align-items-center font-normal py-1"
                >
                  <i className="icon-download-2 mr-2 pr-1 font-xxl font-weight-bold"></i>
                  Download Invoice
                </a> */}
              </div>
            </div>
          </div>
          <div className="border-bottom py-4">
            <div className="row gutter-12 py-2 align-items-center">
              <div className="col-md-8 col-12 mb-md-0 mb-4">
                <h6 className="font-lg font-weight-normal mb-2">
                  {t("dashboard.To")}
                </h6>
                <div className="font-md mb-1">
                  {orderDetails?.userFirstName} {orderDetails?.userLastName}
                </div>
                {/* <div className="font-normal text-muted mb-2 mb-2 line-height">
                  Alghanim Industries Al Hamra Tower,
                  <br />
                  70th 73rd Floor, Kuwait City, Kuwait
                </div> */}
                <div className="font-normal mb-1">
                  {orderDetails?.userPhone}
                </div>
                <div className="font-normal mb-2">
                  {orderDetails?.userEmail}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-sm-0 mb-4">
                <h6 className="font-lg font-weight-normal mb-2">
                  {t("dashboard.Showroom Details")}
                </h6>
                <div className="font-normal">{orderDetails?.showroomName}</div>
                {/* <div className="font-sm text-muted mb-2 line-height">
                  Alghanim Industries Al Hamra Tower,
                  <br /> 70th 73rd Floor, Kuwait City, Kuwait
                </div>
                <div className="font-normal mb-1">+965 98743561</div>
                <div className="font-normal">Showroom1@alghanim.com</div> */}
              </div>
            </div>
          </div>
          <div className="py-4">
            <h6 className="font-md mt-2">{t("dashboard.Details")}</h6>
          </div>
          <div className="border-bottom py-2 mb-2">
            <div className="row gutter-12 align-items-end mb-1">
              <div className="col-8">
                <div className="font-normal text-uppercase mb-2">
                  {t("dashboard.Base Price")}
                </div>
                <div className="font-normal text-muted mb-2">
                  {orderDetails?.model}
                </div>
              </div>
              <div className="col-4 text-right">
                <div className="font-normal text-uppercase">
                  {t("dashboard.KWD")} {orderDetails?.orderTotalAmount}
                </div>
              </div>
            </div>
          </div>
          <div className="border-bottom py-2 mb-2">
            <div className="row gutter-12 align-items-end mb-1">
              <div className="col-8">
                <div className="font-normal text-uppercase mb-2">
                  {t("dashboard.Exterior")}
                </div>
                <div className="font-normal text-muted mb-2">
                  {orderDetails?.Exterior}
                </div>
              </div>
              <div className="col-4 text-right">
                {/* <div className="font-normal text-uppercase">KWD 0</div> */}
              </div>
            </div>
          </div>
          <div className="border-bottom py-2 mb-2">
            <div className="row gutter-12 align-items-end mb-1">
              <div className="col-8">
                <div className="font-normal text-uppercase mb-2">
                  {t("dashboard.Interior")}
                </div>
                <div className="font-normal text-muted mb-2">
                  {orderDetails?.Interior}
                </div>
              </div>
              <div className="col-4 text-right">
                {/* <div className="font-normal text-uppercase">KWD 0</div> */}
              </div>
            </div>
          </div>
          {!!campaigns?.length && (
            <div className="border-bottom py-2 mb-2">
              <div className="row gutter-12 align-items-end mb-1">
                <div className="col-12">
                  <div className="font-normal text-uppercase mb-2">
                    Campaigns
                  </div>
                  {campaigns.map((camp) => {
                    const cashbackTotal =
                      orderDetails?.campaignCashbackItems
                        ?.filter((cash) => cash.campaignID === camp.campaignID)
                        ?.reduce((t1, c) => t1 + c.cashbackAmount, 0) || 0;
                    return (
                      <>
                        <div className="font-normal mb-2">
                          {camp.campaignTitle}
                        </div>
                        {camp.appliedItems?.map((item) => {
                          const appliedDiscount =
                            item.productType === EcomProductType.CashBack
                              ? calculateDiscount(
                                  item.campDiscountType,
                                  item.campDiscountValue,
                                  orderDetails?.salesPrice || 0
                                )
                              : 0;
                          return (
                            <>
                              <div className="font-normal text-muted mb-2">
                                {item.campDiscountTitle}
                                {/* {item.productType ===
                                  EcomProductType.CashBack &&
                                  !!appliedDiscount && (
                                    <span className="float-right font-sm">
                                      KWD {numberWithCommas(appliedDiscount)}
                                    </span>
                                  )} */}
                              </div>
                            </>
                          );
                        })}
                        {cashbackTotal > 0 && (
                          <div className="font-normal mt-4">
                            Campaign Cashbacks
                            {/* <span className="float-right font-sm">
                              KWD {numberWithCommas(cashbackTotal)}
                            </span> */}
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {orderDetails?.accessoryPackages &&
            orderDetails?.accessoryPackages?.length > 0 && (
              <div className="border-bottom py-2 mb-2">
                <div className="row gutter-12 align-items-end mb-1">
                  <div className="col-8">
                    <div className="font-normal text-uppercase mb-2">
                      Accessory Packages
                    </div>
                    {orderDetails?.accessoryPackages.map((acc) => {
                      return (
                        <div
                          className="font-normal text-muted mb-2"
                          key={acc.productTitle}
                        >
                          {acc.productTitle}
                        </div>
                      );
                    })}
                  </div>
                  {/* <div className="col-4 text-right">
                    {orderDetails?.accessoryPackages.map((acc) => {
                      return (
                        <div className="font-normal text-uppercase">
                          KWD {`${numberWithCommas(acc.offerPrice)}`}
                        </div>
                      );
                    })}
                  </div> */}
                </div>
              </div>
            )}
          {orderDetails?.accessoriesInfo &&
            orderDetails?.accessoriesInfo?.length > 0 && (
              <div className="border-bottom py-2 mb-2">
                <div className="row gutter-12 align-items-end mb-1">
                  <div className="col-8">
                    <div className="font-normal text-uppercase mb-2">
                      {t("dashboard.Accessories")}
                    </div>
                    {orderDetails?.accessoriesInfo.map((acc) => {
                      return (
                        <div
                          className="font-normal text-muted mb-2"
                          key={acc?.productTitle}
                        >
                          {acc.productTitle}
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-4 text-right">
                    {orderDetails?.accessoriesInfo.map((acc, index) => {
                      return (
                        <div
                          className="font-normal text-uppercase"
                          key={"acc-info" + index}
                        >
                          {/* {acc.salesPrice !== acc.offerPrice && (
                            <del>
                              {' '}
                              {t('dashboard.KWD')}{' '}
                              {numberWithCommas(acc.salesPrice)}
                            </del>
                          )}{' '} */}
                          {acc.offerPrice === 0 ? (
                            <span className="text-primary">Free</span>
                          ) : (
                            <>
                              {/* {' '}
                              {t('dashboard.KWD')}{' '}
                              {`${numberWithCommas(acc.offerPrice)}`} */}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          {(orderDetails?.insuranceDetails.length > 0 ||
            orderDetails?.serviceDetails.length > 0 ||
            orderDetails?.customerCare.length > 0 ||
            orderDetails?.extendedWarranty.length > 0) && (
            <div className="border-bottom py-2 mb-2">
              <div className="row gutter-12 align-items-end mb-2">
                <div className="col-8 mb-2">
                  <div className="font-normal text-uppercase mb-2">
                    {t("dashboard.Insurance & Services")}
                  </div>
                  {orderDetails?.insuranceDetails.map((insu) => {
                    return (
                      <div key={insu?.productTitle}>
                        <div className="font-normal mb-1">
                          {t("build_vehicle.comprehensive_insurance")}
                        </div>
                        <div className="font-normal text-muted mb-2">
                          Name : {insu?.productTitle}
                        </div>
                        {matchingOption?.productOptionName && (
                          <div className="font-normal text-muted mb-2">
                            Plan : {matchingOption?.productOptionName}
                          </div>
                        )}
                        <div className="font-normal text-muted mb-2">
                          Payment Type : {insu?.planDetails?.payType}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-4 text-right mb-2">
                  {orderDetails?.insuranceDetails.map((insu) => {
                    return insu?.planDetails?.payType === "cash" ? (
                      <div
                        className="font-normal text-uppercase"
                        key={insu?.productTitle + "info"}
                      >
                        {/* {insu.salesPrice !== insu.offerPrice && (
                            <del>
                              {' '}
                              {t('dashboard.KWD')}{' '}
                              {numberWithCommas(insu.salesPrice)}
                            </del>
                          )}{' '} */}
                        {insu.offerPrice === 0 ? (
                          <span className="text-primary">Free</span>
                        ) : (
                          <>
                            {/* {' '}
                              {t('dashboard.KWD')}{' '}
                              {`${numberWithCommas(insu.offerPrice)}`} */}
                          </>
                        )}
                      </div>
                    ) : (
                      <></>
                    );
                  })}
                </div>
                {!!insuranceAddOns?.length && (
                  <>
                    <div className="col-12 mb-2">
                      <div className="font-normal  mb-1">Add Ons:</div>
                    </div>
                    {insuranceAddOns?.map((add: any) => {
                      const insAddOn =
                        orderDetails?.insuranceDetails?.[0]?.planDetails?.addons?.find(
                          (x: any) =>
                            x.packageID === add.packageID &&
                            x.packageOptionID === add.packageOptionID
                        );
                      return (
                        <div key={add?.addonName}>
                          <div className="col-8 mb-2">
                            <div className="font-normal text-muted mb-2">
                              {add?.addonName}
                            </div>
                          </div>
                          {orderDetails?.insuranceDetails?.[0]?.planDetails
                            ?.payType === "cash" && (
                            <div className="col-4 text-right">
                              <div className="font-normal text-uppercase">
                                {/* {insAddOn?.salesPrice !==
                                      insAddOn?.offerPrice && (
                                        <del>
                                          KWD{' '}
                                          {numberWithCommas(
                                            insAddOn?.salesPrice || 0
                                          )}
                                        </del>
                                      )}{' '} */}
                                {(insAddOn?.offerPrice || 0) === 0 ? (
                                  <span className="text-primary">Free</span>
                                ) : (
                                  <>
                                    {/* KWD{' '}
                                        {numberWithCommas(
                                          insAddOn?.offerPrice || 0
                                        )} */}
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
                {orderDetails?.serviceDetails.length > 0 && (
                  <>
                    <div className="col-8">
                      {orderDetails?.serviceDetails.map((ser) => {
                        return (
                          <div
                            className="font-normal text-muted mb-2"
                            key={ser?.productTitle}
                          >
                            {t("dashboard.Service Contract")} :{" "}
                            {ser.productTitle}
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-4 text-right">
                      {orderDetails?.serviceDetails.map((ser, index) => {
                        return ser?.planDetails?.payType === "cash" ? (
                          <div
                            className="font-normal text-uppercase"
                            key={ser.productTitle + index}
                          >
                            {/* {ser.salesPrice !== ser.offerPrice && (
                                <del>
                                  {t('dashboard.KWD')}{' '}
                                  {numberWithCommas(ser.salesPrice)}
                                </del>
                              )}{' '} */}
                            {ser.offerPrice === 0 ? (
                              <span className="text-primary">Free</span>
                            ) : (
                              <>
                                {/* {t('dashboard.KWD')}{' '}
                                  {`${numberWithCommas(ser.offerPrice)}`} */}
                              </>
                            )}
                          </div>
                        ) : (
                          <></>
                        );
                      })}
                    </div>
                  </>
                )}
                {orderDetails?.extendedWarranty.length > 0 && (
                  <>
                    <div className="col-8">
                      {orderDetails?.extendedWarranty.map((ser) => {
                        return (
                          <div
                            className="font-normal text-muted mb-2"
                            key={ser.productTitle}
                          >
                            Extended Warranty : {ser.productTitle}
                          </div>
                        );
                      })}
                    </div>

                    <div className="col-4 text-right">
                      {orderDetails?.extendedWarranty.map((ser, index) => {
                        return ser?.planDetails?.payType === "cash" ? (
                          <div
                            className="font-normal text-uppercase"
                            key={ser.productTitle + index}
                          >
                            {/* {ser.salesPrice !== ser.offerPrice && (
                                <del>
                                  {t('dashboard.KWD')}{' '}
                                  {numberWithCommas(ser.salesPrice)}
                                </del>
                              )}{' '} */}
                            {ser.offerPrice === 0 ? (
                              <span className="text-primary">Free</span>
                            ) : (
                              <>
                                {/* {t('dashboard.KWD')}{' '}
                                  {`${numberWithCommas(ser.offerPrice)}`} */}
                              </>
                            )}
                          </div>
                        ) : (
                          <></>
                        );
                      })}
                    </div>
                  </>
                )}
                {orderDetails?.customerCare.length > 0 && (
                  <>
                    <div className="col-8">
                      {orderDetails?.customerCare.map((ser) => {
                        return (
                          <div
                            className="font-normal text-muted mb-2"
                            key={ser.productTitle}
                          >
                            Customer Care Packages : {ser.productTitle}
                          </div>
                        );
                      })}
                    </div>

                    <div className="col-4 text-right">
                      {orderDetails?.customerCare.map((ser, index) => {
                        return ser?.planDetails?.payType === "cash" ? (
                          <div
                            className="font-normal text-uppercase"
                            key={ser.productTitle + index}
                          >
                            {/* {ser.salesPrice !== ser.offerPrice && (
                                <del>
                                  {t('dashboard.KWD')}{' '}
                                  {numberWithCommas(ser.salesPrice)}
                                </del>
                              )}{' '} */}
                            {ser.offerPrice === 0 ? (
                              <span className="text-primary">Free</span>
                            ) : (
                              <>
                                {/* {t('dashboard.KWD')}{' '}
                                  {`${numberWithCommas(ser.offerPrice)}`} */}
                              </>
                            )}
                          </div>
                        ) : (
                          <></>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {orderDetails?.coupons && orderDetails?.coupons?.length > 0 && (
            <div className="border-bottom py-2 mb-2">
              <div className="row gutter-12 align-items-end mb-1">
                <div className="col-8">
                  <div className="font-normal text-uppercase mb-2">Coupons</div>
                  {orderDetails?.coupons.map((coupon) => {
                    const campaign = campaigns?.find(
                      (camp) => camp.campaignID === coupon.campaignID
                    );
                    if (!campaign?.couponCashBack) {
                      return <></>;
                    }

                    return (
                      <div
                        className="font-normal text-muted mb-2"
                        key={campaign?.couponCashBack?.couponCashbackTitle}
                      >
                        {campaign?.couponCashBack?.couponCashbackTitle}
                      </div>
                    );
                  })}
                </div>
                <div className="col-4 text-right">
                  {orderDetails?.coupons.map((coupon) => {
                    const campaign = campaigns?.find(
                      (camp) => camp.campaignID === coupon.campaignID
                    );
                    if (!campaign?.couponCashBack) {
                      return <></>;
                    }

                    return (
                      <div
                        className="font-normal text-uppercase"
                        key={coupon.couponCode}
                      >
                        KWD {`${numberWithCommas(coupon.couponCashbackAmount)}`}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {orderDetails?.vouchers && orderDetails?.vouchers?.length > 0 && (
            <div className="border-bottom py-2 mb-2">
              <div className="row gutter-12 align-items-end mb-1">
                <div className="col-12">
                  <div className="font-normal text-uppercase mb-2">
                    {" "}
                    External Vouchers
                  </div>
                  {orderDetails?.vouchers.map((voucher) => {
                    return (
                      <div
                        className="font-normal text-muted mb-2"
                        key={voucher?.cashVoucherID}
                      >
                        {voucher.cashVoucherTitle}
                        <span className="text-warning ml-1 text-capitalize">
                          (This voucher is part of campaign &quot;
                          {voucher.campDiscountTitle}&quot; You will get the
                          coupon at showroom)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {orderDetails?.tradeInDetails?.length > 0 && (
            <>
              <div className="border-bottom py-2 mb-2">
                <div className="font-normal text-uppercase mb-1">
                  {t("dashboard.Trade-In")}
                </div>
                {orderDetails?.tradeInDetails.map((ser, index) => {
                  return (
                    <div
                      className="row gutter-12 align-items-end py-1 mb-1"
                      key={"trade" + index}
                    >
                      <div className="col-8">
                        <div className="font-sm text-muted">{`${ser.brand} ${ser.trim} ${ser.modelCode}`}</div>
                      </div>
                      {/* <div className="col-4 text-right">
                        <div className="font-sm text-uppercase">KWD 2500</div>
                      </div> */}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="border-bottom py-2 mb-2">
            <div className="row gutter-12 align-items-end mb-2">
              <div className="col-8 mb-3">
                <div className="font-normal text-uppercase">
                  {t("dashboard.TPL")}
                </div>
              </div>
              <div className="col-4 text-right mb-3">
                <div className="font-normal text-uppercase">
                  {tplSalesPrice !== tplOfferPrice && (
                    <del>
                      {t("dashboard.KWD")} {numberWithCommas(tplSalesPrice)}
                    </del>
                  )}{" "}
                  {tplOfferPrice === 0 ? (
                    <span className="text-primary">Free</span>
                  ) : (
                    <>
                      {t("dashboard.KWD")}{" "}
                      {`${numberWithCommas(tplOfferPrice)}`}
                    </>
                  )}
                </div>
              </div>
              <div className="col-8">
                <div className="font-normal text-uppercase">
                  {t("dashboard.Registration Amount")}
                </div>
              </div>
              <div className="col-4 text-right">
                <div className="font-normal text-uppercase">
                  {registrationSalesPrice !== registrationOfferPrice && (
                    <del>
                      {t("dashboard.KWD")}{" "}
                      {numberWithCommas(registrationSalesPrice)}
                    </del>
                  )}{" "}
                  {registrationOfferPrice === 0 ? (
                    <span className="text-primary">Free</span>
                  ) : (
                    <>
                      {t("dashboard.KWD")}{" "}
                      {`${numberWithCommas(registrationOfferPrice)}`}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {orderDetails?.financeDetails.length > 0 && (
            <div className="border-bottom py-2 mb-2">
              <div className="row gutter-12 align-items-end mb-2">
                <div className="col-12 mb-2">
                  <div className="font-normal text-uppercase mb-1">
                    {t("dashboard.Finance")}
                  </div>
                </div>
                {orderDetails?.financeDetails.map((finance, index) => {
                  return (
                    <div key={"fin" + index}>
                      <div className="col-8 mb-2">
                        <div className="font-normal text-muted mb-2">
                          {t("dashboard.Term (months)")}
                        </div>
                      </div>
                      <div className="col-4 text-right mb-2">
                        <div className="font-normal text-uppercase">
                          {finance.term}
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="font-normal text-muted mb-2">
                          {t("dashboard.Annual Interest Rate")}
                        </div>
                        <div className="font-normal text-muted mb-2">
                          {t("dashboard.Provided by")} {finance.bankName}
                        </div>
                      </div>
                      <div className="col-4 text-right"></div>
                      <div className="col-12">
                        <div className="border-top w-100 pt-3 mt-3">
                          <div className="row">
                            <div className="col-8">
                              <div className="font-normal text-muted mb-2">
                                {t("dashboard.Monthly Payment")}
                              </div>
                            </div>
                            <div className="col-4 text-right">
                              <div className="font-normal text-uppercase">
                                {finance.monthlyPayment.toFixed()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="row gutter-12 justify-content-end pt-3 mb-5">
            <div className="col-xl-5 col-sm-6 col-12 mb-4">
              <div className="bg-gray-200 p-3">
                <div className="row font-normal align-items-end py-1">
                  {orderDetails?.totalDiscount > 0 && (
                    <>
                      <div className="col-7 mb-3">Sub Total</div>
                      <div className="col-5 mb-3 text-right">
                        {t("dashboard.KWD")}{" "}
                        {numberWithCommas(orderDetails?.orderTotalAmount)}
                      </div>
                      <div className="col-7 mb-2 pb-1">Cash Discount</div>
                      <div className="col-5 mb-2 text-right pb-1">
                        {t("dashboard.KWD")}{" "}
                        {numberWithCommas(orderDetails?.totalDiscount || 0)}
                      </div>
                    </>
                  )}
                  <div className="col-7 mb-3">
                    <h6 className="font-normal mb-0">
                      {t("dashboard.Total Price")}
                    </h6>
                  </div>
                  <div className="col-5 mb-3 text-right">
                    <h6 className="font-normal mb-0">
                      {t("dashboard.KWD")} {orderDetails?.orderTotalAmount}
                    </h6>
                  </div>
                  {/* <div className="col-7 mb-2 pb-1">Cash Discount</div>
                  <div className="col-5 mb-2 text-right pb-1">-KWD 60</div>
                  <div className="col-7 mb-2 pb-1">Ramadan offer</div>
                  <div className="col-5 mb-2 text-right pb-1">-KWD 1000</div> */}
                </div>
                {orderDetails?.dueAmount > 0 && (
                  <div className="border-top pt-2 pb-1">
                    <div className="row font-normal">
                      <div className="col-7">
                        {t("dashboard.Balance Amount to be paid")}
                      </div>
                      <div className="col-5 font-weight-bold text-right">
                        {t("dashboard.KWD")} {orderDetails?.dueAmount}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {orderDetails?.paidAmount > 0 && (
            <div>
              <h6 className="font-xxl mb-3">
                {t("dashboard.Payment Receipt")}
              </h6>
              {/* <div className="border-bottom py-2 mb-2">
                <h6 className="font-sm pb-1">Payment Received at cashier</h6>
                <div className="row gutter-12 align-items-end py-1 mb-1">
                  <div className="col-8">
                    <div className="font-sm text-muted">
                      01/011/2020- Cash payment- TRN no. 5842771455
                    </div>
                  </div>
                  <div className="col-4 text-right">
                    <div className="font-sm text-uppercase">KWD 12,999</div>
                  </div>
                </div>
                <div className="row gutter-12 align-items-end py-1 mb-1">
                  <div className="col-8">
                    <div className="font-sm text-muted">
                      01/011/2020- Cash payment- TRN no.{' '}
                      {orderDetails?.transactionID}
                    </div>
                  </div>
                  <div className="col-4 text-right">
                    <div className="font-sm text-uppercase">KWD 12,999</div>
                  </div>
                </div>
              </div> */}
              {orderDetails?.paymentType === "online" && (
                <div className="border-bottom py-2 mb-2">
                  <h6 className="font-sm pb-1">
                    {t("dashboard.Payment Received at Online")}
                  </h6>
                  <div className="row gutter-12 align-items-end py-1 mb-1">
                    <div className="col-8">
                      <div className="font-sm text-muted">
                        {format(new Date(orderDetails.addedDate), "dd/MM/yyyy")}
                        - {t("dashboard.Cash payment- TRN no")}{" "}
                        {orderDetails?.transactionID}
                      </div>
                    </div>
                    <div className="col-4 text-right">
                      <div className="font-sm text-uppercase">
                        {t("dashboard.KWD")} {orderDetails?.paidAmount}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {orderDetails?.financeDetails?.length > 0 && (
                <div className="border-bottom py-2 mb-2">
                  <h6 className="font-sm pb-1">{t("dashboard.Finance LPO")}</h6>
                  <div className="row gutter-12 align-items-end py-1 mb-1">
                    <div className="col-8">
                      {orderDetails?.financeDetails.map((bnk, index) => {
                        return (
                          <>
                            <div
                              className="font-sm text-muted"
                              key={"bnk" + index}
                            >
                              {t("dashboard.Bank")}: {bnk.bankName} - EMI KWD{" "}
                              {bnk.monthlyPayment?.toFixed(2)}
                            </div>

                            {/* <div className="d-flex align-items-center text-primary font-xs pt-2">
        <span className="cursor-pointer">Edit</span>
        <span className="font-xxxs text-gray-600 px-1">|</span>
        <span className="cursor-pointer">Cancel</span>
      </div> */}
                          </>
                        );
                      })}
                    </div>
                    <div className="col-4 text-right">
                      {orderDetails?.financeDetails.map((bnk, index) => {
                        return (
                          <div
                            className="font-sm text-uppercase"
                            key={"bnk--info" + index}
                          >
                            {t("dashboard.KWD")}{" "}
                            {(
                              bnk.term * bnk.monthlyPayment +
                              bnk.downPayment
                            ).toFixed(2)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="py-2 font-normal font-weight-bold">
                <div className="row gutter-12 align-items-end pb-3 mb-1">
                  <div className="col-8">
                    {t("dashboard.Total Amount Paid")}
                  </div>
                  <div className="col-4 text-right">
                    {t("dashboard.KWD")} {orderDetails?.orderTotalAmount}
                  </div>
                </div>
                <div className="row gutter-12 align-items-end">
                  <div className="col-8">{t("dashboard.Total Due")}</div>
                  <div className="col-4 text-right">
                    {t("dashboard.KWD")} {orderDetails?.dueAmount}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      <div>nothing</div>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      getProductDetails: ProductDetailsActions.getProductDetails,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    productData: state.productDetailsState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ConfigDetails);
