// import { InsurancesAddonModel } from 'alg-ecom-frontend-core';
import {
  AddonModelBV,
  numberWithCommas,
  CampaignModel,
  ProductViewModelBV,
  CartStateModel,
  ProductDetailsStateModel,
  AddonModelCart,
  InsurancesModelCart,
  CartActions,
  api,
  ServicesModelCart,
  ExtendedWarrantyModelCart,
  CustomerCareModelCart,
} from "alg-ecom-frontend-core";
import * as React from "react";
import classnames from "classnames";
import cloneDeep from "lodash/cloneDeep";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  getAppliedDiscountForPlanAddons,
  getAppliedDiscount,
  isCustomAddOnSelected,
  getSelectedPlanByProductAndOptionID,
  checkIsValidPackage,
  addFOCExtraAddonsToConfiguration,
  setConfigurationPrices,
} from "../../../../components/build-vehicle/utils";
import { RootState } from "../../../../app/store";
// import { TintType } from '../AccessoryPopUp';
interface CustomProps {
  // accessory: AccessoriesModelBV;
  insuranceId: number;
  onChange: any;
  isSelected: boolean;
  addon: AddonModelBV;
  isChoosenInsurance: boolean;
  combinationPrice: number;
  // selectedId: number;
  discount?: number;
  campaigns?: CampaignModel[];
  basePrice?: number;
  productData?: ProductDetailsStateModel;
  cartData: CartStateModel;
  selectedAddons: AddonModelCart[];
  addToCart: typeof CartActions.addToCart;
  getCartDetails: typeof CartActions.getCartDetails;
  disabled?: boolean;
}
const AddonCheckBox: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [selected, setSelected] = React.useState(false);
  React.useEffect(() => {
    if (props.isSelected) {
      setSelected(true);
    }
  }, []);
  const isValidPackage = checkIsValidPackage(
    props.addon.productType,
    props.addon.packageID,
    props.addon.packageOptionID,
    props.productData
  );
  if (!isValidPackage) {
    return <></>;
  }

  const combinationData = props.cartData?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productData?.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const campaign = !!props.cartData?.selCampaignDetails?.length
    ? productCombinations?.campaign?.filter(
        (c) =>
          !!props.cartData?.selCampaignDetails?.find(
            (x) => x.campaignID === c.campaignID
          )
      )
    : [];

  const addOnDiscountData =
    props.addon.productType === "insuranceAddons"
      ? getAppliedDiscountForPlanAddons(
          props.addon,
          props.basePrice || 0,
          campaign
        )
      : getAppliedDiscount(
          props.productData,
          props.basePrice || 0,
          props.addon.productType,
          {
            productID: props.addon.packageID,
            productOptionID: props.addon.packageOptionID,
          },
          campaign,
          props.cartData,
          { expectedAddOn: props.addon }
        );

  const onChange = async (value: boolean) => {
    // if (!props.isChoosenInsurance) {
    //   return;
    // }
    if (props.addon.productType === "insuranceAddons") {
      await props.onChange(
        value,
        props.addon.addonID,
        addOnDiscountData?.originalPrice - addOnDiscountData?.discount,
        addOnDiscountData?.originalPrice,
        props.addon.productType,
        props.addon.packageID,
        props.addon.packageOptionID,
        props.addon.FOC
      );
    } else {
      onCustomAddOnSelection(props.addon, value);
    }
    setSelected(value);
  };

  const onCustomAddOnSelection = (addOn: AddonModelBV, isSelected: boolean) => {
    switch (addOn.productType) {
      case "customerCarePackages": {
        onCustomerCareSelect(
          isSelected
            ? getSelectedPlanByProductAndOptionID(
                props.productData?.customerCarePackages,
                addOn.packageID,
                addOn.packageOptionID
              )
            : undefined
        );
        break;
      }

      case "extendedWarrenty": {
        onWarrentySelect(
          isSelected
            ? getSelectedPlanByProductAndOptionID(
                props.productData?.extendedWarrenty,
                addOn.packageID,
                addOn.packageOptionID
              )
            : undefined
        );
        break;
      }
      case "insurancesList": {
        onInsuranceChoose(
          isSelected
            ? getSelectedPlanByProductAndOptionID(
                props.productData?.insurancesList,
                addOn.packageID,
                addOn.packageOptionID
              )
            : undefined
        );
        break;
      }

      case "servicesList": {
        onServiceSelect(
          isSelected
            ? getSelectedPlanByProductAndOptionID(
                props.productData?.servicesList,
                addOn.packageID,
                addOn.packageOptionID
              )
            : undefined
        );
        break;
      }

      default: {
        return false;
      }
    }
  };

  const onInsuranceChoose = async (insuranceCart?: InsurancesModelCart) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    cart.insuranceDetails = insuranceCart ? [insuranceCart] : [];
    addFOCExtraAddonsToConfiguration(
      props.productData,
      props.productData?.insurancesList || [],
      cart,
      {
        productID: cart.insuranceDetails?.[0]?.productID,
        productOptionID:
          cart.insuranceDetails?.[0]?.planDetails?.productOptionID,
      }
    );
    setConfigurationPrices(props.productData, cart);
    await props.addToCart(cart);
    // if (!cart.cartID) {
    //   try {
    //     const response = await api.build.createCart(
    //       props.productData?.productDetails?.productID || 0,
    //       cart
    //     );
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // } else {
    //   try {
    //     const response = await api.build.updateCart(
    //       props.productData?.productDetails?.productID || 0,
    //       cart
    //     );
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // }
  };

  const onServiceSelect = async (service?: ServicesModelCart) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    cart.serviceDetails = service ? [service] : [];

    addFOCExtraAddonsToConfiguration(
      props.productData,
      props.productData?.servicesList || [],
      cart,
      {
        productID: cart.serviceDetails?.[0]?.productID,
        productOptionID: cart.serviceDetails?.[0]?.planDetails?.productOptionID,
      }
    );
    setConfigurationPrices(props.productData, cart);
    await props.addToCart(cart);
    // if (!cart.cartID) {
    //   try {
    //     const response = await api.build.createCart(
    //       props.productData?.productDetails?.productID || 0,
    //       cart
    //     );
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // } else {
    //   try {
    //     const response = await api.build.updateCart(
    //       props.productData?.productDetails?.productID || 0,
    //       cart
    //     );
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // }
  };

  const onWarrentySelect = async (service?: ExtendedWarrantyModelCart) => {
    const cart: CartStateModel = cloneDeep(props.cartData);

    cart.extendedWarranty = service ? [service] : [];
    addFOCExtraAddonsToConfiguration(
      props.productData,
      props.productData?.extendedWarrenty || [],
      cart,
      {
        productID: cart.extendedWarranty?.[0]?.productID,
        productOptionID:
          cart.extendedWarranty?.[0]?.planDetails?.productOptionID,
      }
    );
    setConfigurationPrices(props.productData, cart);
    await props.addToCart(cart);
    // if (!cart.cartID) {
    //   try {
    //     const response = await api.build.createCart(
    //       props.productData?.productDetails?.productID || 0,
    //       cart
    //     );
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // } else {
    //   try {
    //     const response = await api.build.updateCart(
    //       props.productData?.productDetails?.productID || 0,
    //       cart
    //     );
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // }
  };

  const onCustomerCareSelect = async (service?: CustomerCareModelCart) => {
    const cart: CartStateModel = cloneDeep(props.cartData);

    cart.customerCare = service ? [service] : [];

    addFOCExtraAddonsToConfiguration(
      props.productData,
      props.productData?.customerCarePackages || [],
      cart,
      {
        productID: cart.customerCare?.[0]?.productID,
        productOptionID: cart.customerCare?.[0]?.planDetails?.productOptionID,
      }
    );
    setConfigurationPrices(props.productData, cart);
    await props.addToCart(cart);
    // if (!cart.cartID) {
    //   try {
    //     const response = await api.build.createCart(
    //       props.productData?.productDetails?.productID || 0,
    //       cart
    //     );
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // } else {
    //   try {
    //     const response = await api.build.updateCart(
    //       props.productData?.productDetails?.productID || 0,
    //       cart
    //     );
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // }
  };

  const isAddOnnIcludedInCampaign = !!addOnDiscountData.campaignID;

  const checked =
    props.addon.productType === "insuranceAddons"
      ? props.selectedAddons?.some((add) => add.addonID === props.addon.addonID)
      : isCustomAddOnSelected(props.addon, props.cartData);

  return (
    <div
      className={classnames({
        "mb-3 border-bottom d-flex pb-2 no-gutters flex-wrap": true,
        "text-black-50": props.disabled,
      })}
    >
      <div className="col-auto pr-2">
        <i className="icon-tick text-secondary"></i>
      </div>
      <div className="col font-normal cursor-pointer">
        <div className="font-weight-semibold mb-1">
          {props.addon?.addonName}
          {isAddOnnIcludedInCampaign && (
            <span className="ml-2 d-inline-block px-1 bg-secondary text-white text-uppercase font-xxxs font-weight-bold mt-2 insurance-tag letter-spacing">
              Included
            </span>
          )}
        </div>
        {/* <div className="text-gray-700">Get 4 years assistance</div> */}
      </div>
      <div className="col-md-auto col-12 align-content-center d-flex align-items-center justify-content-end">
        <label className="pr-3 mb-0 cursor-pointer">
          {addOnDiscountData.originalPrice !==
            addOnDiscountData.originalPrice - addOnDiscountData.discount && (
            <>
              <del>KWD {numberWithCommas(addOnDiscountData.originalPrice)}</del>{" "}
            </>
          )}
          {!(addOnDiscountData.originalPrice - addOnDiscountData.discount) && (
            <span
              className={classnames({
                "d-inline-block": true,
                "ml-1":
                  addOnDiscountData.originalPrice !==
                  addOnDiscountData.originalPrice - addOnDiscountData.discount,
              })}
            >
              FREE
            </span>
          )}
          {!!(addOnDiscountData.originalPrice - addOnDiscountData.discount) && (
            <span
              className={classnames({
                "d-inline-block": true,
                "ml-1":
                  addOnDiscountData.originalPrice !==
                  addOnDiscountData.originalPrice - addOnDiscountData.discount,
              })}
            >
              KWD{" "}
              {numberWithCommas(
                addOnDiscountData.originalPrice - addOnDiscountData.discount
              )}
            </span>
          )}
        </label>
        <input
          type="checkbox"
          name={`${props.insuranceId}-${props.addon?.addonID}`}
          id={`${props.insuranceId}-${props.addon?.addonID}`}
          // checked={selected}
          checked={checked}
          disabled={props.disabled}
          onChange={() => onChange(!checked)}
        />
        <label
          htmlFor={`${props.insuranceId}-${props.addon?.addonID}`}
          className="p-0"
          style={{ height: "16px", width: "16px" }}
        ></label>
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
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    cartData: state.cartState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AddonCheckBox);
