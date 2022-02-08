import React from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import { bindActionCreators } from "redux";
import ErrorMessage from "../../components/text/ErrorMessage";
import { api, authActions, types } from "alg-ecom-frontend-core";
import OtpForm from "./OtpForm";
import { useRouter } from "next/router";
import { RouteKeys } from "../../utils/route-keys";
import Link from "next/link";
import { RootState } from "../../app/store";

interface CustomProps {
  login: typeof authActions.login;
  loginError?: string;
  verifyOtp: typeof authActions.verifyOtp;
}

interface LoginFormProps {
  userLogin: string;
  password: string;
}
interface OTPFormProps {
  otp: string;
}
const Login: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [isShowOtpForm, setShowOtpForm] = React.useState(false);
  const [userId, setUserId] = React.useState<number>(0);
  const [userToken, setUserToken] = React.useState<string>("");
  const { handleSubmit, errors, control } = useForm<LoginFormProps>({
    shouldFocusError: true,
  });

  const loginUser = async (data: { userLogin: string; password: string }) => {
    props.login(
      data,
      async (userID?: number, token?: string, verified?: boolean) => {
        if (userID && token && !verified) {
          setShowOtpForm(true);
          setUserId(userID || 0);
          try {
            const postData = new FormData();
            postData.append("userID", userID.toString());
            const response = await api.user.resendOtp(postData);
          } catch (error) {
            // nothing
          }

          setUserToken(token || "");
        } else {
          router.push(`${RouteKeys.Home}`);
        }
      }
    );
  };
  const onSignUpOTPSubmit = async (data: OTPFormProps) => {
    const postData = new FormData();
    postData.append("userID", userId.toString());
    postData.append("otp", data.otp);
    props.verifyOtp(postData, () => {
      router.push(`${RouteKeys.Home}`);
    });
  };
  React.useEffect(() => {
    dispatch({
      type: types.LOGIN_ERROR,
      data: { errorMessage: "" },
    });
  }, []);
  return (
    <>
      {!isShowOtpForm && (
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="row gutter-10">
            <div className="col-12 form-group mb-2 pb-3">
              <label className="font-normal">{t("form.Email")}</label>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: { isEmail: validator.isEmail },
                }}
                name="userLogin"
                render={({ onChange, value, name }) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("form.Enter Email")}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id="login-email"
                  />
                )}
              />
              {errors.userLogin && (
                <ErrorMessage>
                  {errors.userLogin.type === "required"
                    ? t("form.Email is required")
                    : t("form.Invalid Email")}
                </ErrorMessage>
              )}
            </div>
            <div className="col-12 form-group mb-2 pb-3">
              <label className="font-normal">{t("form.Password")}</label>
              <Controller
                control={control}
                rules={{ required: true }}
                name="password"
                render={({ onChange, value, name }) => (
                  <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    placeholder={t("form.Enter Password")}
                    name={name}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.password && (
                <ErrorMessage>
                  {errors.password.type === "required"
                    ? t("form.Password is required")
                    : t("form.Invalid Password")}
                </ErrorMessage>
              )}
            </div>
            <div className="col-12 form-group mb-2 pb-3">
              <ErrorMessage>{props.loginError}</ErrorMessage>
            </div>
            <div className="col-12 mb-3 pb-3 text-right">
              <Link href={`${RouteKeys.ForgotPassword}`} passHref>
                <a className="text-primary forgot-link">
                  Forgot your password?
                </a>
              </Link>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase font-weight-normal font-md"
                value="Log in"
              >
                {t("common.Log in")}{" "}
              </button>
            </div>
          </div>
        </form>
      )}
      {isShowOtpForm && (
        <OtpForm onSubmit={onSignUpOTPSubmit} errorMessage={""}></OtpForm>
      )}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      login: authActions.login,
      verifyOtp: authActions.verifyOtp,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    loginError: state.authState.loginError,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
