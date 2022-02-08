import { Dispatch } from 'redux';
import { BannerItemModel } from './banners/ViewModel';
import { TrimVarientProductModel } from './trimVarients';
export declare const buildPriceTypes: {
    PRODUCT_LIST: string;
    PRODUCT_LIST_REQUEST: string;
    PRODUCT_LIST_ERROR: string;
    MODEL_LIST: string;
    MODEL_REQUEST: string;
    MODEL_ERROR: string;
    BODY_TYPE_LIST: string;
    BODY_TYPE_REQUEST: string;
    BODY_TYPE_ERROR: string;
    PRODUCT_FILTER: string;
    BANNER_LIST: string;
    BANNER_REQUEST: string;
    BANNER_ERROR: string;
};
export interface ProductListDataModel {
    modelyear: number;
    bodytype: string;
    productsList: BuildPriceProductModel[];
    bodytypesList: BuildPriceBodyTypeModel[];
    modelsList?: BuildPriceModelsModel[];
    bodyTypeLoaded?: boolean;
    bodyTypeLoading?: boolean;
    bodyModelLoaded?: boolean;
    bodyModelLoading?: boolean;
    productLoaded?: boolean;
    productLoading?: boolean;
    bannerList?: BannerItemModel[];
    bannerLoaded?: boolean;
    bannerLoading?: boolean;
}
export interface BuildPriceBodyModelDataModel {
    bodytypesList: BuildPriceBodyTypeModel[];
    modelsList: BuildPriceModelsModel[];
}
export interface BuildPriceProductModel {
    productID: number;
    productTitle: string;
    productPrice: number;
    productCurrency: string;
    productImage: string;
    previewImage: string;
    modelCode: string;
    products_model: TrimVarientProductModel[];
}
export interface BuildPriceBodyTypeModel {
    typeKey: string;
    bodyType: string;
}
export interface BuildPriceModelsModel {
    modelyear: number;
}
export declare const buildPriceReducer: (state: ProductListDataModel | undefined, action: any) => ProductListDataModel;
export declare const BuildPriceActions: {
    getProductList: (modelyear: number, bodytype: string, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
    getModelList: (modelyear?: number | undefined) => (dispatch: Dispatch) => Promise<void>;
    getBodyTypeList: (modelyear?: number | undefined) => (dispatch: Dispatch) => Promise<void>;
    getBannerList: () => (dispatch: Dispatch) => Promise<void>;
    updateFilter: (modelyear: number, bodytype: string) => (dispatch: Dispatch) => Promise<void>;
};
