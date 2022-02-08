import React from "react";

interface CustomProps {
  onClick: () => void;
}

const ForgotPasswordThankYou: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  return (
    <div className="text-center py-3">
      {/* <img
        src={require("styles/images/forgot-tick.svg")}
        className="mb-4"
        alt=""
      /> */}
      <h3 className="mb-3 pt-3">Password Changed!</h3>
      <p className="text-capitalize mb-5 font-normal text-gray-700">
        Your password has been changed successfully
      </p>
      <button
        className="btn btn-primary btn-block text-uppercase font-weight-normal font-md"
        onClick={() => props.onClick()}
      >
        Login Now
      </button>
    </div>
  );
};

export default ForgotPasswordThankYou;
