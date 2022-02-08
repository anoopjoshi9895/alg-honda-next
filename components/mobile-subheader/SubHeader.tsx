import React from "react";
import { connect } from "react-redux";
import { commonActions } from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import { useRouter } from "next/router";
import { RootState } from "../../app/store";
const years = [
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];

interface CustomProps {
  headerText: string;
  isMenuOpen: boolean;
  toggleMenu: typeof commonActions.toggleMenu;
}
const SubHeader: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();
  return (
    <>
      <div className="header-mob d-lg-none d-flex border-bottom align-items-center p-3">
        <i
          className="icon-chevron-left mr-3 icon-flip-rtl"
          onClick={() => router.back()}
        ></i>
        <h6 className="font-weight-semibold font-lg letter-spacing text-uppercase mb-0">
          {props.headerText}
        </h6>
        <div className="ml-auto d-flex align-items-center">
          <i
            className="icon-menu icon-flip-rtl ml-3 py-2"
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
