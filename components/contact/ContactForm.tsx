import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import SelectInput from '../SelectInput';
import { bindActionCreators } from 'redux';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import validator from 'validator';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ContactFormProps } from '../build-vehicle/utils';

import { useTranslation } from 'react-i18next';

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
const category = [
  { category: 'Automobiles' },
  { category: 'Motorcycles' },
  { category: 'Power Product' },
  { category: 'Marine' },
];
const ContactForm: React.FunctionComponent<{
  onSubmit: (data: ContactFormProps) => void;
  isUpdating?: boolean;
  default?: ContactFormProps;
  errorMessage?: string;
}> = (props) => {
  const { t } = useTranslation();
  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<ContactFormProps>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: props?.default,
    });

  return (
    <div className="row text-left text-heading font-weight-semibold letter-spacing-sm">
      <div className="col-12 col-md-6">
        <div className="form-group mb-4 ">
          <label className="font-normal">{t('form.Category')}</label>
          <Controller
            control={control}
            name="category"
            defaultValue={props.default?.category}
            rules={{
              required: true,
            }}
            key={`category`}
            render={({ onChange, name, value }) => (
              <SelectInput
                optionLabel="category"
                optionValue="category"
                data={category}
                placeholder={'Select Category'}
                default={props.default?.category}
                onChange={(val: string | number) => {
                  onChange(val);
                }}
                isSearchable={false}
              />
            )}
          />
          {errors.category && (
            <span className="message-validation">
              {t('form.Please select')}
            </span>
          )}
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="form-group mb-4">
          <label className="font-normal">{t('form.Full Name')}</label>
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
      </div>
      <div className="col-12 col-md-6">
        <div className="form-group mb-4">
          <label className="font-normal">{t('form.Email')}</label>
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
      </div>
      <div className="col-12 col-md-6">
        <div className="form-group mb-4">
          <label className="font-normal">{t('form.Phone Number')}</label>
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
      <div className="col-12">
        <div className="form-group mb-4">
          <label className="font-normal">{t('form.Comments')}</label>
          <Controller
            control={control}
            name="comments"
            rules={{
              required: true,
            }}
            defaultValue={props.default?.comments}
            render={({ onChange, name, value }) => (
              <textarea
                className="form-control"
                placeholder={'Comments'}
                name={name}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-5 mx-auto">
        <button
          type="submit"
          className="btn btn-primary btn-block"
          value="Submit"
          onClick={handleSubmit(props.onSubmit)}
        >
          {t('build_vehicle.submit')}
        </button>
      </div>
    </div>
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
    cartData: state.cartState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ContactForm);
