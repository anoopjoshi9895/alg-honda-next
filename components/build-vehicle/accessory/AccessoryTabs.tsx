import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { commonActions } from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import { AccessTabs } from "../utils";
import { RootState } from "../../../app/store";
interface CustomProps {
  activeTab: string;
  tabs: string[];
  onTabChange: any;
}

const AccessoryTabs: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const onTabChange = (tab: string) => {
    props.onTabChange(tab);
  };
  return (
    <div className="overflow-auto sub-tab">
      <ul
        className="nav tab-fill  pb-5 font-normal text-uppercase d-block text-nowrap pl-3 "
        id="accessTabs"
        role="tablist"
      >
        {props.tabs.map((tab) => {
          return (
            <li
              key={tab}
              className="d-inline-block nav-item  pr-2"
              role="presentation"
              onClick={() => onTabChange(tab)}
            >
              <a
                className={classnames({
                  "nav-link px-sm-4 px-3 py-sm-3 py-2 position-relative text-center d-flex align-items-center justify-content-center h-100":
                    true,
                  active: props.activeTab === tab,
                })}
                id={tab}
                data-toggle="pill"
                href="javascript:void(0)"
                role="tab"
                aria-controls="service-contract"
                aria-selected="true"
              >
                <span className="py-sm-0 py-1">{tab}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
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

export default connect(mapStateToProps, mapActionsToProps)(AccessoryTabs);
