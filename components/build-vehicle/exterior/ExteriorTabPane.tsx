import React from "react";
import {
  CartActions,
  CartStateModel,
  CombinationDetailsActions,
  CombinationInfoModelCart,
  CombinationModel,
  CustomOptionsInfoModelCart,
  CustomOptionsModel,
  CustomOptionsVarientModel,
  ProductDetailsStateModel,
  CombinationDetailsStateModel,
  BuildPriceProductModel,
  commonActions,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { TabNames } from "../utils";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import classnames from "classnames";
import { RootState } from "../../../app/store";
import Image from "next/image";
interface CustomProps {
  onChangeColor: any;
  onRotationPopupOpen: any;
  exteriorData: CustomOptionsModel;
  cartData: CartStateModel;
  combinationData: CombinationModel;
  addToCart: typeof CartActions.addToCart;
  interiorData: CustomOptionsModel;
  basePrice: number;
  productData: ProductDetailsStateModel;
  getCombinationDetails: typeof CombinationDetailsActions.getCombinationDetails;
  isShowAllVarients: boolean;
  showAllVarientSelect: (isShow: boolean) => void;
  combinationStateData: CombinationDetailsStateModel;
  updateOuterClassName: typeof commonActions.updateOuterClassName;
  outerClassName: string;
  is360Available: boolean;
}
const ExteriorTabPane: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const onRotationPopupOpen = () => {
    const iFrameUrl = props.combinationData?.iFrameUrl;
    props.onRotationPopupOpen(iFrameUrl);
  };
  const [isShowAllVarients, setShowAllVarients] = React.useState(false);
  const [isDefaultCompleted, setDefaultsCompleted] = React.useState(false);
  const [selectedCustOptionId, setSelectedCustOptionId] = React.useState<
    number | undefined
  >(undefined);
  const [exteriorImage, setExteriorImage] = React.useState<string | undefined>(
    undefined
  );
  const [selectedVariant, setSelectedVariant] = React.useState("");

  React.useEffect(() => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    const custOptionIndex = cart.productInfo?.customOptionsInfo.findIndex(
      (item) => item.customOptionName.toUpperCase() === TabNames.EXTERIOR
    );
    const custOptionList: CustomOptionsVarientModel[] = [];
    const custCartList: CustomOptionsInfoModelCart[] = [];
    setSelectedCustOptionId(props.exteriorData.customOptionID);

    if (custOptionIndex !== undefined && custOptionIndex === -1) {
      const data = props.exteriorData.variants.find(
        (item) => item.isDefault === 1
      );
      if (data) {
        custCartList.push(
          getCartCustOption(
            data,
            props.exteriorData.customOptionID,
            props.exteriorData.customOptionName
          )
        );
      }
    }
    const interiorIndex = cart.productInfo?.customOptionsInfo.findIndex(
      (item) => item.customOptionName.toUpperCase() === TabNames.INTERIOR
    );
    if (interiorIndex !== undefined && interiorIndex === -1) {
      const interiorData = props.interiorData.variants.find(
        (item) => item.isDefault === 1
      );
      if (interiorData) {
        custCartList.push(
          getCartCustOption(
            interiorData,
            props.interiorData.customOptionID,
            props.interiorData.customOptionName
          )
        );
      }
    }
    if (custCartList.length > 0) {
      const cartCopy: CartStateModel = cloneDeep(props.cartData);
      custCartList.forEach((item) => {
        cartCopy.productInfo?.customOptionsInfo.push(item);
      });
      const combData = props.combinationData;
      const cartCombination: CombinationInfoModelCart = {
        combinationID: 0,
        combinationSKU: "",
        combinationPrice: 0,
        combinationMedia: [],
      };

      cartCombination.iFrameUrl = combData.iFrameUrl || "";
      cartCombination.combinationID = combData.combinationID;
      cartCombination.combinationSKU = combData.combinationSKU;
      cartCombination.combinationPrice = combData.combinationOfferPrice;
      cartCombination.combinationMedia = combData.combinationMedia;

      cartCopy.productInfo.combinationInfo = [cartCombination];
      cartCopy.productBasePrice = props.basePrice;
      // let showroomID = props.productData.showroomsList[0].showroomID;
      // cart.showroomID = showroomID;
      cartCopy.netPrice = combData.combinationOfferPrice;
      if (props.productData.productDetails) {
        cartCopy.tplPrice = props.productData.productDetails?.tplPrice;
        cartCopy.registrationPrice =
          props.productData.productDetails?.registrationPrice;
        cartCopy.productCurrency =
          props.productData.productDetails?.productCurrency;
        cartCopy.netPrice += cartCopy.tplPrice;
        cartCopy.netPrice += props.productData.productDetails.registrationPrice;
      }
      props.addToCart(cartCopy);
    }
    setDefaultsCompleted(true);
  }, []);

  const getCartCustOption = (
    item: CustomOptionsVarientModel,
    customOptionId: any,
    customOptionName: string
  ) => {
    const custOption: CustomOptionsInfoModelCart = {
      customOptionID: 0,
      customOptionName: "",
      variantID: 0,
      variantName: "",
      variantThumbImage: "",
      priceDiff: 0,
    };
    custOption.variantID = item.cutomOptionVariantID;
    custOption.variantName = item.value;
    custOption.customOptionID = customOptionId;
    custOption.customOptionName = customOptionName;
    custOption.variantThumbImage = item.variantThumbImage;

    custOption.priceDiff = item.priceDiff;

    return custOption;
  };

  const onChangeColor = async (
    customOptionID: number,
    variant: CustomOptionsVarientModel
  ) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    let custOption: CustomOptionsInfoModelCart = {
      customOptionID: 0,
      customOptionName: "",
      variantID: 0,
      variantName: "",
      variantThumbImage: "",
      priceDiff: 0,
    };

    const custOptionIndex = cart.productInfo?.customOptionsInfo.findIndex(
      (item) => item.customOptionName.toUpperCase() === TabNames.EXTERIOR
    );

    if (custOptionIndex !== undefined && custOptionIndex > -1) {
      custOption.variantID = variant.cutomOptionVariantID;
      custOption.variantName = variant.value;
      custOption.customOptionID = props.exteriorData.customOptionID;
      custOption.customOptionName = props.exteriorData.customOptionName;
      custOption.variantThumbImage = variant.variantThumbImage;
      custOption.priceDiff = variant.priceDiff;
      cart.productInfo?.customOptionsInfo.splice(
        custOptionIndex,
        1,
        custOption
      );
    } else {
      custOption = {
        customOptionID: 0,
        customOptionName: "",
        variantID: 0,
        variantName: "",
        variantThumbImage: "",
        priceDiff: 0,
      };
      custOption.variantID = variant.cutomOptionVariantID;
      custOption.variantName = variant.value;
      custOption.customOptionID = props.exteriorData.customOptionID;
      custOption.customOptionName = props.exteriorData.customOptionName;
      custOption.variantThumbImage = variant.variantThumbImage;
      cart.productInfo?.customOptionsInfo.push(custOption);
      custOption.priceDiff = variant.priceDiff;
    }
    await props.addToCart(cart);
    // props.onChangeColor(customOptionID, variant.cutomOptionVariantID);
    if (props.productData.productDetails?.productID) {
      await props.getCombinationDetails(
        props.productData.productDetails?.productID,
        customOptionID,
        variant.cutomOptionVariantID
      );
      setSelectedCustOptionId(customOptionID);
    }
  };
  const checkColorSelected = (id: number) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    const custOption = cart.productInfo?.customOptionsInfo.find(
      (item) => item.customOptionName.toUpperCase() === TabNames.EXTERIOR
    );
    if (custOption !== undefined) {
      return custOption.variantID === id;
    } else {
      return false;
    }
  };
  const getImageUrl = (customOptionID: number | undefined) => {
    // const exterior = props.cartData.productInfo.customOptionsInfo.find(
    //   (item) => item.customOptionName.toUpperCase() === TabNames.EXTERIOR
    // );
    if (
      customOptionID &&
      props.cartData.productInfo?.combinationInfo &&
      props.cartData.productInfo?.combinationInfo.length > 0
    ) {
      const exteriorCombinationInfo =
        props.cartData.productInfo?.combinationInfo[0].combinationMedia.find(
          (item) => item.customOptionID === customOptionID
        );
      if (exteriorCombinationInfo) {
        // setExteriorImage(exteriorCombinationInfo.image);
        return exteriorCombinationInfo.image;
      } else {
        // setExteriorImage('');
      }
    } else {
      // setExteriorImage('');
    }
    return "";
  };

  const onImageClick = () => {
    if (props.outerClassName === "" || props.outerClassName === undefined) {
      props.updateOuterClassName("popup-active");
    }
  };
  const onCloseClick = () => {
    props.updateOuterClassName("");
  };
  return (
    <div
      className="tab-pane sticky-tab exterior fade show active build-detail-page"
      id="all-vehicles"
      role="tabpanel"
      aria-labelledby="all-vehicles-tab"
    >
      <div className="row no-gutters view-section-top w-100 align-content-start flex-lg-row flex-column">
        <div className="col-12 pb-lg-0 pb-5 text-center h-auto">
          <div className="text-center py-3 img-container position-relative d-inline-flex h-auto w-100">
            <i
              className="icon-close position-absolute bg-white border close-popup"
              onClick={() => onCloseClick()}
            ></i>

            {props.combinationStateData?.isFound ? (
              getImageUrl(selectedCustOptionId) && (
                <div className="position-relative d-block" style={{width: '100%', paddingTop: '36.25%'}}>
                  <Image
                    src={getImageUrl(selectedCustOptionId)}
                    className="img-fluid view-area-height"
                    alt="product name"
                    onClick={() => onImageClick()}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )
            ) : (
              <div className="pt-5 mt-5">
                {t("build_vehicle.This option not available now")}
              </div>
            )}
            <i
              className="icon-expand expand-view d-lg-none d-block position-absolute bg-white border bottom-0"
              onClick={() => onImageClick()}
            ></i>
          </div>
          {/* {props.combinationData?.iFrameUrl &&
            props.combinationStateData?.isFound && ( */}
          {props.combinationData?.iFrameUrl === "" && props.is360Available ? (
            <div
              className="bg-gray-100 text-muted rounded-circle btn-360 h2 mb-0 d-lg-inline-flex d-none justify-content-center align-items-center position-absolute mb-5 bottom-0 align-x-center cursor-pointer"
              onClick={() => onRotationPopupOpen()}
            >
              <i className="icon-360"></i>
            </div>
          ) : (
            ""
          )}
          {props.combinationData?.iFrameUrl !== "" &&
            props.combinationStateData?.isFound && (
              <div
                className="bg-gray-100 text-muted rounded-circle btn-360 h2 mb-0 d-lg-inline-flex d-none justify-content-center align-items-center position-absolute mb-5 bottom-0 align-x-center cursor-pointer"
                onClick={() => onRotationPopupOpen()}
              >
                <i className="icon-360"></i>
              </div>
            )}

          {/* )} */}
        </div>
        <div className="col-12 variant-selection pb-5 mb-4 pb-lg-3 mb-lg-0 px-0">
          <div className="px-4 pt-3 pb-2 choose-type-head d-lg-none text-left">
            <h6 className=" mb-2">{t("build_vehicle.choose_exterior")}</h6>
            <p className="text-primary font-normal font-weight-bold mb-0">
              {t("build_vehicle.color")}
            </p>
          </div>
          <div className="px-4 pt-3 choose-type-head justify-content-center d-lg-flex d-none mb-3 ">
            <h6 className="text-capitalize  font-lg font-weight-normal m-0">
              {t("build_vehicle.choose_exterior")} :
            </h6>
            <p className="text-gray-800 font-md m-0 text-capitalize pl-3">
              {selectedVariant === ""
                ? t("build_vehicle.color")
                : selectedVariant}
            </p>
          </div>
          <div className="">
            <ul className="option-check-list list-unstyled mb-0 d-lg-flex flex-lg-wrap justify-content-lg-center">
              <>
                {props.exteriorData?.variants?.map((item, index) => {
                  return (
                    <li key={item.cutomOptionVariantID}>
                      <input
                        type="checkbox"
                        id={`${item.cutomOptionVariantID}`}
                        checked={checkColorSelected(item.cutomOptionVariantID)}
                        onChange={() => {
                          onChangeColor(
                            props.exteriorData.customOptionID,
                            item
                          );
                          setSelectedVariant(item.value);
                        }}
                      />
                      <label
                        className="w-100 mb-0 cursor-pointer font-normal d-flex align-items-center"
                        htmlFor={`${item.cutomOptionVariantID}`}
                      >
                        <span className="position-relative mr-lg-0 mr-3" style={{width:'48px', height: '48px'}}>
                          <Image
                            src={item.variantThumbImage}
                            className="rounded-circle position-relative"
                            alt={`${item.cutomOptionVariantID}`}
                            layout="fill"
                          />
                        </span>
                        {item.value}
                      </label>
                    </li>
                  );
                })}
              </>
            </ul>
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
      updateOuterClassName: commonActions.updateOuterClassName,
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
    outerClassName: state.commonState.outerClassName,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ExteriorTabPane);
