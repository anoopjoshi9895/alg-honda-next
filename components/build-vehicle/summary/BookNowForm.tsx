import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import validator from "validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import RemoteDataDropDown from './RemoteDataDropDown';
import { BookNowFormProps } from "../utils";
import { RadioSelect } from "./radio-select";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../app/store";

const BookNowForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  isUpdating?: boolean;
  default?: BookNowFormProps;
  errorMessage?: string;
  isEdit?: boolean;
  title: string;
}> = (props) => {
  const { t } = useTranslation();
  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<BookNowFormProps>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      // defaultValues: props?.default,
    });

  const maxDate = moment().endOf("day");
  const isDobValid = (current: Date) => {
    return moment(current).isBefore(maxDate);
  };

  return (
    <div className="row gutter-10">
      <div className="col-md-6 col-12 form-group pb-3 mb-1">
        <label className="font-normal">
          {t("form.Name")}
          <sup className="text-primary">*</sup>
        </label>
        <Controller
          control={control}
          name="firstName"
          defaultValue={props.default?.firstName}
          rules={{ required: true }}
          render={({ onChange, name, value }) => (
            <input
              className="form-control"
              placeholder={t("form.Enter First Name")}
              type="text"
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors.firstName && (
          <span className="message-validation">
            {t("form.First name is required")}
          </span>
        )}
      </div>
      <div className="col-md-6 col-12 form-group pb-3 mb-1">
        <label className="font-normal">&nbsp;</label>
        <Controller
          control={control}
          name="lastName"
          defaultValue={props.default?.lastName}
          rules={{ required: true }}
          render={({ onChange, name, value }) => (
            <input
              className="form-control"
              placeholder={t("form.Enter Last Name")}
              type="text"
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors.lastName && (
          <span className="message-validation">
            {t("form.Last name is required")}
          </span>
        )}
      </div>
      <div className="col-12 form-group pb-3 mb-1">
        <label className="font-normal">
          {t("form.Gender")}
          <sup className="text-primary">*</sup>
        </label>
        <Controller
          control={control}
          name="gender"
          rules={{ required: true }}
          defaultValue={props.default?.gender}
          render={({ onChange, name }) => (
            <RadioSelect
              defaultValue={watch("gender")}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              optionLabel={"label"}
              optionValue={"value"}
              onChange={onChange}
              className="border w-50 px-3 py-2"
              containerClass="input-group"
              labelClass="w-100"
            />
          )}
        />
        {errors.gender && (
          <span className="message-validation">
            {t("form.Gender is required")}
          </span>
        )}
        {/* <div className="input-group">
          <div className="border w-50 px-3 py-2">
            <input type="radio" id="male" name="gender" />
            <label htmlFor="male" className="w-100">
              Male
            </label>
          </div>
          <div className="border w-50 px-3 py-2 border-left-0">
            <input type="radio" id="female" name="gender" />
            <label htmlFor="female" className="w-100">
              Female
            </label>
          </div>
        </div> */}
      </div>
      <div className="col-12 form-group pb-3 mb-1">
        <label className="font-normal">
          {t("form.Phone Number")}
          <sup className="text-primary">*</sup>
        </label>
        <Controller
          control={control}
          name="phoneNumber"
          defaultValue={props.default?.phoneNumber}
          rules={{
            required: true,
            minLength: 11,
          }}
          key={`phoneNumber`}
          render={({ onChange, name, value }) => (
            <PhoneInput
              country={"kw"}
              preferredCountries={["kw", "in"]}
              enableSearch={false}
              placeholder={t("form.Enter Phone Number")}
              inputClass={"textField__input"}
              containerClass={"textField"}
              dropdownStyle={{ borderColor: "#e5e6e7" }}
              disableCountryCode={false}
              countryCodeEditable={true}
              inputStyle={{
                width: "100%",
                borderRadius: "0px",
                borderColor: "#e5e6e7",
              }}
              disableSearchIcon={true}
              onChange={(val, data: { dialCode: string }) => {
                onChange(val);
              }}
              value={`${watch("countryCode")}${watch("phone")}`}
            />
          )}
        />

        <div className="font-xxs text-muted mt-2">
          {t("form.Select Country Code and then enter 8 digit number")}
        </div>
        {errors.phoneNumber && (
          <>
            {errors.phoneNumber.type === "required" && (
              <span className="message-validation">
                {t("form.Phone nummber is required")}
              </span>
            )}
            {errors.phoneNumber.type === "minLength" && (
              <span className="message-validation">
                {t("form.Phone number 11 required")}
              </span>
            )}
          </>
        )}
      </div>
      <div className="col-12 form-group pb-3 mb-1">
        <label className="font-normal">
          {t("form.Email")}
          <sup className="text-primary">*</sup>
        </label>
        <Controller
          control={control}
          name="email"
          defaultValue={props.default?.email}
          rules={{
            required: true,
            validate: { isEmail: validator.isEmail },
          }}
          render={({ onChange, name, value }) => (
            <input
              className="form-control"
              placeholder={t("form.Enter Email Address")}
              type="text"
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <>
            {errors.email.type === "required" && (
              <span className="message-validation">
                {t("form.Email is required")}
              </span>
            )}
            {errors.email.type === "isEmail" && (
              <span className="message-validation">
                {t("form.Invalid email")}
              </span>
            )}{" "}
          </>
        )}
      </div>
      <div className="col-md-9 col-12 mb-xl-4 pb-3 pt-2">
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
        <label htmlFor="agree" className="text-gray-900">
          {t("form.agreeText")}
        </label>
        {errors.agree && (
          <span className="message-validation">
            {t("build_vehicle.trade_in_agreement_validation")}
          </span>
        )}
      </div>
      <div className="col-md-9 col-12 mb-3">
        {props.errorMessage && (
          <span className="message-validation">{props.errorMessage}</span>
        )}
      </div>

      <div className="col-md-9 col-12 mb-3">
        <button
          type="submit"
          className="btn btn-primary btn-block text-uppercase font-md"
          onClick={handleSubmit(props.onSubmit)}
        >
          {t("build_vehicle.submit")}
        </button>
      </div>
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

export default connect(mapStateToProps, mapActionsToProps)(BookNowForm);
