import { TPLDetail, AccessoriesModelCart, InsurancesModelCart, ServicesModelCart, CustomerCareModelCart, ExtendedWarrantyModelCart, CartAccessoryPackage, CampaignDetail, Coupon, Voucher } from 'src/reducers/cart';
import { ConfigurationCampaignCashBack } from 'src';
export interface FacebookUser {
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
    gender: string;
    id: string;
    userPhone: string;
}
export interface User {
    userToken: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhone: string;
    userGender: string;
    userDOB: Date;
    profileImage: string;
    userProfilePicture: string;
    userDefaultLanguage: number;
    userStatus: string;
    verified: string;
    customerId?: string;
}
export interface UserConfiguration {
    configID: number;
    productTitle: string;
    trim: string;
    addedDate: Date;
    stage: number;
    stageName: string;
    Exterior: string;
    Interior: string;
    productID: number;
    quoteNumber: string;
    quoteExpiry: string;
    orderTotalAmount: number;
    totalDiscount: number;
}
export interface UserOrder {
    masterOrderID: number;
    orderNumber: string;
    addedDate: Date;
    productTitle: string;
    vinNumber: number;
    orderStatus: string;
    paymentStatus: string;
    trim: string;
    Exterior: string;
    Interior: string;
    orderTotalAmount: number;
    paidAmount: number;
    totalDiscount: number;
}
export interface PlanDetailsModelConfig {
    planYear: number;
    planRate: number;
    payType: string;
    installments: number;
    addons: AddonModelConfig[];
}
export interface AddonModelConfig {
    id: number;
    price: number;
    addonName: string;
}
export interface UserOrderDetails {
    masterOrderID: number;
    orderNumber: string;
    addedDate: string;
    productTitle: string;
    vinNumber: number;
    orderStatus: string;
    paymentStatus: string;
    trim: string;
    modelYear: number;
    model: string;
    bodyType: string;
    Exterior: string;
    Interior: string;
    orderTotalAmount: number;
    paidAmount: number;
    dueAmount: number;
    basePrice: number;
    paymentType: string;
    transactionID: number;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhone: string;
    showroomName: string;
    showroomLatitude?: any;
    showroomLongitude?: any;
    accessoriesInfo: AccessoriesModelCart[];
    insuranceDetails: InsurancesModelCart[];
    serviceDetails: ServicesModelCart[];
    customerCare: CustomerCareModelCart[];
    extendedWarranty: ExtendedWarrantyModelCart[];
    financeDetails: any[];
    tradeIn: string;
    tradeInDetails: any[];
    tplAmount: number;
    registrationAmount: number;
    salesPrice: number;
    accessoryPackages?: CartAccessoryPackage[];
    tpl?: TPLDetail[];
    registration?: TPLDetail[];
    productID: number;
    selCampaignDetails?: CampaignDetail[];
    campaignCashbackItems?: ConfigurationCampaignCashBack[];
    coupons?: Coupon[];
    vouchers?: Voucher[];
    totalDiscount: number;
}
export interface UserBooking {
    masterOrderID: number;
    orderNumber: string;
    addedDate: Date;
    productTitle: string;
    vinNumber: number;
    orderStatus: string;
    paymentStatus: string;
    trim: string;
    Exterior: string;
    Interior: string;
    orderTotalAmount: number;
    paidAmount: number;
    totalDiscount: number;
}
export interface UserConfigDetails {
    masterOrderID: number;
    configID: number;
    orderNumber: string;
    addedDate: string;
    productTitle: string;
    vinNumber: number;
    orderStatus: string;
    paymentStatus: string;
    trim: string;
    modelYear: number;
    model: string;
    bodyType: string;
    Exterior: string;
    Interior: string;
    orderTotalAmount: number;
    paidAmount: number;
    dueAmount: number;
    basePrice: number;
    paymentType: string;
    transactionID: number;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhone: string;
    showroomName: string;
    showroomLatitude?: any;
    showroomLongitude?: any;
    accessoriesInfo: AccessoriesModelCart[];
    insuranceDetails: InsurancesModelCart[];
    serviceDetails: ServicesModelCart[];
    customerCare: CustomerCareModelCart[];
    extendedWarranty: ExtendedWarrantyModelCart[];
    financeDetails: any[];
    tradeIn: string;
    tradeInDetails: any[];
    tplAmount: number;
    tplPrice: number;
    registrationAmount: number;
    registrationPrice: number;
    salesPrice: number;
    tpl?: TPLDetail[];
    registration?: TPLDetail[];
    accessoryPackages?: CartAccessoryPackage[];
    productID: number;
    selCampaignDetails?: CampaignDetail[];
    campaignCashbackItems?: ConfigurationCampaignCashBack[];
    coupons?: Coupon[];
    vouchers?: Voucher[];
    totalDiscount: number;
    crmConfigID?: string;
    quoteNumber?: string;
}
