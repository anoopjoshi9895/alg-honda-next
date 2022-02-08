import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import Select from 'react-select';
import SelectInput from '../../components/SelectInput';
import { bindActionCreators } from 'redux';
import { RootState } from "../../app/store";
import { connect } from 'react-redux';
import { Range, getTrackBackground } from 'react-range';
import { FinanceModelCart, BankDetailsModel } from 'alg-ecom-frontend-core';
import { useTranslation } from 'react-i18next';
// import MetaDetails from '../../components/meta-details/MetaDetails';

const PaymentForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  onCancel: any;
  banks: BankDetailsModel[];
  isUpdating?: boolean;
  default?: FinanceModelCart;
  errorMessage?: string;
  isEdit?: boolean;
  netPrice: number;
  productCurrency: string;
}> = (props) => {
  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<FinanceModelCart>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      // defaultValues: props?.default,
    });

  const [selectedBank, setSelectedBank] = React.useState<
    BankDetailsModel | undefined
  >(undefined);

  React.useEffect(() => {
    if (props.default) {
      if (props.banks?.length > 0) {
        const bank = props.banks.find(
          (item) => item.bankID === props.default?.bankID
        );
        if (bank) {
          setSelectedBank(bank);
          setPMT(props.default?.monthlyPayment);
        }
      }
    }
  }, []);

  const { t } = useTranslation();

  const [PMT, setPMT] = React.useState(0);
  const onChangeBank = (id: number) => {
    const bank = props.banks.find((item) => item.bankID === id);
    setValue('downPayment', bank?.minDownPayment);
    if (bank?.maximumTenure) {
      setValue('term', bank?.maximumTenure / 12);
    }

    if (bank) {
      const term = bank?.maximumTenure;
      const P = props.netPrice - bank.minDownPayment;
      const R = bank.annualInterestRate / (100 * 12);
      const pmt = (P * R * Math.pow(1 + R, term)) / (Math.pow(1 + R, term) - 1);
      setPMT(pmt);
      setValue('monthlyPayment', pmt);
      setValue('interestRate', bank.annualInterestRate);
    } else {
      setPMT(0);
      setValue('monthlyPayment', 0);
      setValue('interestRate', 0);
    }
    setSelectedBank(bank);
    updateCart();
  };
  const calcMonthlyPayment = () => {
    if (selectedBank) {
      const downPayment = watch('downPayment');
      const term = watch('term') * 12;
      const P = props.netPrice - downPayment;
      const R = watch('interestRate') / (100 * 12);
      const pmt = (P * R * Math.pow(1 + R, term)) / (Math.pow(1 + R, term) - 1);
      setPMT(pmt);
      setValue('monthlyPayment', pmt);
    } else {
      setPMT(0);
      setValue('monthlyPayment', 0);
    }
    updateCart();
  };
  const updateCart = () => {
    const financeData: FinanceModelCart = {
      term: 0,
      bankID: 0,
      monthlyPayment: 0,
      downPayment: 0,
      bankName: '',
      interestRate: 0,
      effectiveInterestRate: 0,
    };
    financeData.downPayment = watch('downPayment');
    financeData.term = watch('term');
    financeData.bankID = watch('bankID');
    financeData.monthlyPayment = watch('monthlyPayment');
    if (selectedBank) {
      financeData.bankName = selectedBank?.bankName;
      financeData.interestRate = watch('interestRate');
    }

    // props.onSubmit(financeData);
  };

  React.useEffect(() => {
    updateCart();
    calcMonthlyPayment();
  }, [props.netPrice]);
  // const metaDetails: IMetaDetails = {
  //   title: 'Convenient & Accurate Financial Calculator | Honda Alghanim',
  //   description:
  //     'Honda Alghanim, reputed as the top Honda showroom in Kuwait, offers you easy-to-use- financial calculators to improve your user journey and purchasing power.',
  //   keyword: '',
  //   ogTitle: '',
  // };
  return (
    <>
      {/* {metaDetails && <MetaDetails metaDetails={metaDetails} />} */}
      <div className="finance-form bg-white p-4">
        <div className="row">
          <div className="col-12 form-group mb-4 pb-xl-3">
            <label className="d-inline-flex align-items-center font-normal">
              {t('build_vehicle.select_bank')}
              <span className="tooltip position-relative">
                <i className="icon-info-sm text-gray-700 font-xs ml-2 cursor-pointer"></i>
                <div className="tooltip-content font-weight-normal text-muted font-sm position-absolute border border-secondary bg-white zIndex-1 p-3">
                  {t('build_vehicle.net_price_popupText')}
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
                    placeholder={t('build_vehicle.select_bank')}
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
                  {t('build_vehicle.bank_required')}
                </span>
              )}
            </>
          </div>
          {
            <>
              <div className="col-sm-6 col-12 form-group mb-4 pb-xl-3">
                <label className="font-normal">
                  {t('build_vehicle.down_payment')}{' '}
                  <span className="text-gray-700 font-xs">
                    ({`KWD ${selectedBank ? watch('downPayment') : ''}`})
                  </span>
                </label>
                <Controller
                  control={control}
                  name="downPayment"
                  defaultValue={props.default?.downPayment}
                  render={({ onChange, name, value }) => {
                    return (
                      <input
                        className="form-control"
                        placeholder={t('build_vehicle.down_payment')}
                        type="text"
                        name={name}
                        // onChange={onChange}
                        onChange={(values) => {
                          onChange(values);
                          calcMonthlyPayment();
                        }}
                        value={value}
                      />
                      // <div className="range-slider dir-ltr">
                      // <Range
                      //   min={selectedBank?.minDownPayment}
                      //   max={selectedBank?.maxDownPayment}
                      //   values={[value]}
                      //   // onChange={(values) => this.setState({ values })}
                      //   onChange={(values) => {
                      //     onChange(values[0]);
                      //     calcMonthlyPayment();
                      //   }}
                      //   renderTrack={({ props: rangeProps, children }) => (
                      //     <div
                      //       {...rangeProps}
                      //       style={{
                      //         ...rangeProps.style,
                      //         height: '3px',
                      //         width: '100%',
                      //         backgroundColor: '#D1D1D1',
                      //       }}
                      //     >
                      //       {selectedBank && (
                      //         <div
                      //           ref={rangeProps.ref}
                      //           style={{
                      //             height: '5px',
                      //             width: '100%',
                      //             borderRadius: '4px',

                      //             background: getTrackBackground({
                      //               values: [value],
                      //               colors: ['#CC0000', '#D1D1D1'],
                      //               min: selectedBank?.minDownPayment || 0,
                      //               max: selectedBank?.maxDownPayment || 0,
                      //             }),
                      //             alignSelf: 'center',
                      //           }}
                      //         >
                      //           {children}
                      //         </div>
                      //       )}
                      //     </div>
                      //   )}
                      //   renderThumb={({ props: rangeProps }) => {
                      //     return (
                      //       <div
                      //         {...rangeProps}
                      //         style={{
                      //           ...rangeProps.style,
                      //           display: selectedBank ? 'block' : 'none',
                      //         }}
                      //         className="range-slider-thumb"
                      //       />
                      //     );
                      //   }}
                      // />
                      // </div>
                    );
                  }}
                />
              </div>
              <div className="col-sm-6 col-12 form-group mb-4 pb-xl-3">
                <label className="font-normal">
                  {t('build_vehicle.term')}{' '}
                  <span className="text-gray-700 font-xs">
                    (
                    {`${selectedBank ? watch('term') : ''} ${t('common.Year')}`}
                    )
                  </span>
                </label>
                <Controller
                  control={control}
                  name="term"
                  defaultValue={props.default?.term}
                  render={({ onChange, name, value }) => (
                    <SelectInput
                      optionLabel="label"
                      optionValue="term"
                      placeholder={t('build_vehicle.term')}
                      data={Array.from(
                        {
                          length: selectedBank
                            ? selectedBank?.maximumTenure / 12
                            : 0,
                        },
                        (v, k) => {
                          return { term: k + 1, label: k + 1 };
                        }
                      )}
                      default={value}
                      onChange={(val: number) => {
                        onChange(val);
                        calcMonthlyPayment();
                        // onChangeBank(val);
                      }}
                      isSearchable={false}
                      key={`term`}
                    />
                    // <div className="range-slider dir-ltr">
                    // <Range
                    //   step={selectedBank?.tenureIncValue}
                    //   min={selectedBank?.minimumTenure}
                    //   max={selectedBank?.maximumTenure}
                    //   values={[value]}
                    //   // onChange={(values) => this.setState({ values })}
                    //   onChange={(values) => {
                    //     onChange(values[0]);
                    //     calcMonthlyPayment();
                    //   }}
                    //   renderTrack={({ props: rangeProps, children }) => (
                    //     <div
                    //       {...rangeProps}
                    //       style={{
                    //         ...rangeProps.style,
                    //         height: '3px',
                    //         width: '100%',
                    //         backgroundColor: '#ccc',
                    //       }}
                    //     >
                    //       {selectedBank && (
                    //         <div
                    //           ref={rangeProps.ref}
                    //           style={{
                    //             height: '5px',
                    //             width: '100%',
                    //             borderRadius: '4px',

                    //             background: getTrackBackground({
                    //               values: [value],
                    //               colors: ['#CC0000', '#D1D1D1'],
                    //               min: selectedBank?.minimumTenure || 0,
                    //               max: selectedBank?.maximumTenure || 0,
                    //             }),
                    //             alignSelf: 'center',
                    //           }}
                    //         >
                    //           {children}
                    //         </div>
                    //       )}
                    //     </div>
                    //   )}
                    //   renderThumb={({ props: rangeProps }) => {
                    //     return (
                    //       <div
                    //         {...rangeProps}
                    //         style={{
                    //           ...rangeProps.style,
                    //           display: selectedBank ? 'block' : 'none',
                    //         }}
                    //         className="range-slider-thumb"
                    //       />
                    //     );
                    //   }}
                    // />
                    // </div>
                  )}
                />
              </div>
              <div className="col-12 form-group mb-4 pb-xl-3">
                <label className="font-normal">
                  {t('build_vehicle.finance_rate')}
                </label>
                <Controller
                  control={control}
                  name="interestRate"
                  defaultValue={props.default?.interestRate}
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
              </div>
            </>
          }
          <div className="col-12 mb-4">
            <span className="text-gray-700 font-normal d-flex mb-1">
              {t('build_vehicle.monthly_payment')}
            </span>
            <Controller
              control={control}
              name="monthlyPayment"
              defaultValue={props.default?.monthlyPayment}
              rules={{ required: true }}
              render={({ onChange, name, value }) => (
                <h6 className="m-0">{`KWD ${watch('monthlyPayment')?.toFixed(2) || 0
                  }`}</h6>
              )}
            />
          </div>
          <div className="col-12 font-xs font-italic text-gray-800">
            {t('common.price_disclaimer')}
          </div>
        </div>
      </div>
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
