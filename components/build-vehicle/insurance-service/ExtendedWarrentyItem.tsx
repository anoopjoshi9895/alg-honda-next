import React, { useContext } from "react";
import {
  numberWithCommas,
  OptionsModelBV,
  CartStateModel,
  AddonModelCart,
  InstallmentsModelBV,
  ExtendedWarrantyModelCart,
  ExtendedWarrentyModelBV,
  CampaignModel,
  AddonModelBV,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";
import { decode } from "html-entities";
import AddonCheckBox from "../insurance-service/checkbox";
import ReactModal from "react-modal";
import ExtraAddonPopup from "./ExtraAddonPopup";
import TermsPopup from "./TermsPopup";
import { cloneDeep } from "lodash";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import {
  getAppliedDiscount,
  getAppliedDiscountForPlanAddons,
  isProductExcludedFromCampaign,
  EcomProductType,
} from "../utils";
import dynamic from "next/dynamic";
import SelectInput from "../../SelectInput";
import { RootState } from "../../../app/store";
import {
  EqualHeight,
  EqualHeightContext,
  EqualHeightElement,
} from "react-equal-height/clean";
import Image from "next/image";
export const customStyles: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "1220px",
    width: "100%",
    border: "0",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
    padding: "0",
    margin: "20px auto",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "auto",
  },
};
export const customStylesTerms: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "50%",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "860px",
    width: "100%",
    border: "0",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
    padding: "0",
    margin: "0px auto",
    transform: "translateY(-50%)",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "auto",
  },
};
interface CustomProps {
  warrenty: ExtendedWarrentyModelBV;
  onChoose: any;
  isChoosen: boolean;
  cartData: CartStateModel;
  campaigns?: CampaignModel[];
  totalPrice: number;
  productData?: ProductDetailsStateModel;
}

interface PaymentModes {
  value: string;
  label: string;
}
const ExtendedWarrentyItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();

  const [addOnPopup, openAddOnPopup] = React.useState<boolean>(false);
  const [termsPopup, openTermsPopup] = React.useState<boolean>(false);

  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [installments, setInstallments] = React.useState<
    PaymentModes[] | undefined
  >(undefined);
  const [selectedOption, setSelectedOption] = React.useState<
    OptionsModelBV | undefined
  >(undefined);

  const [selectedAddons, setSelectedAddons] = React.useState<AddonModelCart[]>(
    []
  );
  const [paymentMode, setPaymentMode] = React.useState<string>("");
  const onChoose = () => {
    props.onChoose(props.warrenty);
  };
  const onTermsAcceptedClick = () => {
    setTermsAccepted(!termsAccepted);
  };
  const { setForceUpdate } = useContext(EqualHeightContext);

  const handleImage = () => {
    setForceUpdate((value: boolean) => !value);
  };

  React.useEffect(() => {
    if (props.isChoosen) {
      setTermsAccepted(true);
      if (props.cartData?.extendedWarranty.length > 0) {
        const optionSelected =
          props.cartData?.extendedWarranty[0]?.planDetails?.productOptionID;

        const option = props?.warrenty?.optionsList.find(
          (item) => item.productOptionID === optionSelected
        );

        setSelectedOption(option);
        if (option) {
          setSelectedOption(option);
          const installmentsData: PaymentModes[] = getPaymentModes(option);
          setInstallments(installmentsData);
        }
        setPaymentMode(
          props.cartData?.extendedWarranty[0]?.planDetails?.payType === "cash"
            ? "cash"
            : props.cartData?.extendedWarranty[0]?.planDetails?.installments.toString()
        );
        if (
          props.cartData?.extendedWarranty[0]?.planDetails?.addons?.length > 0
        ) {
          setSelectedAddons(
            props.cartData.extendedWarranty[0].planDetails.addons
          );
        }
      }
    } else {
      if (props?.warrenty?.optionsList?.length > 0) {
        const optionSelected = props?.warrenty?.optionsList[0].productOptionID;

        const option = props?.warrenty?.optionsList.find(
          (item) => item.productOptionID === optionSelected
        );

        setSelectedOption(option);
        if (option) {
          setSelectedOption(option);
          const installmentsData: PaymentModes[] = getPaymentModes(option);
          setInstallments(installmentsData);
        }
        setPaymentMode("cash");
        setSelectedAddons([]);
      }
    }
    handleImage();
  }, [props.isChoosen]);

  React.useEffect(() => {
    setTermsAccepted(props.isChoosen);
  }, [props.isChoosen]);

  const calculateEcomPlanPrice = (
    plan: { priceType: string; priceValue?: number },
    basePrice: number
  ) => {
    if (plan.priceType === "fixed") {
      return plan.priceValue || 0;
    }
    if (!plan.priceValue || plan.priceValue < 0 || !basePrice) {
      return 0;
    }
    return Math.ceil((plan.priceValue * basePrice) / 100) + 1;
  };

  const getPrice = () => {
    const discountData = getAppliedDiscount(
      props.productData,
      props.totalPrice || 0,
      "extendedWarrenty",
      {
        productID: props.warrenty.productID,
        productOptionID: selectedOption?.productOptionID,
        sortOrder: props.warrenty.sortOrder,
      },
      props.campaigns,
      props.cartData
    );

    return discountData.originalPrice || 0;
  };

  const getDiscountPrice = () => {
    const discountData = getAppliedDiscount(
      props.productData,
      props.totalPrice || 0,
      "extendedWarrenty",
      {
        productID: props.warrenty.productID,
        productOptionID: selectedOption?.productOptionID,
        sortOrder: props.warrenty.sortOrder,
      },
      props.campaigns,
      props.cartData
    );

    return discountData.discount || 0;
  };

  const getExtraAddonsDiscount = (addon: AddonModelBV) => {
    let discount = 0;
    const addOnAppliedItems = props?.campaigns?.[0]?.appliedItems?.find(
      (x) =>
        x.productType === "insuranceAddons" && x.productID === addon?.packageID
    );

    let rate = 0;
    const combinationPrice =
      props.cartData?.productInfo?.combinationInfo[0].combinationPrice;
    if (addon.addonPriceType === "percentage") {
      rate = (combinationPrice * addon.addonPriceValue) / 100;
      if (addon.discountType === "percentage" && !addOnAppliedItems) {
        const discountRate = (rate * addon.discountValue) / 100;
        rate = rate - discountRate;
      }
      if (addon.discountType === "fixed" && !addOnAppliedItems) {
        rate = rate - addon.discountValue;
      }
    } else {
      rate = addon.addonPriceValue;
      if (addon.discountType === "percentage" && !addOnAppliedItems) {
        const discountRate = (rate * addon.discountValue) / 100;
        rate = rate - discountRate;
      }
      if (addon.discountType === "fixed" && !addOnAppliedItems) {
        rate = rate - addon.discountValue;
      }
    }

    if (rate > 0) {
      if (addOnAppliedItems) {
        discount =
          (addOnAppliedItems?.campDiscountType === "percentage"
            ? (rate * addOnAppliedItems.campDiscountValue) / 100
            : addOnAppliedItems.campDiscountValue) || 0;
      }
    }

    return discount;
  };

  const getTotalPrice = (addons: AddonModelCart[]) => {
    let originalPrice = getPrice();
    const discount = getDiscountPrice();
    let offerPrice = originalPrice - discount;

    addons?.forEach((a) => {
      if (a.productType !== "insuranceAddons") {
        return;
      }
      if (a.FOC === "Yes") {
        return;
      } else {
        const addOnDiscountData = getAppliedDiscountForPlanAddons(
          selectedOption?.addons?.find(
            (ma) => ma.addonID === a.addonID
          ) as AddonModelBV,
          props.totalPrice || 0,
          props.campaigns
        );
        offerPrice =
          offerPrice +
          addOnDiscountData.originalPrice -
          addOnDiscountData.discount;
        originalPrice = originalPrice + addOnDiscountData.originalPrice;
      }
    });
    return Math.ceil(originalPrice);
  };

  const getOfferPrice = (addons: AddonModelCart[]) => {
    let originalPrice = getPrice();
    const discount = getDiscountPrice();
    let offerPrice = originalPrice - discount;

    addons?.forEach((a) => {
      if (a.productType !== "insuranceAddons") {
        return;
      }
      if (a.FOC === "Yes") {
        return;
      } else {
        const addOnDiscountData = getAppliedDiscountForPlanAddons(
          selectedOption?.addons?.find(
            (ma) => ma.addonID === a.addonID
          ) as AddonModelBV,
          props.totalPrice || 0,
          props.campaigns
        );
        offerPrice =
          offerPrice +
          addOnDiscountData.originalPrice -
          addOnDiscountData.discount;
        originalPrice = originalPrice + addOnDiscountData.originalPrice;
      }
    });
    return offerPrice;
  };

  const onChangeAddon = (
    isSelected: boolean,
    addonID: number,
    price: number,
    actualPrice: number,
    productType: string,
    packageID: number,
    packageOptionID: number,
    FOC: string
  ) => {
    const addonCopy = cloneDeep(selectedAddons);
    if (isSelected) {
      addonCopy.push({
        addonID,
        price,
        originalPrice: actualPrice,
        productType,
        packageID,
        packageOptionID,
        FOC,
      });
    } else {
      const index = selectedAddons?.findIndex((itm) => itm.addonID === addonID);
      if (index > -1) {
        addonCopy.splice(index, 1);
      }
    }
    setSelectedAddons(addonCopy);
    if (props.isChoosen) {
      onServiceChoose(true, addonCopy);
    }
  };

  const checkAddonChoosen = (id: number) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    if (props.isChoosen && cart.extendedWarranty?.length > 0) {
      const addonCopy = cart.extendedWarranty[0]?.planDetails?.addons;
      const addonCopyIndex = addonCopy?.findIndex(
        (item) => item.addonID === id
      );

      if (addonCopyIndex !== undefined && addonCopyIndex > -1) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  const convertToStringIfNumber = (text: any) => {
    if (typeof text === "number") {
      return text.toString();
    } else {
      return text;
    }
  };

  const onServiceChoose = (isChoosen: boolean, addonCopy: AddonModelCart[]) => {
    let installmentCount: number | undefined = 0;
    let installmentItem: InstallmentsModelBV | undefined;
    if (paymentMode !== "cash") {
      installmentCount = Number(paymentMode);

      installmentItem = selectedOption?.Installments?.find(
        (item) => item.noOfInstallments === installmentCount
      );
    }

    const addonsFOC = selectedOption?.addons
      ?.filter((item) => item.FOC === "Yes")
      .map((item) => {
        return {
          addonID: item.addonID,
          price: 0,
          originalPrice: 0,
          productType: item.productType,
          packageID: item.packageID,
          packageOptionID: item.packageOptionID,
          FOC: item.FOC,
        };
      });
    const addons: AddonModelCart[] = addonsFOC
      ? [...addonCopy, ...addonsFOC]
      : addonCopy;

    const serviceCart: ExtendedWarrantyModelCart = {
      productID: props.warrenty.productID,
      productOptionID: selectedOption?.productOptionID || 0,
      productTitle: props.warrenty.productTitle,
      salesPrice: originalAmount,
      cartItemID: 0,
      menuCode: "",
      offerPrice: offerAmount,
      sortOrder: props.warrenty.sortOrder || 0,
      planDetails: {
        payType: paymentMode === "cash" ? "cash" : "installments",
        installments: paymentMode === "cash" ? 0 : parseInt(paymentMode, 10),
        addons,
        installmentRate:
          paymentMode !== "cash" && installmentItem
            ? installmentItem?.installmentRate
            : 0,
        productOptionID: selectedOption?.productOptionID || 0,
      },
    };
    props.onChoose(serviceCart, isChoosen);
  };

  const onChangeYear = (optionId: number) => {
    setSelectedAddons([]);
    const option: OptionsModelBV | undefined =
      props.warrenty?.optionsList?.find(
        (item) => item.productOptionID === optionId
      );
    if (option) {
      setSelectedOption(option);
      const installmentsData: PaymentModes[] = getPaymentModes(option);
      setInstallments(installmentsData);
    }
    handleImage();
  };

  const getPaymentModes = (option: OptionsModelBV) => {
    const paymentModes: PaymentModes[] = [{ label: "Cash", value: "cash" }];
    if (option) {
      option.Installments.forEach((item) => {
        paymentModes.push({
          value: item.noOfInstallments.toString(),
          label: `${item.noOfInstallments} Monthly installments`,
        });
      });
    }
    return paymentModes;
  };
  const renderAddOnPopup = () => {
    return (
      <ReactModal
        isOpen={addOnPopup}
        contentLabel="Extra AddOn"
        className=""
        style={customStyles}
        onRequestClose={() => openAddOnPopup(false)}
        shouldCloseOnOverlayClick={true}
      >
        <ExtraAddonPopup onPopupCancel={() => openAddOnPopup(false)} />
      </ReactModal>
    );
  };
  const renderTermsPopup = () => {
    return (
      <ReactModal
        isOpen={termsPopup}
        contentLabel="Terms Condition"
        className=""
        style={customStylesTerms}
        onRequestClose={() => openTermsPopup(false)}
        shouldCloseOnOverlayClick={true}
      >
        <TermsPopup onPopupCancel={() => openTermsPopup(false)} />
      </ReactModal>
    );
  };

  const originalAmount = getPrice();
  const offerAmount = getPrice() - getDiscountPrice();

  const originalTotalPrice = getTotalPrice(selectedAddons);
  const offerTotalPrice = getOfferPrice(selectedAddons);

  const isIncludedInCampaign = !!props.campaigns?.find((campaign) =>
    campaign?.appliedItems?.find(
      (ai) =>
        ai.productID === props.warrenty?.productID &&
        ai.productType === "extendedWarrenty"
    )
  );

  const focAddons = selectedOption?.addons?.filter(
    (ad) => ad.FOC === "Yes" && ad.productType === "insuranceAddons"
  );

  const extraAddOns = selectedOption?.addons?.filter(
    (item) =>
      (item.FOC === "No" || item.productType !== "insuranceAddons") &&
      !focAddons?.find((foad) => item.packageID === foad.packageID)
  );

  const isExcludedInCampaign = isProductExcludedFromCampaign(
    "extendedWarrenty" as EcomProductType,
    props.warrenty.productID,
    props.cartData!
  );

  return (
    <>
      <div className="col-12">
        <EqualHeightElement name="title">
          <div className="col p-0 insurance-feature-block title">
            <div className="position-relative">
              <Image
                src={props.warrenty.planImage}
                className="img-fluid w-100 img-clip img-cover"
                alt={props.warrenty.productTitle}
                width={327}
                height={190}
              />
              {/* <div className="d-flex flex-column flex-wrap align-items-center justify-content-center position-absolute top-0 left-0 w-100 text-center content p-2 pt-4 insurance-type-head">
                <h6 className="font-weight-bold text-uppercase insurance-title">
                  {props.warrenty.productTitle}
                </h6>
              </div> */}
            </div>
          </div>
        </EqualHeightElement>
        <div className="font-normal mb-5 d-block border">
          <EqualHeightElement name="package">
            <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
              <div className="col insurance-feature-block">
                {isIncludedInCampaign && !isExcludedInCampaign && (
                  <div className="d-inline-block px-1 bg-secondary text-white text-uppercase font-xxxs font-weight-bold mt-2 insurance-tag letter-spacing">
                    {t("build_vehicle.Included")}
                  </div>
                )}

                {isExcludedInCampaign && (
                  <div className="d-inline-block px-1 bg-secondary text-white text-uppercase font-xxxs font-weight-bold mt-2 insurance-tag letter-spacing">
                    {t("build_vehicle.Excluded In Campaign")}
                  </div>
                )}
                <h6 className="font-base font-weight-bold text-uppercase text-gray-900 mb-1 mt-1">
                  {props.warrenty.productTitle}
                </h6>
                {/* <span className="font-xs text-gray-800 font-weight-semibold text-uppercase">{`Minimum Premium KWD ${props.insurance.minimumPremium}`}</span> */}
              </div>
            </div>
          </EqualHeightElement>
          <EqualHeightElement name="payment">
            <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
              <div className="col insurance-feature-block">
                <div className="form-group mb-3 pb-1">
                  <label className="font-normal text-gray-800 font-weight-semibold">
                    {t("build_vehicle.Choose Option")}
                    <sup>*</sup>
                  </label>
                  <SelectInput
                    optionLabel="productOptionName"
                    optionValue="productOptionID"
                    disabled={props.isChoosen}
                    data={props.warrenty?.optionsList}
                    default={
                      selectedOption
                        ? selectedOption.productOptionID
                        : undefined
                    }
                    onChange={(val: number) => {
                      onChangeYear(val);
                      setPaymentMode("cash");
                    }}
                    isSearchable={false}
                  />
                </div>
                <div className="form-group mb-0">
                  <label className="font-normal text-gray-800 font-weight-semibold">
                    {t("build_vehicle.Payment Mode")}
                    <sup>*</sup>
                  </label>
                  <SelectInput
                    optionLabel="label"
                    optionValue="value"
                    disabled={props.isChoosen}
                    data={installments}
                    default={"cash"}
                    onChange={(val: string) => {
                      setPaymentMode(val);
                      setSelectedAddons([]);
                      handleImage();
                    }}
                    isSearchable={false}
                  />
                </div>
              </div>
            </div>
          </EqualHeightElement>
          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
            <div className="col insurance-feature-block">
              <p className="font-xs font-weight-semibold text-gray-800 mb-1 pt-4">
                {t("build_vehicle.Price")}
              </p>
              <h4 className="mb-0 text-primary text-secondary font-weight-light pb-2 insurance-price">
                {originalAmount !== offerAmount && (
                  <del className="text-gray-600 font-weight-light">
                    KWD {numberWithCommas(originalAmount)}
                  </del>
                )}{" "}
                {offerAmount === 0 ? (
                  <span className="text-primary">Free</span>
                ) : (
                  <>KWD {`${numberWithCommas(offerAmount)}`}</>
                )}
              </h4>
            </div>
          </div>

          {props.warrenty?.featuresList?.map((feat) => {
            return (
              <EqualHeightElement
                name={feat.featureName}
                key={feat.featureName}
              >
                <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                  <div className="col insurance-feature-block">
                    <p className="font-xs font-weight-semibold text-gray-800 mb-1">
                      {feat.featureName}
                    </p>
                    <div className="font-normal font-weight-semibold text-gray-900">
                      {ReactHtmlParser(
                        decode(convertToStringIfNumber(feat.featureValue)),
                        {
                          decodeEntities: true,
                        }
                      )}
                    </div>
                  </div>
                </div>
              </EqualHeightElement>
            );
          })}
          <EqualHeightElement name="addOn">
            <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100 addOn">
              {focAddons && focAddons.length > 0 && (
                <>
                  <div className="col insurance-feature-block">
                    <h6 className="font-weight-semibold text-gray-900 mb-3 pb-1">
                      {t("build_vehicle.AddOns")}
                    </h6>
                    {focAddons?.map((item) => {
                      return (
                        <div
                          className="mb-3 border-bottom d-flex pb-2 no-gutters flex-wrap"
                          key={item?.addonID}
                        >
                          <div className="col-auto pr-2">
                            <i className="icon-tick text-secondary"></i>
                          </div>
                          <div className="col font-normal">
                            <div className="font-weight-semibold mb-1">
                              {item.addonName}
                            </div>
                            {/* <div className="text-gray-700">{item.}</div> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </EqualHeightElement>
          <EqualHeightElement name="extraaddOn">
            <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100 addOn">
              {extraAddOns && extraAddOns.length > 0 && (
                <div className="col insurance-feature-block">
                  <h6 className="font-weight-semibold text-gray-900 mb-3 pb-1">
                    {t("build_vehicle.Extra Add-Ons")}
                  </h6>

                  {extraAddOns?.map((addon) => {
                    return (
                      <AddonCheckBox
                        key={`${props.warrenty.productID}-${addon.addonID}`}
                        addon={addon}
                        onChange={onChangeAddon}
                        isSelected={checkAddonChoosen(addon.addonID)}
                        insuranceId={props.warrenty.productID}
                        isChoosenInsurance={props.isChoosen}
                        combinationPrice={
                          props.cartData?.productInfo?.combinationInfo[0]
                            .combinationPrice
                        }
                        discount={getExtraAddonsDiscount(addon)}
                        campaigns={props.campaigns}
                        basePrice={props.totalPrice}
                        productData={props.productData}
                        selectedAddons={selectedAddons}
                        disabled={
                          !props.isChoosen &&
                          addon.productType !== "insuranceAddons"
                        }
                      />
                    );
                  })}

                  {/* <div className="mb-2">
                      <span
                        className="text-secondary cursor-pointer"
                        // onClick={() => openAddOnPopup(true)}
                      >
                        View Details
                      </span>
                    </div> */}
                </div>
              )}
            </div>
          </EqualHeightElement>
          <EqualHeightElement name="agree">
            <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
              <div className="col insurance-feature-block">
                <input
                  type="checkbox"
                  id={`terms-${props.warrenty.productID}`}
                  disabled={props.isChoosen}
                  checked={termsAccepted}
                  onChange={() => onTermsAcceptedClick()}
                />
                <label
                  htmlFor={`terms-${props.warrenty.productID}`}
                  className="font-normal pt-1 flex-wrap"
                >
                  {t("build_vehicle.I agree")}{" "}
                  <a
                    href="#"
                    target="blank"
                    className="text-primary text-decoration-underline ml-1"
                  >
                    {t("build_vehicle.Terms & Conditions")}
                  </a>
                </label>
              </div>
            </div>
          </EqualHeightElement>
          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
            <div className="col insurance-feature-block">
              <p className="font-xs font-weight-semibold text-gray-800 mb-1 pt-4">
                {t("dashboard.Total Price")}
              </p>
              <h4 className="mb-0 text-primary text-secondary font-weight-light pb-2 insurance-price">
                KWD{" "}
                {originalTotalPrice !== offerTotalPrice && (
                  <del className="text-gray-600 font-weight-light">
                    {numberWithCommas(originalTotalPrice)}
                  </del>
                )}{" "}
                {offerTotalPrice === 0 ? (
                  <span className="text-primary">
                    {t("build_vehicle.Free")}
                  </span>
                ) : (
                  <>{`${numberWithCommas(offerTotalPrice)}`}</>
                )}
              </h4>
            </div>
          </div>
          <EqualHeightElement name="btnBlock">
            <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
              <div className="col insurance-feature-block">
                {/* <button className="btn btn-primary btn-block font-normal text-uppercase d-flex align-items-center justify-content-center insurance-btn">
                  <i className="icon-tick-round mr-1"></i>Select This Package
                </button> */}
                <button
                  type="button"
                  disabled={!termsAccepted}
                  className={`${
                    props.isChoosen
                      ? " btn-primary-no-hover"
                      : " btn-outline-secondary-no-hover "
                  } btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold`}
                  onClick={() =>
                    onServiceChoose(!props.isChoosen, selectedAddons)
                  }
                >
                  <i
                    className={`icon-tick-round font-lg mr-2 ${
                      props.isChoosen ? "" : "text-gray-400"
                    }`}
                  ></i>
                  {props.isChoosen
                    ? t("build_vehicle.Remove")
                    : t("build_vehicle.Choose")}{" "}
                  {props.warrenty.productTitle}
                </button>
              </div>
            </div>
          </EqualHeightElement>
        </div>
      </div>
      {renderAddOnPopup()}
      {renderTermsPopup()}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    cartData: state.cartState,
  };
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(ExtendedWarrentyItem);
