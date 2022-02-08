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
  TrimVarientProductModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
// import ContainerLoader from "components/loader/container-loader";
import { Dictionary, groupBy } from "lodash";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { store } from "../../app/store";
import { getFooterAsync } from "../../feature/footerSlice";
import Footer from "../../components/footer";
import { getSlideAsync } from "../../feature/slideSlice";
import Header from "../../components/header";
// import ContainerLoader from "../../components/loader/container-loader";
import CompareVarients from "../../components/trim-level/CompareVarients";
import { vehicleTypes } from "../../utils/common";
import SubHeader from "../../components/trim-level/SubHeader";
import Layout from "../../components/Layout";
import { IFooter } from "../../models/models";

// import PaymentForm from 'containers/build-vehicle/finance/PaymentForm';
enum TabNames {
  All = "All",
  Cars = "Cars",
  Suv = "Suv",
  Trucks = "Trucks",
}

interface CustomProps {
  locale: string;
  footerData: IFooter;
}
const TrimLevel: NextPage<CustomProps> = (props: CustomProps) => {
  const router = useRouter();
  const modelCode = router?.query?.modelCode as string;
  const { defaultLocale, isFallback, query } = router;
  const { t, i18n } = useTranslation("common");

  const dispatch = useDispatch();
  const [tabName, setTabName] = React.useState("All");
  const [selectedProduct, setSelectedProduct] = React.useState<
    BuildPriceProductModel | undefined
  >(undefined);

  const [isFinancialCalcActive, setIsFinancialCalcActive] =
    React.useState<boolean>(false);
  const [isTestDriveActive, setIsTestDriveActive] =
    React.useState<boolean>(false);

  const [groupByData, setGroupByData] = React.useState<
    Dictionary<ProductModelItemModel[]> | undefined
  >(undefined);

  const [bodyTypes, setBodyTypes] = React.useState<string[]>([]);
  const [dataLoading, setDataLoading] = React.useState(true);

  const [modelYear, setModelYear] = React.useState<number | undefined>(
    undefined
  );
  const [modelYears, setYears] = React.useState<number[] | []>([]);
  const [trimLoaded, setTrimLoaded] = React.useState(false);

  const [productTitle, setProductTitle] = React.useState("");
  const [maxTitleLength, setMaxTitleLength] = React.useState(0);

  const [brochure, setBrochure] = React.useState<string>("");
  const [topNav, setTopNav] = React.useState<any>(null);
  const [vehType, setVehType] = React.useState<vehicleTypes>(
    vehicleTypes.hondaCars
  );
  const [trimList, setTrimList] = React.useState<TrimVarientProductModel[]>();
  const [selectedVarient, setSelectedVarient] = React.useState<
    TrimVarientProductModel | undefined
  >(undefined);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const productModelsData: ProductModelItemModel[] = useSelector(
    (state: any) => state.productModelsState?.productModelsList
  );
  React.useEffect(() => {
    // let maxTitleLength = 0;
    trimList?.forEach((item) => {
      if (item.productTitle.length > maxTitleLength) {
        setMaxTitleLength(item.productTitle.length);
      }
    });
  }, [trimList]);
  React.useEffect(() => {
    // api.setLanguageID(1);
    // api.setWebsiteID(1);
    // api.setSubsiteID(1);
    if (productModelsData?.length === 0) {
      dispatch(
        productModelsActions.getProductModels(() => {
          //
        }, vehType)
      );
    } else {
      const modelData = productModelsData.find(
        (item) => item.modelCode === modelCode
      );
      const years = modelData?.productsby_modelyear?.map((item) => {
        return item.modelyear;
      });
      if (years) {
        setModelYear(years[years?.length - 1]);
        setYears(years);
        loadTrimList(years[years?.length - 1]);
      }

      scrollTop();
    }
    return () => {
      dispatch(productModelsResetSettingsAction());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (productModelsData?.length !== 0) {
      const modelData = productModelsData.find(
        (item) => item.modelCode === modelCode
      );
      const years = modelData?.productsby_modelyear?.map((item) => {
        return item.modelyear;
      });
      if (years) {
        setModelYear(years[years?.length - 1]);
        setYears(years);
        loadTrimList(years[years?.length - 1]);
      }

      scrollTop();
    }
  }, [productModelsData]);

  const loadTrimList = async (year: number) => {
    setTrimLoaded(true);

    if (year && modelCode) {
      setDataLoading(true);

      const data = await api.build.trimList(year, modelCode);

      setTrimList(data?.productsList);

      setProductTitle(data?.pageTitle);

      setSelectedVarient(
        data?.productsList?.length > 0 ? data?.productsList?.[0] : undefined
      );
      setDataLoading(false);
    }
  };

  const onModelYearChange = (value: number) => {
    setModelYear(value);
    setTabName(TabNames.All);
    // reload(value.modelyear, TabNames.All);
    loadTrimList(value);
  };

  const onBrochureSet = (file: string) => {
    setBrochure(file);
  };

  if (isFallback) {
    return <>Loading...</>;
  }

  return (
    <Layout footerData={props.footerData}>
      {modelYear && modelYears?.length > 0 && (
        <SubHeader
          headerText={modelCode}
          onModelYearChange={onModelYearChange}
          modelYear={modelYear}
          years={modelYears}
          brochure={brochure}
          modelCode={modelCode}
        />
      )}
      <div className="position-relative pb-lg-5 min-vh-100">
        {/* {!trimList && dataLoading === true && (
          <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <ContainerLoader />
          </div>
        )} */}

        {trimList && modelYear && dataLoading === false && (
          <CompareVarients
            year={modelYear}
            modelCode={modelCode}
            products={trimList}
            onBrochureSet={onBrochureSet}
          />
        )}
      </div>
    </Layout>
  );
};

// export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
//   await Promise.all([store.dispatch(getFooterAsync(locale))]);

//   const footer = store.getState().footer.data;

//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//       locale: locale || null,
//       footerData: footer || null,
//     },
//     revalidate: 60,
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  locales,
  query,
}: any) => {
  // const modelCode = query?.modelCode;
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

export default TrimLevel;
