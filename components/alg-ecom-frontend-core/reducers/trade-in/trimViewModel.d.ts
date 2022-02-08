export interface TradeInTrimStateModel {
    isLoading: boolean;
    trimList: TradeInTrimModel[];
}
export interface TradeInTrimModel {
    trimList: string;
}
export declare const initialStateTradeInTrimModel: TradeInTrimStateModel;
