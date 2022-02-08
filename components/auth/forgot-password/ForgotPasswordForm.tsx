import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import { RouteKeys } from "../../../utils/route-keys";
import { ForgotPasswordFormProps } from "../../build-vehicle/utils";
import ErrorMessage from "../../text/ErrorMessage";

interface CustomProps {
  popup: boolean;
  onBack?: any;
  onSubmit: (data: ForgotPasswordFormProps) => void;
  isUpdating?: boolean;
  default?: ForgotPasswordFormProps;
}

const ForgotPassowrdForm: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { handleSubmit, errors, control, watch } =
    useForm<ForgotPasswordFormProps>({
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
            <i className="icon-chevron-left font-base mr-3"></i> Forgotten your
            password?
          </span>
        </Link>
      ) : (
        <div
          className="d-flex align-items-center font-weight-bold mb-4 font-lg"
          onClick={() => props?.onBack?.()}
        >
          <i className="icon-chevron-left font-base mr-3"></i> Forgotten your
          password?
        </div>
      )}
      <p className="mb-4 text-gray-700 font-normal">
        We will send you an OTP to the registered mobile number and email
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3 pb-3">
          <label className="font-normal">Email Address</label>
          <Controller
            control={control}
            rules={{
              required: true,
              validate: { isEmail: validator.isEmail },
            }}
            name="emailID"
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
          {errors.emailID && (
            <ErrorMessage>
              {errors.emailID.type === "required"
                ? "Email is required"
                : "Invalid Email"}
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

export default ForgotPassowrdForm;
