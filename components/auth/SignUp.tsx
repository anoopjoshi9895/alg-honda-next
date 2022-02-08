import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import validator from "validator";
import { bindActionCreators } from "redux";
import ErrorMessage from "../../components/text/ErrorMessage";
import { api, authActions } from "alg-ecom-frontend-core";
import OtpForm from "./OtpForm";
import ReactModal from "react-modal";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { RouteKeys } from "../../route/route-keys";
import UserConfirmPopUp from "./UserConfirmPopUp";
import { RootState } from "../../app/store";
const customStyles: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "1140px",
    width: "100%",
    border: "0",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
    padding: "0",
    margin: "20px auto",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "auto",
  },
};
interface CustomProps {
  verifyOtp: typeof authActions.verifyOtp;
  otpError?: string;
}

interface SignUpFormProps {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhone: string;
  agree: boolean;
  userPassword: string;
}

interface OTPFormProps {
  otp: string;
}

const Login: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [signUpError, setSignUpError] = React.useState<string | undefined>(
    undefined
  );
  const [signUpOTPError, setSignUpOTPError] = React.useState<
    string | undefined
  >(undefined);
  const [isSubmiting, setSubmiting] = React.useState(false);
  const [isUserConfirm, setUserConfirm] = React.useState<boolean>(false);
  const [isAuthOTPActive, setAuthOTPActive] = React.useState(false);
  const [userId, setUserId] = React.useState<number>(0);
  const [signUpData, setSignUpData] = React.useState<
    SignUpFormProps | undefined
  >(undefined);

  const { handleSubmit, errors, control, watch } = useForm<SignUpFormProps>({
    shouldFocusError: true,
  });

  const onSignUpSubmit = async (data: SignUpFormProps) => {
    const postData = new FormData();
    postData.append("userFirstName", data.userFirstName);
    postData.append("userLastName", data.userLastName);
    postData.append("userEmail", data.userEmail);
    postData.append("userPhone", data.userPhone);
    postData.append("userPassword", data.userPassword);
    setSubmiting(true);
    setSignUpData(data);
    try {
      const response = await api.user.signUp(postData);
      if (response.responsecode === 200) {
        setUserConfirm(false);
        setSignUpError(undefined);
        setUserId(response?.data?.userID);
        setAuthOTPActive(true);
      } else if (response?.responsecode === 409) {
        setUserConfirm(true);
        setSignUpError(response?.message);
      } else {
        setSignUpError(response?.message);
      }
    } catch (error: any) {
      if (error?.response?.data?.meta?.responsecode === 409) {
        setUserConfirm(true);
        setSignUpError(error?.response?.data?.meta?.message);
      } else {
        setSignUpError(error?.response?.data?.meta?.message);
      }
    }
    setSubmiting(false);
  };

  const onSignUpOTPSubmit = async (data: OTPFormProps) => {
    const postData = new FormData();

    postData.append("userID", userId?.toString() || "");

    postData.append("otp", data.otp);

    props.verifyOtp(postData, () => {
      router.push(`
      ${RouteKeys.MyAccount}`);
    });
  };

  const onSubmitConfirm = async (data: { confirm: string }) => {
    const signupData = cloneDeep(signUpData);
    const postData = new FormData();

    if (signupData) {
      postData.append("userFirstName", signupData.userFirstName);
      postData.append("userLastName", signupData.userLastName);
      postData.append("userEmail", signupData.userEmail);
      postData.append("userPhone", `+${signupData.userPhone}`);
      postData.append("userPassword", signupData.userPassword);
      postData.append("dupConfirm", data.confirm);
      setSubmiting(true);
      try {
        const response = await api.user.signUp(postData);
        if (response.responsecode === 200) {
          setUserConfirm(false);
          setSignUpError(undefined);
          setUserId(response?.data?.userID);
          setSignUpData(response?.data);
          setAuthOTPActive(true);
        } else if (response?.responsecode === 409) {
          setUserConfirm(true);
          setSignUpError(response?.message);
        } else {
          setSignUpError(response?.message);
        }
      } catch (error: any) {
        if (error?.response?.data?.meta?.responsecode === 409) {
          setUserConfirm(true);
          setSignUpError(error?.response?.data?.meta?.message);
        } else {
          setSignUpError(error?.response?.data?.meta?.message);
        }
      }
      setSubmiting(false);
    }
  };

  return (
    <>
      {isUserConfirm && (
        <ReactModal
          isOpen={isUserConfirm}
          contentLabel="Save Donfig"
          className="small-popup"
          style={customStyles}
          onRequestClose={() => setUserConfirm(false)}
          shouldCloseOnOverlayClick={true}
        >
          <UserConfirmPopUp
            onClose={() => setUserConfirm(false)}
            onSubmit={onSubmitConfirm}
            errorMessage={signUpError}
          />
        </ReactModal>
      )}
      {!isAuthOTPActive ? (
        <form onSubmit={handleSubmit(onSignUpSubmit)}>
          <div className="row gutter-10">
            <div className="col-md-6 col-12 form-group mb-2 pb-3">
              <label className="font-normal">
                {t("car_service.first_name")}
              </label>
              <Controller
                control={control}
                rules={{ required: true, maxLength: 25 }}
                name="userFirstName"
                render={({ onChange, value, name }) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("form.Enter First Name")}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id="userFirstName"
                  />
                )}
              />
              {errors.userFirstName &&
                errors.userFirstName.type === "required" && (
                  <ErrorMessage>
                    {t("form.Please enter first name")}
                  </ErrorMessage>
                )}

              {errors.userFirstName &&
                errors.userFirstName.type === "maxLength" && (
                  <ErrorMessage>
                    {t("form.Password should contains alteat 25 characters")}
                  </ErrorMessage>
                )}
            </div>
            <div className="col-md-6 col-12 form-group mb-2 pb-3">
              <label className="font-normal">{t("form.Last Name")}</label>
              <Controller
                control={control}
                rules={{ required: true, maxLength: 25 }}
                name="userLastName"
                render={({ onChange, value, name }) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("form.Enter Last Name")}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id="userLastName"
                  />
                )}
              />
              {errors.userLastName && (
                <ErrorMessage>{t("form.Please enter last name")}</ErrorMessage>
              )}
              {errors.userLastName &&
                errors.userLastName.type === "maxLength" && (
                  <ErrorMessage>
                    {t("form.Password should contains alteat 25 characters")}
                  </ErrorMessage>
                )}
            </div>
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
                      {t("form.Phone number 11 required")}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="col-12 form-group mb-2 pb-3">
              <label className="font-normal">{t("form.Email")}</label>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: { isEmail: validator.isEmail },
                }}
                name="userEmail"
                render={({ onChange, value, name }) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("car_service.Enter Email")}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id="login-email"
                  />
                )}
              />
              {errors.userEmail && (
                <ErrorMessage>
                  {errors.userEmail.type === "required"
                    ? t("form.Email is required")
                    : t("form.Invalid email")}
                </ErrorMessage>
              )}
            </div>
            <div className="col-12 form-group mb-2 pb-3">
              <label className="font-normal">
                {t("form.Create a Password")}
              </label>
              <Controller
                control={control}
                rules={{ required: true, minLength: 6, maxLength: 25 }}
                name="userPassword"
                render={({ onChange, value, name }) => (
                  <input
                    type="password"
                    className="form-control"
                    placeholder={t("form.Enter Password")}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id="userPassword"
                  />
                )}
              />
              {errors.userPassword &&
                errors.userPassword.type === "required" && (
                  <ErrorMessage>{t("form.Please enter Password")}</ErrorMessage>
                )}
              {errors.userPassword &&
                errors.userPassword.type === "maxLength" && (
                  <ErrorMessage>
                    {t("form.Password should contains maximum 25 characters")}
                  </ErrorMessage>
                )}
              {errors.userPassword &&
                errors.userPassword.type === "minLength" && (
                  <ErrorMessage>
                    {t("form.Password should contains alteat 6 characters")}
                  </ErrorMessage>
                )}
            </div>
            <div className="col-12 mb-2 pb-3 account-check">
              <Controller
                control={control}
                name="agree"
                rules={{ required: true }}
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
              <label htmlFor="agree">{t("form.agreeText3")}</label>
              {errors.agree && (
                <ErrorMessage>
                  {t("form.Accept Terms to continue")}
                </ErrorMessage>
              )}
            </div>
            <div className="col-12 form-group mb-2 pb-3">
              <ErrorMessage>{signUpError}</ErrorMessage>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase font-weight-normal font-md"
                value="Sign up"
                disabled={isSubmiting}
              >
                {t("common.Sign up")}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <OtpForm
          onSubmit={onSignUpOTPSubmit}
          errorMessage={props.otpError}
          phoneNumber={signUpData?.userPhone}
        ></OtpForm>
      )}
    </>
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

export default connect(mapStateToProps, mapActionsToProps)(Login);
