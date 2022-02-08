import { CartStateModel } from '../../reducers/cart/ViewModel';
import { EditionVarientProductModel } from '../../reducers/editionVarient';
import ApiService from './service';
export default class BuildService extends ApiService {
    tradeInModelYearList(): Promise<any>;
    tradeInBrandList(modelyear?: number): Promise<any>;
    tradeInModelList(modelyear: number, brand: string): Promise<any>;
    tradeInTrimList(modelyear: number, brand: string, modelCode: string): Promise<any>;
    modelList(modelyear?: number): Promise<any>;
    buildPriceProductList(modelyear?: number, bodytype?: string): Promise<any>;
    buildPriceProductDetails(productId: number): Promise<any>;
    bannerList(): Promise<any>;
    trimList(modelyear: number, model: string): Promise<any>;
    trimWiseList(modelyear: number, model: string, trimCode: string): Promise<any>;
    powerProductsCompareData(product: number): Promise<{
        brochure: any;
        productsList: any;
        attributesList: any;
    }>;
    broncoCompareData(model: string, products: any): Promise<{
        brochure: any;
        productsList: any;
        attributesList: any;
    }>;
    trimCompareData(modelyear: number, model: string, products: any): Promise<{
        brochure: any;
        productsList: any;
        attributesList: any;
    }>;
    editionCompareData(modelyear: number, model: string, products: EditionVarientProductModel[]): Promise<{
        productsList: any;
        attributesList: any;
    }>;
    getCombinationVariants(productId: number, customOptionID: number, cutomOptionVariantID: number): Promise<any>;
    getCombinationPrice(productId: number, customExteriorID: number, cutomExteriorVariantID: number, customInteriorID: number, cutomInteriorVariantID: number): Promise<any>;
    createCart(productID: number, data: CartStateModel): Promise<{
        data: any;
        status: string;
        responsecode: any;
        message: string;
    } | {
        data: undefined;
        status: string;
        responsecode: any;
        message: any;
    }>;
    getCartDetails(cartId?: number, configID?: number): Promise<any>;
    updateCart(productID: number, data: CartStateModel): Promise<{
        data: any;
        status: string;
        responsecode: any;
        message: string;
    } | {
        data: undefined;
        status: string;
        responsecode: any;
        message: any;
    }>;
    saveConfig(productID: number, data: CartStateModel, configInsert?: string): Promise<{
        data: any;
        status: string;
        responsecode: any;
        message: string;
    } | {
        data: undefined;
        status: string;
        responsecode: any;
        message: any;
    }>;
    createOnlineOrder(data: any): Promise<{
        data: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        status: any;
        message: any;
    }>;
    getBankList(): Promise<any>;
    getShowRoomList(): Promise<any>;
    verifyOrder(orderNo: string, refNo: string): Promise<any>;
    getOrderDetails(orderNo: string, refNo: string): Promise<any>;
    getVehicleModelList(): Promise<any>;
    getProductModelList(vehType?: string): Promise<any>;
    getAllProductList(bodyTypeKey?: string): Promise<any>;
    getPowerProductList(): Promise<any>;
    getVehicleTypeProductList(type: string, modelCode?: string): Promise<any>;
    getCMSPages(pageID: string): Promise<any>;
}
