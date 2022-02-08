import { reducer as toastrReducer } from "react-redux-toastr";
import { combineReducers } from "redux";
import {
  allVehicleModelListReducer,
  appSettingsReducer,
  authReducer,
  bankListReducer,
  cartReducer,
  combinationDetailsReducer,
  commonReducer,
  productDetailsReducer,
  productModelsReducer,
  showRoomListReducer,
  tradeInBrandReducer,
  tradeInMileageReducer,
  tradeInModelReducer,
  tradeInModelYearReducer,
} from "alg-ecom-frontend-core";
import slideReducer from "../feature/slideSlice";
import newsReducer from "../feature/newsSlice";
import footerReducer from "../feature/footerSlice";

export const rootReducer = combineReducers({
  slide: slideReducer,
  news: newsReducer,
  appSettingsState: appSettingsReducer,
  productModelsState: productModelsReducer,
  commonState: commonReducer,
  toastr: toastrReducer,
  footer: footerReducer,
  productDetailsState: productDetailsReducer,
  cartState: cartReducer,
  combinationState: combinationDetailsReducer,
  tradeinBrandState: tradeInBrandReducer,
  tradeinModelState: tradeInModelReducer,
  tradeinMileageState: tradeInMileageReducer,
  tradeinModelYearState: tradeInModelYearReducer,
  bankState: bankListReducer,
  showRoomState: showRoomListReducer,
  authState: authReducer,
  allVehicleState: allVehicleModelListReducer,
});
