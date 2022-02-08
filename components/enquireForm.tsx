import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import Select from 'react-select';
import SelectInput from './SelectInput/SelectInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import {
  IBaseProductModel,
  ShowRoomModelBV,
  numberWithCommas,
  ShowRoomDetailsModel,
} from 'alg-ecom-frontend-core';
import { IProductModel } from './enquirePopUp';
const vehicleModels = [
  { modelName: 'Tahoe' },
  { modelName: 'Camaro' },
  { modelName: 'Corvetto' },
  { modelName: 'Equinox' },
];
const titles = [
  { title: 'Mr' },
  { title: 'Mrs' },
  { title: 'Ms' },
  { title: 'Dr' },
];
const locations = [
  { showRoom: 'showRoom 1' },
  { showRoom: 'showRoom 2' },
  { showRoom: 'showRoom 3' },
  { showRoom: 'showRoom 4' },
];

interface QuickAccessFormProps {
  accessType: string;
  productID: string;
  modelCode: string;
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  showroomID: number;
  comments: string;
  date?: string;
  time?: string;
  agree?: boolean;
}

const EnquireForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  title: string;
  showroomsList?: ShowRoomDetailsModel[];
  default?: QuickAccessFormProps;
  product: IProductModel;
  showRoomtype: string;
}> = (props) => {
  const { t } = useTranslation();
  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<QuickAccessFormProps>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: props?.default,
    });

  const maxDate = moment().endOf('day');
  const isDobValid = (current: Date) => {
    return moment(current).isBefore(maxDate);
  };

  return (
    <div className="book-test-drive bg-gray-gradient">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-7 col-12 bg-white py-5">
            <div className="pr-xl-4 pr-lg-2 pb-lg-4">
              <div className="row gutter-12">
                <div className="col-12">
                  <div className="figure px-4 px-md-5">
                    <img
                      src={props.product?.previewImage}
                      className="img-fluid"
                      alt=""
                    />
                    <h3 className="mb-1 text-uppercase">
                      {props.product?.productTitle}
                    </h3>
                    {/* <p className="font-normal text-secondary mb-4 pb-1">
                      MAX 2.5KVA
                    </p> */}
                    <p className="font-xs text-gray-800 mb-0">
                      {t('build_vehicle.Net Price')}
                    </p>
                    <p className="font-xl font-weight-bold text-secondary">
                      {props.product?.offerPrice}
                      {/* KWD {numberWithCommas(props.product?.offerPrice, true)} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-12 bg-gray-100 py-5">
            <div className="test-drive-form box-lg px-xl-4 px-lg-2 pb-lg-4">
              <div className="row gutter-12">
                <div className="col-12 form-group mb-4">
                  <h4 className="text-uppercase">{t('common.Enquire Now')}</h4>
                  <p className="mb-2 font-sm text-gray-700">
                    {t('build_vehicle.kinldy_fill_details')}
                  </p>
                </div>
              </div>

              <div className="row gutter-12">
                <div className="col-md-12 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
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
                    rules={{
                      required: true,
                    }}
                    defaultValue={props.default?.firstName}
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
                    rules={{
                      required: true,
                    }}
                    defaultValue={props.default?.lastName}
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
                <div className="col-md-12 col-12 form-group mb-xl-2 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Phone Number')}
                    <sup>*</sup>
                  </label>

                  <Controller
                    control={control}
                    name="phoneNumber"
                    defaultValue={props.default?.phoneNumber}
                    // rules={{
                    //   required: true,
                    // }}
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
                <div className="col-md-12 col-12 form-group mb-xl-2 pb-xl-3">
                  <label className="font-normal">
                    {t('form.Email')}
                    <sup>*</sup>
                  </label>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue={props.default?.email}
                    rules={{
                      required: true,
                      validate: { isEmail: validator.isEmail },
                    }}
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
                <div className="col-md-12 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t('build_vehicle.Showroom')}
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
                        data={props?.showroomsList?.filter(
                          (item) => item.showroomType === props.showRoomtype
                        )}
                        default={props.default?.showroomID}
                        onChange={(val: string | number) => {
                          onChange(val);
                        }}
                        isSearchable={false}
                      />
                    )}
                  />
                  {errors.showroomID && (
                    <span className="message-validation">
                      {t('form.Please select')}
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
                  <label htmlFor="agree">
                    {t('build_vehicle.trade_in_agreement')}
                  </label>
                  {errors.agree && (
                    <span className="message-validation">
                      {t('build_vehicle.trade_in_agreement_validation')}
                    </span>
                  )}
                </div>
                <div className="col-12">
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





export default EnquireForm;