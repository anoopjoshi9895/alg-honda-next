import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import validator from "validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import RemoteDataDropDown from './RemoteDataDropDown';
import { SignUpFormProps } from "../../utils";
import { RootState } from "../../../../app/store";

const SignUpForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  isUpdating?: boolean;
  default?: SignUpFormProps;
  errorMessage?: string;
  isEdit?: boolean;
  title?: string;
  isSignUpSubmiting?: boolean;
}> = (props) => {
  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<SignUpFormProps>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      // defaultValues: props?.default,
    });

  return (
    <div className="row gutter-10">
      <div className="col-md-6 col-12 form-group mb-2 pb-3">
        <label className="font-normal">First Name</label>
        <Controller
          control={control}
          name="firstName"
          defaultValue={props.default?.firstName}
          rules={{ required: true }}
          render={({ onChange, name, value }) => (
            <input
              className="form-control"
              placeholder="Enter First Name"
              type="text"
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors.firstName && (
          <span className="message-validation">First name is required</span>
        )}
      </div>
      <div className="col-md-6 col-12 form-group mb-2 pb-3">
        <label className="font-normal">Last Name</label>
        <Controller
          control={control}
          name="lastName"
          defaultValue={props.default?.lastName}
          rules={{ required: true }}
          render={({ onChange, name, value }) => (
            <input
              className="form-control"
              placeholder="Enter Last Name"
              type="text"
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors.lastName && (
          <span className="message-validation">Last name is required</span>
        )}
      </div>
      <div className="col-12 form-group mb-2 pb-3">
        <label className="font-normal">Phone Number</label>
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
              placeholder={"Enter Phone Number"}
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

        {errors.phoneNumber && (
          <>
            {errors.phoneNumber.type === "required" && (
              <span className="message-validation">
                Phone nummber is required
              </span>
            )}
            {errors.phoneNumber.type === "minLength" && (
              <span className="message-validation">
                Phone nummber is should be 11 digits with country code
              </span>
            )}
          </>
        )}
      </div>
      <div className="col-12 form-group mb-2 pb-3">
        <>
          <label className="font-normal">Email</label>
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
                placeholder="Enter Email Address"
                type="text"
                name={name}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </>
        {errors.email && (
          <>
            {errors.email.type === "required" && (
              <span className="message-validation">Email is required</span>
            )}
            {errors.email.type === "isEmail" && (
              <span className="message-validation">Invalid email</span>
            )}{" "}
          </>
        )}
      </div>

      <div className="col-12 form-group mb-2 pb-3">
        <label className="font-normal">Create a Password</label>
        <Controller
          control={control}
          name="password"
          defaultValue={props.default?.password}
          rules={{ required: true }}
          render={({ onChange, name, value }) => (
            <input
              className="form-control"
              placeholder="Enter Password"
              type="password"
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>
      <div className="col-12 mb-2 pb-3 account-check">
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
        <label htmlFor="agree">
          I have read and accept Honda Alghanim Terms of Use and Privacy Policy
        </label>
        {errors.agree && (
          <span className="message-validation">Accept to continue</span>
        )}
      </div>
      <div className="col-12">
        <input
          type="submit"
          className="btn btn-primary btn-block text-uppercase font-weight-normal font-md"
          value="Sign up"
          onClick={handleSubmit(props.onSubmit)}
          disabled={props.isSignUpSubmiting}
        />
      </div>
      <div className="col-md-9 col-12 mb-3">
        {props.errorMessage && (
          <span className="message-validation">{props.errorMessage}</span>
        )}
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

export default connect(mapStateToProps, mapActionsToProps)(SignUpForm);
