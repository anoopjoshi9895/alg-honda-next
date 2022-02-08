import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SliderBanners from "../components/slider-banner";
import { useRouter } from "next/router";
import {
  loadMotorCylceMenuLandingPage,
  loadContactUsPage,
  loadFooterData
} from "../apiService/apiService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ListCard from "../components/AutomobileLanding/listCard";
import AddressCard from "../components/AutomobileLanding/addressCard";
import CarSlides from "../components/AutomobileLanding/carSlides";
import MarineAddress from "../components/marineLanding/marineAddress";
import Layout from "../components/Layout";
import { store } from "../app/store";
import { IPowerProducts,IMarineMenuLandingPage,IContactUs,IFooter,IMotorCylceLandingPage } from '../models/models';

interface CustomProps {
  motorcycleLandingDetails: IMotorCylceLandingPage;
    contact: IContactUs;
    response:IPowerProducts[]
    footerData:IFooter
}

const MotorcycleLanding = ({
  motorcycleLandingDetails,
  contact,
  footerData,
}: CustomProps) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { isFallback } = router;

  const { banner, categoryList, slider, metaDetails } = motorcycleLandingDetails;

  return (
    <>
      <Layout footerData={footerData}>
       
        {banner && <SliderBanners specs={[]} detail={banner ?? []} landing />}
        {categoryList && <ListCard categories={categoryList} />}

        {slider && <CarSlides carItems={slider} type="motorcycle" />}

        {contact && <MarineAddress contactData={contact} />}
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ locale, locales }: any) => {
  const language = locale;
  var motorcycleLandingDetails = await loadMotorCylceMenuLandingPage(language);
  var contact = await loadContactUsPage(language);
  const footerData = await loadFooterData(locale);

  if (!motorcycleLandingDetails || !contact || !footerData) {
    return {
      notFound: true,
      props: {},
      revalidate: 1,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      motorcycleLandingDetails,
      contact,
      footerData,
    },
  };
};

export default MotorcycleLanding;
