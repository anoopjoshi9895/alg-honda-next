import React from "react";
import { CartStateModel, numberWithCommas } from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
interface CustomProps {
  cartData: CartStateModel;
}
const CashSummary: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();

  const showStandardPrice = (
    combinationPrice?: number,
    tplPrice?: number,
    registrationPrice?: number
  ) => {
    let amount = 0;

    amount += combinationPrice ? combinationPrice : 0;
    amount += tplPrice ? tplPrice : 0;
    amount += registrationPrice ? registrationPrice : 0;
  };
  return (
    <>
      {/* ...............cash price................ */}
      <h4 className="text-uppercase pb-3 pt-4 mt-3">
        {t("build_vehicle.price_summary")}
      </h4>
      <div className="row gutter-10 font-normal mb-2">
        <div className="col-7">
          <span>{t("build_vehicle.recommented_standard_price")}</span>
        </div>
        <div className="col-5 text-right">
          <span className="font-weight-bold pr-xl-4 pr-3">
            {`KWD ${numberWithCommas(
              props.cartData?.productInfo?.combinationInfo[0]
                ?.combinationPrice +
                (props?.cartData?.tpl
                  ? props?.cartData?.tpl?.reduce(
                      (prev, cur) => prev + cur.offerPrice,
                      0
                    )
                  : 0) +
                (props?.cartData?.registration
                  ? props?.cartData?.registration?.reduce(
                      (prev, cur) => prev + cur.offerPrice,
                      0
                    )
                  : 0)
            )}`}
          </span>
        </div>
      </div>
      <div className="bg-light px-lx-4 px-3 py-4">
        <div className="p-lx-2">
          <h6 className="align-items-center d-flex font-normal font-weight-semibold justify-content-between mb-3">
            {t("build_vehicle.configured_options")}{" "}
            <i className="font-xs icon-chevron-down"></i>
          </h6>
          <div className="px-2">
            {props.cartData?.productInfo?.customOptionsInfo?.map((custom) => {
              return (
                <div
                  className="row gutter-10 py-2 mb-2"
                  key={custom?.customOptionID}
                >
                  <div className="col-12">
                    <span className="text-uppercase text-heading font-sm font-weight-bold d-block mb-2">
                      {custom.customOptionName}
                    </span>
                  </div>
                  <div className="col-8">
                    <span className="font-normal text-gray-800">
                      {custom.variantName}
                    </span>
                  </div>
                  {/* <div className="col-4 text-right">
                    <span className="font-normal">{`KWD ${custom.priceDiff}`}</span>
                  </div> */}
                </div>
              );
            })}

            {props.cartData?.accessoriesInfo?.length > 0 && (
              <div className="row gutter-10 py-2 mb-2">
                <div className="col-12">
                  <span className="text-uppercase text-heading font-sm font-weight-bold d-block mb-2">
                    {t("build_vehicle.ACCESSORIES")}
                  </span>
                </div>
                {props.cartData?.accessoriesInfo?.map((acc) => {
                  return (
                    <>
                      <div className="col-7 pb-1">
                        <span className="d-block font-normal text-gray-800 text-truncate">
                          {acc.productTitle}
                        </span>
                      </div>
                      <div className="col-5 text-right pb-1">
                        <span className="font-normal">{`KWD ${acc.offerPrice}`}</span>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
            <div className="row gutter-10 py-2 mb-2">
              <div className="col-12">
                <span className="text-uppercase text-heading font-sm font-weight-bold d-block mb-2">
                  {t("build_vehicle.INSURANCES")}
                </span>
              </div>
              {props.cartData?.insuranceDetails?.length > 0 && (
                <>
                  <div className="col-7 pb-1">
                    <span className="d-block font-normal text-gray-800 text-truncate">
                      {props.cartData?.insuranceDetails[0].productTitle}
                    </span>
                  </div>
                  <div className="col-5 text-right pb-1">
                    <span className="font-normal">{`KWD ${props.cartData?.insuranceDetails[0]?.offerPrice}`}</span>
                  </div>
                </>
              )}
              {props.cartData?.serviceDetails?.length > 0 && (
                <>
                  <div className="col-7 pb-1">
                    <span className="d-block font-normal text-gray-800 text-truncate">
                      {t("build_vehicle.service_contract")}
                    </span>
                  </div>
                  <div className="col-5 text-right pb-1">
                    <span className="font-normal">{`KWD ${props.cartData?.serviceDetails[0]?.offerPrice}`}</span>
                  </div>
                </>
              )}
              {props.cartData?.customerCare?.length > 0 && (
                <>
                  <div className="col-7 pb-1">
                    <span className="d-block font-normal text-gray-800 text-truncate">
                      {t("build_vehicle.customer_care_packages")}
                    </span>
                  </div>
                  <div className="col-5 text-right pb-1">
                    <span className="font-normal">{`KWD ${props.cartData?.customerCare[0]?.offerPrice}`}</span>
                  </div>
                </>
              )}
              {props.cartData?.extendedWarranty?.length > 0 && (
                <>
                  <div className="col-7 pb-1">
                    <span className="d-block font-normal text-gray-800 text-truncate">
                      {t("build_vehicle.extended_warranty")}
                    </span>
                  </div>
                  <div className="col-5 text-right pb-1">
                    <span className="font-normal">{`KWD ${props.cartData?.extendedWarranty[0]?.offerPrice}`}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row gutter-10 font-normal mt-2">
        <div className="col-6">
          <span>{t("build_vehicle.recommended_OTR_Total_Price")}</span>
        </div>
        <div className="col-6 text-right">
          <span className="font-weight-bold pr-xl-4 pr-3">
            KWD{" "}
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
              props.cartData?.netPrice - (props.cartData.totalDiscount || 0)
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default CashSummary;
