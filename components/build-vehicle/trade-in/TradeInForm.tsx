import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  TradeInActions,
  TradeInBrandStateModel,
  TradeInTrimStateModel,
  TradeInModelStateModel,
  TradeInModelYearStateModel,
} from "alg-ecom-frontend-core";
import { TradeInFormProps } from "../utils";
import { useTranslation } from "react-i18next";
import validator from "validator";
import SelectInput from "../../SelectInput";
import { RootState } from "../../../app/store";

const TradeInForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  isUpdating?: boolean;
  default?: TradeInFormProps;
  errorMessage?: string;
  isEdit?: boolean;
  getBrandList: typeof TradeInActions.getBrandList;
  getModelList: typeof TradeInActions.getModelList;
  getTrimList: typeof TradeInActions.getTrimList;
  brands: TradeInBrandStateModel;
  models: TradeInModelStateModel;
  trims: TradeInTrimStateModel;
  modelYears: TradeInModelYearStateModel;
}> = (props) => {
  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<TradeInFormProps>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: props?.default,
    });
  const { t } = useTranslation();

  const maxDate = moment().endOf("day");
  const isDobValid = (current: Date) => {
    return moment(current).isBefore(maxDate);
  };

  return (
    <div className="trade-in-form text-left ">
      <h6 className="font-lg  pb-4">{t("build_vehicle.vehicle_details")}</h6>
      <div className="row gutter-12">
        <div className="col-md-6 col-12 form-group mb-4 pb-xl-3">
          <label className="font-normal">
            {t("build_vehicle.model_year")}
            <sup>*</sup>
          </label>

          {props.modelYears.modelsYears &&
            props.modelYears?.modelsYears?.length > 0 && (
              <Controller
                control={control}
                name="modelYear"
                defaultValue={props.default?.modelYear}
                rules={{
                  required: true,
                }}
                render={({ onChange, name, value }) => (
                  <SelectInput
                    optionLabel="label"
                    optionValue="value"
                    default={props.default?.modelYear}
                    placeholder={t("build_vehicle.select_model_year")}
                    data={props.modelYears.modelsYears.map((itemYear) => {
                      return { label: itemYear, value: parseInt(itemYear, 10) };
                    })}
                    onChange={(val: number) => {
                      onChange(val);
                      props.getBrandList(val);
                    }}
                    isSearchable={false}
                  />
                )}
              />
            )}
          {errors.modelYear && (
            <span className="message-validation">
              {t("build_vehicle.model_year_required")}
            </span>
          )}
        </div>
        <div className="col-md-6 col-12 form-group mb-4 pb-xl-3">
          <label className="font-normal">
            {t("build_vehicle.brand")}
            <sup>*</sup>
          </label>

          <Controller
            control={control}
            name="brand"
            defaultValue={props.default?.brand}
            rules={{
              required: true,
            }}
            render={({ onChange, name, value }) => (
              <SelectInput
                optionLabel="brandName"
                optionValue="brandName"
                data={props.brands.brandsList}
                default={props.default?.brand}
                placeholder={t("build_vehicle.select_brand")}
                onChange={(val: string) => {
                  onChange(val);
                  props.getModelList(watch("modelYear"), val);
                }}
                isSearchable={false}
              />
            )}
            key={`brand-${watch("modelYear")}`}
          />
          {errors.brand && (
            <span className="message-validation">
              {t("build_vehicle.brand_required")}
            </span>
          )}
        </div>

        <div className="col-md-6 col-12 form-group mb-4 pb-xl-3">
          <label className="font-normal">
            {t("build_vehicle.model")}
            <sup>*</sup>
          </label>

          <Controller
            control={control}
            name="modelCode"
            defaultValue={props.default?.modelCode}
            rules={{
              required: true,
            }}
            render={({ onChange, name, value }) => (
              <SelectInput
                optionLabel="modelCode"
                optionValue="modelCode"
                data={props.models.modelsList}
                default={props.default?.modelCode}
                placeholder={t("build_vehicle.select_model")}
                onChange={(val: string) => {
                  onChange(val);
                  props.getTrimList(watch("modelYear"), watch("brand"), val);
                }}
                isSearchable={false}
                key={`modelCode-${watch("brand")}`}
              />
            )}
          />
          {errors.modelCode && (
            <span className="message-validation">
              {t("build_vehicle.model_required")}
            </span>
          )}
        </div>
        <div className="col-md-6 col-12 form-group mb-4 pb-xl-3">
          <label className="font-normal">{t("build_vehicle.trim")}</label>

          <Controller
            control={control}
            name="trim"
            defaultValue={props.default?.trim}
            key={`trim-${watch("modelCode")}`}
            render={({ onChange, name, value }) => (
              <SelectInput
                optionLabel="trimList"
                optionValue="trimList"
                data={props.trims.trimList}
                default={props.default?.trim}
                placeholder={t("build_vehicle.enter_trim")}
                onChange={(val: string | number) => {
                  onChange(val);
                }}
                isSearchable={false}
              />
            )}
          />
        </div>
        <div className="col-md-6 col-12 form-group mb-4 pb-xl-3">
          <label className="font-normal">{t("build_vehicle.mileage")}</label>
          <Controller
            control={control}
            name="mileage"
            defaultValue={props.default?.mileage}
            rules={{
              required: true,
              validate: { isNumeric: validator.isNumeric },
              min: 1,
            }}
            key={`mileage-${watch("modelCode")}`}
            render={({ onChange, name, value }) => (
              <input
                className="form-control"
                placeholder={t("build_vehicle.select_mileage")}
                type="text"
                name={name}
                onChange={(e) => {
                  if (!e.target.value.match(/^[0-9]\d*$/) && e.target.value) {
                    setValue("mileage", watch("mileage"));
                  } else {
                    onChange(e.target.value);
                  }
                }}
                value={value}
              />
            )}
          />
          {errors.mileage?.type === "required" && (
            <span className="message-validation">
              {t("build_vehicle.Mileage is required")}
            </span>
          )}
          {errors.mileage?.type === "isNumeric" && (
            <span className="message-validation">
              {t("build_vehicle.Mileage must be number")}
            </span>
          )}
          {errors.mileage?.type === "min" && (
            <span className="message-validation">
              {t("build_vehicle.Mileage must be positive number")}
            </span>
          )}
        </div>
        <div className="col-12 mb-xl-4 pb-3">
          <Controller
            control={control}
            name="agree"
            rules={{ required: true }}
            defaultValue={props.default?.agree}
            render={({ onChange, name, value }) => (
              <input
                type="checkbox"
                id="agree"
                name={name}
                onChange={(e) => onChange(e.target.checked)}
                value={value}
              />
            )}
          />
          <label htmlFor="agree">{t("build_vehicle.trade_in_agreement")}</label>
          {errors.agree && (
            <span className="message-validation">
              {t("build_vehicle.trade_in_agreement_validation")}
            </span>
          )}
        </div>
        <div className="col-md-6 col-12">
          <input
            type="submit"
            className="btn btn-primary btn-block text-uppercase"
            onClick={handleSubmit(props.onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      getBrandList: TradeInActions.getBrandList,
      getModelList: TradeInActions.getModelList,
      getTrimList: TradeInActions.getTrimList,
      getModelYearList: TradeInActions.getModelYearList,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    brands: state.tradeinBrandState,
    models: state.tradeinModelState,
    trims: state.tradeinMileageState,
    modelYears: state.tradeinModelYearState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(TradeInForm);
