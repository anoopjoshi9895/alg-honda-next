import React, { useState } from "react";
import ProductItem from "./ProductItem";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  BuildPriceProductModel,
  BuildPriceActions,
  ProductListDataModel,
  api,
  BuildPriceBodyModelDataModel,
  BankListStateModel,
  bankListActions,
  ShowRoomListStateModel,
  showRoomListActions,
  BuildPriceModelsModel,
  BuildPriceBodyTypeModel,
  productModelsActions,
  ProductModelItemModel,
  TrimVarientProductModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import SubHeader from "./SubHeader";
import Slider from "react-slick";
import SliderBanners from "./SliderBanners";
import ContainerLoader from "../../components/loader/container-loader";
import ReactModal from "react-modal";
import TrimLevelSelectionOne from "./trim-level-selection-one";
import TrimLevelSelectionTwo from "./trim-level-selection-two";
import { Dictionary, groupBy } from "lodash";
import { loadAllVehicles } from "../../apiService/apiService";
import { useRouter } from "next/router";
import { IProductDetails, IVehicleData } from "../../models/models";
// import PaymentForm from 'containers/build-vehicle/finance/PaymentForm';
enum TabNames {
  All = "All",
  Cars = "Cars",
  Suv = "Suv",
  Trucks = "Trucks",
}

enum SelectionStages {
  Stage1 = "Stage1",
  Stage2 = "Stage2",
  Stage3 = "Stage3",
  Stage4 = "Stage4",
}

export const customQuickStyles: ReactModal.Styles = {
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
export const customStyles: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "540px",
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

const slickSettings = {
  breakpoint: 1119,
  settings: {
    slidesToShow: 2,
  },
};
const unslick = "unslick" as const;
const sliderSettings = {
  key: "product-slider",
  dots: false,
  draggable: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  // slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: false,
  autoplaySpeed: 2500,
  arrows: true,
  className: "product-slider trim-slider",
  responsive: [
    slickSettings,
    {
      breakpoint: 767,
      settings: unslick,
    },
  ],
};

interface CustomProps {
  getProductList: typeof BuildPriceActions.getProductList;
  banks: BankListStateModel;
  getBankList: typeof bankListActions.getBankList;
  showRooms: ShowRoomListStateModel;
  getShowRoomList: typeof showRoomListActions.getShowRoomList;
  updateFilter: typeof BuildPriceActions.updateFilter;
  onSelectComplete: any;
  onSelectTrim?: any;
  getProductModels: typeof productModelsActions.getProductModels;
}

const CarSelection: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();
  const language = router.locale || "en";
  const { t } = useTranslation();
  const [modelCode, setModelCode] = React.useState("");
  const [trimCode, settrimCode] = React.useState("");
  const [selectionStage, setSelectionStage] = React.useState<SelectionStages>(
    SelectionStages.Stage1
  );
  const [selectedProduct, setSelectedProduct] = React.useState<
    BuildPriceProductModel | undefined
  >(undefined);
  const [groupByData, setGroupByData] = React.useState<
    Dictionary<ProductModelItemModel[]> | undefined
  >(undefined);
  const [bodyTypes, setBodyTypes] = React.useState<string[]>([]);
  // const carsData = useSelector((state: RootState) => state.cmsState?.vehicleData);
  const [carsData, setCarsData] = useState<IProductDetails[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    props.getBankList();
    props.getShowRoomList();
    if (productModelsData?.length === 0) {
      props.getProductModels();
    }
    loadVehileFromCMS();
  }, []);

  const loadVehileFromCMS = async () => {
    if (!carsData) {
      const res = await loadAllVehicles(language);
      setCarsData(res);
    }
  };

  const [isFinancialCalcActive, setIsFinancialCalcActive] =
    React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const [modelYear, setModelYear] = React.useState<
    | {
        modelyear: number;
      }
    | undefined
  >(undefined);

  const onStage1Click = async (modelCodeA: string) => {
    // setSelectionStage(SelectionStages.Stage2);
    setModelCode(modelCodeA);
    const modelData = productModelsData.find(
      (item: any) => item.modelCode === modelCodeA
    );
    const yearsSelected = modelData?.productsby_modelyear?.map((item: any) => {
      return item.modelyear;
    });
    if (yearsSelected) {
      setModelYear({ modelyear: yearsSelected[yearsSelected?.length - 1] });
      // setYears(yearsSelected);
      const data = await api.build.trimList(
        yearsSelected[yearsSelected?.length - 1],
        modelCodeA
      );

      const selectedVarient: TrimVarientProductModel =
        data?.productsList?.length > 0 ? data?.productsList?.[0] : undefined;
      if (selectedVarient) {
        onStage2Click(
          modelCodeA,
          selectedVarient.trimCode,
          selectedVarient.productID,
          selectedVarient.productImage,
          selectedVarient.salesPrice,
          selectedVarient.productTitle,
          yearsSelected[yearsSelected?.length - 1]
        );
      }
    }

    // props.onSelectTrim(modelCodeA, modelYear?.modelyear);
  };

  const onBack = (stage: SelectionStages) => {
    setSelectionStage(stage);
  };

  const onStage2Click = (
    modelCodeA: string,
    trimCodeA: string,
    productID: number,
    image: string,
    price: number,
    productTitle: string,
    year: number
  ) => {
    if (trimCodeA !== undefined && trimCodeA !== "") {
      setSelectionStage(SelectionStages.Stage3);
    } else {
      props.onSelectComplete(productID, image, price, productTitle);
      setSelectionStage(SelectionStages.Stage4);
    }
    setModelYear({ modelyear: year });

    setModelCode(modelCodeA);
    settrimCode(trimCodeA);
    props.onSelectTrim(modelCodeA, modelYear?.modelyear, trimCodeA);
  };

  const onStage3Click = (
    productID: number,
    image: string,
    price: number,
    productTitle: string
  ) => {
    props.onSelectComplete(productID, image, price, productTitle);
  };
  const productModelsData = useSelector(
    (state: RootState) => state.productModelsState?.productModelsList
  );

  const getPrice = (product: ProductModelItemModel) => {
    const car = carsData?.find(
      (item: any) => item.ecomModelCode === product?.modelCode
    );
    if (car) {
      return car?.price;
    }
    return "0";
    // return product?.productPrice?.toString();
  };

  React.useEffect(() => {
    if (productModelsData.length > 0) {
      const gdata = groupBy(productModelsData, "bodyType");
      setGroupByData(gdata);
      setBodyTypes(Object.keys(gdata));
    }
  }, [productModelsData]);
  if (productModelsData.length === 0) {
    return <ContainerLoader />;
  }
  return (
    <>
      {selectionStage === SelectionStages.Stage1 && (
        <>
          <div className="text-center border-bottom">
            <h5 className="py-3 m-0">{t("build_price.tab_all")}</h5>
          </div>

          <div className="overflow-hidden">
            <div className="container vechile-tab-container">
              <div className="tab-content" id="vechile-tabContent">
                <div
                  className={classnames({
                    "tab-pane fade show": true,
                    "show active": true,
                  })}
                  id="all-vehicles"
                  role="tabpanel"
                  aria-labelledby="all-vehicles-tab"
                >
                  {productModelsData?.length <= 0 && (
                    <ContainerLoader height={20} />
                  )}
                  {!carsData && <ContainerLoader height={20} />}
                  {bodyTypes.length > 0 &&
                    carsData &&
                    bodyTypes.map((item: string, key) => {
                      return (
                        <div className="border-bottom" key={key}>
                          <div className="row align-items-center">
                            <div className="col-md-3 col-12 mb-0 py-md-0 py-3">
                              <h5 className="mb-0">{t(`header.${item}`)}</h5>
                            </div>
                            <div className="col-md-9 col-12">
                              {groupByData && carsData && (
                                <Slider {...sliderSettings}>
                                  {groupByData[item].map((product) => {
                                    return (
                                      <ProductItem
                                        product={product}
                                        key={product.modelID}
                                        onClick={onStage1Click}
                                        price={getPrice(product)}
                                      />
                                    );
                                  })}
                                </Slider>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {selectionStage === SelectionStages.Stage2 && modelCode !== "" && (
        <>
          <TrimLevelSelectionOne
            modelCode={modelCode}
            onItemClick={onStage2Click}
            onBack={() => onBack(SelectionStages.Stage1)}
          />
        </>
      )}
      {selectionStage === SelectionStages.Stage3 &&
        modelYear &&
        modelCode !== "" &&
        trimCode !== "" && (
          <>
            <div
              className="align-items-center border-bottom d-flex font-normal p-3"
              onClick={() => onBack(SelectionStages.Stage2)}
            >
              <i className="font-lg icon-arrow-left mr-2 text-muted"></i>{" "}
              {t("dashboard.Back")}
            </div>
            <TrimLevelSelectionTwo
              modelCode={modelCode}
              year={modelYear?.modelyear}
              trim={trimCode}
              onItemClick={onStage3Click}
            />
          </>
        )}
      {selectionStage === SelectionStages.Stage4 && "done"}
      {/* <TrimLevelSelectionTwo/> */}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      getProductList: BuildPriceActions.getProductList,
      getBankList: bankListActions.getBankList,
      getShowRoomList: showRoomListActions.getShowRoomList,
      updateFilter: BuildPriceActions.updateFilter,
      getProductModels: productModelsActions.getProductModels,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    banks: state.bankState,
    showRooms: state.showRoomState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CarSelection);
