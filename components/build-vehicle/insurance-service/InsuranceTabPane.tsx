import React, { useContext } from "react";
import {
  CartActions,
  CartStateModel,
  InsurancesModelBV,
  InsurancesModelCart,
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

import InsuranceItem from "./InsuranceItem";
import Slider from "react-slick";
import { RootState } from "../../../app/store";

interface CustomProps {
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
  insurancesData: InsurancesModelBV[];
  getCartDetails: typeof CartActions.getCartDetails;
  productID: number;
  productDetails?: ProductViewModelBV;
  productData: ProductDetailsStateModel;
}
const InsuranceTabPane: React.FunctionComponent<CustomProps> = (
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
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2.2,
        },
      },
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
  const [tabName, setTabName] = React.useState<string | undefined>(
    props.insurancesData && props.insurancesData.length > 0
      ? props.insurancesData[0].productTitle
      : undefined
  );
  const { t } = useTranslation();
  const onTabChange = (tab: string) => {
    setTabName(tab);
  };

  const [disableArrows, setDisableArrows] = React.useState<boolean>(false);
  const [next, setNext] = React.useState<boolean>(false);
  const [prev, setPrev] = React.useState<boolean>(true);

  let serviceSliderRef: any = React.useRef<any>();

  const nextServiceSlide = () => {
    serviceSliderRef.slickNext();
  };
  const prevServiceSlider = () => {
    serviceSliderRef.slickPrev();
  };

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

  const onInsuranceChoose = async (
    insuranceCart: InsurancesModelCart,
    isChoosen: boolean
  ) => {
    const cart: CartStateModel = cloneDeep(props.cartData);

    cart.insuranceDetails = !isChoosen ? [] : [insuranceCart];

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
    const config = setConfigurationPrices(props.productData, cart);

    if (config) {
      await props.addToCart(config);
    }

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

  const getPrice = (rate: number) => {
    const combinationPrice =
      props.cartData?.productInfo?.combinationInfo[0].combinationPrice;
    let insuranceValue = 0;
    if (combinationPrice) {
      insuranceValue = (combinationPrice * rate) / 100;
    }
    return Math.round(insuranceValue);
  };
  React.useEffect(() => {
    props.insurancesData?.forEach((element) => {
      if (checkInsuranceChoosen(element.productID)) {
        setTabName(element.productTitle);
      }
    });
  }, []);
  const { setForceUpdate } = useContext(EqualHeightContext);

  const handleImage = () => {
    setForceUpdate((value: boolean) => !value);
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

  return (
    <div className="overflow-sm-auto" onLoad={handleImage}>
      <div className="row">
        <div className="d-block w-100">
          <EqualHeight>
            <Slider
              ref={(slider) => (serviceSliderRef = slider)}
              {...serviceSlider}
              onInit={() => sliderInitialize(props.insurancesData?.length)}
              afterChange={(currentSlide) =>
                sliderCurrent(currentSlide, props.insurancesData?.length)
              }
            >
              {props.insurancesData?.map((ins) => {
                return (
                  <InsuranceItem
                    insurance={ins}
                    key={ins.productID}
                    isChoosen={checkInsuranceChoosen(ins.productID)}
                    onChoose={onInsuranceChoose}
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

export default connect(mapStateToProps, mapActionsToProps)(InsuranceTabPane);
