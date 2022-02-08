export interface ProductModelStateModel {
    isLoading: boolean;
    productModelsList: ProductModelItemModel[];
}
export interface ProductModelItemModel {
    modelID: number;
    productTitle: string;
    productPrice: number;
    productCurrency: string;
    productImage: string;
    previewImage: string;
    modelCode: string;
    combinationID: number;
    productsby_modelyear: ProductByYearItemModel[];
}
export interface ProductByYearItemModel {
    modelID: number;
    modelyear: number;
    productTitle: string;
    productPrice: number;
    productCurrency: string;
    productImage: string;
    previewImage: string;
    modelCode: string;
    combinationID: number;
}
