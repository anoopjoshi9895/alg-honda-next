import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { format } from "date-fns";
import cloneDeep from "lodash/cloneDeep";
import classnames from "classnames";
import {
  CartActions,
  CartStateModel,
  CombinationDetailsActions,
  ProductDetailsStateModel,
  CampaignModel,
  api,
} from "alg-ecom-frontend-core";
import {
  EcomProductType,
  checkIsValidProduct,
  isProductSelectedInConfiguration,
  calculateDiscount,
  getAppliedDiscount,
  onProductSelection,
  onSingleCampaignCashbackSelection,
  isCashbackSelectedInConfiguration,
} from "../utils";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../app/store";
import Image from "next/image";

interface CustomProps {
  campaign?: CampaignModel;
  selected?: boolean;
  productData: ProductDetailsStateModel;
  campaigns?: CampaignModel[];
  cartData: CartStateModel;
  getCartDetails: typeof CartActions.getCartDetails;
  onCampaignSelect: (campaign: CampaignModel) => void;
  onBack: () => void;
  addToCart: typeof CartActions.addToCart;
  saving: boolean;
}

const AutoIncludedProductTypes = ["cashBack", "tplPrice", "registrationPrice"];

const CampaignDetails: React.FunctionComponent<CustomProps> = (props) => {
  const { t } = useTranslation();
  const [selectedAddons, setSelectedAddons] = useState<
    { productID: number; productOptionID: number }[]
  >([]);

  const combinationData = props.cartData?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productData?.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const onSelectProduct = async (
    productType: EcomProductType,
    product: { productID: number; productOptionID: number },
    selected: boolean
  ) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    onProductSelection(
      productType,
      product,
      selected,
      props.productData!,
      cart!
    );
    const addonCopy = cloneDeep(selectedAddons);

    if (selected) {
      addonCopy.push(product);
    } else {
      const index = selectedAddons?.findIndex(
        (itm) =>
          itm.productID === product.productID &&
          itm.productOptionID === product.productOptionID
      );
      if (index > -1) {
        addonCopy.splice(index, 1);
      }
    }
    setSelectedAddons(addonCopy);
    await props.addToCart(cart);
  };

  const addToCart = async () => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    await props.addToCart(cart);
  };

  const renderIncludedItems = () => {
    const includedItems = props.campaign?.appliedItems?.filter(
      (ai) =>
        AutoIncludedProductTypes.includes(ai.productType) ||
        (ai.campDiscountType === "percentage" && ai.campDiscountValue === 100)
    );
    if (
      !includedItems?.length &&
      !props.campaign?.couponCashBack &&
      !props.campaign?.cashVoucher?.length &&
      !props.campaign?.financeDetails?.length
    ) {
      return <></>;
    }

    return (
      <div className="col-md-6 col-12 text-gray-700 px-md-3 px-0">
        <div className="col-12">
          <h6 className="font-normal font-weight-semibold mb-2 pb-3 font-lg text-uppercase">
            {t("build_vehicle.Included")}
          </h6>
          {includedItems?.map((item) => {
            const isValidPackage = checkIsValidProduct(
              item.productType as EcomProductType,
              {
                productID: item.productID,
                productOptionID: item.productOptionID,
              },
              undefined,
              props.productData
            );

            const checked = isProductSelectedInConfiguration(
              item.productType as EcomProductType,
              {
                productID: item.productID,
                productOptionID: item.productOptionID,
              },
              props.cartData!,
              props.campaigns!
            );

            if (!isValidPackage) {
              return <></>;
            }
            const id = `included-${item.productType}-${item.productID}-${item.productOptionID}`;
            const cashbackId = `cashback-${id}`;
            const nonEditable =
              item.productType === EcomProductType.CashBack ||
              item.productType === EcomProductType.TPL ||
              item.productType === EcomProductType.Registration ||
              item.productType === EcomProductType.InsuranceAddons;
            if (nonEditable) {
              return (
                <div className="mb-3 border-bottom d-flex align-items-center font-normal pb-2">
                  {item.productType !== EcomProductType.InsuranceAddons && (
                    <i
                      className="icon-tick text-secondary mr-2 font-xxxxs"
                      id={id}
                    ></i>
                  )}
                  {item.campDiscountTitle}
                  {item.productType === EcomProductType.InsuranceAddons && (
                    <p className="font-xxxs text-gray-700 font-weight-semibold mb-0">
                      * {t("build_vehicle.Add-on")}
                    </p>
                  )}
                </div>
              );
            }
            return (
              <>
                <div
                  className={classnames({
                    "mb-3 border-bottom d-flex pb-2 no-gutters flex-wrap": true,
                    "text-black-50": checked,
                    "text-muted": !checked,
                  })}
                >
                  <div className="col-auto align-content-center d-flex  justify-content-end">
                    {props.selected ? (
                      <>
                        <input
                          type="checkbox"
                          name={`${item.productID}-${item.productOptionID}`}
                          id={id}
                          checked={checked}
                          disabled={!props.selected}
                          onChange={(e) =>
                            onSelectProduct(
                              item.productType as EcomProductType,
                              {
                                productID: item.productID,
                                productOptionID: item.productOptionID,
                              },
                              e.target.checked
                            )
                          }
                        />
                        <label
                          htmlFor={id}
                          className="mb-2 font-normal"
                        ></label>
                      </>
                    ) : (
                      <i
                        className={classnames({
                          "icon-tick pr-2": true,
                          "text-secondary": checked,
                          "text-muted": !checked,
                        })}
                      ></i>
                    )}
                  </div>

                  <div className="col font-normal cursor-pointer">
                    <div className="font-weight-semibold mb-1">
                      {item.campDiscountTitle}
                    </div>
                  </div>
                </div>

                {props.selected && !!item.campCashback && (
                  <div className="mb-3 border-bottom d-flex pb-2 no-gutters flex-wrap cashback-campaign position-relative">
                    <div className="col-auto align-content-center d-flex  justify-content-end">
                      {props.selected ? (
                        <>
                          <input
                            type="checkbox"
                            name={`${item.productID}-${item.productOptionID}`}
                            id={cashbackId}
                            checked={isCashbackSelectedInConfiguration(
                              item.productType as EcomProductType,
                              {
                                productID: item.productID,
                                productOptionID: item.productOptionID,
                              },
                              props.cartData
                            )}
                            disabled={!props.selected}
                            onChange={(e) => {
                              onSingleCampaignCashbackSelection(
                                {
                                  productType: item.productType,
                                  productID: item.productID,
                                  productOptionID: item.productOptionID,
                                  cashbackAmount: item.campCashback!,
                                  campaignID: props.campaign?.campaignID,
                                },
                                e.target.checked,
                                props.cartData,
                                props.productData
                              );
                              addToCart();
                            }}
                          />
                          <label
                            htmlFor={cashbackId}
                            className="mb-2 font-normal"
                          ></label>
                        </>
                      ) : (
                        <i
                          className={classnames({
                            "icon-tick": true,
                            "text-secondary": isCashbackSelectedInConfiguration(
                              item.productType as EcomProductType,
                              {
                                productID: item.productID,
                                productOptionID: item.productOptionID,
                              },
                              props.cartData
                            ),
                            "text-muted": !isCashbackSelectedInConfiguration(
                              item.productType as EcomProductType,
                              {
                                productID: item.productID,
                                productOptionID: item.productOptionID,
                              },
                              props.cartData
                            ),
                          })}
                        ></i>
                      )}
                    </div>
                    <div className="col font-normal cursor-pointer">
                      <div className="font-weight-semibold mb-1">
                        KWD {item.campCashback} {t("build_vehicle.cashback")}
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
          {!!props.campaign?.couponCashBack && (
            <div className="mb-3 border-bottom pb-2 d-flex align-items-center font-normal">
              <i className="icon-tick text-primary mr-2 font-xxxxs"></i>
              {props.campaign?.couponCashBack.couponCashbackTitle}
            </div>
          )}
          {props.campaign?.cashVoucher?.map((voucher) => (
            <div
              className="mb-3 border-bottom pb-2 d-flex align-items-center font-normal"
              key={voucher?.cashVoucherID}
            >
              <i className="icon-tick text-primary mr-2 font-xxxxs"></i>
              {voucher.cashVoucherTitle}
            </div>
          ))}
          {props.campaign?.financeDetails?.map((bnk) => (
            <div
              className="mb-3 border-bottom pb-2 d-flex align-items-center font-normal"
              key={bnk?.bankID}
            >
              <i className="icon-tick text-primary mr-2 font-xxxxs"></i>
              {bnk.campDiscountTitle}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderNonIncludedItems = () => {
    const nonIncludedItems = props.campaign?.appliedItems?.filter(
      (ai) =>
        !AutoIncludedProductTypes.includes(ai.productType) &&
        (ai.campDiscountType !== "percentage" ||
          ai.campDiscountValue !== 100) &&
        checkIsValidProduct(
          ai.productType as EcomProductType,
          {
            productID: ai.productID,
            productOptionID: ai.productOptionID,
          },
          undefined,
          props.productData
        )
    );

    if (!nonIncludedItems?.length) {
      return <></>;
    }

    return (
      <div className="col-md-6 col-12 text-gray-700 px-md-3 px-0">
        <div className="col-12">
          <h6 className="font-normal font-weight-semibold mb-2 pb-3 font-lg text-uppercase">
            {t("build_vehicle.You can also Add")}
          </h6>

          {nonIncludedItems?.map((item) => {
            const isValidPackage = checkIsValidProduct(
              item.productType as EcomProductType,
              {
                productID: item.productID,
                productOptionID: item.productOptionID,
              },
              undefined,
              props.productData
            );

            const checked = isProductSelectedInConfiguration(
              item.productType as EcomProductType,
              {
                productID: item.productID,
                productOptionID: item.productOptionID,
              },
              props.cartData!,
              props.campaigns!
            );

            if (!isValidPackage) {
              return <></>;
            }
            const id = `included-${item.productType}-${item.productID}-${item.productOptionID}`;
            const cashbackId = `cashback-${id}`;
            const nonEditable =
              item.productType === EcomProductType.InsuranceAddons;
            const amountLabels = [];
            const labels = [
              <div className="font-normal cursor-pointer" key={"discount"}>
                {item.campDiscountTitle}
                <div className="letter-spacing ml-1 tag tag--included px-1">
                  {item.campDiscountType === "percentage"
                    ? `${item.campDiscountValue}%`
                    : `KWD ${item.campDiscountValue}`}{" "}
                  {t("build_vehicle.off")}
                </div>
                {item.productType === EcomProductType.InsuranceAddons && (
                  <p className="font-xxxs text-gray-700 font-weight-semibold mb-0">
                    * {t("build_vehicle.Add-on")}
                  </p>
                )}
              </div>,
            ];
            if (item.productType !== EcomProductType.InsuranceAddons) {
              const discountData =
                item.productType === EcomProductType.CashBack
                  ? {
                      originalPrice: calculateDiscount(
                        item.campDiscountType,
                        item.campDiscountValue,
                        productCombinations?.combinationOfferPrice || 0
                      ),
                      discount: 0,
                    }
                  : getAppliedDiscount(
                      props?.productData,
                      productCombinations?.combinationOfferPrice || 0,
                      item.productType,
                      {
                        productID: item.productID,
                        productOptionID: item.productOptionID,
                      },
                      props.campaign ? [props.campaign] : [],
                      props.cartData,
                      { ignoreAddons: true }
                    );
              amountLabels.push(
                <div className="text-right ml-auto text-nowrap font-normal">
                  KWD{" "}
                  {(
                    discountData.originalPrice - discountData.discount
                  )?.toFixed(2)}{" "}
                  <div className="font-xs text-gray-600">
                    <del>KWD {discountData.originalPrice?.toFixed(2)}</del>
                  </div>
                </div>
              );
            }
            if (nonEditable) {
              return (
                <div className="mb-3 border-bottom pb-2 d-flex align-items-center font-normal">
                  <div
                    className={classnames({
                      col: true,
                      "ml-2":
                        item.productType === EcomProductType.InsuranceAddons,
                    })}
                  >
                    {item.productType !== EcomProductType.InsuranceAddons && (
                      <i
                        className="icon-tick text-secondary mr-2 font-xxxxs"
                        id={id}
                      ></i>
                    )}
                    {labels}
                  </div>
                </div>
              );
            }
            return (
              <>
                <div
                  className={classnames({
                    "mb-3 border-bottom d-flex pb-2 no-gutters flex-wrap": true,
                    "text-black-50": checked,
                    "text-muted": !checked,
                  })}
                >
                  <div className="align-content-center col-auto d-flex justify-content-end ">
                    {props.selected ? (
                      <>
                        <input
                          type="checkbox"
                          name={`${item.productID}-${item.productOptionID}`}
                          id={id}
                          checked={checked}
                          disabled={!props.selected}
                          onChange={(e) => {
                            onSelectProduct(
                              item.productType as EcomProductType,
                              {
                                productID: item.productID,
                                productOptionID: item.productOptionID,
                              },
                              e.target.checked
                            );
                          }}
                        />

                        <label
                          htmlFor={id}
                          className="mb-2 d-flex w-100 align-items-start"
                        ></label>
                      </>
                    ) : (
                      <i
                        className={classnames({
                          "icon-tick pr-2": true,
                          "text-secondary": checked,
                          "text-muted": !checked,
                        })}
                      ></i>
                    )}
                  </div>
                  <div className="col font-normal cursor-pointer">
                    <div className="font-weight-semibold mb-1">{labels}</div>
                  </div>
                  <div className="col-md-auto col-12 align-content-center d-flex align-items-center justify-content-end">
                    <label className="pr-3 mb-0 cursor-pointer">
                      {amountLabels}
                    </label>
                  </div>
                </div>

                {props.selected && !!item.campCashback && (
                  <div className="mb-3 border-bottom d-flex pb-2 no-gutters flex-wrap cashback-campaign position-relative">
                    <div className="col-auto align-content-center d-flex  justify-content-end">
                      {props.selected ? (
                        <>
                          <input
                            type="checkbox"
                            name={`${item.productID}-${item.productOptionID}`}
                            id={cashbackId}
                            checked={isCashbackSelectedInConfiguration(
                              item.productType as EcomProductType,
                              {
                                productID: item.productID,
                                productOptionID: item.productOptionID,
                              },
                              props.cartData
                            )}
                            disabled={!props.selected}
                            onChange={(e) => {
                              onSingleCampaignCashbackSelection(
                                {
                                  productType: item.productType,
                                  productID: item.productID,
                                  productOptionID: item.productOptionID,
                                  cashbackAmount: item.campCashback!,
                                  campaignID: props.campaign?.campaignID,
                                },
                                e.target.checked,
                                props.cartData,
                                props.productData
                              );
                              addToCart();
                            }}
                          />
                          <label
                            htmlFor={cashbackId}
                            className="mb-2 font-normal"
                          ></label>
                        </>
                      ) : (
                        <i
                          className={classnames({
                            "icon-tick": true,
                            "text-secondary": isCashbackSelectedInConfiguration(
                              item.productType as EcomProductType,
                              {
                                productID: item.productID,
                                productOptionID: item.productOptionID,
                              },
                              props.cartData
                            ),
                            "text-muted": !isCashbackSelectedInConfiguration(
                              item.productType as EcomProductType,
                              {
                                productID: item.productID,
                                productOptionID: item.productOptionID,
                              },
                              props.cartData
                            ),
                          })}
                        ></i>
                      )}
                    </div>
                    <div className="col font-normal cursor-pointer">
                      <div className="font-weight-semibold mb-1">
                        KWD {item.campCashback} {t("build_vehicle.cashback")}
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="tab-pane fade show active"
      id="campaign-services"
      role="tabpanel"
      aria-labelledby="campaign-tab"
    >
      <div className="campaign py-lg-5 py-4">
        <div className="container">
          <h4 className="text-uppercase font-weight-normal mb-5 d-lg-block d-none">
            {t("build_vehicle.You have selected the package")}
          </h4>

          <div className="border border-bottom col-12 mb-4 pb-4 px-0">
            <div className="border-bottom m-0 pb-3 pt-3 row">
              {props.campaign?.campaignImage && (
                <div className="col-md-1 col-sm-4 col-12 mb-md-0 mb-3">
                  <Image
                    src={props.campaign?.campaignImage}
                    className="img-fluid"
                    alt={props.campaign?.campaignTitle}
                    width={346}
                    height={248}
                  />
                </div>
              )}
              <div
                className={classnames({
                  "col-sm-8 col-12 mb-md-0 mb-3": true,
                  "col-md-5": !!props.campaign?.campaignImage,
                  "col-md-6": !props.campaign?.campaignImage,
                })}
              >
                <h6 className="font-lg mb-2">
                  {props.campaign?.campaignTitle}
                </h6>
                {props.campaign?.campaignAvailableTo && (
                  <p className="font-normal mb-2 pb-1 font-weight-semibold">
                    {t("build_vehicle.Valid Till")}{" "}
                    {format(
                      new Date(props.campaign?.campaignAvailableTo),
                      "MMMM dd"
                    )}
                  </p>
                )}
                {props.campaign?.campaignEligibility && (
                  <p className="font-normal text-gray-700">
                    *{props.campaign?.campaignEligibility}
                  </p>
                )}
              </div>

              <div className="align-items-center align-items-end col-12 col-md-6 d-flex justify-content-end">
                <button
                  type="button"
                  onClick={props.onBack}
                  className="btn btn-outline-primary font-sm mr-2 px-md-4 px-3 text-uppercase"
                >
                  {t("common.Back")}
                </button>

                <button
                  type="button"
                  onClick={() => props.onCampaignSelect(props.campaign!)}
                  className={classnames({
                    "btn font-sm px-md-4 px-3 text-uppercase": true,
                    "btn-outline-primary": !props.selected && !props.saving,
                    "btn-primary": props.selected || props.saving,
                  })}
                  disabled={props.saving}
                >
                  {!props.selected
                    ? t("build_vehicle.Select This Campaign")
                    : t("build_vehicle.Remove This Campaign")}
                </button>
              </div>
            </div>
            <div className="row m-0 pb-3 pt-3">
              {renderIncludedItems()}
              {renderNonIncludedItems()}
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
      getCombinationDetails: CombinationDetailsActions.getCombinationDetails,
      getCartDetails: CartActions.getCartDetails,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    cartData: state.cartState,
    productData: state.productDetailsState,
    combinationStateData: state.combinationState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CampaignDetails);
