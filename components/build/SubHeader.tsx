import React from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import Select from "react-select";
import { connect, useSelector } from "react-redux";
import {
  commonActions,
  BuildPriceBodyModelDataModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";

const years = [{ modelyear: 2020 }, { modelyear: 2019 }, { modelyear: 2018 }];

const SubHeader: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const isMenuOpen: boolean = useSelector(
    (state: any) => state?.commonState?.headerMenuOpen
  );

  return (
    <>
      <div className="header-mob d-lg-none d-flex border-bottom align-items-center px-3 py-2">
        <i className="icon-arrow-left font-xxl mr-3 icon-flip-rtl"></i>
        <h6 className="font-xs text-uppercase mb-0">
          {t("common.build_price")}
        </h6>
        <div className="ml-auto d-flex align-items-center">
          {/* {props.yearLoaded &&
            !props.yearLoading &&
            props.yearData?.modelsList.length > 0 && (
              <Select
                placeholder={'Year'}
                key={'reactModelYear'}
                getOptionLabel={(option) => `${option.modelyear}`}
                getOptionValue={(option) => `${option.modelyear}`}
                // options={years}
                isSearchable={false}
                defaultValue={props.defaultYear}
                // value={modelYear}
                options={props.yearData?.modelsList}
                onChange={(value) => {
                  if (value) {
                    props.onModelYearChange(value);
                  }
                }}
                className="font-xxs font-weight-bold h-auto select position-relative zIndex-9"
              />
            )} */}
          <i
            className="icon-menu ml-3 icon-flip-rtl"
            // onClick={() => props.toggleMenu()}
          ></i>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
