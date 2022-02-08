import React from "react";
import {
  CartActions,
  CartStateModel,
  TradeInModelCart,
  TradeInActions,
  TradeInModelYearStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TradeInForm from "./TradeInForm";
import { TradeInFormProps } from "../utils";
import cloneDeep from "lodash/cloneDeep";
import { RootState } from "../../../app/store";
interface CustomProps {
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
  getModelYearList: typeof TradeInActions.getModelYearList;
  modelYears: TradeInModelYearStateModel;
}
const TradeInTabePane: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const [isFormVisible, setFormVisible] = React.useState(false);
  const [isTradeIn, setIsTradeIn] = React.useState(false);
  const [selectedTradeInCart, setSelectedTradeInCart] = React.useState<
    TradeInModelCart | undefined
  >(undefined);
  const onSubmit = (tradeInData: TradeInFormProps) => {
    const cart: CartStateModel = cloneDeep(props.cartData);

    const tradeInCart: TradeInModelCart = {
      tradeInID: 0,
      brand: "",
      modelYear: 0,
      modelCode: "",
      trim: "",
      mileage: 0,
      // carImages: [],
      // regDocImages: [],
    };

    tradeInCart.brand = tradeInData.brand;
    tradeInCart.modelYear = tradeInData.modelYear;
    tradeInCart.modelCode = tradeInData.modelCode;
    tradeInCart.trim = tradeInData.trim;
    tradeInCart.mileage = tradeInData.mileage;
    if (selectedTradeInCart) {
      const tradeInIndex = cart.tradeInDetails?.findIndex(
        (item) => item.tradeInID === selectedTradeInCart.tradeInID
      );
      tradeInCart.tradeInID = selectedTradeInCart.tradeInID;
      cart.tradeInDetails.splice(tradeInIndex, 1, tradeInCart);
    } else {
      tradeInCart.tradeInID = Math.floor(Date.now() / 1000);
      cart.tradeInDetails.push(tradeInCart);
    }

    props.addToCart(cart);
    setFormVisible(false);
    setSelectedTradeInCart(undefined);
  };
  const onDelete = (id: number) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    const tradeInIndex = cart.tradeInDetails?.findIndex(
      (item) => item.tradeInID === id
    );

    if (tradeInIndex > -1) {
      cart.tradeInDetails.splice(tradeInIndex, 1);
    }
    props.addToCart(cart);
    if (isTradeIn && cart.tradeInDetails && cart.tradeInDetails.length === 0) {
      setFormVisible(true);
    }
  };
  const onYesTradeIn = () => {
    setIsTradeIn(true);
    addNew();
  };
  const addNew = () => {
    setSelectedTradeInCart(undefined);
    setFormVisible(true);
  };
  const onEdit = (tradeInCart: TradeInModelCart) => {
    setSelectedTradeInCart(tradeInCart);
    setFormVisible(true);
  };
  const cancelTradeIn = () => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    if (cart.tradeInDetails.length > 0) {
      cart.tradeInDetails = [];
    }
    props.addToCart(cart);
    setIsTradeIn(false);
    setFormVisible(false);
  };
  React.useEffect(() => {
    props.getModelYearList();
  }, []);

  return (
    <div
      className="tab-pane fade sticky-tab trade-in show active pb-5"
      id="trade-in"
      role="tabpanel"
      aria-labelledby="trade-in-tab"
    >
      <div className="trade-in py-4 mb-md-5 mb-4">
        <div className="container py-3">
          <h4 className="text-uppercase font-weight-bold">
            {t("build_vehicle.trade_in")}
          </h4>
          <p className="pb-4 font-normal">
            {t("build_vehicle.lets_start_booking")} Honda.{" "}
            {t("build_vehicle.kinldy_fill_details")}
          </p>
          <div className="pb-5">
            <label className="text-capitalize mb-3 text-heading font-weight-semibold">
              {t("build_vehicle.looking_for_trade_in")}
            </label>
            <div className="row">
              <div className="col-auto">
                <input
                  type="radio"
                  name="trade-in"
                  id="yes"
                  checked={isTradeIn}
                  onClick={() => onYesTradeIn()}
                />
                <label htmlFor="yes">{t("build_vehicle.yes")}</label>
              </div>
              <div className="col-auto">
                <input
                  type="radio"
                  name="trade-in"
                  id="no"
                  checked={!isTradeIn}
                  onClick={() => cancelTradeIn()}
                />
                <label htmlFor="no">{t("build_vehicle.no")}</label>
              </div>
            </div>
          </div>
          {props.cartData?.tradeInDetails?.length > 0 && (
            <div className="trade-in-list pb-lg-5 pb-4">
              <div className="row">
                {props.cartData?.tradeInDetails?.map((tradeIn) => {
                  return (
                    <div
                      className="col-md-4 col-sm-6 col-12 mb-4"
                      key={tradeIn.tradeInID}
                    >
                      <div className="item p-3 border h-100 bg-white">
                        <div className="row gutter-8 p-lg-1 align-items-md-start align-items-center">
                          <div className="col-12">
                            <div>
                              <h5 className="mb-1">{tradeIn.brand}</h5>
                              <span className="font-normal text-dark">
                                {tradeIn.modelCode}
                              </span>
                              <div className="row m-0">
                                <div className="col p-0">
                                  <span className="d-block font-xs text-muted mt-3 mb-1">
                                    {t("build_vehicle.mileage")}*
                                  </span>
                                  <span className="font-normal">
                                    {tradeIn.mileage}
                                  </span>
                                </div>
                                <div className="col-auto p-0">
                                  <span className="d-block font-xs text-muted mt-3 mb-1">
                                    {t("dashboard.Trim")}
                                  </span>
                                  <span className="font-normal">
                                    {t("build_vehicle.Automatic Top Variant")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 text-primary font-xs py-3  d-flex justify-content-md-end">
                            <span
                              className="cursor-pointer text-decoration-underline text-muted"
                              onClick={() => onEdit(tradeIn)}
                            >
                              {t("build_vehicle.edit")}
                            </span>
                            <span
                              className="cursor-pointer text-decoration-underline ml-2 text-muted"
                              data-toggle="modal"
                              onClick={() => onDelete(tradeIn.tradeInID)}
                            >
                              {t("build_vehicle.delete")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {props.cartData?.tradeInDetails?.length > 0 && (
                  <div className="col-md-4 col-sm-6 col-12 mb-4">
                    <div className="click-box cursor-pointer bg-gray h-100 px-3 d-flex align-items-center justify-content-center">
                      <span
                        className="font-normal text-primary d-inline-flex py-2 my-3"
                        onClick={() => addNew()}
                      >
                        <i className="icon-add mr-1"></i>
                        {t("build_vehicle.wish_to_add_more")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {isFormVisible && isTradeIn && (
            <TradeInForm onSubmit={onSubmit} default={selectedTradeInCart} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      addToCart: CartActions.addToCart,
      getModelYearList: TradeInActions.getModelYearList,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    cartData: state.cartState,
    modelYears: state.tradeinModelYearState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(TradeInTabePane);
