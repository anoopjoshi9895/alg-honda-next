import { ConfigurationAccessoryPackageOptions, AccessoryPackages, ConfigurationCampaignCashBack } from '../product-details';
export interface CartStateModel {
    isLoading: boolean;
    cartID: number | undefined;
    userID: number;
    netPrice: number;
    productBasePrice: number;
    tplPrice: number;
    registrationPrice: number;
    productCurrency: string;
    showroomID: number;
    tradeIn: string;
    productInfo: ProductInfoModelCart;
    accessoriesInfo: AccessoriesModelCart[];
    insuranceDetails: InsurancesModelCart[];
    serviceDetails: ServicesModelCart[];
    customerCare: CustomerCareModelCart[];
    extendedWarranty: ExtendedWarrantyModelCart[];
    financeDetails: FinanceModelCart[];
    tradeInDetails: TradeInModelCart[];
    configID?: number;
    configurationID?: number;
    selCampaignDetails?: CampaignDetail[];
    tpl?: TPLDetail[];
    registration?: TPLDetail[];
    coupons?: Coupon[];
    vouchers?: Voucher[];
    totalCouponCashBack?: number;
    accessoryPackages?: CartAccessoryPackage[];
    campaignCashbackItems?: ConfigurationCampaignCashBack[];
    totalDiscount?: number;
}
export interface CartAccessoryPackage extends AccessoryPackages, ConfigurationAccessoryPackageOptions {
    campaignID?: number;
    discount?: number;
}
export interface Coupon {
    couponCode: string;
    couponCashbackCodeItemID: number;
    campaignID: number;
    couponCashbackAmount: number;
}
export interface Voucher {
    cashVoucherID: number;
    netPriceCeiling?: string;
    netPriceType?: string;
    netPriceValue?: number;
    campaignID: number;
    campDiscountTitle: string;
    cashVoucherTitle: string;
}
export interface TPLDetail {
    cartItemID: number;
    productID: number;
    productTitle: string;
    menuCode: string;
    offerPrice: number;
    salesPrice: number;
    productOptionID: number;
    addons: AddonModelCart[];
}
export interface CampaignDetail {
    campaignID: number;
    campaignTitle: string;
}
export interface ProductInfoModelCart {
    cartItemID: number;
    productID: number;
    productTitle: string;
    saleslPrice: string;
    offerPrice: string;
    customOptionsInfo: CustomOptionsInfoModelCart[];
    combinationInfo: CombinationInfoModelCart[];
    tradeInDiscount: number;
}
export interface CustomOptionsInfoModelCart {
    customOptionID: number;
    customOptionName: string;
    variantID: number;
    variantName: string;
    variantThumbImage: string;
    priceDiff: number;
}
export interface CombinationInfoModelCart {
    combinationID: number;
    combinationSKU: string;
    combinationPrice: number;
    combinationMedia: CombinationMediaModelCart[];
    iFrameUrl?: string;
}
export interface CombinationMediaModelCart {
    image: string;
    imageType: string;
    angle: string;
    customOptionID: number;
    customOptionName: string;
}
export interface AccessoriesModelCart {
    productID: number;
    cartItemId: string;
    productTitle: string;
    productImage: string;
    salesPrice: number;
    offerPrice: number;
    itemSubtotal: number;
    itemQuantity: number;
    tintDetails: TintDetailsModelCart;
}
export interface TintDetailsModelCart {
    tint_windshield: string | null;
    tint_rear: string | null;
    tint_row_1: string | null;
    tint_row_2: string | null;
    tint_row_3: string | null;
}
export interface InsurancesModelCart {
    cartItemID: number;
    productID: number;
    productTitle: string;
    menuCode: string;
    offerPrice: number;
    salesPrice: number;
    planDetails: PlanDetailsModelCart;
    productOptionID: number;
    sortOrder?: number;
}
export interface PlanDetailsModelCart {
    productOptionID: number;
    installmentRate: number;
    priceType?: string;
    priceValue?: number;
    payType: string;
    installments: number;
    addons: AddonModelCart[];
}
export interface AddonModelCart {
    addonID: number;
    price: number;
    originalPrice: number;
    productType: string;
    packageID: number;
    packageOptionID: number;
    FOC: string;
}
export interface ExtendedWarrantyModelCart {
    cartItemID: number;
    productID: number;
    productTitle: string;
    menuCode: string;
    offerPrice: number;
    salesPrice: number;
    planDetails: PlanDetailsModelCart;
    productOptionID: number;
    sortOrder?: number;
}
export interface CustomerCareModelCart {
    cartItemID: number;
    productID: number;
    productTitle: string;
    menuCode: string;
    offerPrice: number;
    salesPrice: number;
    planDetails: PlanDetailsModelCart;
    productOptionID: number;
    sortOrder?: number;
}
export interface ServicesModelCart {
    cartItemID: number;
    productID: number;
    productTitle: string;
    menuCode: string;
    offerPrice: number;
    salesPrice: number;
    planDetails: PlanDetailsModelCart;
    productOptionID: number;
    sortOrder?: number;
}
export interface FinanceModelCart {
    term: number;
    bankID: number;
    monthlyPayment: number;
    downPayment: number;
    bankName: string;
    interestRate: number;
    campDiscountPercentage?: number;
    numOfFreeEmi?: number;
    campCashback?: number;
    campaignID?: number;
    effectiveInterestRate: number;
}
export interface TradeInModelCart {
    tradeInID: number;
    modelYear: number;
    brand: string;
    modelCode: any;
    trim: string;
    mileage: number;
}
export declare const initialProductInfoModelCart: ProductInfoModelCart;
export declare const initialCartStateModelState: CartStateModel;
