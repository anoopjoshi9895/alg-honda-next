import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import SelectInput from '../components/SelectInput';
import { bindActionCreators } from 'redux';
import { RootState } from "../app/store";
import { connect } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  ShowRoomModelBV,
  ProductViewModelBV,
  TrimVarientProductModel,
  api,
  ProductDetailsStateModel,
  AllVehicleItemModel,
  ShowRoomDetailsModel,
} from 'alg-ecom-frontend-core';
import { BookServiceFormProps } from './props';
import { useTranslation } from 'react-i18next';
import { RadioSelect } from '../components/auth/radio-select';

const titles = [
  { title: 'Mr' },
  { title: 'Mrs' },
  { title: 'Ms' },
  { title: 'Dr' },
];

const BookServiceForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  isUpdating?: boolean;
  default?: BookServiceFormProps;
  errorMessage?: string;
  isEdit?: boolean;
  showroomsList?: ShowRoomDetailsModel[];
  productDetails: ProductViewModelBV | undefined;
  image: string;
  trimList?: TrimVarientProductModel[];
  showModel?: boolean;
  productID?: number;
  backToModel?: () => void;
  modelYear?: any;
  modelsList: AllVehicleItemModel[];
  pageLayout?: boolean;
}> = (props) => {
  const { t, i18n } = useTranslation();
  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<BookServiceFormProps>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: props?.default,
    });

  const [image, setImage] = React.useState<string>(
    props.showModel && props.trimList
      ? props.trimList?.[0].productImage
      : props.image
  );
  const [productTitle, setProductTitle] = React.useState<string>(
    props.showModel && props.trimList
      ? props.trimList?.[0].productTitle
      : props.productDetails?.productTitle || ''
  );

  const [productID, setProductID] = React.useState<number>(
    props.showModel && props.trimList
      ? props.trimList?.[0].productID
      : props.productID || 0
  );

  const maxDate = moment().endOf('day');
  const isDobValid = (current: Date) => {
    return moment(current).isBefore(maxDate);
  };

  return (
    <div
      className={`book-test-drive ${!props.pageLayout ? 'bg-gray-gradient' : ''
        }`}
    >
      <div
        className="container"
        style={{ maxWidth: props.pageLayout ? '1000px' : '' }}
      >
        <div className="row">
          {!props.pageLayout && (
            <div className="col d-none d-lg-block test-drive-bg"></div>
          )}
          <div
            className={`col-lg col-12 py-md-5 pt-5 pb-4 ${!props.pageLayout ? 'bg-gray-100' : ''
              }`}
          >
            <div
              className={`test-drive-form px-xl-4 px-lg-2 pb-lg-4 ${!props.pageLayout ? 'box-lg' : ''
                }`}
            >
              {!props.pageLayout && (
                <div className="row gutter-12">
                  <div className="col-12 form-group mb-4">
                    <h4 className="text-uppercase">
                      {t('popup.Book a service')}
                    </h4>
                    <p className="mb-2 font-sm text-gray-700">
                      {t('form.service_popup_text')}
                    </p>
                  </div>
                </div>
              )}

              <div className="row gutter-12">
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Title')}
                    {/* <sup>*</sup> */}
                  </label>
                  <Controller
                    control={control}
                    name="title"
                    defaultValue={props.default?.title}
                    // rules={{
                    //   required: true,
                    // }}
                    key={`title`}
                    render={({ onChange, name, value }) => (
                      <SelectInput
                        optionLabel="title"
                        optionValue="title"
                        data={titles}
                        default={props.default?.title}
                        placeholder={t('common.select')}
                        onChange={(val: string | number) => {
                          onChange(val);
                        }}
                        isSearchable={false}
                      />
                    )}
                  />
                  {errors.title && (
                    <span className="message-validation">
                      {t('form.Please select')}
                    </span>
                  )}
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('car_service.first_name')}
                    <sup>*</sup>
                  </label>
                  <Controller
                    control={control}
                    name="firstName"
                    defaultValue={props.default?.firstName}
                    rules={{
                      required: true,
                    }}
                    render={({ onChange, name, value }) => (
                      <input
                        className="form-control"
                        placeholder={t('form.Enter First Name')}
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <span className="message-validation">
                      {t('form.First name is required')}
                    </span>
                  )}
                </div>

                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Last Name')}
                    <sup>*</sup>
                  </label>
                  <Controller
                    control={control}
                    name="lastName"
                    defaultValue={props.default?.lastName}
                    rules={{
                      required: true,
                    }}
                    render={({ onChange, name, value }) => (
                      <input
                        className="form-control"
                        placeholder={t('form.Enter Last Name')}
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <span className="message-validation">
                      {t('form.Last name is required')}
                    </span>
                  )}
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Phone Number')}
                    <sup>*</sup>
                  </label>
                  <div className="">
                    <Controller
                      control={control}
                      name="phoneNumber"
                      defaultValue={props.default?.phoneNumber}
                      rules={{
                        required: true,
                        minLength: 11,
                      }}
                      key={`phoneNumber`}
                      render={({ onChange, name, value }) => (
                        <PhoneInput
                          country={'kw'}
                          preferredCountries={['kw', 'in']}
                          enableSearch={false}
                          placeholder={t('form.Enter Phone Number')}
                          inputClass={'textField__input'}
                          containerClass={'textField'}
                          dropdownStyle={{ borderColor: '#e5e6e7' }}
                          disableCountryCode={false}
                          countryCodeEditable={true}
                          inputStyle={{
                            width: '100%',
                            borderRadius: '0px',
                            borderColor: '#e5e6e7',
                          }}
                          disableSearchIcon={true}
                          onChange={(val, data: { dialCode: string }) => {
                            onChange(val);
                          }}
                          value={`${watch('countryCode')}${watch('phone')}`}
                          autoFormat={false}
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <>
                        {errors.phoneNumber.type === 'required' && (
                          <span className="message-validation">
                            {t('form.Phone number is required')}
                          </span>
                        )}
                        {errors.phoneNumber.type === 'minLength' && (
                          <span className="message-validation">
                            {t('form.Phone number 11 required')}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Email')}
                    {/* <sup>*</sup> */}
                  </label>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue={props.default?.email}
                    // rules={{
                    //   // required: true,
                    //   validate: { isEmail: validator.isEmail },
                    // }}
                    render={({ onChange, name, value }) => (
                      <input
                        className="form-control"
                        placeholder={t('form.Enter Email Address')}
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.email && (
                    <>
                      {errors.email.type === 'required' && (
                        <span className="message-validation">
                          {t('form.Email is required')}
                        </span>
                      )}
                      {errors.email.type === 'isEmail' && (
                        <span className="message-validation">
                          {t('form.Invalid email')}
                        </span>
                      )}{' '}
                    </>
                  )}
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal w-100">
                    {t('form.Preferred appointment date')}
                    <sup>*</sup>
                  </label>

                  <Controller
                    control={control}
                    name="date"
                    defaultValue={props.default?.date}
                    rules={{
                      required: true,
                    }}
                    key={`date`}
                    render={({ onChange, name, value }) => (
                      <DatePicker
                        className={'w-100'}
                        selected={value}
                        onChange={onChange}
                        minDate={new Date()}
                        placeholderText={'dd/MM/yyyy'}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/MM/yyyy"
                        customInput={<CustomDateInput />}
                      />
                    )}
                  />

                  {errors.date && (
                    <span className="message-validation">
                      {t('form.Please select date')}
                    </span>
                  )}
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Location')}
                    <sup>*</sup>
                  </label>
                  <Controller
                    control={control}
                    name="showroomID"
                    defaultValue={props.default?.showroomID}
                    rules={{
                      required: true,
                    }}
                    key={`showroomID`}
                    render={({ onChange, name, value }) => (
                      <SelectInput
                        optionLabel="showroomName"
                        optionValue="showroomID"
                        data={props.showroomsList?.filter(
                          (item) =>
                            item.isServiceCenter === 'Yes' &&
                            item.showroomType === 'car'
                        )}
                        placeholder={t('common.select')}
                        default={value}
                        onChange={(val: string | number) => {
                          onChange(val);
                        }}
                        isSearchable={false}
                      />
                    )}
                  />
                  {errors.showroomID && (
                    <span className="message-validation">
                      {t('form.Please select showroom')}
                    </span>
                  )}
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Vehicle Registration Number')}
                  </label>
                  <Controller
                    control={control}
                    name="vehRegNo"
                    defaultValue={props.default?.vehRegNo}
                    // rules={{
                    //   required: true,
                    // }}
                    render={({ onChange, name, value }) => (
                      <input
                        className="form-control"
                        placeholder={t('form.Enter registration number')}
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.vehRegNo && (
                    <span className="message-validation">
                      {t('form.Vehicle registration number required')}
                    </span>
                  )}
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Vehicle Model')}
                    <sup>*</sup>
                  </label>
                  <Controller
                    control={control}
                    name="modelID"
                    defaultValue={props.default?.modelID}
                    rules={{
                      required: true,
                    }}
                    key={`modelID`}
                    render={({ onChange, name, value }) => (
                      <SelectInput
                        optionLabel="productCategoryName"
                        optionValue="productCategoryID"
                        data={props.modelsList}
                        placeholder={t('common.select')}
                        default={value}
                        onChange={(val: string | number) => {
                          onChange(val);
                        }}
                        isSearchable={false}
                      />
                    )}
                  />
                  {errors.modelID && (
                    <span className="message-validation">
                      {t('form.Please select model')}
                    </span>
                  )}
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Vehicle Mileage')}
                  </label>
                  <Controller
                    control={control}
                    name="mileage"
                    defaultValue={props.default?.mileage}
                    // rules={{
                    //   required: true,
                    // }}
                    render={({ onChange, name, value }) => (
                      <input
                        className="form-control"
                        placeholder={t('form.Enter Mileage')}
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.mileage && (
                    <span className="message-validation">
                      {t('form.Mileage required')}
                    </span>
                  )}
                </div>
                <div className="col-12 form-group mb-4">
                  <label className="font-normal">{t('form.Comments')}</label>
                  <Controller
                    control={control}
                    name="comments"
                    defaultValue={props.default?.comments}
                    // rules={{
                    //   required: true,
                    //   validate: { isEmail: validator.isEmail },
                    // }}
                    render={({ onChange, name, value }) => (
                      <textarea
                        className="form-control"
                        placeholder={t('form.Comments')}
                        name={name}
                        onChange={onChange}
                        value={value}
                      ></textarea>
                    )}
                  />
                </div>
                <div className="col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('common.Door to door service')}
                  </label>
                  <Controller
                    control={control}
                    name="doorToDoor"
                    rules={{ required: true }}
                    render={({ onChange, name, value }) => (
                      <RadioSelect
                        defaultValue={value || 'No'}
                        options={[
                          {
                            label: t('build_vehicle.yes'),
                            value: 'Yes',
                          },
                          { label: t('build_vehicle.no'), value: 'No' },
                        ]}
                        optionLabel={'label'}
                        optionValue={'value'}
                        onChange={(val) => onChange(val)}
                        className="col-auto"
                        containerClass="row mt-1"
                      // labelClass="w-100"
                      />
                    )}
                  />
                  {errors.doorToDoor && (
                    <span className="message-validation">
                      {t('form.Please select any of the above')}
                    </span>
                  )}
                </div>
                <div className="col-12 mb-4 pb-3">
                  <Controller
                    control={control}
                    name="agree"
                    rules={{ required: true }}
                    defaultValue={props.default?.agree}
                    render={({ onChange, name, value }) => (
                      <input
                        type="checkbox"
                        id="agree"
                        name={name}
                        onChange={(e) => onChange(e.target.checked)}
                        value={value}
                      />
                    )}
                  />
                  <label htmlFor="agree">{t('form.agreeText2')}</label>
                  {errors.agree && (
                    <span className="message-validation">
                      {t('build_vehicle.trade_in_agreement_validation')}
                    </span>
                  )}
                </div>
                <div className="col-md-6 col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                    value="Submit"
                    onClick={handleSubmit(props.onSubmit)}
                  >
                    {t('build_vehicle.submit')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const CustomDateInput = React.forwardRef((props, ref) => {
  const { id, placeholder, value, onClick }: { [key: string]: any } = props;
  return (
    <div>
      <input
        id={id}
        className="form-control"
        placeholder={placeholder}
        onClick={onClick}
        value={value}
      />
    </div>
  );
});

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(BookServiceForm);
