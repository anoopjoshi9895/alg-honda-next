import React, { useContext } from "react";
import {
  api,
  CartActions,
  CartStateModel,
  ExtendedWarrentyModelBV,
  ExtendedWarrantyModelCart,
  ProductViewModelBV,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  addFOCExtraAddonsToConfiguration,
  setConfigurationPrices,
} from "../utils";

import cloneDeep from "lodash/cloneDeep";

import {
  EqualHeight,
  EqualHeightContext,
  EqualHeightElement,
} from "react-equal-height/clean";

import Slider from "react-slick";
import ExtendedWarrentyItem from "./ExtendedWarrentyItem";
import { RootState } from "../../../app/store";

interface CustomProps {
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
  warrentyDataData: ExtendedWarrentyModelBV[];
  getCartDetails: typeof CartActions.getCartDetails;
  productID: number;
  productDetails?: ProductViewModelBV;
  productData: ProductDetailsStateModel;
}
const ExtendedWarrentyTabPane: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const serviceSlider = {
    key: "service-slider",
    className: "service-slider",
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: false,
    // afterChange: (index: any) => setServiceSliderIndex(index + 1),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [isChanging, setIsChanging] = React.useState(false);
  const [serviceSliderIndex, setServiceSliderIndex] = React.useState(1);
  const [tabName, setTabName] = React.useState<string | undefined>(
    props.warrentyDataData && props.warrentyDataData.length > 0
      ? props.warrentyDataData[0].productTitle
      : undefined
  );
  const [disableArrows, setDisableArrows] = React.useState<boolean>(false);
  const [next, setNext] = React.useState<boolean>(false);
  const [prev, setPrev] = React.useState<boolean>(true);

  const { t } = useTranslation();
  const onTabChange = (tab: string) => {
    setTabName(tab);
  };

  const checkInsuranceChoosen = (id: number) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    const insuranceIndex = cart.insuranceDetails?.findIndex(
      (item) => item.productID === id
    );

    if (insuranceIndex !== undefined && insuranceIndex > -1) {
      return true;
    } else {
      return false;
    }
  };

  const { setForceUpdate } = useContext(EqualHeightContext);

  const handleImage = () => {
    setForceUpdate((value: boolean) => !value);
  };
  let serviceSliderRef: any = React.useRef<any>();

  const nextServiceSlide = () => {
    serviceSliderRef.slickNext();
  };
  const prevServiceSlider = () => {
    serviceSliderRef.slickPrev();
  };

  const onWarrentySelect = async (
    service: ExtendedWarrantyModelCart,
    isChoosen: boolean
  ) => {
    const cart: CartStateModel = cloneDeep(props.cartData);

    cart.extendedWarranty = !isChoosen ? [] : [service];
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
    //     const response = await api.build.createCart(props.productID, cart);
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // } else {
    //   try {
    //     const response = await api.build.updateCart(props.productID, cart);
    //     if (response.responsecode === 200) {
    //       props.getCartDetails(response.data?.cartID);
    //     }
    //   } catch (error) {
    //     // nothing
    //   }
    // }
  };
  const checkWarrentSelected = (id: number) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    const serviceIndex = cart.extendedWarranty?.findIndex(
      (item) => item.productID === id
    );

    if (serviceIndex !== undefined && serviceIndex > -1) {
      return true;
    } else {
      return false;
    }
  };
  const combinationData = props.cartData?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productDetails?.combinations?.find(
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

  const sliderInitialize = (count: any) => {
    if (window.innerWidth > 768) {
      if (count > 3) {
        setDisableArrows(true);
      }
    } else if (window.innerWidth > 576) {
      if (count > 2) {
        setDisableArrows(true);
      }
    } else {
      if (count > 1) {
        setDisableArrows(true);
      }
    }
  };

  const sliderCurrent = (current: any, length: any) => {
    if (window.innerWidth > 768) {
      if (current > 0) {
        setPrev(false);
      }
      if (current === 0) {
        setPrev(true);
      }
      if (current < length - 3) {
        setNext(false);
      }
      if (current >= length - 3) {
        setNext(true);
      }
    } else if (window.innerWidth > 576) {
      if (current > 0) {
        setPrev(false);
      }
      if (current === 0) {
        setPrev(true);
      }
      if (current < length - 2) {
        setNext(false);
      }
      if (current >= length - 2) {
        setNext(true);
      }
    } else {
      if (current > 0) {
        setPrev(false);
      }
      if (current === 0) {
        setPrev(true);
      }
      if (current < length - 1) {
        setNext(false);
      }
      if (current >= length - 1) {
        setNext(true);
      }
    }
  };

  return (
    <>
      <div className="row pb-md-4 pb-3 mb-md-2 mb-1 align-items-center">
        <div className="col">
          <h4 className="text-uppercase font-weight-normal h4-sm mb-0">
            {t("build_vehicle.extended_warranty")}
          </h4>
        </div>
        <div className="col d-flex align-items-start justify-content-end">
          {disableArrows && (
            <>
              <div
                className={`border service-arrows d-inline-flex justify-content-center align-items-center cursor-pointer mr-2 ${
                  prev ? "disabled" : ""
                }`}
                onClick={() => prevServiceSlider()}
              >
                <i className="icon-chevron-left icon-flip-rtl pointer-none"></i>
              </div>
              <div
                className={`border service-arrows d-inline-flex justify-content-center align-items-center cursor-pointer ${
                  next ? "disabled" : ""
                }`}
                onClick={() => nextServiceSlide()}
              >
                <i className="icon-chevron-right icon-flip-rtl pointer-none"></i>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="row service-contract">
        <div className="d-block w-100">
          <EqualHeight>
            <Slider
              ref={(slider) => (serviceSliderRef = slider)}
              {...serviceSlider}
              onInit={() => sliderInitialize(props.warrentyDataData?.length)}
              afterChange={(currentSlide) =>
                sliderCurrent(currentSlide, props.warrentyDataData?.length)
              }
            >
              {props.warrentyDataData?.map((item) => {
                return (
                  <ExtendedWarrentyItem
                    warrenty={item}
                    isChoosen={checkWarrentSelected(item.productID)}
                    onChoose={onWarrentySelect}
                    key={item.productID}
                    campaigns={campaign}
                    totalPrice={productCombinations?.combinationOfferPrice || 0}
                    productData={props.productData}
                  />
                );
              })}
            </Slider>
          </EqualHeight>
        </div>
      </div>
    </>
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ExtendedWarrentyTabPane);
