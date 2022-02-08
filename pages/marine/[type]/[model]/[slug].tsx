import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  loadMarineDetail,
  loadMarinesForLandingStaticpath,
  loadMarineLandingPage,
  loadFooterData
} from "../../../../apiService/apiService";
import { store } from "../../../../app/store";
import Link from "next/link";
import _ from "lodash";
import { RouteKeys, QuickAccessFormsTypes } from "../../../../route/route-keys";
import SliderBanners from "../../../../components/slider-banner";
import { IPowerProducts,IMotorcycleLanding ,IFooter} from "../../../../models/models";
import {
  api,
  IBaseProductModel,
  numberWithCommas,
} from "alg-ecom-frontend-core";
import Layout from "../../../../components/Layout";
import SpecTab from "../../../../components/marineLanding/spaceTabs";
import ReactModal from "react-modal";
import EnquirePopUp from "../../../../components/enquirePopUp";

const customStyles: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "1140px",
    width: "100%",
    border: "0",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
    padding: "0",
    margin: "20px auto",
  },
  overlay: {
    zIndex: 100000,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "auto",
  },
};



export interface IProductModel {
  productID: number;
  productTitle: string;
  // variantSKU: string;
  // modelID: number;
  previewImage: string;
  offerPrice: string;
}

interface CustomProps {
  locale:string;
  locales:string
  marineLanding:IMotorcycleLanding
  marineDetail:IPowerProducts
  slug:string;
  type:string;
  productId:number;
  footerData:IFooter;
}

export default function GspPage({
  locale,
  locales,
  marineLanding,
  marineDetail,
  slug,
  type,
  productId,
  footerData,
  
}: CustomProps) {

  
  const  headerWithSpec  = marineDetail?.accordian[0]?.headerWithSpec;
  const  banner  = marineLanding?.banner;

  const { t, i18n } = useTranslation();
  const [trimData, setTrimData] = React.useState<any>([]);
  const lang = locale;
  const [enquirePopup, setEnquirePopup] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<
    IProductModel | undefined
  >(undefined);

  const onEnquireClick = () => {
    // setSelectedProduct(product);
    setEnquirePopup(true);
  };
  const onEnquireCancel = () => {
    setEnquirePopup(false);
  };
  React.useEffect(() => {
    if (marineDetail) {
      setSelectedProduct({
        productID: marineDetail?.ecomProductId
          ? parseInt(marineDetail?.ecomProductId, 10)
          : 0,
        offerPrice: marineDetail?.price,
        previewImage: marineDetail?.megaMenuThumb?.url,
        productTitle: marineDetail?.title,
      });
    }
  }, [marineDetail]);

  const renderEnquireModal = () => {
    return (
      <ReactModal
        isOpen={enquirePopup}
        contentLabel="Callback"
        style={customStyles}
        onRequestClose={onEnquireCancel}
        shouldCloseOnOverlayClick={true}
      >
        {selectedProduct && (
          <EnquirePopUp
            onPopupCancel={onEnquireCancel}
            title={"Request a callback"}
            product={selectedProduct}
            showRoomtype="powerproducts"
            enquireType={QuickAccessFormsTypes.enquirymarine}
          />
        )}
      </ReactModal>
    );
  };

  return (
    <>
      <Layout footerData={footerData}>
        {renderEnquireModal()}
        <div className="bg-primary py-2">
          <div className="container d-flex align-items-center">
            <Link href={`/${lang}${RouteKeys.MarinesListingLanding}`}>
              <a className="text-white d-inline-flex align-items-center font-xs text-uppercase py-2">
                <i className="icon-arrow-left mr-2 icon-flip-rtl"></i>
                {type}
              </a>
            </Link>
          </div>
        </div>
        {banner && (
          <div className="detail-banner main-banner position-relative h-100">
            <div className="position-relative h-100 detail-page-slider">
              <img
                src={banner?.[0].image.url}
                alt="marine banner"
                className="img-fluid w-100 h-100 img-cover"
              />
            </div>
          </div>
        )}
        <div className="position-relative">
          <div className="d-flex w-100 bg-white border-bottom specs-blk">
            <div className="row m-0 w-100">
              <div
                key={"specs-"}
                className="col-sm col-6 p-sm-3 p-2 d-flex align-items-center justify-content-center item border-right"
              >
                <div className="d-inline-block text-left">
                  <h4 className="m-0 mt-1">{selectedProduct?.productTitle}</h4>
                </div>
              </div>
              <div
                key={"specs-"}
                className="col-sm col-6 p-sm-3 p-2 d-flex align-items-center justify-content-center item border-right"
              >
                <div className="d-inline-block text-left">
                  <span className="font-xs">{t("common.starting_at")}</span>
                  <h4 className="m-0 mt-1">{selectedProduct?.offerPrice}</h4>
                </div>
              </div>
              <div
                key={"specs-"}
                className="col-sm col-12 p-sm-3 p-2 d-flex align-items-center justify-content-center item"
              >
                <div className="d-inline-block text-left">
                  <button
                    className="btn btn-primary font-md px-4"
                    onClick={() => onEnquireClick()}
                  >
                    <span className="px-4">{t("common.Enquire Now")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 py-5">
          <div className="container pb-md-5">
            <div className="row">
              <div className="col-12 text-center">
                <h1 className="text-secondary mb-4 pb-md-3 pb-2">
                  {t("detail.Specifications")}
                </h1>
              </div>
              <div className="col-12">
              {headerWithSpec&&<SpecTab specs={headerWithSpec} />}
              </div>
              <div className="col-12 pt-3 mt-3 text-center">
                <button
                  className="btn btn-primary font-md px-5"
                  onClick={() => onEnquireClick()}
                >
                  <span className="px-md-5 px-4">
                    {t("common.Enquire Now")}
                  </span>
                </button>
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
  const type = params.type;
  const model = params.model;
  const slug = params.slug;

  var marineLanding = await loadMarineLandingPage(language, type);
  var marineDetail = await loadMarineDetail(slug, "en");
  const footerData = await loadFooterData(locale);

  if (!marineLanding || !footerData  ) {
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
      marineLanding,
      marineDetail,
      slug,
      type,
      productId:model,
      footerData,
    },
    revalidate: 10,

  };
};

export const getStaticPaths = async({locale, locales, query }: any) => {
  const language = locale;

  let loadMarineslug = await loadMarinesForLandingStaticpath("en")

  const paths: any = [];
  loadMarineslug?.forEach((p) => {
    paths.push({ params: { type: p.type.toString(), model: p.ecomProductId.toString(), slug: p.slug.toString() }, locale: "en" });
  });
  
return {
  paths,
  fallback: true,
};
}
  
  
