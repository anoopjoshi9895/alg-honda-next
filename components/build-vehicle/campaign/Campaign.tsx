import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { format } from "date-fns";
import cloneDeep from "lodash/cloneDeep";
import {
  CartActions,
  CartStateModel,
  CombinationDetailsActions,
  ProductDetailsStateModel,
  CombinationDetailsStateModel,
  ProductViewModelBV,
  CampaignModel,
  api,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import CampaignDetails from "./CampaignDetails";
import {
  setConfigurationPrices,
  addProductToConfigurationIfNotExists,
  EcomProductType,
  getCampaignFinance,
} from "../utils";
import { RootState } from "../../../app/store";
import Image from "next/image";

interface CustomProps {
  cartData: CartStateModel;
  productDetails: ProductViewModelBV | undefined;
  addToCart: typeof CartActions.addToCart;
  productData: ProductDetailsStateModel;
  getCombinationDetails: typeof CombinationDetailsActions.getCombinationDetails;
  combinationStateData: CombinationDetailsStateModel;
  getCartDetails: typeof CartActions.getCartDetails;
}

const Campaign: React.FunctionComponent<CustomProps> = (props) => {
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const combinationData = props.cartData?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productDetails?.combinations?.find(
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
  const [selectedCampaignId, setSelectedCampaignId] = React.useState<
    number[] | undefined
  >(cloneDeep(props.cartData)?.selCampaignDetails?.map((x) => x.campaignID));
  const [selectedCampaignDetails, setSelectedCampaignDetails] = React.useState<{
    isOpen?: boolean;

    campaign?: CampaignModel;
  }>({});
  const onCampaignSelect = async (
    campaign: CampaignModel,
    checked: boolean
  ) => {
    setSaving(true);
    const cart: CartStateModel = cloneDeep(props.cartData);

    cart.selCampaignDetails = checked
      ? [
          {
            campaignID: campaign.campaignID,
            campaignTitle: campaign.campaignTitle,
          },
        ]
      : [];

    cart.vouchers = checked
      ? campaign?.cashVoucher?.map((v) => {
          return {
            ...v,

            campaignID: campaign.campaignID,
          };
        })
      : [];
    const campFinance = checked
      ? getCampaignFinance(campaign, props?.productData, props.cartData)
      : undefined;

    if (!!cart.financeDetails?.length) {
      const finance = cart.financeDetails?.[0];

      if (
        finance.campaignID &&
        !cart.selCampaignDetails?.some(
          (c) => c.campaignID === finance?.campaignID
        )
      ) {
        delete finance.campCashback;
        delete finance.campaignID;
        delete finance.campDiscountPercentage;
        delete finance.numOfFreeEmi;
        cart.financeDetails = [finance];
      } else {
        cart.financeDetails = campFinance ? [campFinance] : [];
      }
    } else {
      cart.financeDetails = campFinance ? [campFinance] : [];
    }

    const cartCampaigns = !!cart?.selCampaignDetails?.length
      ? productCombinations?.campaign?.filter(
          (c) =>
            !!cart?.selCampaignDetails?.find(
              (x) => x.campaignID === c.campaignID
            )
        )
      : [];

    if (cartCampaigns?.length) {
      const includedItems = cartCampaigns?.reduce(
        (list, camp) => {
          const items = camp.appliedItems?.filter(
            (ai) =>
              ai.campDiscountType === "percentage" &&
              ai.campDiscountValue === 100
          );

          if (items?.length) {
            list.push(...items);
          }

          return list;
        },

        [] as {
          productID: number;
          productOptionID: number;
          campDiscountTitle: string;
          productType: string;
          campDiscountType: string;
          campDiscountValue: number;
        }[]
      );

      for (const appliedItem of includedItems) {
        addProductToConfigurationIfNotExists(
          cart,
          props.productData,
          appliedItem.productType as EcomProductType,
          {
            productID: appliedItem.productID,
            productOptionID: appliedItem.productOptionID,
          }
        );
      }
    }
    setConfigurationPrices(props.productData, cart);
    await props.addToCart(cart);

    if (props.productDetails?.productID) {
      if (!cart.cartID) {
        try {
          const response = await api.build.createCart(
            props.productDetails?.productID,
            cart
          );
          if (response.responsecode === 200) {
            props.getCartDetails(response.data?.cartID);
          }
        } catch (error) {
          //
        }
      } else {
        try {
          const response = await api.build.updateCart(
            props.productDetails?.productID,
            cart
          );
          if (response.responsecode === 200) {
            props.getCartDetails(response.data?.cartID);
          }
        } catch (error) {
          //
        }
      }
    }
    setSelectedCampaignId(checked ? [campaign.campaignID] : []);

    setSaving(false);
  };

  const parentCampaigns = productCombinations?.campaign?.filter(
    (c) =>
      !c.connectedCampaignID?.toString()?.split(",").length ||
      !productCombinations?.campaign?.find(
        (lc) =>
          lc.campaignID !== c.campaignID &&
          lc.connectedCampaignID &&
          lc.connectedCampaignID
            ?.toString()
            ?.split(",")
            ?.find((cc) => c.campaignID?.toString() === cc)
      )
  );

  return !selectedCampaignDetails.isOpen ? (
    <div
      className="tab-pane fade show active"
      id="campaign-services"
      role="tabpanel"
      aria-labelledby="campaign-tab"
    >
      <div className="campaign py-4 px-lg-3">
        <div className="container px-lg-3">
          <h6 className="text-uppercase font-weight-bold letter-spacing-md mb-4 d-lg-block d-none">
            {t("build_vehicle.Current offers & Campaigns")}
          </h6>
          {!productCombinations?.campaign?.length && (
            <span className="text-muted font-sm">
              {t("build_vehicle.No campaigns found")}
            </span>
          )}
          {parentCampaigns?.map((camp) => {
            const connectedCampaigns = productCombinations?.campaign?.filter(
              (lc) =>
                camp.connectedCampaignID
                  ?.toString()
                  ?.split(",")
                  ?.find((cc) => cc === lc.campaignID?.toString())
            );
            const list = connectedCampaigns
              ? [camp, ...connectedCampaigns]
              : [camp];

            return !connectedCampaigns?.length ? (
              <div className="col-12 border-bottom py-4 px-sm-3 px-0">
                <div className="row">
                  <div className="col-md-2 col-sm-4 col-12 mb-md-0 mb-3">
                    <Image
                      src={camp.campaignImage}
                      className="img-fluid"
                      alt={camp?.campaignTitle}
                      width={346}
                      height={248}
                    />
                  </div>
                  <div className="col-md-3 col-sm-8 col-12 mb-md-0 mb-3">
                    <h6 className="font-lg mb-2">{camp.campaignTitle}</h6>
                    {camp.campaignAvailableTo && (
                      <p className="font-normal mb-2 pb-1 font-weight-semibold">
                        {t("build_vehicle.Valid Till")}{" "}
                        {format(new Date(camp.campaignAvailableTo), "MMMM dd")}
                      </p>
                    )}
                    {camp.campaignEligibility && (
                      <p className="font-normal text-gray-700">
                        *{camp.campaignEligibility}
                      </p>
                    )}
                  </div>
                  {(!!camp.appliedItems?.length ||
                    !!camp?.couponCashBack ||
                    !!camp?.cashVoucher?.length ||
                    !!camp?.financeDetails?.length) && (
                    <div className="col-md-4 col-8 text-gray-700">
                      <h6 className="font-normal font-weight-semibold mb-2 pb-1">
                        {t("build_vehicle.What Includes")}
                      </h6>
                      <ul className="font-normal pl-3">
                        {camp.appliedItems?.map((item) => {
                          return (
                            <li className="mb-2" key={item?.productID}>
                              {item.campDiscountTitle}
                            </li>
                          );
                        })}
                        {!!camp?.couponCashBack && (
                          <li className="mb-2">
                            {camp.couponCashBack.couponCashbackTitle}
                          </li>
                        )}
                        {camp.cashVoucher?.map((voucher) => {
                          return (
                            <li className="mb-2" key={voucher?.cashVoucherID}>
                              {voucher.cashVoucherTitle}
                            </li>
                          );
                        })}
                        {camp.financeDetails?.map((bnk) => {
                          return (
                            <li className="mb-2" key={bnk?.bankID}>
                              {bnk.campDiscountTitle}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="col-md-3 col-4 d-flex justify-content-end align-items-end">
                    <div className="d-flex align-items-center">
                      {selectedCampaignId?.includes(camp?.campaignID) && (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCampaignDetails({
                              isOpen: true,

                              campaign: camp,
                            })
                          }
                          className="btn btn-outline-primary font-sm mr-3 py-2 px-3 text-uppercase"
                        >
                          {t("build_vehicle.View Details")}
                        </button>
                      )}
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`${camp?.campaignID}-checkbox`}
                          name="radio"
                          checked={selectedCampaignId?.includes(
                            camp?.campaignID
                          )}
                          onChange={(e) => {
                            if (
                              selectedCampaignId?.includes(camp?.campaignID)
                            ) {
                              onCampaignSelect(camp, e.target.checked);
                            } else {
                              setSelectedCampaignDetails({
                                isOpen: true,

                                campaign: camp,
                              });
                            }
                          }}
                        />
                        <label htmlFor={`${camp?.campaignID}-checkbox`}></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="col-12 font-lg font-weight-semibold pt-3 connected-campaign-head">
                  {camp?.connectedCampaignTitle}
                </div>
                {list?.map((item) => {
                  return (
                    <div
                      className="col-12 border-bottom py-4 px-sm-3 px-0 connected-campaign"
                      key={item?.campaignID}
                    >
                      <div className="row">
                        <div className="col-md-2 col-sm-4 col-12 mb-md-0 mb-3">
                          <Image
                            src={item.campaignImage}
                            className="img-fluid"
                            alt={item?.campaignTitle}
                            width={346}
                            height={248}
                          />
                        </div>
                        <div className="col-md-3 col-sm-8 col-12 mb-md-0 mb-3">
                          <h6 className="font-lg mb-2">{item.campaignTitle}</h6>
                          {item.campaignAvailableTo && (
                            <p className="font-normal mb-2 pb-1 font-weight-semibold">
                              {t("build_vehicle.Valid Till")}{" "}
                              {format(
                                new Date(item.campaignAvailableTo),
                                "MMMM dd"
                              )}
                            </p>
                          )}
                          {item.campaignEligibility && (
                            <p className="font-normal text-gray-700">
                              *{item.campaignEligibility}
                            </p>
                          )}
                        </div>
                        {(!!item.appliedItems?.length ||
                          !!item?.couponCashBack ||
                          !!item?.cashVoucher?.length ||
                          !!item?.financeDetails?.length) && (
                          <div className="col-md-4 col-8 text-gray-700">
                            <h6 className="font-normal font-weight-semibold mb-2 pb-1">
                              {t("build_vehicle.What Includes")}
                            </h6>
                            <ul className="font-normal pl-3">
                              {item.appliedItems?.map((aitem) => {
                                return (
                                  <li className="mb-2" key={aitem?.productID}>
                                    {aitem.campDiscountTitle}
                                  </li>
                                );
                              })}
                              {!!item?.couponCashBack && (
                                <li
                                  className="mb-2"
                                  key={`couponCashBack-${item?.campaignID}`}
                                >
                                  {item.couponCashBack.couponCashbackTitle}
                                </li>
                              )}
                              {item.cashVoucher?.map((voucher) => {
                                return (
                                  <li
                                    className="mb-2"
                                    key={`cashVoucherTitle-${voucher?.cashVoucherID}`}
                                  >
                                    {voucher.cashVoucherTitle}
                                  </li>
                                );
                              })}
                              {item.financeDetails?.map((bnk) => {
                                return (
                                  <li
                                    className="mb-2"
                                    key={`financeDetails-${bnk?.campaignID}`}
                                  >
                                    {bnk.campDiscountTitle}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}

                        <div className="col-md-3 col-4 d-flex justify-content-end align-items-end">
                          <div className="d-flex align-items-center">
                            {selectedCampaignId?.includes(item?.campaignID) && (
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedCampaignDetails({
                                    isOpen: true,
                                    campaign: item,
                                  })
                                }
                                className="btn btn-outline-primary font-sm mr-3 py-2 px-3 text-uppercase"
                              >
                                {t("build_vehicle.View Details")}
                              </button>
                            )}
                            <div className="custom-checkbox">
                              <input
                                type="checkbox"
                                id={`${item?.campaignID}-checkbox`}
                                name="radio"
                                checked={selectedCampaignId?.includes(
                                  item?.campaignID
                                )}
                                onChange={(e) => {
                                  if (
                                    selectedCampaignId?.includes(
                                      item?.campaignID
                                    )
                                  ) {
                                    onCampaignSelect(item, e.target.checked);
                                  } else {
                                    setSelectedCampaignDetails({
                                      isOpen: true,
                                      campaign: item,
                                    });
                                  }
                                }}
                              />
                              <label
                                htmlFor={`${item?.campaignID}-checkbox`}
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <CampaignDetails
      campaign={selectedCampaignDetails?.campaign}
      selected={
        !!(
          selectedCampaignDetails?.campaign?.campaignID &&
          selectedCampaignId?.includes(
            selectedCampaignDetails?.campaign?.campaignID
          )
        )
      }
      campaigns={campaigns}
      onCampaignSelect={(camp: CampaignModel) =>
        onCampaignSelect(camp, !selectedCampaignId?.includes(camp?.campaignID))
      }
      onBack={() =>
        setSelectedCampaignDetails({
          isOpen: false,
        })
      }
      saving={saving}
    />
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

export default connect(mapStateToProps, mapActionsToProps)(Campaign);
