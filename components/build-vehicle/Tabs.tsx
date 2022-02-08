import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { commonActions } from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import { TabList, TabNames } from "./utils";
import { RootState } from "../../app/store";
import { useRouter } from "next/router";
interface CustomProps {
  headerText: string;
  activeTab: TabNames;
  onTabChange: any;
  outerClassName: string;
  isCampaignExits: boolean;
}

const Tabs: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const { t } = useTranslation();
  const onTabChange = (tab: TabNames) => {
    props.onTabChange(tab);
  };
  const router = useRouter();
  const elementRef: any = useRef(null);

  const toElemnt = () => {
    if (!elementRef) return;
    // Get element coords from Ref
    // const element =
    //   elementRef.current.getBoundingClientRect().top + window.scrollY;

    // window.scroll({
    //   top: element,
    //   behavior: 'smooth',
    // });
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };
  // React.useEffect(() => {
  //   toElemnt();
  // }, []);
  React.useEffect(() => {
    if (props.outerClassName === "") {
      setTimeout(() => toElemnt(), 300);
    }
  }, [props.outerClassName]);
  return (
    <>
      <div
        className="border-bottom bg-white position-sticky top-0 zIndex-1 tab-outer-container"
        ref={elementRef}
        id={"scroll-div"}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-2 d-lg-flex d-none">
              <a
                onClick={() => router.back()}
                href="javascript:void(0)"
                className="d-inline-flex align-items-center font-xs text-uppercase"
              >
                <i className="icon-arrow-left mr-2 pr-1 font-lg icon-flip-rtl"></i>
                <span>{props.headerText}</span>
              </a>
            </div>
            <div className="col-lg-10 col-12 pl-xl-5 px-lg-3 px-0">
              <ul
                className="nav nav-pills mb-0 d-lg-inline-flex font-sm text-uppercase px-3 tab-underline letter-spacing-sm"
                id="vechile-tab"
                role="tablist"
              >
                {TabList.map((tabItem) => {
                  return !props.isCampaignExits &&
                    tabItem.key === TabNames.CAMPAIGNS ? (
                    <></>
                  ) : (
                    <li
                      className="nav-item pr-lg-0 pr-4"
                      role="presentation"
                      key={tabItem.key}
                      onClick={() => onTabChange(tabItem.value)}
                    >
                      <a
                        className={classnames({
                          "nav-link px-lg-3 py-0": true,
                          active: tabItem.value === props.activeTab,
                        })}
                        id="all-vehicles-tab"
                        data-toggle="pill"
                        href="javascript:void(0)"
                        role="tab"
                        aria-controls="all-vehicles"
                        aria-selected="true"
                      >
                        <span className="py-lg-3 my-1 py-2 d-inline-block">
                          {t(`build_vehicle.${tabItem.key}`)}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
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
  return {
    outerClassName: state.commonState.outerClassName,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Tabs);
