import React from "react";
import {
  authActions,
  CartActions,
  CartStateModel,
  numberWithCommas,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  TabNames,
  EcomProductType,
  calculateDiscount,
  getAppliedDiscount,
  getFinanceCampaignOffer,
  calculateMonthlyPayment,
  getFinancePrinciaplAmount,
} from "../utils";
import ReactModal from "react-modal";
import { RootState } from "../../../app/store";
import Image from "next/image";

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
  activeTab: TabNames;
}
// enum SignUpStep {
//   initial = 'initial',
//   signUpCompleted = 'signUpCompleted',
//   otpVerified = 'otpVerified',
// }
const SummaryPreview: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const onEditClick = (tabName: string | TabNames) => {
    props.onEditClick(tabName.toUpperCase());
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

  return (
    <div className="col-lg col-12 build-right-block bg-light d-lg-block d-none py-4">
      <div className="position-sticky px-4 py-2 summary-sticky">
        <div className="row">
          <div className="col-7">
            <h3 className="font-weight-bold mb-5">
              {props.productData?.productDetails?.productTitle}
            </h3>
          </div>
          <div className="col-5">
            {productImage && (
              <Image
                src={productImage}
                className="w-auto h-auto img-fluid border-0"
                alt="vehicle image"
                width={176}
                height={99}
              />
            )}
          </div>
        </div>
        <h5 className="mb-4 font-xxl">{t("build_vehicle.Your Honda")}</h5>
        <div className="border-bottom font-normal py-2 mb-4">
          <div className="row align-items-center no-gutters">
            <div className="col-sm-9 col-8 text-capitalize">
              {t("dashboard.Base Price")}
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
                    className="text-gray-600 text-decoration-underline font-xs"
                    onClick={() => onEditClick(option.customOptionName)}
                  >
                    {t("build_vehicle.edit")}
                  </a>
                </div>
                <div className="col-sm-9 col-8 d-flex align-items-center">
                  <div className="position-relative mr-3" style={{width: '30px', height: '30px'}}>
                    <Image
                      src={option.variantThumbImage}
                      className="img-fluid rounded-circle"
                      alt=""
                      layout="fill"
                    />
                  </div>
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
              <div className="col-sm-9 col-8 text-uppercase text-primary mb-3 font-weight-semibold">
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
                              productCombinations?.combinationOfferPrice || 0
                            )
                          : 0;
                      return (
                        <>
                          <div className="pl-4 align-items-center col-8 col-sm-12 d-flex mb-2 text-muted">
                            {item.campDiscountTitle}
                            {item.productType === EcomProductType.CashBack &&
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
                <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-semibold">
                  {t("detail.accessories")}
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
                      <div className="col-sm-9 col-8 text-muted d-flex align-items-center mb-2">
                        {ins.productTitle}
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
              <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-semibold">
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
                const matchingPlan = props.productData?.insurancesList?.find(
                  (c) => c.productID?.toString() === ins.productID?.toString()
                );
                const matchingOption = matchingPlan?.optionsList?.find(
                  (c) => c.productOptionID === ins?.planDetails?.productOptionID
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
                    <div className="align-items-center col-8 col-sm-9 d-flex mb-2 text-uppercase">
                      {t("build_vehicle.Insurance")}
                    </div>

                    <div className="col-sm-3 col-4 text-right mb-2">
                      {ins.planDetails?.payType === "cash" && (
                        <>
                          {ins.salesPrice !== ins.offerPrice && (
                            <del> KWD {numberWithCommas(ins.salesPrice)}</del>
                          )}{" "}
                          {ins.offerPrice === 0 ? (
                            <span className="text-warning">
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
                                  <span className="text-warning">
                                    {t("build_vehicle.Free")}
                                  </span>
                                ) : (
                                  <>
                                    KWD {numberWithCommas(insAddOn?.price || 0)}
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
                  (c) => c.productID?.toString() === ser.productID?.toString()
                );
                const matchingOption = matchingPlan?.optionsList?.find(
                  (c) => c.productOptionID === ser?.planDetails?.productOptionID
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
                    <div className="mt-2 align-items-center col-8 col-sm-9 d-flex mb-2 text-uppercase">
                      {t("build_vehicle.service_contract")}
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
                            {insAddOn?.originalPrice !== insAddOn?.price && (
                              <del>
                                KWD{" "}
                                {numberWithCommas(insAddOn?.originalPrice || 0)}
                              </del>
                            )}{" "}
                            {(insAddOn?.price || 0) === 0 ? (
                              <span className="text-primary">
                                {t("build_vehicle.Free")}
                              </span>
                            ) : (
                              <>KWD {numberWithCommas(insAddOn?.price || 0)}</>
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
                  (c) => c.productID?.toString() === cus.productID?.toString()
                );
                const matchingOption = matchingPlan?.optionsList?.find(
                  (c) => c.productOptionID === cus?.planDetails?.productOptionID
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
                    <div className="mt-2 align-items-center col-8 col-sm-9 d-flex mb-2 text-uppercase">
                      {t("build_vehicle.customer_care_packages")}
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
                            {insAddOn?.originalPrice !== insAddOn?.price && (
                              <del>
                                KWD{" "}
                                {numberWithCommas(insAddOn?.originalPrice || 0)}
                              </del>
                            )}{" "}
                            {(insAddOn?.price || 0) === 0 ? (
                              <span className="text-primary">
                                {t("build_vehicle.Free")}
                              </span>
                            ) : (
                              <>KWD {numberWithCommas(insAddOn?.price || 0)}</>
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
                  (c) => c.productID?.toString() === war.productID?.toString()
                );
                const matchingOption = matchingPlan?.optionsList?.find(
                  (c) => c.productOptionID === war?.planDetails?.productOptionID
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
                    <div className="mt-2 align-items-center col-8 col-sm-9 d-flex mb-2 text-uppercase">
                      {t("build_vehicle.extended_warranty")}
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
                            {insAddOn?.originalPrice !== insAddOn?.price && (
                              <del>
                                KWD{" "}
                                {numberWithCommas(insAddOn?.originalPrice || 0)}
                              </del>
                            )}{" "}
                            {(insAddOn?.price || 0) === 0 ? (
                              <span className="text-primary">
                                {t("build_vehicle.Free")}
                              </span>
                            ) : (
                              <>KWD {numberWithCommas(insAddOn?.price || 0)}</>
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
        {props?.cartData?.tradeInDetails.length > 0 && (
          <div className="border-bottom font-normal py-2 mb-4">
            <div className="row mb-1 align-items-center">
              <div className="col-sm-9 col-8 text-uppercase text-secondary mb-3 font-weight-semibold">
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
        {(!!props?.cartData?.tpl?.length ||
          !!props?.cartData?.registration?.length) && (
          <div className="border-bottom font-normal py-2 mb-4">
            <div className="row mb-1 align-items-center">
              {!!props?.cartData?.tpl?.length && (
                <>
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
                      <span className="text-warning">
                        {t("build_vehicle.Free")}
                      </span>
                    ) : (
                      <>
                        {props?.cartData?.productCurrency}{" "}
                        {`${numberWithCommas(tplOfferPrice)}`}
                      </>
                    )}
                  </div>
                </>
              )}
              {!!props?.cartData?.registration?.length && (
                <>
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
                      <span className="text-warning">
                        {t("build_vehicle.Free")}
                      </span>
                    ) : (
                      <>
                        {props?.cartData?.productCurrency}{" "}
                        {`${numberWithCommas(registrationOfferPrice)}`}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
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
                          <span className="text-warning">
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
        {props.cartData?.financeDetails &&
          props.cartData?.financeDetails?.length > 0 && (
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
              </div>
            </div>
          )}
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

        <div className="font-normal py-2 font-weight-semibold">
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
            <div className="col-sm col-8 text-uppercase text-secondary">
              {t("dashboard.Total Price")}
            </div>
            <div className="col-4 text-right">
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
                props.cartData.netPrice - (props.cartData.totalDiscount || 0)
              )}
            </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapActionsToProps)(SummaryPreview);
