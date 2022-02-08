import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import Slider from "react-slick";
import Link from "next/link";
import { useRouter } from "next/router";
import { IFooter } from "../../models/models";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/Layout";

import SliderBanner from "../../components/slider-banner";

import {
  loadPowerproductForLanding,
  loadPowerProductLandingPage,
  loadPowerProductMenuLandingPageStaticpath,
  loadFooterData,
} from "../../apiService/apiService";

import { IPowerProducts, IMotorcycleLanding } from "../../models/models";

const unslick = "unslick" as const;

interface CustomProps {
  powerProducts: IPowerProducts[];
  locale: string;
  locales: any;
  slug: string;
  footerData: IFooter;
  powerProductLanding: IMotorcycleLanding;
}

export default function PowerProductListingPage({
  powerProductLanding,
  powerProducts,
  locale,
  locales,
  slug,
  footerData,
}: CustomProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();


  const createLink = (item: IPowerProducts) => {
    return `/powerproduct/${item.type}/${item?.ecomProductId}/${item?.slug}`;
  };

  const keyMapper: any = {
    engines: "Engines",
    generators: "Generators",
    lawn_movers: "Lawn Movers",
    water_pumps: "Water Pumps",
  };

  const capitalizeFirstLetter = (data: string) => {
    return keyMapper[data] ?? data;
  };
  return (
    <>
      <Layout footerData={footerData}>
        {slug !== undefined && (
          <div className="bg-primary py-2">
            <div className="container d-flex align-items-center">
              <Link href="/powerproducts">
                <a className="text-white d-inline-flex align-items-center font-xs text-uppercase py-2">
                  <i className="icon-arrow-left mr-2 icon-flip-rtl"></i>
                  {t("detail.power_products")}
                </a>
              </Link>
            </div>
          </div>
        )}
        {/* {powerProductLanding?.banner && (
        <SliderBanner
          specs={[]}
          detail={powerProductLanding?.banner ?? []}
          className="power-marine-landing"
        />
      )} */}
        {powerProductLanding?.banner && (
          <div className="detail-banner main-banner position-relative h-100">
            <div className="position-relative h-100 detail-page-slider">
              <img
                src={powerProductLanding?.banner?.[0].image.url}
                alt="power product banner"
                className="img-fluid w-100 h-100 img-cover"
              />
            </div>
          </div>
        )}
        <div className="py-4 mb-lg-3">
          <div className="container pt-5">
            <div className="position-relative">
              <h2 className="h1 text-lg-center">
                {t(
                  `${capitalizeFirstLetter(
                    slug ? `header.${slug}` : "detail.power_products"
                  )}`
                )}
              </h2>
              <h6 className="font-weight-normal text-lg-center mb-4">
                {t("detail.Discover The Exciting Range of Honda")}
                {/* {`${t('detail.Discover The Exciting Range of Honda')} 
                ${t(
                  `detail.${capitalizeFirstLetter(
                    slug ? slug : 'power_products'
                  )}`
                )}`} */}
              </h6>
              <Link href="/dealers">
                <a className="btn btn-primary position-absolute right-0 align-y-center py-2 px-3 font-md d-sm-inline-flex d-none align-items-center">
                  <i className="icon-dealer-location mr-2 h5 text-white mb-0" />
                  Find Dealers
                </a>
              </Link>
              <Link href="/dealers">
                <a className="btn btn-primary right-0 align-y-center py-2 px-3 font-md d-sm-none d-inline-flex align-items-center mt-3">
                  <i className="icon-dealer-location mr-2 h5 text-white mb-0" />
                  Find Dealers
                </a>
              </Link>
            </div>
            <div className="pt-4 pt-lg-5 row">
              {powerProducts?.map((p, index) => {
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
                              src={p?.displayImage?.url ?? p.megaMenuThumb?.url}
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
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ locale, locales, params }: any) => {
  const language = locale;
  const slug = params.slug;
  let powerProducts = await loadPowerproductForLanding("en", slug);
  let powerProductLanding = await loadPowerProductLandingPage(language, slug);
  const footerData = await loadFooterData(locale);

  powerProducts = _.sortBy(powerProducts, "category");

  if (!powerProducts || !footerData || !powerProductLanding) {
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
      powerProducts: powerProducts,
      powerProductLanding: powerProductLanding,
      slug: slug,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async ({ locales, query, locale }: any) => {
  const language = locale;
  var powerProductSlug = await loadPowerProductMenuLandingPageStaticpath("en");
  const paths: any = [];
  powerProductSlug?.categoryList?.forEach((p) => {
    paths.push({ params: { slug: p.title.toString().toLocaleLowerCase() }, locale: "en" });
  });
  

  return {
    paths,
    fallback: true,
  };
};
