import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from "../../../app/store";
import { commonActions } from 'alg-ecom-frontend-core';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
interface CustomProps {
  headerText: string;
  isMenuOpen: boolean;
  toggleMenu: typeof commonActions.toggleMenu;
}
const SubHeader: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <div className="header-mob d-lg-none d-flex border-bottom align-items-center px-3 py-2">
        <i className="icon-arrow-left font-xxl mr-3 icon-flip-rtl"></i>
        <h6 className="font-xs text-uppercase mb-0">{props.headerText}</h6>
        <div className="ml-auto d-flex align-items-center">
          <i
            className="icon-menu ml-3 icon-flip-rtl"
            onClick={() => props.toggleMenu()}
          ></i>
        </div>
      </div>

      <div className="bg-primary text-white nav-header-tab">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-3 d-lg-block d-none">
              <a
                onClick={() => router.back()}
                className="d-inline-flex align-items-center font-normal text-uppercase cursor-pointer"
              >
                <i className="icon-chevron-left mr-2 pr-1 font-xxxs icon-flip-rtl"></i>
                {props.headerText}
              </a>
            </div>
            <div className="col">
              <ul
                className="nav nav-pills mb-0 tab-underline tab-underline--white font-normal text-uppercase font-weight-semibold bg-primary"
                id="vechile-tab"
                role="tablist"
              >
                <li
                  className="nav-item pr-lg-2 pr-4"
                  role="presentation"
                  // onClick={() => onTabChange(product)}
                  key={1}
                >
                  <a
                    className="nav-link active text-white p-3"
                    id="all-vehicles-tab"
                    data-toggle="pill"
                    href="javascript:void(0)"
                    role="tab"
                    aria-controls="all-vehicles"
                    aria-selected="true"
                  >
                    {t('popup.All')}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3 d-flex justify-content-end">
              {/* <div className="finance-select d-flex align-items-center cursor-pointer">
                <i className="icon-calculator text-muted mr-2 font-xxl"></i>
                <div>
                  <div className="font-base font-weight-bold text-primary text-uppercase">
                    Finance
                  </div>
                  <div className="font-xs text-muted">
                    Recommended OTR{' '}
                    <span className="text-gray-800">KWD 12,999</span>
                  </div>
                </div>
                <i className="icon-chevron-down font-xxxs text-muted ml-4"></i>
              </div> */}
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
      toggleMenu: commonActions.toggleMenu,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isMenuOpen: state.commonState.headerMenuOpen,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SubHeader);
