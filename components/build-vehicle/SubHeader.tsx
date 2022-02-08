import React from "react";
import classnames from "classnames";
import Select from "react-select";
import { connect } from "react-redux";
import { commonActions } from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import { RootState } from "../../app/store";
const years = [
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];

interface CustomProps {
  isMenuOpen: boolean;
  toggleMenu: typeof commonActions.toggleMenu;
}
const SubHeader: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  return (
    <>
      <div className="header-mob d-lg-none d-flex border-bottom align-items-center px-3 py-2">
        <i className="icon-arrow-left font-xxl mr-3 icon-flip-rtl"></i>
        {/* <h6 className="font-xs text-uppercase mb-0">{t('common.build_price')}</h6> */}
        <div className="ml-auto d-flex align-items-center">
          {/* <Select
            options={years}
            className="font-xxs font-weight-bold h-auto select position-relative zIndex-9"
          /> */}
          <i
            className="icon-menu ml-3 icon-flip-rtl"
            onClick={() => props.toggleMenu()}
          ></i>
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
