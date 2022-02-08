import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  loadFooterData,
  loadMarinesForLanding,
  loadMarineLandingPage,
  loadMarineMenuLandingPageStaticpage,
} from "../../apiService/apiService";
import Link from "next/link";
import _ from "lodash";
import { RouteKeys } from "../../route/route-keys";
import SliderBanners from "../../components/slider-banner";
import { store } from "../../app/store";
import Layout from "../../components/Layout";
import getFooterAsync from "../../feature/footerSlice";

import { IPowerProducts,IFooter,IMarineMenuLandingPage } from "../../models/models";
const unslick = "unslick" as const;

interface CustomProps {
  marineCategories:IMarineMenuLandingPage,
  locale:string;
  locales:string
  slug:string;
  footerData:IFooter;
}

export default function GspPage({
  marineCategories,
  locale,
  locales,
  slug,
  footerData,
}: CustomProps) {
  const { t, i18n } = useTranslation();

  const lang = locale;
  const type = slug;
  const banner = marineCategories?.banner;
  useEffect(() => {
    loadMarines();
  }, [slug]);
  const [isLaoding, setIsLoading] = useState(false);
  const loadMarines = async () => {
    setIsLoading(true);
    try {
      const response = await loadMarinesForLanding(lang, type);
      const sortedResponse = _.sortBy(response, "type");
      setMarines(sortedResponse ?? []);
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const [marines, setMarines] = useState<IPowerProducts[]>([]);
  const keyMapper: any = {
    high_range: "High Range",
    mid_range: "Mid Range",
    portable: "Portable",
  };
  const capitalizeFirstLetter = (data: string) => {
    return keyMapper[data] ?? data;
  };

  const createLink = (item: IPowerProducts) => {
    return `/${lang}${RouteKeys.MarineDetail.replace(":type", item.type)
      .replace(":model", item.ecomProductId)
      .replace(":slug", item.slug)}`;
  };
  return (
    <>
      <Layout footerData={footerData}>
        <>
          {slug !== undefined && (
            <div className="bg-primary py-2">
              <div className="container d-flex align-items-center">
                <Link href={`/${lang}${RouteKeys.MarinesListingLanding}`}>
                  <a className="text-white d-inline-flex align-items-center font-xs text-uppercase py-2">
                    <i className="icon-arrow-left mr-2 icon-flip-rtl"></i>
                    {t("common.marine")}
                  </a>
                </Link>
              </div>
            </div>
          )}
          {banner && (
            <SliderBanners
              specs={[]}
              detail={banner ?? []}
              className="power-marine-landing"
            />
          )}
          <div className="py-4 mb-lg-3">
            <div className="container pt-5">
              <h2 className="h1 text-lg-center">
                {t(`detail.${capitalizeFirstLetter(slug ? slug : "marines")}`)}
              </h2>
              <h6 className="font-weight-normal text-lg-center mb-4">
                {`${t("detail.Discover The Exciting Range of Honda")} ${t(
                  `detail.${capitalizeFirstLetter(slug ? slug : "marines")}`
                )}`}
              </h6>
              <div className="pt-4 pt-lg-5 row">
                {marines?.map((p, index) => {
                  return (
                    <div
                      key={"power-product-grouped-item" + index}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3 pb-lg-4 mb-lg-5"
                    >
                      <div className="d-flex flex-column h-100 marine-listing">
                        <figure className="marine-img-block text-center px-4 d-flex align-items-end justify-content-center mb-5">
                          <Link href={createLink(p)}>
                            <a className="d-inline-block w-100 h-100">
                              <img
                                src={
                                  p?.displayImage?.url ?? p.megaMenuThumb?.url
                                }
                                alt={p?.title}
                                className="img-fluid mx-auto"
                              />
                            </a>
                          </Link>
                        </figure>
                        <div className="content-marine text-center">
                          <h5 className="mb-2">
                            <Link href={createLink(p)}>
                              <a className="text-secondary">{p?.title}</a>
                            </Link>
                          </h5>
                          {p?.subTitle && (
                            <p className="font-normal text-heading mb-3 pb-1">
                              {p?.subTitle}
                            </p>
                          )}
                        </div>
                        <div className="mt-auto text-center">
                          <h6 className="mb-3 pb-2">{p?.price}</h6>
                          <Link href={createLink(p)}>
                            <a className="cursor-pointer btn btn-outline-secondary btn-block border-width-2">
                              {t("build_vehicle.View Details")}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ locale, locales, params }: any) => {
  const language = locale;
  const slug = params.slug;
  var marineCategories = await loadMarineLandingPage(language, slug);
  const footerData = await loadFooterData(locale);
  if (!marineCategories || !footerData) {
    return {
      notFound: true,
      props: {},
      revalidate: 1,
    };
  } else
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        locale,
        locales,
        marineCategories,
        slug,
        footerData,
      },
      revalidate: 10,
    };
};

export const getStaticPaths = async ({ locales, query, locale }: any) => {
  const language = locale;

  var loadMarineslug = await loadMarineMenuLandingPageStaticpage("en");
  const paths: any = [];
  loadMarineslug?.categoryList?.forEach((p) => {
    paths.push({ params: { slug: p.title.toString().toLocaleLowerCase() }, locale: "en" });
  });
  

  return {
   
    paths,
    fallback: true,
  };
};
