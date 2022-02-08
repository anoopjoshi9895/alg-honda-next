import { CompareAttributeViewModel } from "alg-ecom-frontend-core";
import React from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
interface CustomProps {
  tabs: CompareAttributeViewModel[];
  onTabChange: any;
  selectedTab: string;
  isMobile: boolean;
}
const Tabs: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const { t } = useTranslation();
  const onTabChange = (tab: string) => {
    props.onTabChange(tab);
  };
  return (
    <>
      {props.isMobile && (
        <div className="d-lg-none">
          <ul
            className="nav nav-pills tab-underline mb-lg-2 mb-3 pb-lg-1 px-lg-0 px-3 font-normal text-uppercase font-weight-bold"
            id="vechile-tab"
            role="tablist"
          >
            {props.tabs.map((item, index) => {
              return (
                <li
                  key={"tab-" + index}
                  className="nav-item pr-4"
                  role="presentation"
                  onClick={() => onTabChange(item.attributeGroupName)}
                >
                  <a
                    className={classnames({
                      "nav-link px-0": true,
                      active: item.attributeGroupName === props.selectedTab,
                    })}
                    id={item.attributeGroupName}
                    data-toggle="pill"
                    href="javascript:void(0)"
                    role="tab"
                    aria-controls="all-vehicles"
                    aria-selected="true"
                  >
                    {item.attributeGroupName}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!props.isMobile && (
        <ul
          className="nav nav-pills tab-underline mb-lg-2 mb-3 pb-lg-1 px-lg-0 px-3 d-lg-inline-flex d-none font-normal text-uppercase font-weight-bold"
          id="vechile-tab"
          role="tablist"
        >
          {props.tabs.map((item, index) => {
            return (
              <li
                key={"tab-item" + index}
                className="nav-item pr-4"
                role="presentation"
                onClick={() => onTabChange(item.attributeGroupName)}
              >
                <a
                  className={classnames({
                    "nav-link px-0": true,
                    active: item.attributeGroupName === props.selectedTab,
                  })}
                  id={item.attributeGroupName}
                  data-toggle="pill"
                  href="javascript:void(0)"
                  role="tab"
                  aria-controls="all-vehicles"
                  aria-selected="true"
                >
                  {item.attributeGroupName}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Tabs;
