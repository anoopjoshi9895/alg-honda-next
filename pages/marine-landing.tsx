import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import {
    loadMarineMenuLandingPage,loadContactUsPage,loadMarinesForLanding,loadFooterData
  } from "../apiService/apiService";
import _ from 'lodash';
import { IPowerProducts,IMarineMenuLandingPage,IContactUs,IFooter } from '../models/models';
import SliderBanners from "../components/slider-banner";
import ListCard from "../components/AutomobileLanding/listCard";
import MarineAddress from '../components/marineLanding/marineAddress';
import MarineAllProducts from '../components/marineLanding/marineAllproducts';
import Layout from '../components/Layout';
import { store } from "../app/store";
interface CustomProps {
  marineLandingDetails: IMarineMenuLandingPage;
    contact: IContactUs;
    response:IPowerProducts[]
    footerData:IFooter
  }


const MarineLanding = ({marineLandingDetails,contact,response,footerData}:CustomProps) => {
  const { t, i18n } = useTranslation();
  const [marines, setMarines] = React.useState<IPowerProducts[]>([]);
  const {
      banner,
      categoryList,
      items,
      metaDetails
  } = marineLandingDetails

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
        <ListCard categories={categoryList} />
      )}

      {response && <MarineAllProducts response={response}/>}

      {contact && 
      <MarineAddress contactData={contact}/>
      }

      </Layout>

    </>
  );
};

export const getStaticProps = async ({ locale, locales }: any) => {
    const language = locale;
    var marineLandingDetails = await loadMarineMenuLandingPage(language);
    var contact = await loadContactUsPage(language);
    var response = await loadMarinesForLanding(language)
    const footerData = await loadFooterData(locale);

    if (!marineLandingDetails || !contact || !response ||!footerData) {
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
        marineLandingDetails,
        contact,
        response,
        footerData
      },
    };
  };

export default MarineLanding;
