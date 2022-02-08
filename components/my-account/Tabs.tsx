/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { TabNames } from "../../pages/my-account";
import { useRouter } from "next/router";
import { RouteKeys } from "../../route/route-keys";

export interface CustomProps {
  isAuthRequired: boolean;
  tabName: TabNames;
  tabChangeHandler: (tabName: TabNames) => void;
  logout: typeof authActions.logout;
}

export interface StateProps {
  isAuthenticationCompleted: boolean;
}

const Tabs: React.FunctionComponent<CustomProps> = (props) => {
  const { t } = useTranslation();
  const history = useRouter();
  const [tabName, setTabName] = React.useState<TabNames>(
    props.tabName || TabNames.Configuration
  );
  const setElementActive = (tabValue: TabNames) => {
    setTabName(tabValue);
    props.tabChangeHandler(tabValue);
  };

  const logOut = () => {
    props.logout(() => {
      history.push(`${RouteKeys.Auth}`);
    });
  };

  return (
    <ul
      className="nav nav-pills row font-md mx-0 mb-0 px-0 pt-lg-1 dashboard-nav"
      id="vechile-tab"
      role="tablist"
    >
      {/* <li
        className="nav-item col-lg-12 col-auto px-lg-0 mb-lg-1"
        role="presentation"
      >
        <a
          className={`cursor-pointer nav-link px-lg-3 d-flex align-items-center ${
            tabName === TabNames.Activities ? 'active' : ''
          }`}
          id="all-vehicles-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="all-vehicles"
          aria-selected="true"
          onClick={(e) => setElementActive(TabNames.Activities)}
        >
          Activities
        </a>
      </li> */}
      <li
        className="nav-item col-lg-12 col-auto px-lg-0 mb-lg-1"
        role="presentation"
      >
        <a
          className={`cursor-pointer nav-link px-lg-3 py-lg-0 py-3 d-flex align-items-center ${
            tabName === TabNames.Configuration ? "active" : ""
          }`}
          id="cars-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="cars"
          aria-selected="false"
          onClick={(e) => setElementActive(TabNames.Configuration)}
        >
          {t("dashboard.Configuration & Quotation")}
        </a>
      </li>
      <li
        className="nav-item col-lg-12 col-auto px-lg-0 mb-lg-1"
        role="presentation"
      >
        <a
          className={`cursor-pointer nav-link px-lg-3 py-lg-0 py-3  d-flex align-items-center ${
            tabName === TabNames.Bookings ? "active" : ""
          }`}
          id="crossover-suvs-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="crossover-suvs"
          aria-selected="false"
          onClick={(e) => setElementActive(TabNames.Bookings)}
        >
          {t("dashboard.Bookings")}
        </a>
      </li>
      <li
        className="nav-item col-lg-12 col-auto px-lg-0 mb-lg-1"
        role="presentation"
      >
        <a
          className={`cursor-pointer nav-link px-lg-3 py-lg-0 py-3  d-flex align-items-center ${
            tabName === TabNames.Orders ? "active" : ""
          }`}
          id="trucks-vans-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="trucks-vans"
          aria-selected="false"
          onClick={(e) => setElementActive(TabNames.Orders)}
        >
          {t("dashboard.Orders")}
        </a>
      </li>
      {/* <li
        className="nav-item col-lg-12 col-auto px-lg-0 mb-lg-1"
        role="presentation"
      >
        <a
          className={`cursor-pointer nav-link px-lg-3 py-lg-0 py-3  d-flex align-items-center ${
            tabName === TabNames.Vehicle ? 'active' : ''
          }`}
          id="cars-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="cars"
          aria-selected="false"
          onClick={(e) => setElementActive(TabNames.Vehicle)}
        >
          Vehicle
        </a>
      </li>
      <li
        className="nav-item col-lg-12 col-auto px-lg-0 mb-lg-1"
        role="presentation"
      >
        <a
          className={`cursor-pointer nav-link px-lg-3 py-lg-0 py-3  d-flex align-items-center ${
            tabName === TabNames.Service ? 'active' : ''
          }`}
          id="crossover-suvs-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="crossover-suvs"
          aria-selected="false"
          onClick={(e) => setElementActive(TabNames.Service)}
        >
          Service
        </a>
      </li>
      <li
        className="nav-item col-lg-12 col-auto px-lg-0 mb-lg-1"
        role="presentation"
      >
        <a
          className={`cursor-pointer nav-link px-lg-3 py-lg-0 py-3  d-flex align-items-center ${
            tabName === TabNames.Users ? 'active' : ''
          }`}
          id="trucks-vans-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="trucks-vans"
          aria-selected="false"
          onClick={(e) => setElementActive(TabNames.Users)}
        >
          Users
        </a>
      </li> */}
      <li
        className="nav-item col-lg-12 col-auto px-lg-0 mb-lg-1"
        role="presentation"
      >
        <a
          className={`cursor-pointer nav-link px-lg-3 py-lg-0 py-3  d-flex align-items-center ${
            tabName === TabNames.Logout ? "active" : ""
          }`}
          id="trucks-vans-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="trucks-vans"
          aria-selected="false"
          onClick={logOut}
        >
          {t("dashboard.Logout")}
        </a>
      </li>
    </ul>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      logout: authActions.logout,
    },
    dispatch
  );
};

export default connect(undefined, mapActionsToProps)(Tabs);
