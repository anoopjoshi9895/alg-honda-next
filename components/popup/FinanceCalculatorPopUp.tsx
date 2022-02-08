import React from 'react';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from "../../app/store";
import {
  commonActions,
  ShowRoomModelBV,
  ProductViewModelBV,
  api,
  BankListStateModel,
  bankListActions,
  TrimVarientProductModel,
  numberWithCommas,
} from 'alg-ecom-frontend-core';
import { bindActionCreators } from 'redux';
import CarSelection from '../car-selection';
import PaymentForm from '../forms/PaymentForm';
import { QuickAccessFormProps } from '../../components/build-vehicle/utils';
import { Controller, useForm } from 'react-hook-form';
import SelectInput from '../../components/SelectInput';
import Link from 'next/link';
interface CustomProps {
  // images: string[];
  onPopupCancel?: any;
  product?: { id: number; image: string; price: number; title: string };
  showroomsList: ShowRoomModelBV[];
  banks: BankListStateModel;
  getBankList: typeof bankListActions.getBankList;
}
const FinanceCalculatorPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {

  const [showTankyou, setShowThankyou] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = React.useState<
    { id: number; image: string; price: number; title: string } | undefined
  >(props.product || undefined);
  const [codeYear, setCodeYear] = React.useState<{
    code: string;
    year: number;
    trim: string;
  }>({
    code: '',
    year: 0,
    trim: '',
  });
  const [trimList, setTrimList] = React.useState<TrimVarientProductModel[]>();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.quickAccess.BookTestDrive({
        ...data,
        productID: selectedProduct?.id,
      });
      if (response.responsecode === 200) {
        setShowThankyou(true);
        // toastr.success('Success', 'Test drive booked successfully');
      } else {
        toastr.error('Error', response?.message);
      }
    } catch (error: any) {
      toastr.error('Error', error?.response?.data?.message);
    }
  };

  const onSelectProduct = (
    productID: number,
    image: string,
    salesPrice: number,
    title: string
  ) => {
    setSelectedProduct({ id: productID, image, price: salesPrice, title });
  };

  const onSelectedTirm = (code: any, year: any, trim: any) => {
    setCodeYear({ code, year, trim });
  };

  React.useEffect(() => {
    getTrimList();
  }, [codeYear]);

  const getTrimList = async () => {
    if (!codeYear?.trim && codeYear?.year && codeYear?.code) {
      const data = await api.build.trimList(codeYear?.year, codeYear?.code);
      setTrimList(data?.productsList);
    } else if (codeYear?.trim && codeYear?.year && codeYear?.code) {
      const data = await api.build.trimWiseList(
        codeYear?.year,
        codeYear?.code,
        codeYear?.trim
      );
      setTrimList(data?.productsList);
    }
  };

  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<QuickAccessFormProps>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });
  React.useEffect(() => {
    props.getBankList();
  }, []);
  return (
    <>
      <div
        className="fade px-0 show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: 'block' }}
      //   aria-labelledby="compareModalLabel"
      //   aria-hidden="true"
      >
        <div className="m-0 h-100">
          <div className="modal-content rounded-0 h-100 overflow-auto">
            <div className="modal-body p-0">
              {props.onPopupCancel && (
                <button
                  type="button"
                  className="position-absolute right-0 top-0 zIndex-1 font-sm bg-transparent rounded-circle border-0 p-1 m-2 d-inline-block"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.onPopupCancel()}
                >
                  <i className="icon-close text-muted"></i>
                </button>
              )}
              {!showTankyou ? (
                <div className="w-100 product-selection">
                  {selectedProduct && (
                    <div className="book-test-drive bg-gray-gradient">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-5 col-md-7 col-12 bg-white py-5">
                            <div className="px-xl-4 px-lg-2 pb-lg-4">
                              <div className="row gutter-12">
                                <div className="col-12">
                                  <h6 className="font-lg text-uppercase">
                                    {t('form.Select Your Vehicle')}
                                  </h6>
                                </div>
                                <div className="col-12">
                                  <div className="figure px-3 py-4 my-3">
                                    <img
                                      src={selectedProduct.image}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* {!props.default?.modelCode && ( */}
                              <div className="pb-4 ">
                                <h6 className="font-lg text-uppercase">
                                  {selectedProduct.title}
                                </h6>
                                {selectedProduct.price && (
                                  <p className="h4">
                                    KWD{' '}
                                    {
                                      numberWithCommas(
                                        selectedProduct.price
                                      ).split('.')[0]
                                    }
                                  </p>
                                )}
                              </div>
                              {/* )} */}

                              {trimList ? (
                                <>
                                  <div className="form-group pb-xl-1 mb-4">
                                    <label className="font-normal">
                                      {t('form.Choose Model')}
                                      <sup>*</sup>
                                    </label>
                                    <Controller
                                      control={control}
                                      name="productID"
                                      defaultValue={selectedProduct.id}
                                      rules={{
                                        required: true,
                                      }}
                                      key={`productID`}
                                      render={({ onChange, name, value }) => (
                                        <SelectInput
                                          optionLabel="productTitle"
                                          optionValue="productID"
                                          data={trimList}
                                          default={selectedProduct.id}
                                          onChange={(val: string | number) => {
                                            onChange(val);
                                            onSelectProduct(
                                              val as number,
                                              trimList?.find(
                                                (x) => x.productID === val
                                              )?.productImage || '',
                                              trimList?.find(
                                                (x) => x.productID === val
                                              )?.salesPrice || 0,
                                              trimList?.find(
                                                (x) => x.productID === val
                                              )?.productTitle || ''
                                            );
                                          }}
                                          isSearchable={false}
                                          menuPlacement="top"
                                        />
                                      )}
                                    />
                                    {errors.productID && (
                                      <span className="message-validation">
                                        {t('form.Please select model')}
                                      </span>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <Controller
                                  control={control}
                                  rules={{
                                    required: true,
                                  }}
                                  name="productID"
                                  defaultValue={selectedProduct.id}
                                  render={() => <></>}
                                />
                              )}
                            </div>
                          </div>
                          <div className="col-lg-7 col-12 bg-gray-100 py-5">
                            <div className="test-drive-form box-lg px-xl-4 px-lg-2 pb-lg-4">
                              <div className="row gutter-12">
                                <div className="col-12 form-group mb-4">
                                  <h4 className="text-uppercase">
                                    {t('footer.financial_calculator')}
                                  </h4>
                                  <p className="mb-2 font-sm text-gray-700">
                                    {/* Let's Start Booking Your Honda Test Drive.
                                    Kindly Fill in Your details Below */}
                                  </p>
                                </div>
                              </div>
                              {selectedProduct && (
                                <PaymentForm
                                  banks={props.banks.financeList}
                                  onSubmit={() => {
                                    // do nothing
                                  }}
                                  netPrice={selectedProduct?.price}
                                  productCurrency={'KWD'}
                                  onCancel={() => {
                                    // do nothing
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {!selectedProduct && (
                    <CarSelection
                      onSelectComplete={onSelectProduct}
                      onSelectTrim={onSelectedTirm}
                    />
                  )}
                </div>
              ) : (
                <div className="thankyou-block py-5 text-center">
                  <div className="py-5">
                    <img src="/assets/images/enquiry.svg" alt="thank you" className="mb-4" />
                    <h3 className="text-uppercase mb-3">
                      {t('form.Thank you for the enquiry')}
                    </h3>
                    <p className="font-normal text-gray-700 mb-4 pb-2">
                      {t('form.Thank_You_Text')}
                    </p>
                    <Link
                      href={`/`}
                    >
                      <a
                        type="button"
                        className="btn btn-primary font-md px-5"
                      >
                        <span className="d-block px-sm-4">
                          {t('form.BACK TO HOME')}
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getBankList: bankListActions.getBankList,
      dispatch,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    banks: state.bankState,
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FinanceCalculatorPopUp);
