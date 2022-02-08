import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { commonActions } from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import Select from "react-select";
interface CustomProps {
  headerText: string;
  isMenuOpen: boolean;
  modelYear: number;
  years: number[];
  brochure?: string;
  toggleMenu: typeof commonActions.toggleMenu;
  onModelYearChange: any;
  modelCode: string;
}
const SubHeader: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  // const history = useHistory();
  // const { modelCode } = useParams<{ modelCode: string }>();
  return (
    <>
      <div className="header-mob d-lg-none d-flex border-bottom align-items-center px-3 py-2">
        <i className="icon-arrow-left font-xxl mr-3 icon-flip-rtl"></i>
        <h6 className="font-xs text-uppercase mb-0">{props.headerText}</h6>
        {/* <div className="ml-auto d-flex align-items-center">
          <i
            className="icon-menu ml-3 icon-flip-rtl"
            onClick={() => props.toggleMenu()}
          ></i>
        </div> */}
      </div>

      <div className="bg-white text-gray-900 nav-header-tab border-bottom border-top py-2">
        <div className="container py-1">
          <div className="row align-items-center">
            <div className="col-3 d-lg-block d-none">
              <a
                // onClick={() => history.goBack()}
                className="d-inline-flex align-items-center font-normal cursor-pointer letter-spacing "
              >
                <i className="icon-arrow-left mr-2 pr-1 font-base icon-flip-rtl"></i>
                {/* {props.headerText} */}
                <div>
                  <div className="font-normal text-uppercase font-weight-semibold">
                    Select your model
                  </div>
                  <div className="font-xs">
                    Select your{" "}
                    <span className="text-capitalize">{` ${props?.modelCode}`}</span>{" "}
                    to build
                  </div>
                </div>
              </a>
            </div>
            <div className="col-auto">
              <Select
                placeholder={"Year"}
                key={"reactModelYear"}
                getOptionLabel={(option) => `${option.modelyear}`}
                getOptionValue={(option) => `${option.modelyear}`}
                options={props.years?.map((item) => {
                  return { modelyear: item };
                })}
                isSearchable={false}
                defaultValue={{ modelyear: props.modelYear }}
                onChange={(value) => {
                  if (value) {
                    props.onModelYearChange(value?.modelyear);
                  }
                }}
                className="select-model select position-relative zIndex-9 trim-select"
              />
            </div>
            <div className="col">
              {/* <ul
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
                    ALL
                  </a>
                </li>
              </ul> */}
            </div>
            <div className="col-3 d-flex justify-content-end">
              {props?.brochure && props?.brochure !== "" && (
                <a href={props.brochure}>
                  <div className="finance-select d-flex align-items-center cursor-pointer">
                    <i className="icon-download mr-2 font-normal"></i>
                    <div>
                      <div className="font-sm text-uppercase">
                        Download Brochure
                      </div>
                    </div>
                  </div>
                </a>
              )}
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

const mapStateToProps = (state: any) => {
  return {
    isMenuOpen: state.commonState.headerMenuOpen,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SubHeader);
