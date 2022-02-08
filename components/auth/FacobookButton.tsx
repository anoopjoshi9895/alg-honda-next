import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { bindActionCreators } from "redux";
import { authActions } from "alg-ecom-frontend-core";
import { useRouter } from "next/router";
import { RouteKeys } from "../../utils/route-keys";
import ErrorMessage from "../text/ErrorMessage";
import { RootState } from "../../app/store";

interface CustomProps {
  title: string;
  fbLogin: typeof authActions.fbLogin;
  onSubmit?: () => void;
}

const FacobookButton: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();

  const { t } = useTranslation();
  const [fbLoginError, setFbLoginError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const responseFacebook = async (fbResponse: any) => {
    setFbLoginError("");

    if (fbResponse && fbResponse.status === "unknown") {
      return;
    }
    setIsLoading(true);
    const postData = new FormData();
    postData.append("first_name", fbResponse.first_name);
    postData.append("last_name", fbResponse.last_name);

    if (fbResponse.email) {
      postData.append("email", fbResponse.email);
    }
    if (fbResponse.userPhone) {
      postData.append("userPhone", fbResponse.userPhone);
    }
    if (fbResponse.birthday) {
      postData.append("birthday", fbResponse.birthday);
    }
    if (fbResponse.gender) {
      postData.append("gender", fbResponse.gender);
    }

    postData.append("id", fbResponse.id);
    // if (fbResponse?.picture?.data?.url) {
    //   postData.append('profile_image', fbResponse?.picture?.data?.url);
    // }

    props.fbLogin(
      postData,
      () => {
        if (props.onSubmit) {
          props.onSubmit();
        } else {
          router.push(`${RouteKeys.MyAccount}`);
        }
        setIsLoading(false);
      },
      () => {
        setFbLoginError("Un able to fetch details");
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="first_name,last_name,name, email, picture, birthday,gender,id"
        scope="public_profile, email, user_birthday"
        callback={responseFacebook}
        cssClass="bg-white border cursor-pointer mb-3 metro position-relative social-link w-100"
        icon="icon-facebook-rounded font-xxl position-absolute top-0 left-0 pl-4"
        textButton={props.title}
        render={(renderProps: any) => (
          <button
            onClick={renderProps.onClick}
            disabled={isLoading}
            className="w-100 bg-white social-link border cursor-pointer mb-3 position-relative"
          >
            <i className="icon-fb-fillied font-xxl position-absolute top-0 left-0 pl-4"></i>
            {props.title}
          </button>
        )}
      />
      <ErrorMessage>{fbLoginError}</ErrorMessage>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      fbLogin: authActions.fbLogin,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(FacobookButton);
