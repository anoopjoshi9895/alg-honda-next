import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import { bindActionCreators } from "redux";
import ErrorMessage from "../../components/text/ErrorMessage";
import { api, authActions } from "alg-ecom-frontend-core";
import OtpForm from "./OtpForm";
import { useRouter } from "next/router";
import { RouteKeys } from "../../utils/route-keys";
import { RootState } from "../../app/store";

interface CustomProps {
  verifyOtp: typeof authActions.verifyOtp;
  otpError?: string;
  userID: number;
  userToken: string;
  onSubmit?: () => void;
}

interface SignUpFormProps {
  userPhone: string;
}

interface OTPFormProps {
  otp: string;
}

const UpdatePhone: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();

  const { t } = useTranslation();

  const [signUpError, setSignUpError] = React.useState<string | undefined>(
    undefined
  );

  const [signUpOTPError, setSignUpOTPError] = React.useState<
    string | undefined
  >(undefined);

  const [isSubmiting, setSubmiting] = React.useState(false);

  const [isAuthOTPActive, setAuthOTPActive] = React.useState(false);

  const [userPhone, setUserPhone] = React.useState<string>();

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<SignUpFormProps>({
    shouldFocusError: true,
  });

  const onSignUpSubmit = async (data: SignUpFormProps) => {
    const postData = new FormData();

    postData.append("userPhone", data.userPhone);

    postData.append("userID", props.userID?.toString());

    setSubmiting(true);

    try {
      const response = await api.user.changeUserPhone(
        postData,

        props.userToken
      );

      if (response.responsecode === 200) {
        setSignUpError(undefined);

        setUserPhone(data.userPhone);

        setAuthOTPActive(true);
      } else {
        setSignUpError(response?.message);
      }
    } catch (error: any) {
      setSignUpError(error?.response?.data?.meta?.message);
    }

    setSubmiting(false);
  };

  const onSignUpOTPSubmit = async (data: OTPFormProps) => {
    const postData = new FormData();

    postData.append("userID", props.userID?.toString());

    postData.append("otp", data.otp);

    props.verifyOtp(postData, () => {
      if (props.onSubmit) {
        props.onSubmit();
      } else {
        router.push(`${RouteKeys.MyAccount}`);
      }
    });
  };

  return !isAuthOTPActive ? (
    <form onSubmit={handleSubmit(onSignUpSubmit)}>
      <div className="row gutter-10">
        <div className="col-12 form-group mb-2 pb-3">
          <label className="font-normal">{t("form.Phone Number")}</label>

          <Controller
            control={control}
            name="userPhone"
            rules={{
              required: true,
              minLength: 11,
            }}
            key={`phoneNumber`}
            render={({ onChange, name, value }) => (
              <ReactPhoneInput
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
                autoFormat={false}
              />
            )}
          />

          {errors.userPhone && (
            <>
              {errors.userPhone.type === "required" && (
                <span className="message-validation">
                  {t("form.Phone number is required")}
                </span>
              )}
              {errors.userPhone.type === "minLength" && (
                <span className="message-validation">
                  {t("form.Phone number 11 require")}
                </span>
              )}
            </>
          )}
        </div>
        {signUpError && (
          <div className="col-12 form-group mb-2 pb-3 mt-3 ml-0 pl-0">
            <ErrorMessage>{signUpError}</ErrorMessage>
          </div>
        )}
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary btn-block text-uppercase font-weight-normal font-md"
            value="Verify phone number"
            disabled={isSubmiting}
          >
            {t("form.Verify phone number")}
          </button>
        </div>
      </div>
    </form>
  ) : (
    <OtpForm
      onSubmit={onSignUpOTPSubmit}
      errorMessage={props.otpError}
      phoneNumber={userPhone}
    ></OtpForm>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,

      verifyOtp: authActions.verifyOtp,
    },

    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    otpError: state.authState.otpError,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(UpdatePhone);
