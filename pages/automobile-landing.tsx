import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SliderBanners from "../components/slider-banner";
import { useRouter } from "next/router";
import {
  loadAutoMobileLandingPage,
  loadContactUsPage,
  loadFooterData
} from "../apiService/apiService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ListCard from "../components/AutomobileLanding/listCard";
import AddressCard from "../components/AutomobileLanding/addressCard";
import CarSlides from "../components/AutomobileLanding/carSlides";

import { IAutoMobileLandingPage, IContactUs, IFooter } from "../models/models";
import Layout from "../components/Layout";
import { store } from "../app/store";

interface CustomProps {
  automobilelandingDetails: IAutoMobileLandingPage;
  contact: IContactUs;
  footerData: IFooter;
}
const AutomobileLanding = ({ automobilelandingDetails, contact, footerData }: CustomProps) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { defaultLocale, isFallback, query } = router;
  const { banner, carSlider, categoryList, locateUs, metaDetails, offer } = automobilelandingDetails;

  return (
    <>
      <Layout footerData={footerData}>
       
        {banner && <SliderBanners specs={[]} detail={banner ?? []} landing />}
        {categoryList && <ListCard categories={categoryList} />}

        {carSlider && <CarSlides carItems={carSlider} type="automobiles" />}

        {offer && locateUs && (
          <AddressCard
            offer={offer}
            locateUs={locateUs}
            contactData={contact}
          />
        )}
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ locale, locales }: any) => {
  const language = locale;
  var automobilelandingDetails = await loadAutoMobileLandingPage(language);
  var contact = await loadContactUsPage(language);
  const footerData = await loadFooterData(locale);

  if (!automobilelandingDetails || !contact || !footerData) {
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
      automobilelandingDetails,
      contact,
      footerData,
    },
  };
};

export default AutomobileLanding;
