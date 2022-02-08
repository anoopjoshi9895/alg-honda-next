import { Dispatch } from 'redux';
export declare const compareVarientActionTypes: {
    COMPARE_VARIENTS: string;
};
export interface CompareVarientsStateModel {
    brochure: string;
    productsList: CompareVarientProductModel[];
    attributesList: CompareAttributeViewModel[];
}
export interface CompareAttributeViewModel {
    attributeGroupName: string;
    attrOptions: AttributeItemModel[];
}
export interface CompareAttributeListItemViewModel {
    attributeGroupName: string;
}
export interface CompareVarientProductModel {
    productID: number;
    productTitle: string;
    productImage: string;
    salesPrice: number;
    offerPrice: number;
    productUrl: string;
    productCurrency: string;
    modelCode: string;
    attributes: CompareAttributeViewModel[];
}
export interface AttributeItemModel {
    attrName: string;
    attrOptValue: string;
}
export declare const compareVarientsReducer: (state: CompareVarientsStateModel | undefined, action: any) => CompareVarientsStateModel;
export declare const CompareVarientActions: {
    getCompareVarients: (_: string, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
