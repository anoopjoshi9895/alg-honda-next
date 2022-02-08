export interface TradeInModelStateModel {
    isLoading: boolean;
    modelsList: TradeInModelModel[];
}
export interface TradeInModelModel {
    modelCode: string;
}
export declare const initialStateTradeInModel: TradeInModelStateModel;
export declare const tradeInModelData: TradeInModelStateModel;
