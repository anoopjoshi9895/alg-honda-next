import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { bindActionCreators } from "redux";
import { authActions } from "alg-ecom-frontend-core";
import { useRouter } from "next/router";
import { RouteKeys } from "../../utils/route-keys";
import ErrorMessage from "../text/ErrorMessage";
import { RootState } from "../../app/store";

interface CustomProps {
  title: string;
  googleLogin: typeof authActions.googleLogin;
  onSubmit?: (userID?: number, userToken?: string) => void;
}

const GoogleButton: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [googleLoginError, setGoogleLoginError] = React.useState("");
  const onResponseFromGoogle = async (gResponse: any) => {
    const postData = new FormData();
    const profileObj = gResponse?.profileObj;

    postData.append("given_name", profileObj?.givenName);
    postData.append("family_name", profileObj?.familyName);
    postData.append("email", profileObj?.email);
    postData.append("userPhone", profileObj?.userPhone || "");
    postData.append("birthday", profileObj?.birthday || "");
    postData.append("gender", profileObj?.gender || "");
    postData.append("id", profileObj?.googleId);
    postData.append("profile_image", profileObj?.imageUrl);
    props.googleLogin(
      postData,
      (userID?: number, userToken?: string) => {
        if (userID && props.onSubmit) {
          props.onSubmit(userID, userToken);
        } else if (props.onSubmit) {
          props.onSubmit();
        } else {
          router.push(`${RouteKeys.MyAccount}`);
        }
      },
      () => {
        setGoogleLoginError("Un able to fetch details");
      }
    );
  };

  const onFailureResponseFromGoogle = (response: any) => {
    // setGoogleLoginError('Un able to fetch details');
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          autoLoad={false}
          isSignedIn={false}
          prompt={"select_account"}
          render={(renderProps) => (
            <div
              onClick={renderProps.onClick}
              className="social-link border cursor-pointer mb-3 position-relative text-body"
            >
              <i className="icon-gplus font-xxl position-absolute top-0 left-0 pl-4">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
                <span className="path6"></span>
              </i>
              {props.title}
            </div>
          )}
          buttonText={props.title}
          onSuccess={onResponseFromGoogle}
          onFailure={onFailureResponseFromGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}

      <ErrorMessage>{googleLoginError}</ErrorMessage>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      googleLogin: authActions.googleLogin,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(GoogleButton);
