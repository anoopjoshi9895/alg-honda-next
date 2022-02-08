import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Range, getTrackBackground } from "react-range";
import {
  BankDetailsModelBV,
  CartStateModel,
  FinanceModelCart,
  numberWithCommas,
  CampaignModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import {
  calculateDiscount,
  getFinanceCampaignOffer,
  calculateMonthlyPayment,
} from "../utils";
import SelectInput from "../../SelectInput";
import { RootState } from "../../../app/store";

const PaymentForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  banks: BankDetailsModelBV[];
  isUpdating?: boolean;
  default?: FinanceModelCart;
  errorMessage?: string;
  isEdit?: boolean;
  cartData: CartStateModel;
  onClear: any;
  maxDownPayment: number;
  campaigns?: CampaignModel[];
  principalAmount: number;
  onSelect: (selectedBank?: BankDetailsModelBV, item?: any) => void;
}> = (props) => {
  const { control, errors, register, handleSubmit, setValue, watch, reset } =
    useForm<FinanceModelCart>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      // defaultValues: props?.default,
    });

  const [selectedBank, setSelectedBank] = React.useState<
    BankDetailsModelBV | undefined
  >(undefined);
  const { t } = useTranslation();
  const effectiveInterestRate: number = watch("effectiveInterestRate");
  const campDiscountPercentage = watch("campDiscountPercentage");
  const monthlyPayment: number = watch("monthlyPayment");
  // const [PMT, setPMT] = React.useState(0);
  const [timeNow, setTime] = React.useState<number | undefined>(undefined);
  const [timeNow1, setTime1] = React.useState<number | undefined>(undefined);
  React.useEffect(() => {
    if (props.default) {
      if (props.banks?.length > 0) {
        const bank = props.banks.find(
          (item) => item.bankID === props.default?.bankID
        );
        if (bank) {
          setSelectedBank(bank);
          setValue("bankID", props.default?.bankID);
          setValue("bankName", props.default?.bankName);
          setValue("downPayment", props.default?.downPayment);
          setValue("interestRate", bank?.annualInterestRate);

          setValue("term", props.default?.term);
          const campaignOffer = getFinanceCampaignOffer(
            bank.bankID,

            props.campaigns
          );

          setValue(
            "campDiscountPercentage",
            campaignOffer?.campDiscountPercentage
          );

          setValue("numOfFreeEmi", campaignOffer?.numOfFreeEmi);
          setValue("campCashback", campaignOffer?.campCashback);
          setValue("campaignID", campaignOffer?.campaignID);

          const effectiveRate =
            bank.annualInterestRate -
            calculateDiscount(
              "percentage",
              campaignOffer?.campDiscountPercentage || 0,
              bank.annualInterestRate
            );

          setValue("effectiveInterestRate", effectiveRate);

          setValue(
            "monthlyPayment",
            calculateMonthlyPayment(
              props.principalAmount - (bank?.minDownPayment || 0),
              effectiveRate / 100,
              props.default?.term || 60
            )
          );

          props.onSelect(bank, {
            ...campaignOffer,
            effectiveInterestRate: effectiveRate,
          });
        }
      }
    }
    setTime(Date.now());
  }, []);

  const onChangeBank = (id: number) => {
    // props.onClear();
    const bank = props.banks.find((item) => item.bankID === id);
    const cOffer = bank?.bankID
      ? getFinanceCampaignOffer(bank.bankID, props.campaigns)
      : undefined;

    setValue("campDiscountPercentage", cOffer?.campDiscountPercentage);

    setValue("numOfFreeEmi", cOffer?.numOfFreeEmi);

    setValue("campCashback", cOffer?.campCashback);

    setValue("campaignID", cOffer?.campaignID);

    const effRate =
      (bank?.annualInterestRate || 0) -
      calculateDiscount(
        "percentage",

        cOffer?.campDiscountPercentage || 0,

        bank?.annualInterestRate || 0
      );

    setValue("effectiveInterestRate", effRate);
    const term = watch("term");
    setValue(
      "monthlyPayment",

      calculateMonthlyPayment(
        props.principalAmount - (bank?.minDownPayment || 0),
        effRate / 100,
        term || 60
      )
    );

    setSelectedBank(bank);

    setTime1(Date.now());

    props.onSelect(bank, { ...cOffer, effectiveInterestRate: effRate });
  };

  React.useEffect(() => {
    if (selectedBank) {
      setValue("downPayment", selectedBank?.minDownPayment);
      setValue("term", selectedBank?.maximumTenure);

      const term = selectedBank?.maximumTenure;
      const P = props.cartData.netPrice - selectedBank.minDownPayment;
      const R = selectedBank.annualInterestRate / 100;
      const pmt = (P * R + P) / term;
      // setPMT(pmt);

      const cOffer = selectedBank?.bankID
        ? getFinanceCampaignOffer(selectedBank.bankID, props.campaigns)
        : undefined;

      setValue("campDiscountPercentage", cOffer?.campDiscountPercentage);

      setValue("numOfFreeEmi", cOffer?.numOfFreeEmi);

      setValue("campCashback", cOffer?.campCashback);

      setValue("campaignID", cOffer?.campaignID);

      const effRate =
        (selectedBank?.annualInterestRate || 0) -
        calculateDiscount(
          "percentage",
          cOffer?.campDiscountPercentage || 0,
          selectedBank?.annualInterestRate || 0
        );

      setValue("effectiveInterestRate", effRate);

      setValue(
        "monthlyPayment",
        calculateMonthlyPayment(
          props.principalAmount - (selectedBank?.minDownPayment || 0),
          effRate / 100,
          term || 60
        )
      );

      setValue("interestRate", selectedBank.annualInterestRate);
      props.onClear();
    }
  }, [timeNow1]);

  const onDownPaymentChange = (value: number) => {
    if (!selectedBank || isNaN(value)) {
      return;
    }

    const term = watch("term");

    if (
      value >= selectedBank.minDownPayment &&
      value <= selectedBank.maxDownPayment
    ) {
      setValue(
        "monthlyPayment",

        calculateMonthlyPayment(
          props.principalAmount - value,
          effectiveInterestRate / 100,
          term
        )
      );
    }
  };

  const calcMonthlyPayment = () => {
    // props.onClear();
    if (selectedBank) {
      const downPayment = watch("downPayment");
      const term = watch("term");
      const P = props.cartData.netPrice - downPayment;
      const R = watch("interestRate") / 100;
      // const R = watch('interestRate') / (100 * 12);
      // const pmt = (P * R * Math.pow(1 + R, term)) / (Math.pow(1 + R, term) - 1);
      const pmt = (P * R + P) / term;
      // setPMT(pmt);

      setValue(
        "monthlyPayment",
        calculateMonthlyPayment(
          props.principalAmount - downPayment,
          effectiveInterestRate / 100,
          term
        )
      );
    } else {
      // setPMT(0);
      setValue("monthlyPayment", 0);
    }
    // resetData();
    // updateCart();
  };
  const updateCart = () => {
    const financeData: FinanceModelCart = {
      term: 0,
      bankID: 0,
      monthlyPayment: 0,
      downPayment: 0,
      bankName: "",
      interestRate: 0,
      effectiveInterestRate: 0,
    };
    financeData.downPayment = watch("downPayment");
    financeData.term = watch("term");
    financeData.bankID = watch("bankID");
    financeData.monthlyPayment = watch("monthlyPayment");
    if (selectedBank) {
      financeData.bankName = selectedBank?.bankName;
      financeData.interestRate = watch("interestRate");
    }
    // resetData();
    // props.onSubmit(financeData);
  };

  const resetData = () => {
    const financeData: FinanceModelCart = {
      term: 0,
      bankID: 0,
      monthlyPayment: 0,
      downPayment: 0,
      bankName: "",
      interestRate: 0,
      effectiveInterestRate: 0,
    };
    financeData.bankID = watch("bankID");

    if (selectedBank) {
      financeData.bankName = selectedBank?.bankName;
      financeData.interestRate = watch("interestRate");
    }
    if (props.default?.bankID) {
      props.onSubmit(financeData);
    }
  };

  const clearData = () => {
    reset({
      bankID: 0,
      bankName: "",
      downPayment: undefined,
      interestRate: 0,
      monthlyPayment: 0,
      term: undefined,
    });
    setSelectedBank(undefined);
    props.onClear();
    props.onSelect(undefined, { effectiveInterestRate: 0 });
    setTime(Date.now());
  };

  const renderDummyControllers = () => {
    return (
      <>
        <Controller
          control={control}
          name="effectiveInterestRate"
          render={() => {
            return <></>;
          }}
        />

        <Controller
          control={control}
          name="campDiscountPercentage"
          render={() => {
            return <></>;
          }}
        />

        <Controller
          control={control}
          name="campCashback"
          render={() => {
            return <></>;
          }}
        />

        <Controller
          control={control}
          name="numOfFreeEmi"
          render={() => {
            return <></>;
          }}
        />

        <Controller
          control={control}
          name="campaignID"
          render={() => {
            return <></>;
          }}
        />
      </>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-auto col-md-6 col-12 finance-form-outer">
          <h6 className="text-uppercase pt-4 mt-3">
            {t("build_vehicle.FINANCE")}
          </h6>
          <p className="font-normal pb-3">
            {t("build_vehicle.recommented_standard_price")}
            {""}
            <span className="font-weight-bold ml-1">{`KWD ${numberWithCommas(
              props.cartData.netPrice
            )}`}</span>
          </p>
          <div className="finance-form">
            <div className="row">
              <div className="col-12 form-group mb-3 pb-3">
                <label className="font-normal">
                  {t("build_vehicle.select_bank")}
                  <span className="tooltip position-relative">
                    <i className="icon-info-sm text-gray-700 font-xs ml-2 cursor-pointer"></i>
                    <div className="tooltip-content font-weight-normal text-muted font-sm position-absolute border border-secondary bg-white zIndex-1 p-3">
                      {t("build_vehicle.net_price_popupText")}
                    </div>
                  </span>
                </label>
                <>
                  <Controller
                    control={control}
                    name="bankID"
                    defaultValue={props.default?.bankID}
                    rules={{
                      required: true,
                    }}
                    render={({ onChange, name, value }) => (
                      <SelectInput
                        optionLabel="bankName"
                        optionValue="bankID"
                        placeholder={t("build_vehicle.select_bank")}
                        data={props.banks}
                        default={props.default?.bankID}
                        onChange={(val: number) => {
                          onChange(val);
                          onChangeBank(val);
                        }}
                        isSearchable={false}
                        key={`bankID`}
                      />
                    )}
                  />
                  {errors.bankID && (
                    <span className="message-validation">
                      {t("build_vehicle.bank_required")}
                    </span>
                  )}
                </>
              </div>
              {timeNow && timeNow > 0 && selectedBank && (
                <>
                  <div className="col-12 form-group mb-3 pb-3">
                    <div className="range-slider dir-ltr">
                      <Controller
                        control={control}
                        name="downPayment"
                        defaultValue={props.default?.downPayment}
                        render={({ onChange, name, value }) => {
                          return (
                            <>
                              <div className="row gutter-8 justify-content-between font-normal mb-3">
                                <div className="col-auto">
                                  {t("build_vehicle.down_payment")}
                                </div>
                                <div className="col-auto font-weight-bold">{`KWD ${
                                  selectedBank ? numberWithCommas(value) : ""
                                }`}</div>
                              </div>
                              <Range
                                min={selectedBank?.minDownPayment}
                                // max={selectedBank?.maxDownPayment}
                                values={[value]}
                                // onChange={(values) => this.setState({ values })}
                                max={
                                  props.cartData.netPrice - props.maxDownPayment
                                }
                                // values={[value]}
                                step={10}
                                onChange={(values) => {
                                  onChange(values[0]);
                                  onDownPaymentChange(values[0]);
                                  resetData();
                                }}
                                renderTrack={({
                                  props: propsTrack,
                                  children,
                                }) =>
                                  selectedBank && (
                                    <div
                                      {...propsTrack}
                                      ref={propsTrack.ref}
                                      style={{
                                        height: "6px",
                                        width: "100%",
                                        backgroundColor: "#D1D1D1",
                                        background: getTrackBackground({
                                          values: [value],
                                          colors: ["#C7001F", "#D1D1D1"],
                                          min:
                                            selectedBank?.minDownPayment || 0,
                                          max:
                                            props.cartData.netPrice -
                                              props.maxDownPayment || 0,
                                        }),
                                        alignSelf: "center",
                                      }}
                                    >
                                      {children}
                                    </div>
                                  )
                                }
                                renderThumb={({ props: rangeprops }) => {
                                  return (
                                    <div
                                      {...rangeprops}
                                      style={{
                                        ...rangeprops.style,
                                        display: selectedBank
                                          ? "block"
                                          : "none",
                                      }}
                                      className="range-slider-thumb"
                                    />
                                  );
                                }}
                              />
                            </>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 form-group mb-3 pb-3">
                    <div className="range-slider dir-ltr">
                      <Controller
                        control={control}
                        name="term"
                        defaultValue={props.default?.term}
                        render={({ onChange, name, value }) => (
                          <>
                            <div className="row gutter-8 justify-content-between font-normal mb-3">
                              <div className="col-auto">
                                {t("build_vehicle.term")}
                              </div>
                              <div className="col-auto font-weight-bold">{`${
                                selectedBank ? value : ""
                              } ${t("build_vehicle.months")}`}</div>
                            </div>
                            <Range
                              step={selectedBank?.tenureIncValue}
                              min={selectedBank?.minimumTenure}
                              max={selectedBank?.maximumTenure}
                              values={[value]}
                              // onChange={(values) => this.setState({ values })}
                              onChange={(values) => {
                                onChange(values[0]);
                                calcMonthlyPayment();
                                resetData();
                              }}
                              renderTrack={({ props: rangeprops, children }) =>
                                selectedBank && (
                                  <div
                                    {...rangeprops}
                                    ref={rangeprops.ref}
                                    style={{
                                      height: "6px",
                                      width: "100%",
                                      backgroundColor: "#D1D1D1",
                                      background: getTrackBackground({
                                        values: [value],
                                        colors: ["#C7001F", "#D1D1D1"],
                                        min: selectedBank?.minimumTenure || 0,
                                        max: selectedBank?.maximumTenure || 0,
                                      }),
                                      alignSelf: "center",
                                    }}
                                  >
                                    {children}
                                  </div>
                                )
                              }
                              renderThumb={({ props: rangeprops }) => {
                                return (
                                  <div
                                    {...rangeprops}
                                    style={{
                                      ...rangeprops.style,
                                      display: selectedBank ? "block" : "none",
                                    }}
                                    className="range-slider-thumb"
                                  />
                                );
                              }}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  {/* <div className="col-12 form-group mb-3 pb-3">
                    <label className="font-normal">Finance Rate</label> */}
                  {selectedBank?.showRate?.toLocaleLowerCase() === "no" && (
                    <Controller
                      control={control}
                      name="interestRate"
                      defaultValue={selectedBank?.annualInterestRate}
                      rules={{ required: true }}
                      render={({}) => <></>}
                    />
                  )}
                  {selectedBank?.showRate?.toLocaleLowerCase() === "yes" && (
                    <div className="col-12 form-group mb-4 pb-xl-3">
                      <label className="font-normal">
                        {t("build_vehicle.finance_rate")}
                      </label>
                      <Controller
                        control={control}
                        name="interestRate"
                        defaultValue={selectedBank?.annualInterestRate}
                        rules={{ required: true }}
                        render={({ onChange, name, value }) => (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Rate"
                            readOnly={true}
                            value={value}
                          />
                        )}
                      />
                      {effectiveInterestRate !==
                        selectedBank?.annualInterestRate && (
                        <span className="font-xxxs text-gray-600">
                          Effective interest rate: {effectiveInterestRate || 0}%
                          (Part of campaign offer)
                        </span>
                      )}
                    </div>
                  )}
                  {/* </div> */}
                </>
              )}
              <div className="col-12">
                <div className="row justify-content-between">
                  <div className="col-auto mb-3 pb-3">
                    <span className="text-gray-800 font-normal d-flex mb-1">
                      {t("build_vehicle.monthly_payment")}
                    </span>
                    <Controller
                      control={control}
                      name="monthlyPayment"
                      defaultValue={props.default?.monthlyPayment || 0}
                      rules={{ required: true }}
                      render={({ onChange, name, value }) => (
                        <h6 className="m-0">{`KWD ${monthlyPayment?.toFixed(
                          2
                        )}`}</h6>
                      )}
                    />
                  </div>
                  {/* <div className="col-auto mb-4 pb-xl-3">
                    <span className="text-gray-800 font-normal d-flex mb-1">
                      Special Offer
                    </span>
                    <h6 className="font-normal m-0">1 Year Registration</h6>
                  </div>  */}
                </div>
                <div className="col-sm-12 col-12 px-0">
                  <div className="row gutter-8 align-items-center mt-2">
                    <div className="col-sm-12 col-12 mt-3">
                      {props.default?.monthlyPayment !== undefined &&
                        props.default?.monthlyPayment !== 0 &&
                        props.default?.bankID !== undefined && (
                          <button
                            type="button"
                            disabled={selectedBank === undefined}
                            className={`${" btn-primary"} btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold`}
                            onClick={() => clearData()}
                          >
                            <i className={`icon-tick-round font-lg mr-2 `}></i>
                            {t("build_vehicle.Remove")}
                          </button>
                        )}
                      {(props.default?.monthlyPayment === undefined ||
                        props.default?.monthlyPayment === 0) && (
                        <button
                          type="button"
                          disabled={selectedBank === undefined}
                          className={`${" btn-outline-secondary-no-hover "} btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold`}
                          onClick={handleSubmit(props.onSubmit)}
                        >
                          <i
                            className={`icon-tick-round font-lg mr-2 ${"text-gray-400"}`}
                          ></i>

                          {t("build_vehicle.Choose")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-xl col-md-6 col-12 pt-md-0 pt-4">
          <div className="bg-gray-100 doc-req px-lg-4 px-3 py-4">
            {(campDiscountPercentage || 0) > 0 && (
              <div className="">
                <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                  <div className="col insurance-feature-block pl-0">
                    <h6 className="font-weight-bold text-uppercase text-gray-900 my-2 letter-spacing">
                      {selectedBank?.bankName}

                      <p className="font-xxs mb-0 text-secondary">
                        Part of campaign offer
                      </p>
                    </h6>
                  </div>
                </div>

                <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                  <div className="col insurance-feature-block pl-0">
                    <p className="font-sm font-weight-semibold text-gray-800 mb-1">
                      Rate
                    </p>

                    <div className="font-base font-weight-bold text-gray-900">
                      {effectiveInterestRate || 0}%
                    </div>
                  </div>
                </div>

                {(watch("campCashback") || 0) > 0 && (
                  <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                    <div className="col insurance-feature-block pl-0">
                      <p className="font-sm font-weight-semibold text-gray-800 mb-1">
                        Cashback
                      </p>

                      <div className="font-base font-weight-bold text-gray-900">
                        KWD {watch("campCashback") || 0}
                      </div>
                    </div>
                  </div>
                )}

                {(watch("numOfFreeEmi") || 0) > 0 && (
                  <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                    <div className="col insurance-feature-block pl-0">
                      <p className="bg-light d-inline-block font-weight-semibold mb-2 p-3 text-gray-800 text-secondary font-base">
                        Number of Free EMI : {watch("numOfFreeEmi")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            * <h6 className="mb-4">
              {t(
                "build_vehicle.The following documents are required to avail the finance"
              )}
            </h6>
            <ul className="list-dotted list-unstyled font-normal mb-2">
              <li>{t("build_vehicle.CIVIL ID")}</li>
              <li>{t("build_vehicle.Bank Statement")}</li>
              <li>{t("build_vehicle.Salary Certificate (if available)")}</li>
            </ul> *
          </div>
        </div> */}
      </div>
      {renderDummyControllers()}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    cartData: state.cartState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(PaymentForm);
