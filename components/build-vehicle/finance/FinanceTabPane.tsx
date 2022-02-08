import React from "react";
import {
  BankDetailsModelBV,
  CartActions,
  CartStateModel,
  FinanceModelCart,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";

import {
  FinanceTab,
  EcomProductType,
  calculateDiscount,
  getFinancePrinciaplAmount,
} from "../utils";
import PaymentForm from "./PaymentForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import CashSummary from "./CashSummary";
import { RootState } from "../../../app/store";
interface CustomProps {
  banks: BankDetailsModelBV[];
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
  productData: ProductDetailsStateModel;
}
const FinanceTabPane: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const [selectedBank, setSelectedBank] = React.useState<
    BankDetailsModelBV | undefined
  >(undefined);
  const [selectedItem, setSelectedItem] = React.useState<
    FinanceModelCart | undefined
  >(undefined);
  React.useEffect(() => {
    const cartData: CartStateModel = cloneDeep(props.cartData);
    if (cartData?.financeDetails?.length > 0) {
      setTabName(FinanceTab.Payment);
    } else {
      setTabName(FinanceTab.Cash);
    }
  }, []);
  const [tabName, setTabName] = React.useState(FinanceTab.Cash);

  const toggleTab = () => {
    if (tabName === FinanceTab.Cash) {
      setTabName(FinanceTab.Payment);
    } else {
      setTabName(FinanceTab.Cash);
      const cart: CartStateModel = cloneDeep(props.cartData);
      cart.financeDetails = [];
      props.addToCart(cart);
    }
  };
  const onSubmit = (financeData: FinanceModelCart) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    cart.financeDetails = [financeData];
    props.addToCart(cart);
  };
  const onClearFinanceData = () => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    cart.financeDetails = [];
    props.addToCart(cart);
  };
  const getDefaultFinace = (cartData: CartStateModel) => {
    if (cartData?.financeDetails?.length > 0) {
      return cartData?.financeDetails[0];
    } else {
      return undefined;
    }
  };

  const combinationData = props.cartData?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productData?.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const campaigns = !!props.cartData?.selCampaignDetails?.length
    ? productCombinations?.campaign?.filter(
        (c) =>
          !!props.cartData?.selCampaignDetails?.find(
            (x) => x.campaignID === c.campaignID
          )
      )
    : [];

  const campaignCashBackDiscount =
    campaigns?.reduce(
      (s, c) =>
        s +
        (c.appliedItems
          ?.filter((ai) => ai.productType === EcomProductType.CashBack)
          ?.reduce(
            (t1, ai) =>
              t1 +
              (calculateDiscount(
                ai.campDiscountType,
                ai.campDiscountValue,
                productCombinations?.combinationOfferPrice || 0
              ) || 0),
            0
          ) || 0) +
        (props.cartData.campaignCashbackItems
          ?.filter((cash) => cash.campaignID === c.campaignID)
          ?.reduce((t2, c1) => t2 + c1.cashbackAmount, 0) || 0),
      0
    ) || 0;

  const principalAmount = getFinancePrinciaplAmount(
    props.cartData,
    props.productData,
    campaignCashBackDiscount
  );

  const onSelect = (
    bankSelected?: BankDetailsModelBV,
    item?: FinanceModelCart
  ) => {
    setSelectedBank(bankSelected);
    setSelectedItem(item);
  };
  return (
    <div
      className="tab-pane fade show active"
      id="finance"
      role="tabpanel"
      aria-labelledby="finance-tab"
    >
      <div className="finance py-lg-5 py-4 mb-4">
        <div className="container py-lg-0 py-3">
          <div className="row py-md-3 py-5 justify-content-center">
            <div className="col-xl-6 col-md-9 col-12">
              <div className="finance-inner mx-auto">
                <div className="switch">
                  <input
                    type="checkbox"
                    name=""
                    id="switch"
                    onClick={toggleTab}
                    checked={tabName === FinanceTab.Payment}
                    value={tabName}
                  />
                  <label htmlFor="switch">
                    <div className="switch-before">
                      {t("build_vehicle.cash_price")}
                    </div>
                    <div className="switch-handle"></div>
                    <div className="switch-after">
                      {t("build_vehicle.monthly_payment")}
                    </div>
                  </label>
                </div>

                {tabName === FinanceTab.Cash && (
                  <CashSummary cartData={props.cartData} />
                )}
                {tabName === FinanceTab.Payment && (
                  <PaymentForm
                    banks={props.banks}
                    onSubmit={onSubmit}
                    default={getDefaultFinace(props.cartData)}
                    onClear={onClearFinanceData}
                    maxDownPayment={props?.productData?.maxDownPayment}
                    // netPrice={props.cartData.netPrice}
                    campaigns={campaigns}
                    principalAmount={principalAmount}
                    onSelect={onSelect}
                  />
                )}
              </div>
            </div>
            {tabName === FinanceTab.Payment &&
              (selectedItem?.campaignID || 0) > 0 && (
                <div className="col mt-md-0 mt-4 finance-inner px-0">
                  <div className="border finance-form">
                    <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                      <div className="col insurance-feature-block">
                        <h6 className="font-weight-bold text-uppercase text-gray-900 my-2 letter-spacing">
                          {selectedBank?.bankName}
                          <p className="font-normal mb-0 text-secondary">
                            {t("build_vehicle.Part of campaign offer")}
                          </p>
                        </h6>
                      </div>
                    </div>
                    <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                      <div className="col insurance-feature-block">
                        <p className="font-sm font-weight-semibold text-gray-800 mb-1">
                          {t("build_vehicle.Rate")}
                        </p>
                        <div className="font-base font-weight-bold text-gray-900">
                          {selectedItem?.effectiveInterestRate || 0} %
                        </div>
                      </div>
                    </div>

                    {(selectedItem?.campCashback || 0) > 0 && (
                      <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                        <div className="col insurance-feature-block">
                          <p className="font-sm font-weight-semibold text-gray-800 mb-1">
                            {t("build_vehicle.Cashback")}
                          </p>
                          <div className="font-base font-weight-bold text-gray-900">
                            KWD {selectedItem?.campCashback || 0}
                          </div>
                        </div>
                      </div>
                    )}
                    {(selectedItem?.numOfFreeEmi || 0) > 0 && (
                      <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                        <div className="col insurance-feature-block">
                          <p className="bg-light d-inline-block font-weight-semibold mb-2 p-3 text-gray-800 text-secondary font-base">
                            {t("build_vehicle.Number of Free EMI")} :{" "}
                            {selectedItem?.numOfFreeEmi}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
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
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    cartData: state.cartState,
    productData: state.productDetailsState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(FinanceTabPane);
