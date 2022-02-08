import { Dispatch } from 'redux';
export declare const editionVarientActionTypes: {
    EDITION_VARIENTS: string;
};
export interface EditionVarientsStateModel {
    isLoading: boolean;
    data: EditionVarientDataViewModel;
}
export interface EditionVarientDataViewModel {
    pageTitle: string;
    productsList: EditionVarientProductModel[];
}
export interface EditionVarientProductModel {
    productID: number;
    productTitle: string;
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
    productMedia: EditionVarientProductMedia[];
    iFrameUrl?: string;
    isAvailable: string;
}
export interface EditionVarientProductMedia {
    Image: string;
    Imagetype: string;
    Angle: string;
}
export declare const editionVarientsReducer: (state: EditionVarientsStateModel | undefined, action: any) => EditionVarientsStateModel;
export declare const EditionVarientActions: {
    getEditionVarients: (_: string, onSuccess?: (() => void) | undefined) => (dispatch: Dispatch) => Promise<void>;
};
