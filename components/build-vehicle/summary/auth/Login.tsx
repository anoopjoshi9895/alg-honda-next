import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import { bindActionCreators } from "redux";
import { useRouter } from "next/router";
import ErrorMessage from "../../../text/ErrorMessage";
import { RootState } from "../../../../app/store";

interface CustomProps {
  login: any;
  loginError?: string;
  onForgotPassword?: any;
}

interface LoginFormProps {
  userLogin: string;
  password: string;
}

const Login: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { handleSubmit, errors, control } = useForm<LoginFormProps>({
    shouldFocusError: true,
  });

  const loginUser = async (data: { userLogin: string; password: string }) => {
    props.login(data);
  };

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <div className="row gutter-10">
        <div className="col-12 form-group mb-2 pb-3">
          <label className="font-normal">Email</label>
          <Controller
            control={control}
            rules={{ required: true, validate: { isEmail: validator.isEmail } }}
            name="userLogin"
            render={({ onChange, value, name }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
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
                ? "Email is required"
                : "Invalid Email"}
            </ErrorMessage>
          )}
        </div>
        <div className="col-12 form-group mb-2 pb-3">
          <label className="font-normal">Password</label>
          <Controller
            control={control}
            rules={{ required: true }}
            name="password"
            render={({ onChange, value, name }) => (
              <input
                type="password"
                className="form-control"
                id="login-password"
                placeholder="Enter Password"
                name={name}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.password && (
            <ErrorMessage>
              {errors.password.type === "required"
                ? "Password is required"
                : "Invalid Password"}
            </ErrorMessage>
          )}
        </div>
        <div className="col-12 form-group mb-2 pb-3">
          <ErrorMessage>{props.loginError}</ErrorMessage>
        </div>
        <div className="col-12 mb-3 pb-3 text-right">
          <a
            className="text-primary forgot-link cursor-pointer"
            onClick={() => props?.onForgotPassword?.()}
          >
            {t("form.forgot_your_password")}
          </a>
        </div>
        <div className="col-12">
          <input
            type="submit"
            className="btn btn-primary btn-block text-uppercase font-weight-normal font-md"
            value="Log in"
          />
        </div>
      </div>
    </form>
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
  return {
    loginError: state.authState.loginError,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
