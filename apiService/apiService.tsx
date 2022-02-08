import getConfig from "next/config";
// const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
// const cmsDomain = process.env.REACT_APP_CMS_DOMAIN;
// const cmsDomain = publicRuntimeConfig.backendUrl
const cmsDomain = `https://qa-cms-oorjit.hondaalghanim.com/`;

import {
  getLandingScreenQuery,
  getNewsQuery,
  getFooterQuery,
  getVehicleDetailsQuery,
  getMotorcycleDetailQuery,
  getAutoMobileLandingQuery,
  getContactUsScreenQuery,
  getAboutUsPageQuery,
  getMarineMenuLandingsQuery,
  getMarinesForLandingQuery,
  getMotorcycleLandingQuery,
  getPowerProductMenuLandingsQuery,
  getMotorCylceMenuLandingQuery,
  getPowerProductsForLandingQuery,
  getPowerProductLandingQuery,
  getPowerProductDetailQuery,
  getMarineDetailQuery,
  getMarineLandingQuery,
  getMarinesForLandingQueryStaticpath,
  getMotorcyclesForLandingQuery,
  getAutoMobileLandingQueryStaticpath,
  getMotorCylceMenuLandingQueryStaticpath,
  getMarineMenuLandingsQueryStaticpath,
  getPowerProductMenuLandingsQueryStaticpath,
  getPowerProductsForLandingQueryStaticpath,
  getAllVehiclesQuery
} from "./query";
import {
  ILandingScreenData,
  INewsItem,
  IOfferPageResponse,
  IProductDetails,
  IAutoMobileLandingPage,
  IContactUs,
  IMarineMenuLandingPage,
  IPowerProducts,
  IMotorcycleLanding,
  IPowerProductMenuLandingPage,
  IMotorCylceLandingPage
} from "../models/models";
import { post } from "../services/http";

export async function loadLandingPage(
  language: string
): Promise<ILandingScreenData> {
  const query = getLandingScreenQuery(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: "MainLandingScreens",
    query,
  });
  return (response?.data?.data as any)?.mainLandingScreens?.[0];
}

export async function loadNewsItems(
  language: string,
  count?: number
): Promise<INewsItem[]> {
  const query = getNewsQuery(language, count);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: "NewsItems",
    query,
  });
  return (response?.data?.data as any)?.newsItems;
}

export async function loadFooterData(
  language: string
): Promise<IOfferPageResponse> {
  try {
    const query = getFooterQuery(language);
    const url = `${cmsDomain}graphql`;
    const response = await post(url, {
      operationName: "Footers",
      query,
    });
    return (response?.data?.data as any)?.footers?.[0];
  } catch (err) {
    return {} as any;
  }
}

export async function loadAboutUsData(
  language: string
): Promise<IOfferPageResponse> {
  try {
    const query = getAboutUsPageQuery(language);
    const url = `${cmsDomain}graphql`;
    const response = await post(url, {
      operationName: "Aboutuses",
      query,
    });
    return (response?.data?.data as any)?.aboutuses?.[0];
  } catch (err) {
    return {} as any;
  }
}
export async function loadVehicleDetail(
  language: string,
  slug: string,
): Promise<IProductDetails> {
  const query = getVehicleDetailsQuery(language, slug);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: "Automobiles",
    query,
  });
  return (response?.data?.data as any)?.automobiles?.[0];
}

export async function loadMotorcycleDetail(
  language: string,
  slug: string
): Promise<IProductDetails> {
  const query = getMotorcycleDetailQuery(language, slug);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'Motorcycles',
    query,
  });
  return (response?.data?.data as any)?.motorcycles?.[0];
}

export async function loadAutoMobileLandingPage(
  language: string
): Promise<IAutoMobileLandingPage> {
  const query = getAutoMobileLandingQuery(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: "AutoMobileLandings",
    query,
  });
  return (response?.data?.data as any)?.autoMobileLandings?.[0];
}


export async function loadAutoMobileLandingPageStaticpath(
  language: string
): Promise<IProductDetails[]> {
  const query = getAutoMobileLandingQueryStaticpath(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'Automobiles',
    query,
  });
  return (response?.data?.data as any)?.automobiles;
}

export async function loadContactUsPage(language: string): Promise<IContactUs> {
  const query = getContactUsScreenQuery(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: "Contactuses",
    query,
  });
  return (response?.data?.data as any)?.contactuses?.[0];
}

export async function loadMarineMenuLandingPage(
  language: string
): Promise<IMarineMenuLandingPage> {
  const query = getMarineMenuLandingsQuery(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'MainersMenuLandings',
    query,
  });
  return (response?.data?.data as any)?.mainersMenuLandings?.[0];
}

export async function loadMarineMenuLandingPageStaticpage(
  language: string
): Promise<IMarineMenuLandingPage> {
  const query = getMarineMenuLandingsQueryStaticpath(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'MainersMenuLandings',
    query,
  });
  return (response?.data?.data as any)?.mainersMenuLandings?.[0];
}

export async function loadMarinesForLanding(
  currentLanguage: string,
  type?: string
): Promise<IPowerProducts[]> {
  const query = getMarinesForLandingQuery(currentLanguage, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'Marines',
    query,
  });
  return (response?.data?.data as any)?.marines;
}
export async function loadMarinesForLandingStaticpath(
  currentLanguage: string,
  type?: string
): Promise<IPowerProducts[]> {
  const query = getMarinesForLandingQueryStaticpath(currentLanguage, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'Marines',
    query,
  });
  return (response?.data?.data as any)?.marines;
}

export async function loadMotorCylceMenuLandingPage(
  language: string
): Promise<IMotorCylceLandingPage> {
  const query = getMotorCylceMenuLandingQuery(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'MotorCylceMenuLanding',
    query,
  });
  return (response?.data?.data as any)?.motorCylceMenuLandings?.[0];
}

export async function loadMotorCylceMenuLandingPageStaticpath(
  language: string,
  type:string
): Promise<IMotorCylceLandingPage> {
  const query = getMotorCylceMenuLandingQueryStaticpath(language,type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'MotorCylceMenuLanding',
    query,
  });
  return (response?.data?.data as any)?.motorCylceMenuLandings?.[0];
}

export async function loadMotorcycleLandingPage(
  language: string,
  type: string
): Promise<IMotorcycleLanding> {
  const query = getMotorcycleLandingQuery(language, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'MotorcycleLandings',
    query,
  });
  return (response?.data?.data as any)?.motorcycleLandings?.[0];
}

export async function loadPowerProductMenuLandingPage(
  language: string
): Promise<IPowerProductMenuLandingPage> {
  const query = getPowerProductMenuLandingsQuery(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'PowerProductMenuLandings',
    query,
  });
  return (response?.data?.data as any)?.powerProductMenuLandings?.[0];
}

export async function loadPowerProductMenuLandingPageStaticpath(
  language: string
): Promise<IPowerProductMenuLandingPage> {
  const query = getPowerProductMenuLandingsQueryStaticpath(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'PowerProductMenuLandings',
    query,
  });
  return (response?.data?.data as any)?.powerProductMenuLandings?.[0];
}

export async function loadPowerproductForLanding(
  currentLanguage: string,
  type?: string
): Promise<IPowerProducts[]> {
  const query = getPowerProductsForLandingQuery(currentLanguage, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'PowerProducts',
    query,
  });
  return (response?.data?.data as any)?.powerProducts;
}

export async function loadPowerproductForLandingStaticpath
(
  currentLanguage: string,
  type?: string
): Promise<IPowerProducts[]> {
  const query = getPowerProductsForLandingQueryStaticpath(currentLanguage, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'PowerProducts',
    query,
  });
  return (response?.data?.data as any)?.powerProducts;
}

export async function loadPowerProductLandingScreen(
  currentLanguage: string,
  type?: string
): Promise<IPowerProducts[]> {
  const query = getPowerProductsForLandingQuery(currentLanguage, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'PowerProducts',
    query,
  });
  return (response?.data?.data as any)?.powerProducts;
}

export async function loadPowerProductLandingPage(
  language: string,
  type: string
): Promise<IMotorcycleLanding> {
  const query = getPowerProductLandingQuery(language, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'PowerProductLandings',
    query,
  });
  return (response?.data?.data as any)?.powerProductLandings?.[0];
}

// For loading the power product details
export async function loadPowerProductDetail(
  slug: string
): Promise<IPowerProducts> {
  const query = getPowerProductDetailQuery(slug);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'PowerProducts',
    query,
  });
  return (response?.data?.data as any)?.powerProducts?.[0];
}

export async function loadMarineDetail(slug: string, language: string): Promise<IPowerProducts> {
  const query = getMarineDetailQuery(slug, language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'Marines',
    query,
  });
  return (response?.data?.data as any)?.marines?.[0];
}

export async function loadMarineLandingPage(
  language: string,
  type: string
): Promise<IMotorcycleLanding> {
  const query = getMarineLandingQuery(language, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'MaringLandings',
    query,
  });
  return (response?.data?.data as any)?.maringLandings?.[0];
}

export async function loadMotorCyclesForLanding(
  currentLanguage: string,
  type: string
): Promise<IProductDetails[]> {
  const query = getMotorcyclesForLandingQuery(currentLanguage, type);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'Motorcycles',
    query,
  });
  return (response?.data?.data as any)?.motorcycles;
}

export async function loadAllVehicles(
  language: string
): Promise<IProductDetails[]> {
  const query = getAllVehiclesQuery(language);
  const url = `${cmsDomain}graphql`;
  const response = await post(url, {
    operationName: 'Automobiles',
    query,
  });
  return (response?.data?.data as any)?.automobiles;
}
