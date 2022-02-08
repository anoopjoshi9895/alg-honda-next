export interface CMSStateModel {
  vehicleData: IVehicleData;
  powerProductData: IPowerProductData;
  marineData: IPowerProductData;
  motorcycleData: IMotorcycleData;
  serviceData: IServiceData;
  landingData: ILandingData;
  menuData: IMenuDetailsData;
  newsData: INewsData;
  contactData: IContactData;
  aboutData: IAboutData;
  aboutServiceData: IAboutServiceData;
  offerData: IOfferData;
  footerData: IFooterData;
  disclaimer: IRichTextData;
  privacy: IRichTextData;
  terms: IRichTextData;
  slugDetails?: ISlugDetails;
}

export interface IMetaDetails {
  title: string;
  description: string;
  keyword: string;
  ogTitle: string;
}

export interface ISeoDetails {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  metaImage: IImage;
  preventIndexing: boolean;
  meta: IMeta[];
}

export interface IMeta {
  name: string;
  content: string;
}

export interface ISlugDetails {
  englishSlug: string;
  arabicSlug: string;
}
export interface IFooterData extends IDataLoader {
  data?: IFooter;
}
export interface IRichTextData extends IDataLoader {
  data?: IRichTextContent;
}
export interface IOfferData extends IDataLoader {
  data?: IOfferPageResponse;
}
export interface IAboutData extends IDataLoader {
  data?: IAboutUsPageResponse;
}
export interface IAboutServiceData extends IDataLoader {
  data?: IAboutServiceResponse;
}
export interface IContactData extends IDataLoader {
  data?: IContactUs;
}
export interface INewsData extends IDataLoader {
  data: INewsItem[];
}

export interface ILandingData extends IDataLoader {
  data?: ILandingScreenData;
}

export interface IMenuDetailsData extends IDataLoader {
  data?: IMenuData;
}
export interface IServiceData extends IDataLoader {
  data?: IServicePageResponse;
}
export interface IVehicleData extends IDataLoader {
  allVehicles: IProductDetails[];
}

export interface IPowerProductData extends IDataLoader {
  items: IPowerProducts[];
}
export interface IMotorcycleData extends IDataLoader {
  allMotorCycles: IProductDetails[];
}

export interface IDataLoader {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface IProductDetails {
  id: number;
  price: string;
  displayImage: IImage;
  offerPrice: string;
  ecomProductId: string;
  ecomModelCode: string;
  type: string;
  category?: string;
  slug: string;
  title: string;
  subTitle: string;
  locale: string;
  localizations: ILocalization[];
  megaMenuThumb: IImage;
  banner: ITopBanner[];
  specs: IKeyValue[];
  design: IDesign[];
  detailItems: DetailItem[];
  gallery: IImage[];
  colorVariants: IColorVariant[];
  interiorColorVariants: IColorVariant[];
  trims: ITrims[];
  convenience: IConvenience[];
  buildLink: string;
  sliderImage: IImage;
  showInMainMenu: boolean;
  homePageSliderSpec: IHomePageSliderSpec;
  metaDetails?: IMetaDetails;
}

export interface IHomePageSliderSpec {
  spec1: string;
  spec2: string;
}

export interface IPowerProducts {
  id: number;
  showInMainMenu: boolean;
  homePageSliderSpec: IHomePageSliderSpec;
  specs: IKeyValue[];
  price: string;
  offerPrice: string;
  type: string;
  category: string;
  slug: string;
  title: string;
  subTitle: string;
  locale: string;
  localizations: ILocalization[];
  megaMenuThumb: IImage;
  banner: ITopBanner[];
  description: string;
  detailItems: DetailItem[];
  buildLink: string;
  accordian: IAccordian[];
  displayImage: IImage;
  mainSpecifications: IThreeColumnData[];
  metaDetails?: IMetaDetails;
  ecomProductId: string;
}

export interface IThreeColumnData {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

export interface IAccordian {
  title: string;
  headerWithSpec: IHeaderWithSpec[];
}

export interface IHeaderWithSpec {
  label: string;
  value: string;
}

export interface IConvenience {
  title: string;
  description: string;
  image: IImage;
}

export interface ITrims {
  title: string;
  subTitle: string;
  price: string;
  infoText: string;
  spec: ISpecText[];
  image: IImage;
}

export interface ISpecText {
  spefcItem: string;
}

export interface IColorVariant {
  title: string;
  colorIcon: IImage;
  image: IImage;
}
export interface DetailItem {
  title: string;
  subtitle?: any;
  items: Item[];
}

export interface Item {
  id: number;
  title: string;
  description: string;
  image: IImage;
}

export interface IHighlights {
  id: number;
  title: string;
  subtitle: string;
  items: Item[];
}

export interface IKeyValue {
  label: string;
  value: string;
}

export interface IImage {
  id: number;
  name: string;
  url: string;
}

export interface IDesign {
  id: number;
  title: string;
  items: IImageWithDescription[];
}

export interface IImageWithDescription {
  id: number;
  title: string;
  description: string;
  image: IImage;
}

export interface ILocalization {
  locale: string;
  id: string;
  slug: string;
}

export interface ServiceItem {
  description: string;
  title: string;
  image: IImage;
}

export interface IServicePageResponse {
  banner: ITopBanner[];
  serviceItems: ServiceItem[];
}

export interface Welcome {
  id: number;
  title: string;
  description: string;
}

export interface IAboutFirstSection {
  id: number;
  title: string;
  description: string;
  firstImage: IImage;
  secondImage: IImage;
}
export interface IAboutServiceResponse {
  banner: ITopBanner[];
  title: string;
  description: string;
}

export interface IAboutUsPageResponse {
  banner: ITopBanner[];
  aboutUsItem: IAboutUsItem[];
  metaDetails: IMetaDetails;
}
export interface IAboutUsItem {
  image: IImage;
  content: string;
}

export interface IVehicleWarrantyPageResponse {
  banner: ITopBanner[];
  items: IVehicleWarrantyItem[];
  metaDetails: IMetaDetails;
}
export interface IVehicleWarrantyItem {
  image: IImage;
  content: string;
}

export interface IOfferPageResponse {
  banner: ITopBanner[];
  landingScreen: { midSlider: ITopBanner[] };
  offerItem: IOfferItem[];
}

export interface INewsItem {
  title: string;
  shortDescription: string;
  description: string;
  slug: string;
  date: Date;
  image: IImage;
  locale: string;
  localizations: ILocalization[];
  metaDetails?: IMetaDetails;
}

export interface ILandingScreenData {
  topSlider: ITopBanner[];
  automobileSlider: IHomepageSlider[];
  marineSlider: IHomepageSlider[];
  powerProductSlider: IHomepageSlider[];
  motorcycleSlider: IHomepageSlider[];
  stayConnected: ISocialMedia;
  // Gallery: ITopBanner[];
  offers: ILandingOffer;
  seo: ISeoDetails;
  metaDetails: IMetaDetails;
}
export interface ILandingOffer {
  title: string;
  subTitle: string;
  offers: ILandingOfferItem[];
}

export interface ILandingOfferItem {
  title: string;
  image: IImage;
  description: string;
  link: string;
}

export interface IHomepageSlider {
  title: string;
  slug: string;
  price: string;
  spec1: string;
  spec2: string;
  image: IImage;
  type: string;
}
export interface IMenuData {
  automobileMenu: IMenuCategoryItem[];
  marines: IMenuCategoryItem[];
  power_products: IMenuCategoryItem[];
  motorcycles: IMenuCategoryItem[];
}

export interface IMenuCategoryItem {
  type: string;
  title: string;
  price: string;
  image: IImage;
  slug?: string;
  productId?: string;
  category?: string;
  active?: boolean;
}

export interface IMotorcycleLanding {
  banner: ITopBanner[];
  bottomBanner1: ITopBanner;
  bottomBanner2: ITopBanner;
  bottomBanner3: ITopBanner;
  metaDetails: IMetaDetails;
}

export interface IOfferPage {
  banner: ITopBanner[];
  offers: IOfferItem[];
  metaDetails: IMetaDetails;
}

export interface IBodyPaintPage {
  banner: ITopBanner[];
  content: string;
  metaDetails: IMetaDetails;
}

export interface ICarServicePage {
  banner: ITopBanner[];
  content: string;
  menuPriceFile: IImage;
  metaDetails: IMetaDetails;
}

export interface IFleetPage {
  banner: ITopBanner[];
  content: string;
  metaDetails: IMetaDetails;
}

export interface IPartsPage {
  banner: ITopBanner[];
  content: string;
  metaDetails: IMetaDetails;
}

export interface IOwnersPage {
  banner: ITopBanner[];
  manageYourVehicle: IManageYourVehicle;
  metaDetails: IMetaDetails;
}

export interface IManageYourVehicle {
  title: string;
  items: IManageYourVehicleItem[];
}

export interface IManageYourVehicleItem {
  icon: IImage;
  title: string;
  description: string;
  relativeUrl?: string;
  absoluteUrl?: string;
}

export interface IOfferItem {
  title: string;
  slug: string;
  startingAt: string;
  description: string;
  image: IImage;
  bannerImage: IImage;
  ecomModelId: string;
  button: {
    text: string;
    action: string;
  };
}

export interface ITopBanner {
  title: string;
  description: string;
  type: string;
  image: {
    url: string;
    formats: IimageFormat;
  };
  automobile: IRelationData;
  motorcycle: IRelationData;
  marine: IRelationData;
  power_product: IRelationData;
  button: IButton[];
  relativeUrl: string;
  absoluteUrl: string;
}

export interface IimageFormat {
  small: { url: string };
}

export interface IRelationData {
  title: string;
  slug: string;
  locale: string;
  localizations: ILocalization[];
}
export interface IButton {
  color: "light_color" | "theme_color";
  text: string;
  relativeUrl: string;
  absoluteUrl: string;
  automobile: IRelationData;
  motorcycle: IRelationData;
  marine: IRelationData;
  power_product: IRelationData;
}
export interface IWelcomeText {
  title: string;
  description: string;
}
export interface IShoppingTool {
  title: string;
  description: string;
  items: IShoppingToolItem[];
}
export interface IShoppingToolItem extends ITopBanner {
  link: string;
}
export interface ISocialMedia {
  title: string;
  items: ISocialMediaItem[];
}
export interface ISocialMediaItem {
  url: string;
  iconClass: string;
  position: string;
  image: {
    url: string;
  };
}
export interface IContactItem {
  autoMobiles: IContactViewItem;
  motorCycles: IContactViewItem;
  powerProduct: IContactViewItem;
  marine: IContactViewItem;
}
export interface IContactViewItem {
  showRooms: IContact[];
  serviceCenters: IContact[];
}

export interface IContact {
  title: string;
  address: string;
  phone: string;
  email: string;
  link: string;
  fax: string;
  postalCode: string;
  category: string;
  timings: string;
  city: string;
}

export interface IContactUs {
  title: string;
  banner: ITopBanner[];
  autoMobiles: IContactViewItem;
  motorCycles: IContactViewItem;
  powerProduct: IContactViewItem;
  marine: IContactViewItem;
  metaDetails?: IMetaDetails;
}

export interface IDepartmentContact {
  title: string;
  openingDetails: string;
  phone: string;
  email: string;
}

export interface ILinkItem {
  label: string;
  relativeUrl?: string;
  absoluteUrl?: string;
}

export interface IFooterMenu {
  title: string;
  items: ILinkItem[];
  isDisable?: boolean;
}
export interface IFooter {
  title: string;
  copyRight: string;
  menuItems: IFooterMenu[];
  socialMedia: ISocialMedia[];
  serviceLinks: IFooterMenu[];
  connectWithUs: IFooterMenu[];
  extraLinks: IFooterMenu[];
}
export interface ISocialMedia {
  icon: string;
  url: string;
}
export interface IRichTextContent {
  content: string;
  metaDetails?: IMetaDetails;
}

export interface IPowerProductDealer {
  title: string;
  dealers: IDealerItem[];
}
export interface IDealerItem {
  title: string;
  address: string;
  mobile: string;
}

export interface IAutoMobileLandingPage {
  title: string;
  banner: ITopBanner[];
  categoryList: IAutoMobileCategoryItem[];
  metaDetails?: IMetaDetails;
  offer: IAutoMobileCategoryItem;
  locateUs: IAutoMobileCategoryItem;
  carSlider: IHomepageSlider[];
}
export interface IAutoMobileCategoryItem {
  title: string;
  subTitle: string;
  link: string;
  image: {
    url: string;
  };
}
export interface IPowerProductMenuLandingItem {
  title: string;
  slug: string;
  price: string;
  image: IImage;
  category?: string;
  type?: string;
}
export interface IMotorCylceLandingPage {
  title: string;
  banner: ITopBanner[];
  categoryList: IAutoMobileCategoryItem[];
  metaDetails?: IMetaDetails;
  slider: IHomepageSlider[];
}

export interface IPowerProductMenuLandingPage {
  title: string;
  banner: ITopBanner[];
  categoryList: IAutoMobileCategoryItem[];
  metaDetails?: IMetaDetails;
  items: IPowerProductMenuLandingItem[];
}

export interface IMarineMenuLandingPage {
  title: string;
  banner: ITopBanner[];
  categoryList: IAutoMobileCategoryItem[];
  metaDetails?: IMetaDetails;
  items: IPowerProductMenuLandingItem[];
}

export interface IAboutUsItem {
  image: IImage;
  content: string;
  aboutUsItem: any[];
  banner: ITopBanner[];
}
