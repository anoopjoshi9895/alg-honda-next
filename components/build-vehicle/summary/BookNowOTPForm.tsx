import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BookNowOTPFormProps } from "../utils";
import OTPInput from "../../../components/otp-input/OTPInput";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../app/store";

const BookNowOTPForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  isUpdating?: boolean;
  default?: BookNowOTPFormProps;
  errorMessage?: string;
  isEdit?: boolean;
}> = (props) => {
  const { t } = useTranslation();
  const { control, errors, handleSubmit } = useForm<{
    otp: string;
  }>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <>
      <Controller
        control={control}
        name="otp"
        rules={{ required: true }}
        render={({ onChange, name, value }) => <OTPInput onChange={onChange} />}
      />
      {errors.otp && (
        <span className="message-validation">
          {t("build_vehicle.Enter OTP")}
        </span>
      )}

      <div className="col-md-9 col-12 mb-3">
        {props.errorMessage && (
          <span className="message-validation">{props.errorMessage}</span>
        )}
      </div>
      <div className="col-md-12 col-12 p-0">
        <input
          type="submit"
          className="btn btn-primary btn-block text-uppercase font-md"
          onClick={handleSubmit(props.onSubmit)}
        />
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
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(BookNowOTPForm);
