import React from "react";
import classnames from "classnames";
// import Login from './Login';
// import SignUp from './SignUp';
// import '../../assets/sass/common.scss';
// import '../../assets/sass/login.scss';
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { RouteKeys } from "../../route/route-keys";
import FacobookButton from "../../components/auth/FacobookButton";
import GoogleButton from "../../components/auth/GoogleButton";
import UpdatePhone from "../../components/auth/UpdatePhone";
import Login from "../../components/auth/Login";
import SignUp from "../../components/auth/SignUp";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Layout from "../../components/Layout";
import { IFooter } from "../../models/models";
import { store } from "../../app/store";
import { getFooterAsync } from "../../feature/footerSlice";
import {loadFooterData} from "../../apiService/apiService"
enum AuthTab {
  signUp = "signUp",
  signIn = "signIn",
}
interface CustomProps {
  locale: string;
  footerData: IFooter;
}
const Auth: NextPage<CustomProps> = (props: CustomProps) => {
  const { t, i18n } = useTranslation();
  const [tabName, setTabName] = React.useState(AuthTab.signIn);
  const [isShowOtpForm, setShowOtpForm] = React.useState(false);
  const [userId, setUserId] = React.useState<number>(0);
  const [userToken, setUserToken] = React.useState<string>("");

  const onGoogleSubmit = (userID?: number, token?: string) => {
    setUserId(userID || 0);
    setUserToken(token || "");
    setShowOtpForm(true);
  };

  return (
    <Layout footerData={props.footerData} avoidFooter={true} avoidHeader={true}>
      <div className="account-outer bg-gray-300 py-5">
        <div className="container">
          <div className="text-center mb-4 pb-2">
            <Link href={`${RouteKeys.Home}`} passHref>
              <Image
                src={"/logo.png"}
                alt="Honda"
                className="img-fluid"
                width={136}
                height={44}
              />
            </Link>
          </div>
          <div className="account-box bg-white px-3 py-4">
            <div className="account-box-inner">
              {!isShowOtpForm ? (
                <>
                  <div className="border-bottom">
                    <ul
                      className="nav tab-underline tab-underline--primary p-0 mb-0 row"
                      id="account-tab"
                      role="tablist"
                    >
                      <li
                        className="cursor-pointer nav-item col-auto mr-lg-3"
                        role="presentation"
                      >
                        <a
                          className={classnames({
                            "nav-link": true,
                            active: tabName === AuthTab.signIn,
                          })}
                          data-toggle="pill"
                          role="tab"
                          aria-controls="login"
                          aria-selected="false"
                          onClick={() => setTabName(AuthTab.signIn)}
                        >
                          {t("common.Log in")}
                        </a>
                      </li>
                      <li
                        className="cursor-pointer nav-item col-auto mr-lg-3"
                        role="presentation"
                      >
                        <a
                          className={classnames({
                            "nav-link": true,
                            active: tabName === AuthTab.signUp,
                          })}
                          data-toggle="pill"
                          role="tab"
                          aria-controls="signup"
                          aria-selected="true"
                          onClick={() => setTabName(AuthTab.signUp)}
                        >
                          {t("common.Sign up")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="account-tab-container pt-4">
                    <div className="tab-content" id="account-tabContent">
                      <div
                        className={classnames({
                          "tab-pane fade": true,
                          "show active": tabName === AuthTab.signIn,
                        })}
                        id="login"
                        role="tabpanel"
                        aria-labelledby="login-tab"
                      >
                        <Login></Login>

                        <div className="row gutter-5 align-items-center my-4 py-2">
                          <div className="col">
                            <div className="border-top"></div>
                          </div>
                          <div className="col-auto">
                            <span className="d-flex text-muted text-uppercase font-normal">
                              {t("common.Or")}
                            </span>
                          </div>
                          <div className="col">
                            <div className="border-top"></div>
                          </div>
                        </div>
                        <div className="social-links font-sm text-center">
                          <FacobookButton
                            title={t("common.Continue with Facebook")}
                          ></FacobookButton>
                          <GoogleButton
                            onSubmit={onGoogleSubmit}
                            title={t("common.Continue with Google")}
                          ></GoogleButton>
                        </div>
                      </div>
                      <div
                        className={classnames({
                          "tab-pane fade": true,
                          "show active": tabName === AuthTab.signUp,
                        })}
                        id="signup"
                        role="tabpanel"
                        aria-labelledby="signup-tab"
                      >
                        <SignUp></SignUp>

                        <div className="row gutter-5 align-items-center my-4 py-2">
                          <div className="col">
                            <div className="border-top"></div>
                          </div>
                          <div className="col-auto">
                            <span className="d-flex text-muted text-uppercase font-normal">
                              {t("common.Or")}
                            </span>
                          </div>
                          <div className="col">
                            <div className="border-top"></div>
                          </div>
                        </div>
                        <div className="social-links font-sm text-center">
                          <FacobookButton
                            title={t("common.Sign up with Facebook")}
                          ></FacobookButton>
                          <GoogleButton
                            onSubmit={onGoogleSubmit}
                            title={t("common.Sign up with Google")}
                          ></GoogleButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <UpdatePhone
                  userID={userId}
                  userToken={userToken}
                ></UpdatePhone>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;

export const getStaticProps: GetStaticProps = async ({
  locale,
  locales,
}: any) => {
  // await Promise.all([store.dispatch(getFooterAsync(locale))]);

  const footerData = await loadFooterData(locale);
  if (!footerData) {
    return {
      notFound: true,
      props: {},
      revalidate: 1,
    };
  }
  return {
    props: {
      locale: locale,
      locales: locales,
      footerData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
};
