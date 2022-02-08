import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SliderBanners from "../../components/slider-banner";
import { TrimSection } from "../../components/TrimSection";
import ExploreColorTab from "../../components/explore-color-tabs";
import Design from "../../components/Design";
import SliderWithDetails from "../../components/sliderWithDetails";
import { GallerySection } from "../../components/GallerySection";
import { Convenience } from "../../components/Gallery";
import { IProductDetails, IFooter } from "../../models/models";
import {
  loadVehicleDetail,
  loadAutoMobileLandingPageStaticpath,
  loadFooterData,
  loadAllVehicles
} from "../../apiService/apiService";
import Layout from "../../components/Layout";

interface CustomProps {
  vehicleDetails: IProductDetails;
  locale: string;
  locales: any;
  slug: string;
  footerData: IFooter;
}

export default function GspPage({
  vehicleDetails,
  locale,
  locales,
  slug,
  footerData
}: CustomProps) {
  const router = useRouter();
  const { defaultLocale, isFallback, query } = router;
  const { t, i18n } = useTranslation("common");
  if (isFallback) {
    return "Loading...";
  }

  const {
    banner,
    title,
    detailItems,
    specs,
    trims,
    ecomModelCode,
    interiorColorVariants,
    colorVariants,
    design,
    gallery,
    convenience,
    buildLink,
  } = vehicleDetails;


  const onCallbackPopupCancel = () => {
  };

  const renderCallbackModal = () => {
    
  };
  const onDownloadBrochureCancel = () => {
  };
  const renderDownloadBrochureModal = () => {
   
  };

  const detail_nav_bar = [
    {
      hash: "#trimsSpecs",
      link: "trim and specs",
      id: 1,
    },
    {
      hash: "#exploreColor",
      link: "explore the color",
      id: 2,
    },
    {
      hash: "#exterior-interior",
      link: "exterior & interior",
      id: 3,
    },
  ];
  return (
    <Layout footerData={footerData}>
      <>
        <>
          <div
            className="bg-primary position-sticky top-0 zIndex-1 tab-outer-container main-nav-detailpage"
            id="scroll-div"
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-5 col-sm-4 col-md-3 col-lg-auto d-lg-flex pr-0">
                  <span
                    className="d-inline-flex align-items-center font-xs text-uppercase text-white cursor-pointer"
                  >
                    <i className="icon-arrow-left mr-2 pr-1 font-lg icon-flip-rtl"></i>
                    <span>{title}</span>
                  </span>
                </div>
                <div className="col-7 col-sm-8 col-md-9 col-lg d-flex justify-content-lg-end px-0">
                  <div className="overflow-hidden">
                    {/* <ScrollspyNav
                      scrollTargetIds={scrollIds}
                      offset={-100}
                      activeNavClass="active"
                      scrollDuration="100"
                      // headerBackground="true"
                    > */}
                    <ul className="nav font-sm text-uppercase letter-spacing-sm">
                      {detail_nav_bar?.map((p: any, index: any) => {
                        return (
                          <li
                            className="nav-item px-3 px-md-2 px-xl-4"
                            key={index}
                          >
                            <a
                              className="nav-link p-0 text-white cursor-pointer hover-primary"
                              href={`${p.hash}`}
                            >
                              <span className="py-lg-2 py-2 d-inline-block">
                                {t(`${p.link}`)}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                      {detailItems?.map((p: any, index: any) => {
                        return (
                          <li
                            key={`detail-scroll-item-${index}`}
                            className="nav-item px-3 px-md-2 px-xl-4"
                          >
                            <a
                              className="nav-link p-0 text-white cursor-pointer hover-primary"
                              href={"#" + p.title}
                            >
                              <span className="py-lg-2 py-2 d-inline-block">
                                {p.title}
                              </span>
                            </a>
                          </li>
                        );
                      })}

                      <li className="nav-item px-3 px-md-2 px-xl-4">
                        <a
                          className="nav-link p-0 text-white cursor-pointer hover-primary"
                          href="#gallery"
                        >
                          <span className="py-lg-2 py-2 d-inline-block">
                            {t("common.gallery")}
                          </span>
                        </a>
                      </li>
                    </ul>
                    {/* </ScrollspyNav> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-wrapper">
            {banner && (
              <SliderBanners
                specs={specs ?? []}
                detail={banner ?? []}
                className="detail-page-slider"
              />
            )}
            {(trims?.length ?? 0) > 0 && (
              <TrimSection
                model={ecomModelCode}
                buildLink={buildLink}
                data={trims ?? []}
              />
            )}
            <ExploreColorTab
              externalVariant={colorVariants ?? []}
              internalVariant={interiorColorVariants ?? []}
              model={slug}
              onRequestCallback={onCallbackPopupCancel}
              onDownloadBrochure={onDownloadBrochureCancel}
            ></ExploreColorTab>

            {design && (
              <div id={"exterior-interior"}>
                <Design buildLink={buildLink} designItems={design} />
              </div>
            )}

            {detailItems?.map((p: any, index: any) => {
              return (
                <div className="pt-4" key={index}>
                  <SliderWithDetails
                    buildLink={buildLink}
                    title={p.title}
                    align={index % 2 === 0 ? "right" : "left"}
                    items={p.items}
                  />
                </div>
              );
            })}
            {(gallery?.length ?? 0) > 0 && (
              <GallerySection data={gallery ?? []} />
            )}
            {(convenience?.length ?? 0) > 0 && (
              <Convenience data={convenience ?? []} buildLink={buildLink} />
            )}
          </div>
        </>
        {renderCallbackModal()}
        {renderDownloadBrochureModal()}
      </>
    </Layout>
  );
}

export const getStaticProps = async ({ locale, locales, params }: any) => {
  const language = locale;
  const slug = params.slug;
  var vehicleDetails = await loadVehicleDetail(language, slug);
  const footerData = await loadFooterData(locale);
  if (!vehicleDetails || !footerData) {
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
      vehicleDetails: vehicleDetails,
      slug: slug,
      footerData,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async ({ locales, query, locale }: any) => {
  const language = locale;
  var loadSlug = await loadAutoMobileLandingPageStaticpath("en");
  const paths: any = [];
  loadSlug?.forEach((p) => {
    paths.push({ params: { slug: p.slug }, locale: "en" });
  });

  var arabicloadSlug = await loadAutoMobileLandingPageStaticpath("ar");
  arabicloadSlug?.forEach((p) => {
    paths.push({ params: { slug: p.slug }, locale: "ar" });
  });


  return {
    paths,
    fallback: true,
  };
};
