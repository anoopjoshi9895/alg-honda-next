import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import {
  commonActions,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import { InsServTab } from "../utils";
import { RootState } from "../../../app/store";
interface CustomProps {
  activeTab: InsServTab;
  onTabChange: any;
  productData: ProductDetailsStateModel;
}

const InsuranceServiceTabs: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const onTabChange = (tab: InsServTab) => {
    props.onTabChange(tab);
  };
  return (
    <>
      {/* <div className="row no-gutters">
        <div className="col-auto border-bottom mb-4"> */}
      <ul
        className="nav tab-fill pb-lg-5 pb-4 font-normal text-uppercase row gutter-5 flex-nowrap overflow-auto"
        id="insuranceTab"
        role="tablist"
      >
        {!!props.productData?.insurancesList?.length && (
          <li
            className="col-sm-auto col-6 nav-item"
            role="presentation"
            onClick={() => onTabChange(InsServTab.Insurance)}
          >
            <a
              className={classnames({
                "nav-link px-sm-4 px-3 py-sm-3 py-2 position-relative text-center d-flex align-items-center justify-content-center h-100":
                  true,
                active: props.activeTab === InsServTab.Insurance,
              })}
              id={InsServTab.Insurance}
              data-toggle="pill"
              href="javascript:void(0)"
              role="tab"
              aria-controls="comprehensive-insurance"
              aria-selected="false"
            >
              <span className="py-sm-0 py-1">
                {t("build_vehicle.comprehensive_insurance")}
              </span>
            </a>
          </li>
        )}
        {!!props.productData?.servicesList?.length && (
          <li
            className="col-sm-auto col-6 nav-item"
            role="presentation"
            onClick={() => onTabChange(InsServTab.Service)}
          >
            <a
              className={classnames({
                "nav-link px-sm-4 px-3 py-sm-3 py-2 position-relative text-center d-flex align-items-center justify-content-center h-100":
                  true,
                active: props.activeTab === InsServTab.Service,
              })}
              id={InsServTab.Service}
              data-toggle="pill"
              href="javascript:void(0)"
              role="tab"
              aria-controls="service-contract"
              aria-selected="true"
            >
              <span className="py-sm-0 py-1">
                {t("build_vehicle.service_contract")}
              </span>
            </a>
          </li>
        )}
        {!!props.productData?.customerCarePackages?.length && (
          <li
            className="col-sm-auto col-6 nav-item"
            role="presentation"
            onClick={() => onTabChange(InsServTab.CustomerCarePackage)}
          >
            <a
              className={classnames({
                "nav-link px-sm-4 px-3 py-sm-3 py-2 position-relative text-center d-flex align-items-center justify-content-center h-100":
                  true,
                active: props.activeTab === InsServTab.CustomerCarePackage,
              })}
              id={InsServTab.CustomerCarePackage}
              data-toggle="pill"
              href="javascript:void(0)"
              role="tab"
              aria-controls="service-contract"
              aria-selected="true"
            >
              <span className="py-sm-0 py-1">
                {t("build_vehicle.customer_care_packages")}
              </span>
            </a>
          </li>
        )}
        {!!props.productData?.extendedWarrenty?.length && (
          <li
            className="col-sm-auto col-6 nav-item"
            role="presentation"
            onClick={() => onTabChange(InsServTab.ExtendedWarrenty)}
          >
            <a
              className={classnames({
                "nav-link px-sm-4 px-3 py-sm-3 py-2 position-relative text-center d-flex align-items-center justify-content-center h-100":
                  true,
                active: props.activeTab === InsServTab.ExtendedWarrenty,
              })}
              id={InsServTab.ExtendedWarrenty}
              data-toggle="pill"
              href="javascript:void(0)"
              role="tab"
              aria-controls="service-contract"
              aria-selected="true"
            >
              <span className="py-sm-0 py-1">
                {t("build_vehicle.extended_warranty")}
              </span>
            </a>
          </li>
        )}
      </ul>
      {/* </div>
      </div> */}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InsuranceServiceTabs);
