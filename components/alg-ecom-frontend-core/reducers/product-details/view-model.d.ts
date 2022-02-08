import { Dict } from 'src/models';
export interface ProductDetailsStateModel {
    isLoading: boolean;
    productDetails: ProductViewModelBV | undefined;
    accessories: AccessoriesModelBV[];
    servicesList: ServicesModelBV[];
    insurancesList: InsurancesModelBV[];
    maxDownPayment: number;
    showroomsList: ShowRoomModelBV[];
    bankDetails: BankDetailsModelBV[];
    modelsList: ModelsListModelBV[];
    customerCarePackages: CustomerCareModelBV[];
    extendedWarrenty: ExtendedWarrentyModelBV[];
    registrationPrice: RegistrationPriceModelBV[];
    tplPrice: TplPriceModelBV[];
    accessoryPackages: AccessoryPackages[];
}
export interface ProductViewModelBV {
    productID: number;
    productTitle: string;
    productDescription: string;
    productImage: string;
    previewImage: string;
    bookingAmount: number;
    salesPrice: number;
    offerPrice: number;
    productUrl: string;
    productCurrency: string;
    registrationPrice: number;
    tplPrice: number;
    brochure: string;
    customoptionsList: CustomOptionsModel[];
    combinations: CombinationModel[];
    bodyType: string;
    bodyTypeKey: string;
    customTitle: string;
    modelID: number;
    variantSKU: string;
}
export interface CustomOptionsModel {
    customOptionID: number;
    customOptionName: string;
    helpText: string;
    variants: CustomOptionsVarientModel[];
    iFrameUrl?: string;
}
export interface CustomOptionsVarientModel {
    cutomOptionVariantID: number;
    value: string;
    variantThumbImage: string;
    isDefault: number;
    priceDiffType: string;
    priceDiff: number;
}
export interface CombinationModel {
    combinationID: number;
    combinationHash: string;
    combinationSKU: string;
    combinationSalesPrice: number;
    combinationOfferPrice: number;
    offerPrice: number;
    combinationPriceDiffType: string;
    comboPriceDiff: number;
    isDefault: number;
    stockCount: number;
    combinationMedia: CombinationMediaModel[];
    iFrameUrl?: string;
    inventory: InventoryModel[];
    receiveDate: string;
    combinationVariants: string;
    campaign: CampaignModel[];
}
export interface InventoryModel {
    vinNumber: string;
    locationCode: string;
    status: string;
    invStatus: string;
    progressCode: string;
    receiveDate: string;
}
export interface CampaignModel {
    campaignID: number;
    campaignTitle: string;
    campaignAvailableFrom: Date;
    campaignAvailableTo: Date;
    campaignImage: string;
    campaignEligibility: string;
    campaignTerms: string;
    appliedItems: EcomCampaignAppliedItem[];
    exception: number[];
    connectedCampaignID: string;
    connectedCampaignTitle: string;
    cashVoucher?: CashVoucherModel[];
    couponCashBack?: CouponCashBackModel;
    financeDetails?: CampaignFinanceOffer[];
}
export declare class EcomCampaignAppliedItem {
    productID: number;
    productOptionID: number;
    campDiscountTitle: string;
    productType: string;
    campDiscountType: string;
    campDiscountValue: number;
    campCashback?: number;
    campInternalPrice?: number;
    sortOrder?: number;
}
export declare class CampaignFinanceOffer {
    bankID: number;
    campDiscountTitle: string;
    campDiscountPercentage: number;
    campCashback: number;
    numOfFreeEmi: number;
    campaignID: number;
}
export interface CombinationMediaModel {
    image: string;
    imageType: string;
    angle: string;
    customOptionID: number;
    customOptionName: string;
}
export interface CashVoucherModel {
    cashVoucherID: number;
    cashVoucherTitle: string;
    campDiscountTitle: string;
}
export interface CouponCashBackModel {
    couponCashbackID: number;
    couponCashbackTitle: string;
    campDiscountTitle: string;
    noOfCouponOffered: number;
    couponMinDiscount: number;
    couponMaxDiscount: number;
}
export interface AccessoriesModelBV {
    productID: number;
    productCategoryName: string;
    productType: string;
    productTitle: string;
    productDescription: string;
    productImage: string;
    productPreviewImage: string;
    salesPrice: number;
    offerPrice: number;
    productCurrency: string;
    checkRows: string;
    tintAvailable: string;
    tintRows: number;
    componentCode: string;
    displayDisclaimer: string;
}
export interface AccessoryPackages {
    packageID: number;
    packageName: string;
    menuCode: string;
    packagePrice: number;
    tintAvailable: boolean;
    tintTitle: string;
    accessories: AccessoriesModelBV[];
    tint: {
        checkRows: string;
        tintRows: number;
        componentCode: string;
    };
    leatherPreferance?: boolean;
    packageImage?: string;
    leatherPreferanceComponentCode?: string;
    packageDescription?: string;
    productTitle?: string;
    productCategoryName: string;
}
export interface ServicesModelBV {
    productID: number;
    productTitle: string;
    planImage: string;
    planFile: string;
    menuCode: string;
    upgradeOption: string;
    upgradeProduct: string;
    productDescription: string;
    productIncludes: string;
    productTerms: string;
    productCurrency: string;
    optionsList: OptionsModelBV[];
    featuresList: FeaturesModelBV[];
    sortOrder?: number;
}
export interface CustomerCareModelBV {
    productID: number;
    productTitle: string;
    planImage: string;
    planFile: string;
    menuCode: string;
    upgradeOption: string;
    upgradeProduct: string;
    productDescription: string;
    productIncludes: string;
    productTerms: string;
    productCurrency: string;
    optionsList: OptionsModelBV[];
    featuresList: FeaturesModelBV[];
    sortOrder?: number;
}
export interface ExtendedWarrentyModelBV {
    productID: number;
    productTitle: string;
    planImage: string;
    planFile: string;
    menuCode: string;
    upgradeOption: string;
    upgradeProduct: string;
    productDescription: string;
    productIncludes: string;
    productTerms: string;
    productCurrency: string;
    optionsList: OptionsModelBV[];
    featuresList: FeaturesModelBV[];
    sortOrder?: number;
}
export interface InsurancesModelBV {
    productID: number;
    productTitle: string;
    planImage: string;
    planFile: string;
    menuCode: string;
    upgradeOption: string;
    upgradeProduct: string;
    productDescription: string;
    productIncludes: string;
    productTerms: string;
    productCurrency: string;
    optionsList: OptionsModelBV[];
    featuresList: FeaturesModelBV[];
    sortOrder?: number;
}
export interface OptionsModelBV {
    productOptionID: number;
    productOptionName: string;
    priceType: string;
    priceValue: number;
    payCollectBy: string;
    periodOfService: number;
    periodUnit: string;
    periodStartFrom: string;
    Default: number;
    userGroups: UserGroupModelBV[];
    Installments: InstallmentsModelBV[];
    addons: AddonModelBV[];
}
export interface AddonModelBV {
    addonID: number;
    packageID: number;
    packageOptionID: number;
    FOC: string;
    discountType: string;
    discountValue: number;
    addonPriceValue: number;
    addonPriceType: string;
    addonName: string;
    productType: string;
    addonPrice?: number;
    campaignID?: number;
    discount?: number;
}
export interface FeaturesModelBV {
    featureName: string;
    featureValue: string;
}
export interface InstallmentsModelBV {
    noOfInstallments: number;
    installmentRate: number;
    payCollectBy: string;
}
export interface UserGroupModelBV {
    userGroupID: number;
}
export interface ShowRoomModelBV {
    showroomID: number;
    showroomName: string;
}
export interface BankDetailsModelBV {
    bankID: number;
    bankName: string;
    annualInterestRate: number;
    minimumTenure: number;
    maximumTenure: number;
    tenureIncValue: number;
    minDownPayment: number;
    maxDownPayment: number;
    showRate: string;
}
export interface ModelsListModelBV {
    modelYear: number;
}
export interface RegistrationPriceModelBV {
    productID: number;
    productTitle: string;
    planImage: string;
    planFile: string;
    menuCode: string;
    upgradeOption: string;
    upgradeProduct: string;
    productDescription: string;
    productIncludes: string;
    productTerms: string;
    productCurrency: string;
    optionsList: OptionsModelBV[];
    featuresList: FeaturesModelBV[];
    sortOrder?: number;
}
export interface TplPriceModelBV {
    productID: number;
    productTitle: string;
    planImage: string;
    planFile: string;
    menuCode: string;
    upgradeOption: string;
    upgradeProduct: string;
    productDescription: string;
    productIncludes: string;
    productTerms: string;
    productCurrency: string;
    optionsList: OptionsModelBV[];
    featuresList: FeaturesModelBV[];
}
export interface ConfigurationAccessoryPackageOptions {
    tintOptions?: Dict<AccessoriesModelBV> & {
        windsheild?: AccessoriesModelBV;
        rear?: AccessoriesModelBV;
    };
    leatherAccessory?: AccessoriesModelBV;
}
export interface EcomPackageAccessory {
    productID: string;
    productTitle: string;
    productDescription: string;
    productCurrency: string;
    bodyType: string;
    partNumber: string;
    menuCode: string;
    tintLevel?: number;
    componentCode: string;
}
export interface ConfigurationAccessoryPackage extends AccessoriesModelBV, ConfigurationAccessoryPackageOptions {
    campaignID?: string;
    discount?: number;
}
export interface ConfigurationCampaignCashBack {
    productID: number;
    productOptionID: number;
    productType: string;
    campaignID?: number;
    cashbackAmount: number;
}
