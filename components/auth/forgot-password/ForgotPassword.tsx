import React from "react";
import ForgotPassowrdForm from "./ForgotPasswordForm";
import OtpForm from "../OtpForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { api } from "alg-ecom-frontend-core";

import { toastr } from "react-redux-toastr";
import ForgotPasswordThankYou from "./ForgotPasswordThankYou";
import {
  ForgotPasswordFormProps,
  ResetPasswordFormProps,
} from "../../build-vehicle/utils";

interface CustomProps {
  onReset?: any;
  // popup: boolean;
}

enum Steps {
  email = "email",
  otp = "otp",
  reset = "reset",
  thanks = "thanks",
}
interface OTPFormProps {
  otp: string;
}
const ForgotPassword: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [activeStep, setActiveStep] = React.useState<Steps>(Steps.email);
  const [userID, setUserID] = React.useState<string | undefined>(undefined);
  const onSubmitEmail = async (data: ForgotPasswordFormProps) => {
    const postData = new FormData();
    postData.append("emailID", data.emailID);
    try {
      const response = await api.user.forgotPassword(postData);
      if (response?.responsecode === 200) {
        setUserID(response?.data?.userID);
        setActiveStep(Steps.otp);
      } else {
        toastr.error("Error", response?.message);
      }
    } catch (error: any) {
      toastr.error("Error", error?.response?.data?.meta?.message);
    }

    //
  };
  // const onSubmitOtp = (data: any) => {
  //
  //   //
  // };
  const onSubmitOtp = async (data: OTPFormProps) => {
    if (userID) {
      try {
        const postData = new FormData();
        postData.append("userID", userID);
        postData.append("otp", data.otp);
        const response = await api.user.verifyOtp(postData);
        if (response?.responsecode === 200) {
          setActiveStep(Steps.reset);
        } else {
          toastr.error("Error", response?.message);
        }
      } catch (error: any) {
        toastr.error("Error", error?.response?.data?.meta?.message);
      }
    }
  };
  const onSubmitReset = async (data: ResetPasswordFormProps) => {
    if (userID) {
      try {
        const postData = new FormData();
        postData.append("userID", userID);
        postData.append("newPassWord", data.newPassWord);
        postData.append("confirmPassword", data.confirmPassword);
        const response = await api.user.resetPassword(postData);
        if (response?.responsecode === 200) {
          setActiveStep(Steps.thanks);
        } else {
          toastr.error("Error", response?.message);
        }
      } catch (error: any) {
        toastr.error("Error", error?.response?.data?.meta?.message);
      }
    }
  };
  return (
    <>
      {activeStep === Steps.email && (
        <ForgotPassowrdForm
          popup={false}
          onSubmit={onSubmitEmail}
          onBack={() => props?.onReset?.()}
        />
      )}
      {activeStep === Steps.otp && (
        <OtpForm
          onSubmit={onSubmitOtp}
          errorMessage={""}
          phoneNumber={""}
        ></OtpForm>
      )}
      {activeStep === Steps.reset && (
        <ResetPasswordForm
          popup={false}
          onSubmit={onSubmitReset}
          onBack={() => props?.onReset?.()}
        />
      )}
      {activeStep === Steps.thanks && (
        <ForgotPasswordThankYou onClick={() => props.onReset()} />
      )}
    </>
  );
};

export default ForgotPassword;
