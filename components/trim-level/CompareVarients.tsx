import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  api,
  commonActions,
  CompareVarientActions,
  CompareVarientsStateModel,
  TrimVarientProductModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import Tabs from "./Tabs";
// import { FullPageLoader, ContainerLoader } from 'components/loader';
import CompareProducts from "./CompareProducts";
import { useDataLoader } from "../../utils/useDataLoader";
// import FullPageLoader from "../loader/full-page-loader";
// import ContainerLoader from "../loader/container-loader";
// import dynamic from "next/dynamic";
// const DynamicComponent = dynamic(() =>

interface CustomProps {
  // varientsData: CompareVarientsStateModel;
  getCompareVarients: typeof CompareVarientActions.getCompareVarients;
  year: number;
  modelCode: string;
  products: TrimVarientProductModel[];
  onBrochureSet: any;
}

const CompareVarients: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = React.useState<string | undefined>(
    undefined
  );
  const [topNav, setTopNav] = React.useState<any>(null);
  const [bottomNav, setBottomNav] = React.useState<any>(null);

  const { data, reload, loaded, loading } =
    useDataLoader<CompareVarientsStateModel>(() =>
      api.build.trimCompareData(props.year, props.modelCode, props.products)
    );

  // const { data } = useSWR<CompareVarientsStateModel>(
  //   `${process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN}mobileapp/catalog/compare/${props.modelCode}`,
  //   fetcher
  // );

  React.useEffect(() => {
    if (data) {
      props.onBrochureSet(data?.brochure);
    }
  }, [data]);

  const onTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  const isBrowser =
    typeof window !== "undefined" && typeof window.document !== "undefined";
  // if (!data) {
  //   return <FullPageLoader />;
  // }
  return (
    <>
      {data?.productsList && data?.attributesList && (
        <>
          {selectedTab && (
            <Tabs
              tabs={data.attributesList}
              selectedTab={selectedTab}
              onTabChange={onTabChange}
              isMobile={true}
            />
          )}
          {isBrowser && (
            <div className="container">
              <div className="row no-gutters">
                <CompareProducts products={data?.productsList} />
              </div>
            </div>
          )}
          {/* <div className="px-lg-3 container pt-1 overflow-auto">
            <div className="row no-gutters flex-lg-nowrap w-100">
              <div className="col-lg-3 col-12 d-flex flex-column ">
                <h6 className="text-uppercase mb-lg-5 mb-0 font-normal text-uppercase position-sticky left-0 d-inline-block px-lg-0 px-3 pt-4">
                  Model Series
                </h6>
              </div>
              {data.productsList && (
                <Products
                  products={data.productsList}
                  topSlider={(e) => setTopNav(e)}
                  bottomSlider={bottomNav}
                />
              )}
            </div>
            <div
              className="tab-content pt-3 compare-tabContent d-block w-100"
              id="compare-tabContent"
            >
              {data.productsList && (
                <TabContent
                  products={data.productsList}
                  attribute={data.attributesList}
                  bottomSlider={(e) => setBottomNav(e)}
                  topSlider={topNav}
                />
              )}
            </div>
          </div> */}
        </>
      )}
      {/* {!data && (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <ContainerLoader />
        </div>
      )} */}
      {/* </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      getCompareVarients: CompareVarientActions.getCompareVarients,
    },
    dispatch
  );
};

const mapStateToProps = (state: any) => {
  return {
    // varientsData: state.compareVarientState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CompareVarients);
