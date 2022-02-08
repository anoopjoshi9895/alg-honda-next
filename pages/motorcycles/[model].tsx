import classnames from "classnames";
// import MetaDetails from 'components/meta-details/MetaDetails';
import SliderBanner from "../../components/slider-banner";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  loadMotorCyclesForLanding,
  loadMotorcycleLandingPage,
  loadMotorCylceMenuLandingPageStaticpath,
  loadFooterData,
} from "../../apiService/apiService";

import {
  IProductDetails,
  IMotorcycleLanding,
  IFooter,
} from "../../models/models";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/Layout";

// import '../../assets/sass/detail.scss';
interface CustomProps {
  lang: string;
  model: string;
  motorCycleLanding: IProductDetails;
  motorCycles: IProductDetails[];
  categoriesOfMotorCycle: any;
  footerData: IFooter;
}

export default function MotorCycleLanding({
  model,
  motorCycleLanding,
  motorCycles,
  categoriesOfMotorCycle,
  footerData,
}: CustomProps) {
  const { t } = useTranslation();

  const [category, setCategory] = useState<string>("");
  const [motorcyclesToShow, setMotorcyclesToShow] = useState<IProductDetails[]>(
    []
  );

  useEffect(() => {
    setCategory(model);
  }, [model]);

  useEffect(() => {
    setMotorcyclesToShow(
      category === model
        ? motorCycles
        : motorCycles?.filter((item: any) => item.category === category)
    );
  }, [model, motorCycles, category]);

  return (
    <>
      <Layout footerData={footerData}>
        {/* {motorCycleLanding?.metaDetails && (
                <MetaDetails metaDetails={motorCycleLanding?.metaDetails} />
            )} */}
        {motorCycleLanding?.banner && (
          <SliderBanner specs={[]} detail={motorCycleLanding?.banner ?? []} />
        )}

        <div className="bg-primary position-sticky top-0 zIndex-1 tab-outer-container main-nav-detailpage motorcycle-tabs">
          <ul className="nav font-sm text-uppercase px-lg-3 justify-content-center">
            <li
              className="nav-item px-2 font-weight-bold"
              onClick={() => setCategory(model)}
            >
              <a
                className={classnames({
                  "nav-link px-3 cursor-pointer hover-primary py-1 ": true,
                  active: model === category,
                })}
              >
                <span className="py-lg-2 py-2 d-inline-block">
                  {t(`header.${model}`)}
                </span>
              </a>
            </li>
            {categoriesOfMotorCycle?.map((cat: any, key: number) => {
              return (
                <li
                  className="nav-item px-2"
                  onClick={() => setCategory(cat)}
                  key={key}
                >
                  <a
                    className={classnames({
                      "nav-link px-3 cursor-pointer hover-primary py-1 ": true,
                      active: cat === category,
                    })}
                  >
                    <span className="py-lg-2 py-2 d-inline-block">
                      {t(`motor_category.${cat}`)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="container py-sm-5 py-4">
          <div className="tab-content py-md-5 py-3">
            <div className="tab">
              <div className="row">
                {motorcyclesToShow?.map((mc, key: number) => {
                  return (
                    <div
                      className="col-lg-4 col-sm-6 col-12 motorcycle-box mb-md-5 mb-4 pb-md-4 pb-sm-3"
                      key={key}
                    >
                      <figure className="px-md-3 d-flex align-items-center justify-content-center">
                        <Link href={`/motorcycle/${mc?.slug ?? ""}`}>
                          <a className="d-inline-block w-100 h-100 text-center">
                            <img
                              src={
                                mc.displayImage?.url || mc?.megaMenuThumb?.url
                              }
                              className="img-fluid"
                              alt=""
                            />
                          </a>
                        </Link>
                      </figure>
                      <figcaption className="px-md-3">
                        <h4 className="text-uppercase mb-2">
                          <Link
                            href={`/motorcycle/${mc?.slug ?? ""}
                                                    `}
                          >
                            <a className="text-gray-900">{mc?.title}</a>
                          </Link>
                        </h4>
                        <div className="d-flex text-uppercase align-items-center">
                          <span className="font-xs mr-2">
                            {t("common.starting_at")}
                          </span>
                          <span className="font-xl font-weight-bold text-gray-900">
                            {mc?.offerPrice}
                          </span>
                        </div>
                      </figcaption>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ locale, locales, params }: any) => {
  const language = locale;
  const model = params.model;
  const motorCycleLanding = await loadMotorcycleLandingPage(language, model);
  const motorCycles = await loadMotorCyclesForLanding(language, model);
  const footerData = await loadFooterData(locale);
  const motorcycleGrouped = _.groupBy(
    motorCycles.filter((item) => item.category !== null),
    "category"
  );
  const categoriesOfMotorCycle = Object.keys(motorcycleGrouped);

  if (
    !motorCycles ||
    !footerData ||
    !motorCycleLanding ||
    !categoriesOfMotorCycle
  ) {
    return {
      notFound: true,
      props: {},
      revalidate: 1,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      locales,
      motorCycleLanding,
      motorCycles,
      categoriesOfMotorCycle,
      footerData,
    },
  };
};

export const getStaticPaths = async ({ locales, query, locale }: any) => {
  const language = locale;
  const type = "cat";
  var motorcycleModel = await loadMotorCylceMenuLandingPageStaticpath("en", type);
  const paths: any = [];
  motorcycleModel?.categoryList?.forEach((p) => {
    paths.push({ params: { model: p.title.toString().toLocaleLowerCase() }, locale: "en" });
  });
  
  return {
    
    paths,
    fallback: true,
  };
};
