import { Dispatch } from 'redux';
export declare const trimVarientActionTypes: {
    PRODUCT_VARIENTS: string;
};
export interface TrimVarientsStateModel {
    isLoading: boolean;
    data: TrimVarientDataViewModel;
}
export interface TrimVarientDataViewModel {
    pageTitle: string;
    productsList: TrimVarientProductModel[];
}
export interface IBaseProductModel {
    productID: number;
    productTitle: string;
    modelYear: number;
    variantCode: string;
    variantSKU: string;
    modelCode: string;
    modelID: number;
    trimCode: string;
    bodyTypeKey: string;
    bodyType: string;
    previewImage: string;
    vehicleType: string;
    salesPrice: string;
    offerPrice: string;
    crmOfferPrice: string;
    productUrl: string;
    productCurrency: string;
    trimDescription: string;
}
export interface TrimVarientProductModel {
    productID: number;
    productTitle: string;
    discountDesc: string;
    productDescription: string;
    productShortDescription: string;
    productImage: string;
    previewImage: string;
    salesPrice: number;
    offerPrice: number;
    productUrl: string;
    productCurrency: string;
    productModel: string;
    bodyType: string;
    trimCode: string;
    productMedia: TrimVarientProductMedia[];
    iFrameUrl?: string;
    isAvailable: string;
}
export interface TrimVarientProductMedia {
    Image: string;
    Imagetype: string;
    Angle: string;
}
export declare const trimVarientsReducer: (state: TrimVarientsStateModel | undefined, action: any) => TrimVarientsStateModel;
export declare const TrimVarientActions: {
    getTrimVarients: (_: string, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
