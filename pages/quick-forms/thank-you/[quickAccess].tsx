import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { RouteKeys } from "../../../route/route-keys";
import Image from "next/image";
import Layout from "../../../components/Layout";
import { GetServerSideProps, NextPage } from "next";
import { store } from "../../../app/store";
import { getFooterAsync } from "../../../feature/footerSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IFooter } from "../../../models/models";
interface CustomProps {
  locale: string;
  footerData: IFooter;
}
const ThankYou: NextPage<CustomProps> = (props: CustomProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  React.useEffect(() => {
    const element = document.body;
    element?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, []);
  const onBackToHome = () => {
    router.push(`${RouteKeys.Home}`);
  };

  return (
    <Layout footerData={props?.footerData}>
      <div className="content-wrapper detail-wrapper">
        <div className="welcome-thankyou-block text-center w-100 h-100 top-0 left-0 bg-white open">
          <div className="container py-sm-5 py-3">
            <div className="text-right"></div>
            <div className="py-5 my-5">
              <Image
                src={"/welcome-thankyou.png"}
                alt="thank you"
                className="mb-4"
                height={61}
                width={61}
              />
              <h3 className="text-uppercase mb-3">
                {" "}
                {t("form.Thank you for the enquiry")}
              </h3>
              <p className="font-normal mb-4 pb-2">
                {t("form.Thank_You_Text")}
              </p>
              <button
                onClick={onBackToHome}
                type="button"
                className="btn btn-primary font-md px-5"
              >
                <span className="d-block px-sm-4">
                  {t("form.BACK TO HOME")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  locale,
  locales,
}: any) => {
  await Promise.all([store.dispatch(getFooterAsync(locale))]);
  const footer = store.getState().footer.data;
  return {
    props: {
      footerData: footer,
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      locales,
    },
  };
};

export default ThankYou;
