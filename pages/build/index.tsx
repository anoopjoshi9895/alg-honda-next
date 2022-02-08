import React from "react";
// import "../../styles/common.scss";
// import "../../styles/index.scss";
import ProductItem from "../../components/build/ProductItem";
import classnames from "classnames";
// import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  BuildPriceProductModel,
  bankListActions,
  showRoomListActions,
  productModelsActions,
  ProductModelItemModel,
  productModelsResetSettingsAction,
  api,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import SubHeader from "../../components/build/SubHeader";
import Slider from "react-slick";
// import ContainerLoader from "components/loader/container-loader";
import { Dictionary, groupBy } from "lodash";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { RootState, store } from "../../app/store";
import { getFooterAsync } from "../../feature/footerSlice";
import Footer from "../../components/footer";
import { getSlideAsync } from "../../feature/slideSlice";
import Header from "../../components/header";
import Layout from "../../components/Layout";

// import PaymentForm from 'containers/build-vehicle/finance/PaymentForm';
enum TabNames {
  All = "All",
  Cars = "Cars",
  Suv = "Suv",
  Trucks = "Trucks",
}

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
  className: "product-slider",
  responsive: [
    slickSettings,
    {
      breakpoint: 767,
      settings: unslick,
    },
  ],
};

const Build: NextPage = ({ footerData }: any) => {
  const router = useRouter();
  const { defaultLocale, isFallback, query } = router;
  const { t, i18n } = useTranslation("common");

  const dispatch = useDispatch();
  const [tabName, setTabName] = React.useState("All");
  const [selectedProduct, setSelectedProduct] = React.useState<
    BuildPriceProductModel | undefined
  >(undefined);

  React.useEffect(() => {
    dispatch(bankListActions.getBankList);
    dispatch(showRoomListActions.getShowRoomList);
  }, []);

  const [isFinancialCalcActive, setIsFinancialCalcActive] =
    React.useState<boolean>(false);
  const [isTestDriveActive, setIsTestDriveActive] =
    React.useState<boolean>(false);

  const [groupByData, setGroupByData] = React.useState<
    Dictionary<ProductModelItemModel[]> | undefined
  >(undefined);

  const [bodyTypes, setBodyTypes] = React.useState<string[]>([]);
  const scrollSmoothTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    setTabName(elementId);
  };

  const productModelsData: ProductModelItemModel[] = useSelector(
    (state: any) => state.productModelsState?.productModelsList
  );
  const token = useSelector((state: RootState) => state.authState.token);
  React.useEffect(() => {
    if (productModelsData?.length === 0) {
      dispatch(productModelsActions.getProductModels());
    }
    return () => {
      dispatch(productModelsResetSettingsAction());
    };
  }, []);

  React.useEffect(() => {
    if (productModelsData.length > 0) {
      const gdata = groupBy(productModelsData, "bodyType");
      setGroupByData(gdata);
      setBodyTypes(Object.keys(gdata));
    }
  }, [productModelsData]);

  if (isFallback) {
    return <>Loading...</>;
  }

  return (
    <Layout footerData={footerData}>
      <SubHeader />

      <div className="text-center position-sticky top-0 zIndex-9 bg-primary">
        <div className="container">
          <div className="row align-items-center">
            <div className="font-normal text-uppercase font-weight-semibold text-center text-white d-lg-inline-block d-none px-3">
              {t("common.automobiles")}
            </div>
            <ul
              className="nav nav-pills mb-0 d-lg-inline-flex font-normal text-uppercase px-3 tab-underline tab-underline--white justify-content-lg-center mx-auto bg-primary"
              id="vechile-tab"
              role="tablist"
            >
              {bodyTypes.length > 0 &&
                bodyTypes.map((tab, index) => {
                  return (
                    <li
                      key={"body-type" + index}
                      className="nav-item pr-lg-2 pr-4"
                      role="presentation"
                      // onClick={() => onTabChangeChange(tab.typeKey)}
                    >
                      <a
                        className={classnames({
                          "nav-link cursor-pointer text-white py-3": true,
                          active: tabName === tab,
                        })}
                        id="cars-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="cars"
                        aria-selected="false"
                        onClick={() => scrollSmoothTo(tab)}
                      >
                        {tab}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      <div className="overflow-hidden pt-md-4">
        <div className="container vechile-tab-container pt-md-4">
          <div className="tab-content pt-2" id="vechile-tabContent">
            <div
              className={classnames({
                "tab-pane fade show": true,
                "show active": true,
              })}
              id="all-vehicles"
              role="tabpanel"
              aria-labelledby="all-vehicles-tab"
            >
              {/* {productModelsData?.length <= 0 && (
                <div className="d-flex justify-content-center py-5 min-vh-100">
                  <ContainerLoader height={20} />
                </div>
              )} */}
              {bodyTypes.length > 0 &&
                bodyTypes.map((item: string, index) => {
                  return (
                    <div
                      key={"bottom-body-type" + index}
                      className="border-bottom position-relative"
                    >
                      <div
                        id={item}
                        className="position-absolute top-N50"
                      ></div>
                      <div className="row align-items-center">
                        <div className="col-md-3 col-12 mb-0 py-md-0 py-4">
                          <h5 className="text-uppercase">{item}</h5>
                        </div>
                        <div className="col-md-9 col-12">
                          {groupByData && (
                            <Slider {...sliderSettings}>
                              {groupByData[item].map((product) => {
                                return (
                                  <ProductItem
                                    product={product}
                                    key={product.modelID}
                                    onFinanceSelect={() => {}}
                                    onTestDriveSelect={() => {}}
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

              {/* {productModelsData?.length === 0 && (
                <div className="col-12 h5 mb-5 mt-5 pb-5 pt-5 text-center">
                  <div className="mb-5">No vehicle yet.</div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// export const getStaticProps = async ({ locale, locales }: any) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//       locale,
//       locales,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  locales,
}: any) => {
  await Promise.all([store.dispatch(getFooterAsync(locale))]);
  const footer = store.getState().footer.data;
  return {
    props: {
      footerData: footer,
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      locales,
    },
  };
};

export default Build;
