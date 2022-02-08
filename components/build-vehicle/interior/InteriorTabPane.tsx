import React from "react";
import {
  CartActions,
  CartStateModel,
  CombinationDetailsActions,
  CombinationDetailsStateModel,
  CombinationInfoModelCart,
  CustomOptionsInfoModelCart,
  CustomOptionsVarientModelComb,
  numberWithCommas,
  BuildPriceProductModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { myImage, TabNames } from "../utils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cloneDeep from "lodash/cloneDeep";
import ShowImage from "./ShowImage";
import { RootState } from "../../../app/store";
import Image from "next/image";

interface CustomProps {
  getCombinationPrice: typeof CombinationDetailsActions.getCombinationPrice;
  combinationData: CombinationDetailsStateModel;
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
  productId: number;
  onRotationPopupOpen: any;
}
const InteriorTabPane: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [iFrameUrl, setIFrameUrl] = React.useState("");
  const { t } = useTranslation();
  const [selectedVariant, setSelectedVariant] = React.useState("");
  const [interiorImages, setInteriorImages] = React.useState<string[]>([]);
  const [imageType, setImageType] = React.useState<string | undefined>(
    undefined
  );
  React.useEffect(() => {
    const combData =
      props.cartData.productInfo?.combinationInfo?.length > 0
        ? props.cartData.productInfo?.combinationInfo[0]
        : undefined;
    setIFrameUrl(combData?.iFrameUrl || "");
  }, []);

  const onRotationPopupOpen = () => {
    props.onRotationPopupOpen(iFrameUrl);
  };

  const onChangeColor = (variant: CustomOptionsVarientModelComb) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    let custOption: CustomOptionsInfoModelCart = {
      customOptionID: 0,
      customOptionName: "",
      variantID: 0,
      variantName: "",
      variantThumbImage: "",
      priceDiff: 0,
    };
    const combData =
      props.combinationData.combinationInfo.length > 0
        ? props.combinationData.combinationInfo[0]
        : undefined;

    const combination = props.combinationData.customoptionsList.find(
      (item) => item.customOptionName.toUpperCase() === TabNames.INTERIOR
    );

    const custOptionIndex = cart.productInfo?.customOptionsInfo.findIndex(
      (item) => item.customOptionName.toUpperCase() === TabNames.INTERIOR
    );

    if (combination) {
      if (custOptionIndex !== undefined && custOptionIndex > -1) {
        custOption.variantID = variant.cutomOptionVariantID;
        custOption.variantName = variant.value;
        custOption.variantThumbImage = variant.variantThumbImage;
        custOption.customOptionID = combination.customOptionID;
        custOption.customOptionName = combination.customOptionName;
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
        custOption.customOptionID = combination.customOptionID;
        custOption.customOptionName = combination.customOptionName;
        cart.productInfo?.customOptionsInfo.push(custOption);
      }
      const cartCombination: CombinationInfoModelCart = {
        combinationID: 0,
        combinationSKU: "",
        combinationPrice: 0,
        combinationMedia: [],
      };
      if (combData) {
        cartCombination.combinationID = combData.combinationID;
        cartCombination.combinationSKU = combData.combinationSKU;
        cartCombination.combinationPrice = combData.combinationSalesPrice;
        cartCombination.combinationMedia = combData.combinationMedia;
      }

      cart.productInfo.combinationInfo = [cartCombination];
      props.addToCart(cart);

      const cartExterionCombination = cart.productInfo?.customOptionsInfo.find(
        (item) => item.customOptionName.toUpperCase() === TabNames.EXTERIOR
      );
      if (cartExterionCombination) {
        props.getCombinationPrice(
          props.productId,
          cartExterionCombination.customOptionID,
          cartExterionCombination.variantID,
          combination.customOptionID,
          variant.cutomOptionVariantID
        );
      }

      // props.onChangeColor(variantId);
    }
  };
  const checkColorSelected = (id: number) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    const custOption = cart.productInfo?.customOptionsInfo.find(
      (item) => item.customOptionName.toUpperCase() === TabNames.INTERIOR
    );

    if (custOption !== undefined) {
      return custOption.variantID === id;
    } else {
      return false;
    }
  };
  const getInteriorImages = () => {
    if (
      props.cartData.productInfo?.combinationInfo &&
      props.cartData.productInfo?.combinationInfo.length > 0
    ) {
      const interiorCombinationInfo =
        props.cartData.productInfo?.combinationInfo[0].combinationMedia.filter(
          (item) => item.customOptionName.toUpperCase() === TabNames.INTERIOR
        );
      const images: any = [];
      if (interiorCombinationInfo) {
        interiorCombinationInfo.forEach((item) => {
          images.push(item.image);
        });
        if (interiorCombinationInfo?.length > 0) {
          setImageType(interiorCombinationInfo[0].imageType);
        }
      }
      if (images.length > 0) {
        setInteriorImages(images);
      }
    }
  };
  React.useEffect(() => {
    getInteriorImages();
  }, [props.cartData]);

  return (
    <div
      className="tab-pane sticky-tab interior fade show active build-detail-page"
      id="cars"
      role="tabpanel"
      aria-labelledby="cars-tab"
    >
      <div className="row no-gutters position-sticky view-section-top w-100">
        <div className="col-12 position-relative">
          <div className="img-container position-relative text-center pnlm-container-outer w-100">
            {interiorImages && (
              <ShowImage images={interiorImages} imageType={imageType} />
            )}
            {!interiorImages && (
              <div className="pt-5 mt-5">
                {t("build_vehicle.This option not available now")}
              </div>
            )}
          </div>
          {iFrameUrl && (
            <div
              onClick={() => onRotationPopupOpen()}
              className="bg-gray-100 text-muted rounded-circle btn-360 h2 mb-0 d-lg-inline-flex d-none justify-content-center align-items-center position-absolute mb-5 bottom-0 align-x-center cursor-pointer"
            >
              <i className="icon-360"></i>
            </div>
          )}
        </div>
        <div className="col-12 variant-selection pb-5 mb-4 pb-lg-0 mb-lg-0">
          <div className="border-bottom px-4 pt-3 pb-2 choose-type-head d-lg-none text-left">
            <h6 className="text-uppercase mb-2">
              {t("build_vehicle.choose_interior")}
            </h6>
            <p className="text-primary font-normal font-weight-bold mb-0">
              {t("build_vehicle.upholstery")}
            </p>
          </div>
          <div className="px-4 pt-3 choose-type-head justify-content-center d-lg-flex d-none mb-3 ">
            <h6 className="text-capitalize  font-lg font-weight-normal m-0">
              {t("build_vehicle.choose_interior")} :
            </h6>
            <p className="text-gray-800 font-md m-0 text-capitalize pl-3">
              {selectedVariant === ""
                ? t("build_vehicle.color")
                : selectedVariant}
            </p>
          </div>

          <div className="">
            <ul className="option-check-list list-unstyled mb-0 d-lg-flex flex-lg-wrap justify-content-lg-center">
              {props.combinationData?.customoptionsList &&
                props.combinationData?.customoptionsList
                  .filter(
                    (item) =>
                      item.customOptionName.toUpperCase() === TabNames.INTERIOR
                  )[0]
                  ?.variants.map((option) => {
                    return (
                      <li key={option.cutomOptionVariantID}>
                        <input
                          type="checkbox"
                          id={`${option.cutomOptionVariantID}`}
                          checked={checkColorSelected(
                            option.cutomOptionVariantID
                          )}
                          onChange={() => {
                            onChangeColor(option);
                            setSelectedVariant(option.value);
                          }}
                        />
                        <label
                          className="w-100 mb-0 cursor-pointer font-normal d-flex align-items-center"
                          htmlFor={`${option.cutomOptionVariantID}`}
                        >
                          <span className="position-relative mr-lg-0 mr-3" style={{width:'48px', height: '48px'}}>
                            <Image
                              src={option.variantThumbImage}
                              className="rounded-circle position-relative"
                              alt={`${option.cutomOptionVariantID}`}
                              layout="fill"
                            />
                          </span>
                          {option.value}
                        </label>
                      </li>
                    );
                  })}
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
      getCombinationPrice: CombinationDetailsActions.getCombinationPrice,
      addToCart: CartActions.addToCart,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    combinationData: state.combinationState,
    cartData: state.cartState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(InteriorTabPane);
