export interface TradeInBrandStateModel {
    isLoading: boolean;
    brandsList: TradeInBrandModel[];
}
export interface TradeInBrandModel {
    brandName: string;
}
export declare const initialStateTradeInBrandModel: TradeInBrandStateModel;
export declare const tradeInBrandData: TradeInBrandStateModel;
