import React, { useEffect, useState } from 'react';
import {
  api,
} from 'alg-ecom-frontend-core';
import SpecTab from '../../../../components/specTab';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import ReactModal from 'react-modal';
import EnquirePopUp, { IProductModel } from '../../../../components/enquirePopUp';
import { loadPowerProductDetail, loadPowerProductLandingPage,loadPowerproductForLandingStaticpath,loadFooterData } from "../../../../apiService/apiService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IFooter, IMotorcycleLanding, IProductDetails } from '../../../../models/models';
import Layout from '../../../../components/Layout';

const banner: any = [
  {
    title: 'EU10',
    description: 'A Pint Sized Powerhouse',
    image: {
      url: 'https://picsum.photos/1600/640',
      formats: 'jpg',
    },
  },
];
const customStyles: ReactModal.Styles = {
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    height: 'auto',
    maxWidth: '1140px',
    width: '100%',
    border: '0',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.08)',
    padding: '0',
    margin: '20px auto',
  },
  overlay: {
    zIndex: 100000,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    overflow: 'auto',
  },
};


interface CustomProps {
  lang: string;
  model: string;
  type: string;
  slug: string;
  selectedPowerProduct: IProductDetails;
  powerProductLanding: IMotorcycleLanding;
  selectedProduct: IProductModel | undefined;
  footerData:IFooter
}

export default function ProductDetails({ lang, model, type, slug, selectedPowerProduct, powerProductLanding, selectedProduct,footerData }: CustomProps) {
  const { t, i18n } = useTranslation();

  const [trimData, setTrimData] = useState<any[]>([]);

  const [enquirePopup, setEnquirePopup] = React.useState(false);
  useEffect(() => {
    let trimData = async () => {
      let response = await api.build.powerProductsCompareData(parseInt(model, 10));
      setTrimData(response?.productsList[0].attributes)
    }
    trimData()
  }, [model])


  const onEnquireClick = () => {
    // setSelectedProduct(product);
    setEnquirePopup(true);
  };
  const onEnquireCancel = () => {
    setEnquirePopup(false);
  };
 

  const renderEnquireModal = () => {
    return (
      <ReactModal
        isOpen={enquirePopup}
        contentLabel="Callback"
        style={customStyles}
        onRequestClose={onEnquireCancel}
        shouldCloseOnOverlayClick={true}
      >
       
      </ReactModal>
    );
  };
  return (
    <>
    <Layout footerData={footerData}>
      {renderEnquireModal()}
      <div className="bg-primary py-2">
        <div className="container d-flex align-items-center">
          <Link
            href="/powerproducts"
          >
            <a className="text-white d-inline-flex align-items-center font-xs text-uppercase py-2">
              <i className="icon-arrow-left mr-2 icon-flip-rtl"></i>
              {type}
            </a>
          </Link>
        </div>
      </div>
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
      <div className="position-relative">
        <div className="d-flex w-100 bg-white border-bottom specs-blk">
          <div className="row m-0 w-100">
            <div
              key={'specs-'}
              className="col-sm col-6 p-sm-3 p-2 d-flex align-items-center justify-content-center item border-right"
            >
              <div className="d-inline-block text-left">
                <h4 className="m-0 mt-1">{selectedProduct?.productTitle}</h4>
              </div>
            </div>
            <div
              key={'specs-'}
              className="col-sm col-6 p-sm-3 p-2 d-flex align-items-center justify-content-center item border-right"
            >
              <div className="d-inline-block text-left">
                <span className="font-xs">{t('common.starting_at')}</span>
                <h4 className="m-0 mt-1">{selectedPowerProduct?.price}</h4>
              </div>
            </div>
            <div
              key={'specs-'}
              className="col-sm col-12 p-sm-3 p-2 d-flex align-items-center justify-content-center item"
            >
              <div className="d-inline-block text-left">
                <button
                  className="btn btn-primary font-md px-4"
                  onClick={() => onEnquireClick()}
                >
                  <span className="px-4">{t('common.Enquire Now')}</span>
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
                {t('detail.Specifications')}
              </h1>
            </div>
            <div className="col-12">
              {trimData.map((specs: any, specIdx: number) => {
                return <SpecTab key={specIdx} specs={specs} />;
              })}
            </div>
            <div className="col-12 pt-3 mt-3 text-center">
              <button
                className="btn btn-primary font-md px-5"
                onClick={() => onEnquireClick()}
              >
                <span className="px-md-5 px-4">{t('common.Enquire Now')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};



export const getStaticProps = async ({ locale, locales, params }: any) => {
  const language = locale;
  const type = params.type;
  const model = params.model;
  const slug = params.slug;

  const powerProductLanding = await loadPowerProductLandingPage(language, type);
  const selectedPowerProduct = await loadPowerProductDetail(slug);
  const footerData = await loadFooterData(locale);

  const selectedProduct = {
    productID: selectedPowerProduct?.ecomProductId
      ? parseInt(selectedPowerProduct?.ecomProductId, 10)
      : 0,
    offerPrice: selectedPowerProduct?.price,
    previewImage: selectedPowerProduct?.megaMenuThumb?.url,
    productTitle: selectedPowerProduct?.title


  }
  if (
    !powerProductLanding ||
    !footerData ||
    !selectedPowerProduct ||
    !selectedProduct
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
      selectedPowerProduct: selectedPowerProduct,
      selectedProduct: selectedProduct,
      powerProductLanding: powerProductLanding,
      type: type,
      model: model,
      slug: slug,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async({ locales, query ,locale}: any) => {

  const language = locale;
  var powerProductSlug = await loadPowerproductForLandingStaticpath("en")

  const paths: any = [];
  powerProductSlug?.forEach((p) => {
    paths.push({ params: { type: p.type.toString(), model: p.ecomProductId.toString(), slug: p.slug.toString() }, locale: "en" });
  });
  

  return {
    paths,
    fallback: true,
  };
};