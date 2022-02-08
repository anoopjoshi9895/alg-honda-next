import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SignUpFormProps } from "../build-vehicle/utils";
import OTPInput from "../../components/otp-input/OTPInput";
import ErrorMessage from "../../components/text/ErrorMessage";
import { useTranslation } from "react-i18next";
import { RootState } from "../../app/store";

const SignUpForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  isUpdating?: boolean;
  default?: SignUpFormProps;
  errorMessage?: string;
  isEdit?: boolean;
  title?: string;
  phoneNumber?: string;
}> = (props) => {
  const { t } = useTranslation();
  const [isSubmited, setIsSubmited] = React.useState<boolean>(false);

  const { control, errors, handleSubmit, watch } = useForm<{
    otp: string;
  }>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: any) => {
    setIsSubmited(true);

    props.onSubmit?.(data);
  };

  return (
    <div className="row gutter-10">
      <div className="col-lg-12 col-12 p-lg-5 p-sm-4 p-3">
        <h3 className="font-weight-bold text-uppercase">
          {t("common.Enter OTP")}
        </h3>
        <p className="font-normal text-muted mb-4 pb-1">
          {t("common.Please type the verification code sent to")}
          {/* +{props.phoneNumber} */}
        </p>
        <Controller
          control={control}
          name="otp"
          rules={{ required: true }}
          render={({ onChange, name, value }) => (
            <OTPInput onChange={onChange} />
          )}
        />
        {errors.otp && (
          <span className="message-validation">{t("common.Enter OTP")}</span>
        )}
        {watch("otp") && props.errorMessage && isSubmited && (
          <div className="col-12 form-group mb-2 pb-3 mt-3 ml-0 pl-0">
            <ErrorMessage>{props.errorMessage}</ErrorMessage>
          </div>
        )}
        <div className="mb-2 mt-4 pb-1">
          <button
            type="submit"
            className="btn btn-primary btn-block text-uppercase font-md"
            onClick={handleSubmit(onSubmit)}
          >
            {t("build_vehicle.submit")}
          </button>
        </div>
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
