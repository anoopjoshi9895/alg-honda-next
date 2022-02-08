import React from "react";
import {
  CartActions,
  CartStateModel,
  InsurancesModelBV,
  ServicesModelBV,
  ExtendedWarrentyModelBV,
  ProductViewModelBV,
  ProductDetailsStateModel,
  ProductDetailsActions,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { InsServTab } from "../utils";
import classnames from "classnames";
import InsuranceServiceTabs from "./InsuranceServiceTabs";
import InsuranceTabPane from "./InsuranceTabPane";
import ServiceTabPane from "./ServiceTabPane";
import CustomerCarePackageTabPane from "./CustomerCarePackageTabPane";
import ExtendedWarrentyTabPane from "./ExtendedWarrentyTabPane";
import { RootState } from "../../../app/store";
interface CustomProps {
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
  servicesData: ServicesModelBV[];
  customerCarePackageData: ServicesModelBV[];
  warrentyDataData: ExtendedWarrentyModelBV[];
  insurancesData: InsurancesModelBV[];
  productID: number;
  getCartDetails: typeof CartActions.getCartDetails;
  productDetails?: ProductViewModelBV;
  productData: ProductDetailsStateModel;
  getProductDetails: typeof ProductDetailsActions.getProductDetails;
}
const InsuranceServiceTabPane: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [tabName, setTabName] = React.useState(InsServTab.Insurance);

  const { t } = useTranslation();
  const onTabChange = (tab: InsServTab) => {
    setTabName(tab);
  };

  React.useEffect(() => {
    if (!!props.productData?.extendedWarrenty?.length) {
      setTabName(InsServTab.ExtendedWarrenty);
    }
    if (!!props.productData?.customerCarePackages?.length) {
      setTabName(InsServTab.CustomerCarePackage);
    }
    if (!!props.productData?.servicesList?.length) {
      setTabName(InsServTab.Service);
    }
    if (!!props.productData?.insurancesList?.length) {
      setTabName(InsServTab.Insurance);
    }
  }, []);
  const isBrowser =
    typeof window !== "undefined" && typeof window.document !== "undefined";
  return (
    <div
      className="tab-pane fade show active pb-4"
      id="insurance-services"
      role="tabpanel"
      aria-labelledby="insurance-services-tab"
    >
      <div className="insurance-services py-lg-5 py-4">
        {isBrowser && (
          <div className="container">
            <h4 className="text-uppercase font-weight-normal mb-5 d-lg-block d-none">
              {t("build_vehicle.INSURANCES")}
            </h4>
            <InsuranceServiceTabs
              activeTab={tabName}
              onTabChange={onTabChange}
              productData={props.productData}
            />
            <div className="tab-content" id="insuranceTabContent">
              {tabName === InsServTab.Service && (
                <div
                  className={classnames({
                    "tab-pane fade": true,
                    "show active": tabName === InsServTab.Service,
                  })}
                  id="service-contract"
                  role="tabpanel"
                  aria-labelledby="service-contract-tab"
                >
                  <ServiceTabPane
                    serviceData={props.servicesData}
                    productID={props.productID}
                    productDetails={props.productDetails}
                    productData={props.productData}
                  />
                </div>
              )}
              {tabName === InsServTab.Insurance && (
                <div
                  className={classnames({
                    "tab-pane fade": true,
                    "show active": true,
                  })}
                  id="comprehensive-insurance"
                  role="tabpanel"
                  aria-labelledby="comprehensive-insurance-tab"
                >
                  <InsuranceTabPane
                    insurancesData={props.insurancesData}
                    productID={props.productID}
                    productDetails={props.productDetails}
                    productData={props.productData}
                  />
                </div>
              )}
              <div
                className={classnames({
                  "tab-pane fade": true,
                  "show active": tabName === InsServTab.CustomerCarePackage,
                })}
                id="service-contract"
                role="tabpanel"
                aria-labelledby="service-contract-tab"
              >
                <CustomerCarePackageTabPane
                  customerCarePackageData={props.customerCarePackageData}
                  productID={props.productID}
                  productDetails={props.productDetails}
                  productData={props.productData}
                />
              </div>
              <div
                className={classnames({
                  "tab-pane fade": true,
                  "show active": tabName === InsServTab.ExtendedWarrenty,
                })}
                id="service-contract"
                role="tabpanel"
                aria-labelledby="service-contract-tab"
              >
                <ExtendedWarrentyTabPane
                  warrentyDataData={props.warrentyDataData}
                  productID={props.productID}
                  productDetails={props.productDetails}
                  productData={props.productData}
                />
              </div>
            </div>
          </div>
        )}
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
      getProductDetails: ProductDetailsActions.getProductDetails,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    cartData: state.cartState,
    productData: state.productDetailsState,
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InsuranceServiceTabPane);
