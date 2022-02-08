const statusCondition = `where:{status:"published"}`;
const isDraftMode = process.env.NEXT_PUBLIC_REACT_APP_IS_DRAFT_MODE;
enum status {
  draft = "draft",
  published = "published",
}
const statusConditionWithMenu = `
where:{showInMainMenu:true,status:"${
  isDraftMode === "Yes" ? status.draft : status.published
}"}
`;
const statusConditionWithType = `
status:"published"
`;
const metaDetails = `{
    title
    description
    keyword
    ogTitle
  }`;

const seoDetails = `{
    metaTitle
    metaDescription
    preventIndexing
    keywords
    canonicalUrl
    metaImage {
      url
    }
    meta {
      name
      content
    }
  }`;

const localizations = `{
    locale
    id
    slug
  }`;

const relation = ` automobile {
    id
    title
    slug
    locale
    localizations ${localizations}
  }
  motorcycle{
    id
    title
    slug
    locale
    localizations ${localizations}
  }
  marine{
    id
    title
    slug
    locale
    localizations ${localizations}
  }
  power_product{
    id
    title
    slug
    locale
    localizations ${localizations}
  }
  `;
export const bannerItem = ` {
    title
    type
    relativeUrl
    absoluteUrl
    description
    image {
      url
      formats
    }
    button {
      color
      text
      relativeUrl
      absoluteUrl
      ${relation}
    }
  }`;

export const homeSliderItem = `{
    title
    slug
    price
    image {
      url
    }
    spec1
    spec2
   
  }`;

export const homeSliderMarineItem = `{
    title
    type
   
    image {
      url
    }
    
   
  }`;

export const image = `{
    name
    url
  }`;

const imageWithDescription = `{
    id,
    title,
    description
    image{
        url
    }
}`;

export const getLandingScreenQuery = (language: string) => {
  return `query MainLandingScreens {
    mainLandingScreens(locale: "${language}",${statusCondition})  {
      metaDetails ${metaDetails}
      seo ${seoDetails}
      topSlider ${bannerItem}
      automobileSlider ${homeSliderItem}
      motorcycleSlider ${homeSliderItem}
      powerProductSlider ${homeSliderMarineItem}
      marineSlider ${homeSliderMarineItem}
      stayConnected {
        title
        items {
        position
        url
          iconClass
          image ${image}
        }
      }
      offers {
        title
        subTitle
        offers {
          title 
          image${image}
          description
          link
        }
      }
    }
  }
`;
};

export const getNewsQuery = (language: string, limit?: number) => {
  return `query NewsItems {
    newsItems(locale: "${language}",${statusCondition},sort:"date:desc"${
    limit != null ? ",limit :" + limit : ""
  }) {
      title
      shortDescription
      date
      slug

      image {
          url
        }
      locale
      localizations {
        locale
        id
        slug
      }
    }
}`;
};

export const getFooterQuery = (language: string) => {
  return `query Footers {
    footers(locale: "${language}",${statusCondition}) {
        title
        copyRight
        menuItems {
          title
           items {
            label
            relativeUrl
            absoluteUrl
            action
          }
        }
        socialMedia{
          icon
          url
          title
        }
        serviceLinks {
          title
           items {
            label
            relativeUrl
            absoluteUrl
            action
          }
          isDisable
        }
        connectWithUs {
          title
           items {
            label
            relativeUrl
            absoluteUrl
            action
          }
          isDisable
        }
        extraLinks {
          title
           items {
            label
            relativeUrl
            absoluteUrl
            action
          }
          isDisable
        }
    }
}`;
};

export const getVehicleDetailsQuery = (locale: string, slug: string) => {
  return `query Automobiles {
    automobiles(locale: "${locale}",where:{slug:"${slug}"}) {
      metaDetails ${metaDetails}
      type
      displayImage${image}
      id
      slug
      title
      subTitle
      ecomProductId
      ecomModelCode
      price
      offerPrice
      buildLink
      megaMenuThumb {
        url
      }
      locale
      localizations ${localizations}
      banner ${bannerItem}
      specs {
        label,
        value
     }
      design{
          id,
          title
          items${imageWithDescription}

      }
      detailItems{
        title
        subtitle
        items${imageWithDescription}
      }
    
      gallery${image},
      colorVariants{
        title
        colorIcon${image}
        image${image}
      }
      interiorColorVariants{
        title
        colorIcon${image}
        image${image}
      }
      showInMainMenu
      homePageSliderSpec{
        spec1
        spec2
      }

      trims{
        title
        subTitle
        price
        infoText
        spec{
          spefcItem
        }
        image${image}
      }
      convenience{
        title
        description
        image${image}
      }
    }
  }
    `;
};

export const getAllMotorcycleQuery = (currentLanguage: string) => {
  return `query Motorcycles {
    motorcycles (locale: "${currentLanguage}",${statusConditionWithMenu}) {
      type
      slug
      title
      price
      megaMenuThumb {
        url
      }
      locale
      localizations ${localizations}
    }
   
  }
    `;
};

export const getMotorcycleDetailQuery = (locale: string, slug: string) => {
  return `query Motorcycles {
    motorcycles(locale: "${locale}",where:{slug:"${slug}"}) {
      ecomProductId
      metaDetails ${metaDetails}
      type
      showInMainMenu
      homePageSliderSpec{
        spec1
        spec2
      }

      displayImage${image}
      id
      slug
      title
      subTitle
      price
      offerPrice
      buildLink
      megaMenuThumb {
        url
      }
      locale
      localizations ${localizations}
      banner ${bannerItem}
      specs {
        label,
        value
     }
     
      detailItems{
        title
        subtitle
        items${imageWithDescription}
      }
    
      gallery${image},
      colorVariants{
        title
        colorIcon${image}
        image${image}
      }
      trims{
        title
        subTitle
        price
        infoText
        spec{
          spefcItem
        }
        image${image}
      }
      sliderImage${image}
    }
   
  }
    `;
};

const autoMobileLandingCategory = `{
  title
  subTitle
  image {
    url
  }
  link
}`;

export const autoMobileLandingSliderItem = `{
  title
  slug
  price
  image {
    url
  }
  spec1
  spec2
  type
}`;

export const autoMobileLandingSliderItemstaticpath = `{
  slug
}`;

const autoMobileLandingPage = `{
  metaDetails ${metaDetails}
  banner ${bannerItem}
  categoryList ${autoMobileLandingCategory}
  offer ${autoMobileLandingCategory}
  locateUs ${autoMobileLandingCategory}
  carSlider ${autoMobileLandingSliderItem}
}`;
const autoMobileLandingPageStaticpath = `{
  carSlider ${autoMobileLandingSliderItemstaticpath}
}`;

export const getAutoMobileLandingQuery = (language: string) => {
  return `query AutoMobileLandings {
    autoMobileLandings(locale: "${language}",${statusCondition} )  ${autoMobileLandingPage}
  }
`;
};

export const getAutoMobileLandingQueryStaticpath = (language: string) => {
  return `query Automobiles  {
  automobiles (locale: "${language}",${statusConditionWithMenu}){
    slug
  }
}
  `;
};

const contact = `{
  title
  address
  phone
  email
  link
  fax
  postalCode
  category
  timings
  city
}`;

const conactViewItem = `{
  showRooms ${contact}
  serviceCenters ${contact}
}`;

export const getContactUsScreenQuery = (language: string) => {
  return `query Contactuses {
    contactuses(locale: "${language}",${statusCondition}) {
      title
      banner ${bannerItem}
      autoMobiles ${conactViewItem}
      motorCycles ${conactViewItem}
      powerProduct ${conactViewItem}
      marine ${conactViewItem}
      metaDetails ${metaDetails}
    }
}`;
};
export const getAboutUsPageQuery = (language: string) => {
  return `query Aboutuses {
      aboutuses(locale: "${language}",${statusCondition}) {
        banner ${bannerItem}
        aboutUsItem {
          image ${image}
          content
        }
      metaDetails ${metaDetails}
    }
  }`;
};

const marineMenuLandingSliderItem = `{
  title
  slug
  price
  image {
    url
  }
  type
}`;

const marineMenuLandingPage = `{
  metaDetails ${metaDetails}
  banner ${bannerItem}
  categoryList ${autoMobileLandingCategory}
  items ${marineMenuLandingSliderItem}
}`;
const autoMobileLandingCategoryStaticpath = `{
  title
}`;
const marineMenuLandingPageStaticpath = `{
  categoryList ${autoMobileLandingCategoryStaticpath}
}`;

export const getMarineMenuLandingsQuery = (language: string) => {
  return `query MainersMenuLandings {
    mainersMenuLandings(locale: "${language}",${statusCondition} )  ${marineMenuLandingPage}
  }
`;
};

export const getMarineMenuLandingsQueryStaticpath = (language: string) => {
  return `query MainersMenuLandings {
    mainersMenuLandings(locale: "${language}",${statusCondition} )  ${marineMenuLandingPageStaticpath}
  }
`;
};

export const getMarinesForLandingQuery = (
  currentLanguage: string,
  type?: string
) => {
  if (type) {
    return `query Marines {
      marines (locale: "${currentLanguage}",where:{type:"${type}",${statusConditionWithType}}) {
        type
        slug
        title
        subTitle
        ecomProductId
        price
        megaMenuThumb {
          url
        }
        displayImage {
          url
        }
        locale
        localizations ${localizations}
      }
    }
      `;
  } else {
    return `query Marines {
      marines (locale: "${currentLanguage}",where:{${statusConditionWithType}}) {
        type
        slug
        title
        subTitle
        ecomProductId
        price
        megaMenuThumb {
          url
        }
        displayImage {
          url
        }
        locale
        localizations ${localizations}
      }
    }
      `;
  }
};

export const getMarinesForLandingQueryStaticpath = (
  currentLanguage: string,
  type?: string
) => {
  if (type) {
    return `query Marines {
      marines (locale: "${currentLanguage}",where:{type:"${type}",${statusConditionWithType}}) {
        type
        slug
        ecomProductId
      }
    }
      `;
  } else {
    return `query Marines {
      marines (locale: "${currentLanguage}",where:{${statusConditionWithType}}) {
        type
        slug
        ecomProductId
      }
    }
      `;
  }
};

const motorCylceMenuLandingPage = `{
  metaDetails ${metaDetails}
  banner ${bannerItem}
  categoryList ${autoMobileLandingCategory}
  slider ${autoMobileLandingSliderItem}
}`;

const motorCylceMenuLandingPageStaticpath = `{
  slider ${autoMobileLandingSliderItemstaticpath}
}`;

const motorCylceMenuLandingPageStaticpathCat = `{
  categoryList ${autoMobileLandingCategoryStaticpath}
}`;

export const getMotorCylceMenuLandingQuery = (language: string) => {
  return `query MotorCylceMenuLanding {
    motorCylceMenuLandings(locale: "${language}",${statusCondition} )  ${motorCylceMenuLandingPage}
  }
`;
};

export const getMotorCylceMenuLandingQueryStaticpath = (
  language: string,
  type: string
) => {
  if (type === "land") {
    return `query MotorCylceMenuLanding {
      motorCylceMenuLandings(locale: "${language}",${statusCondition} )  ${motorCylceMenuLandingPageStaticpath}
    }
  `;
  } else if (type === "cat") {
    return `query MotorCylceMenuLanding {
      motorCylceMenuLandings(locale: "${language}",${statusCondition} )  ${motorCylceMenuLandingPageStaticpathCat}
    }
  `;
  }
};

const listLanding = `{
  metaDetails ${metaDetails}
  type
  banner ${bannerItem}
  bottomBanner1 ${bannerItem}
  bottomBanner2 ${bannerItem}
  bottomBanner3 ${bannerItem}
}`;

export const getMotorcycleLandingQuery = (language: string, type: string) => {
  return `query MotorcycleLandings {
    motorcycleLandings(locale: "${language}",where:{type:"${type}",${statusConditionWithType}} )  ${listLanding}
  }
`;
};

const powerProductMenuLandingSliderItem = `{
  title
  slug
  price
  image {
    url
  }
  category
}`;

const powerProductMenuLandingPage = `{
  metaDetails ${metaDetails}
  banner ${bannerItem}
  categoryList ${autoMobileLandingCategory}
  items ${powerProductMenuLandingSliderItem}
}`;
const powerProductMenuLandingPageStaticpath = `{
  categoryList ${autoMobileLandingCategoryStaticpath}
}`;

export const getPowerProductMenuLandingsQuery = (language: string) => {
  return `query PowerProductMenuLandings {
    powerProductMenuLandings(locale: "${language}",${statusCondition} )  ${powerProductMenuLandingPage}
  }
`;
};

export const getPowerProductMenuLandingsQueryStaticpath = (
  language: string
) => {
  return `query PowerProductMenuLandings {
    powerProductMenuLandings(locale: "${language}",${statusCondition} )  ${powerProductMenuLandingPageStaticpath}
  }
`;
};

export const getPowerProductsForLandingQuery = (
  currentLanguage: string,
  type?: string
) => {
  if (type) {
    return `query PowerProducts {
    powerProducts (locale: "${currentLanguage}",where:{type:"${type}",${statusConditionWithType}}) {
      type
      category
      slug
      title
      subTitle
      ecomProductId
      price
      megaMenuThumb {
        url
      }
      displayImage {
        url
      }
      locale
      localizations ${localizations}
    }
  }
    `;
  } else {
    return `query PowerProducts {
      powerProducts (locale: "${currentLanguage}",where:{${statusConditionWithType}}) {
        type
        slug
        title
        category
        subTitle
        ecomProductId
        price
        megaMenuThumb {
          url
        }
        displayImage {
          url
        }
        locale
        localizations ${localizations}
      }
    }
      `;
  }
};

export const getPowerProductsForLandingQueryStaticpath = (
  currentLanguage: string,
  type?: string
) => {
  if (type) {
    return `query PowerProducts {
    powerProducts (locale: "${currentLanguage}",where:{type:"${type}",${statusConditionWithType}}) {
      type
      slug
      ecomProductId
    }
  }
    `;
  } else {
    return `query PowerProducts {
      powerProducts (locale: "${currentLanguage}",where:{${statusConditionWithType}}) {
        type
        slug
        ecomProductId
      }
    }
      `;
  }
};

export const getPowerProductLandingQuery = (language: string, type: string) => {
  return `query PowerProductLandings {
    powerProductLandings(locale: "${language}",where:{type:"${type}",${statusConditionWithType}} ) ${listLanding}
  }
`;
};

export const getPowerProductDetailQuery = (slug: string) => {
  return `query PowerProducts {
    powerProducts(locale: "all",where:{slug:"${slug}"}) {
      metaDetails ${metaDetails}
      type
      id
      slug
      showInMainMenu
      title
      subTitle
      description
      displayImage${image}
      price
      offerPrice
      buildLink
      megaMenuThumb {
        url
      }
      locale
      localizations ${localizations}
      banner ${bannerItem}
      specs {
        label,
        value
     }
    detailItems{
        title
        subtitle
        items${imageWithDescription}
     }
     mainSpecifications{
      col1
      col2
      col3
      col4
     }
      
    }
   
  }
    `;
};

export const getMarineDetailQuery = (slug: string, language: string) => {
  return `query Marines {
    marines(locale: "all",where:{slug:"${slug}"}) {
      metaDetails ${metaDetails}
      type
      showInMainMenu
      id
      slug
      title
      subTitle
      description
      price
      offerPrice
      buildLink
      megaMenuThumb {
        url
      }
      locale
      localizations ${localizations}
      banner ${bannerItem}
      specs {
        label,
        value
     }
    detailItems{
        title
        subtitle
        items${imageWithDescription}
     }
     accordian{
       title
       headerWithSpec{
         label
         value
       }

     }
      
    }
   
  }
    `;
};

export const getMarineLandingQuery = (language: string, type: string) => {
  return `query MaringLandings {
    maringLandings(locale: "${language}",where:{type:"${type}",${statusConditionWithType}} )  ${listLanding}
  }
`;
};

export const getMotorcyclesForLandingQuery = (
  currentLanguage: string,
  type: string
) => {
  return `query Motorcycles {
    motorcycles (locale: "${currentLanguage}",where:{type:"${type}",${statusConditionWithType}}) {
      type
      category
      slug
      title
      subTitle
      price
      offerPrice
      megaMenuThumb {
        url
      }
      displayImage {
        url
      }
      locale
      localizations ${localizations}
    }
  }
    `;
};

export const getAllVehiclesQuery = (currentLanguage: string) => {
  return `query Automobiles  {
    automobiles (locale: "${currentLanguage}",${statusConditionWithMenu}){
      type
      slug
      ecomModelCode
      title
      price
      megaMenuThumb {
        url
      }
      locale
      localizations ${localizations}
    }
  }
    `;
};
