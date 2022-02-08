import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import { RouteKeys } from "../../../utils/route-keys";
import { ResetPasswordFormProps } from "../../build-vehicle/utils";
import ErrorMessage from "../../text/ErrorMessage";

interface CustomProps {
  popup: boolean;
  onBack?: any;
  onSubmit: (data: ResetPasswordFormProps) => void;
  isUpdating?: boolean;
  default?: ResetPasswordFormProps;
}

const ResetPasswordForm: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { handleSubmit, errors, control, watch } =
    useForm<ResetPasswordFormProps>({
      shouldFocusError: true,
    });
  const onSubmit = (data: any) => {
    //
    props.onSubmit?.(data);
  };
  return (
    <>
      {!props.popup ? (
        <Link href={`${RouteKeys.Auth}`} passHref>
          <span className="d-flex align-items-center font-weight-bold mb-4 font-lg">
            <i className="icon-chevron-left font-base mr-3"></i> Reset your
            password?
          </span>
        </Link>
      ) : (
        <div
          className="d-flex align-items-center font-weight-bold mb-4 font-lg"
          onClick={() => props?.onBack?.()}
        >
          <i className="icon-chevron-left font-base mr-3"></i> Reset your
          password?
        </div>
      )}
      {/* <p className="mb-4 text-gray-700 font-normal">
        We will send you an OTP to the registered mobile number
      </p> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3 pb-3">
          <label className="font-normal">Password</label>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="newPassWord"
            render={({ onChange, value, name }) => (
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                name={name}
                value={value}
                onChange={onChange}
                id="login-email"
              />
            )}
          />
          {errors.newPassWord && (
            <ErrorMessage>
              {errors.newPassWord && "Password is required"}
            </ErrorMessage>
          )}
        </div>
        <div className="form-group mb-3 pb-3">
          <label className="font-normal">Confirm Password</label>
          <Controller
            control={control}
            rules={{
              required: true,
              validate: {
                isMatching: (value) => value === watch("newPassWord"),
              },
            }}
            name="confirmPassword"
            render={({ onChange, value, name }) => (
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                name={name}
                value={value}
                onChange={onChange}
                id="login-email"
              />
            )}
          />
          {errors.confirmPassword && (
            <ErrorMessage>
              {errors.confirmPassword.type === "required"
                ? "Password is required"
                : "Password not matching"}
            </ErrorMessage>
          )}
        </div>
        <div className="">
          <input
            type="submit"
            className="btn btn-primary btn-block text-uppercase font-weight-normal font-md"
            value="Send"
          />
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
