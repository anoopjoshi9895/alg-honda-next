import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import {
  loadPowerProductMenuLandingPage, loadContactUsPage, loadPowerproductForLanding
} from "../apiService/apiService";
import _ from 'lodash';
import { RouteKeys } from '../route/route-keys';
import { store } from "../app/store";

import { IPowerProducts, IProductDetails,IFooter,IContactUs,IPowerProductMenuLandingPage} from '../models/models';
import SliderBanners from '../components/slider-banner';

import ProductCard from '../components/powerproduct/productCard';
import MarineAddress from '../components/marineLanding/marineAddress';
import PowerProductList from '../components/powerproduct/powerProductList';
import Layout from '../components/Layout';

interface CustomProps {
  powerproductDetails: IPowerProductMenuLandingPage;
    contact: IContactUs;
    powerProductLandingDetails:IPowerProducts[]
    footerData:IFooter
    locale:string
    locales:string
  }

const PowerProductLanding = ({ locale, locales, powerproductDetails, contact, powerProductLandingDetails,footerData }: CustomProps) => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const lang = locale;

  const {
    banner,
    categoryList,
    items,
    metaDetails
  } = powerproductDetails

  return (
    <>
    <Layout footerData={footerData}>
      
      {banner && (
        <SliderBanners
          specs={[]}
          detail={banner ?? []}
          landing
        />
      )}

      {categoryList && (
        <ProductCard categories={categoryList} />
      )}

      {powerProductLandingDetails && <PowerProductList response={powerProductLandingDetails} />}

      {contact &&
        <MarineAddress contactData={contact} />
      }
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ locale, locales }: any) => {
  const language = locale;
  var powerproductDetails = await loadPowerProductMenuLandingPage(language);
  var contact = await loadContactUsPage(language);
  var powerProductLandingDetails = await loadPowerproductForLanding(language)
  const footerData = store.getState().footer.data;

  if (!powerproductDetails || !contact || !powerProductLandingDetails || !footerData) {
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
      powerproductDetails,
      contact,
      powerProductLandingDetails,
      footerData
    },
  };
};

export default PowerProductLanding;
