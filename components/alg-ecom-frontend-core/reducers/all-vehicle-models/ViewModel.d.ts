export interface AllVehicleStateModel {
    modelsList: AllVehicleItemModel[];
}
export interface AllVehicleItemModel {
    productCategoryID: number;
    productCategoryName: string;
    modelImage: string;
    vehicleType: string;
}
