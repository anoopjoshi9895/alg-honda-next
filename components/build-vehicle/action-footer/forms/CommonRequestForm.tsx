import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import validator from "validator";
import PhoneInput from "react-phone-input-2";
import "react-datepicker/dist/react-datepicker.css";
import { ShowRoomModelBV, CartStateModel } from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { QuickAccessFormProps, TabNames } from "../../utils";
import SelectInput from "../../../SelectInput";
import { RootState } from "../../../../app/store";
import Image from "next/image";

const vehicleModels = [
  { modelName: "Tahoe" },
  { modelName: "Camaro" },
  { modelName: "Corvetto" },
  { modelName: "Equinox" },
];
const titles = [
  { title: "Mr" },
  { title: "Mrs" },
  { title: "Ms" },
  { title: "Dr" },
];
const locations = [
  { showRoom: "showRoom 1" },
  { showRoom: "showRoom 2" },
  { showRoom: "showRoom 3" },
  { showRoom: "showRoom 4" },
];
const CommonRequestForm: React.FunctionComponent<{
  onSubmit: (data: any) => void;
  isUpdating?: boolean;
  default?: QuickAccessFormProps;
  errorMessage?: string;
  isEdit?: boolean;
  title: string;
  productTitle: string;
  productImage: string;
  showroomsList: ShowRoomModelBV[];
  // productDetails: ProductViewModelBV | undefined;
  cartData: CartStateModel;
}> = (props) => {
  const { t } = useTranslation();
  const { control, errors, register, handleSubmit, setValue, watch } =
    useForm<QuickAccessFormProps>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: props?.default,
    });

  const maxDate = moment().endOf("day");
  const isDobValid = (current: Date) => {
    return moment(current).isBefore(maxDate);
  };
  const productMedia =
    props.cartData?.productInfo?.combinationInfo[0]?.combinationMedia.find(
      (item: any) =>
        item.customOptionName.toLocaleUpperCase() ===
        TabNames.EXTERIOR.toLocaleUpperCase()
    );
  let productImage = "";
  if (props.productImage) {
    productImage = props.productImage;
  } else {
    if (productMedia) {
      productImage = props.productImage || productMedia.image;
    }
  }

  return (
    <div className="book-test-drive bg-gray-gradient">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-7 col-12 bg-white py-5">
            <div className="pr-xl-4 pr-lg-2 pb-lg-4">
              {props.default?.modelCode && (
                <>
                  <h6 className="font-lg pb-4">
                    {t("form.Select Your Vehicle")}
                  </h6>
                  <p className="text-muted pb-2">
                    {t("form.Please choose the vehicle you are interested in")}
                  </p>
                </>
              )}
              <div className="row gutter-12">
                <div className="col-12">
                  <div className="figure px-3 py-4 my-3">
                    <Image
                      src={productImage}
                      className="img-fluid"
                      alt="Product Image"
                      width={379}
                      height={213}
                    />
                  </div>
                </div>
              </div>
              {props.default?.modelCode && (
                <div className="col-12 form-group pb-xl-3 mb-0">
                  <label className="font-normal">
                    {t("form.Choose Model")}
                    <sup>*</sup>
                  </label>
                  <Controller
                    control={control}
                    name="modelCode"
                    defaultValue={props.default?.modelCode}
                    rules={{
                      required: true,
                    }}
                    key={`modelCode`}
                    render={({ onChange, name, value }) => (
                      <SelectInput
                        optionLabel="modelName"
                        optionValue="modelName"
                        data={vehicleModels}
                        default={props.default?.modelCode}
                        onChange={(val: string | number) => {
                          onChange(val);
                        }}
                        isSearchable={false}
                      />
                    )}
                  />
                  {errors.modelCode && (
                    <span className="message-validation">
                      {t("form.Please select")}
                    </span>
                  )}
                </div>
              )}
              {/* {props.default?.modelCode && ( */}
              <h6 className="font-lg pb-4 text-uppercase">
                {props.productTitle}
              </h6>
              {/* )} */}
            </div>
          </div>
          <div className="col-lg-7 col-12 bg-gray-100 py-5">
            <div className="test-drive-form box-lg px-xl-4 px-lg-2 pb-lg-4">
              <div className="row gutter-12">
                <div className="col-12 form-group mb-4">
                  <h4 className="text-uppercase">{props.title}</h4>
                  <p className="mb-2 font-sm text-gray-700">
                    {t("build_vehicle.kinldy_fill_details")}
                  </p>
                </div>
              </div>

              <div className="row gutter-12">
                <div className="col-md-12 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t("form.Title")}
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
                      {t("form.Please select")}
                    </span>
                  )}
                </div>
                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t("car_service.first_name")}
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
                        placeholder={t("form.Enter First Name")}
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <span className="message-validation">
                      {t("form.First name is required")}
                    </span>
                  )}
                </div>

                <div className="col-md-6 col-12 form-group mb-xl-2 mb-4 pb-xl-3">
                  <label className="font-normal">
                    {t("form.Last Name")}
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
                        placeholder={t("form.Enter Last Name")}
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <span className="message-validation">
                      {t("form.Last name is required")}
                    </span>
                  )}
                </div>
                <div className="col-md-12 col-12 form-group mb-xl-2 pb-xl-3">
                  <label className="font-normal">
                    {t("form.Phone Number")}
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
                        country={"kw"}
                        preferredCountries={["kw", "in"]}
                        enableSearch={false}
                        placeholder={t("form.Enter Phone Number")}
                        inputClass={"textField__input"}
                        containerClass={"textField"}
                        dropdownStyle={{ borderColor: "#e5e6e7" }}
                        disableCountryCode={false}
                        countryCodeEditable={true}
                        inputStyle={{
                          width: "100%",
                          borderRadius: "0px",
                          borderColor: "#e5e6e7",
                        }}
                        disableSearchIcon={true}
                        onChange={(val, data: { dialCode: string }) => {
                          onChange(val);
                        }}
                        value={`${watch("countryCode")}${watch("phone")}`}
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <>
                      {errors.phoneNumber.type === "required" && (
                        <span className="message-validation">
                          {t("form.Phone number is required")}
                        </span>
                      )}
                      {errors.phoneNumber.type === "minLength" && (
                        <span className="message-validation">
                          {t("form.Phone number 11 required")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="col-md-12 col-12 form-group mb-xl-2 pb-xl-3">
                  <label className="font-normal">
                    {t("form.Email")}
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
                        placeholder={t("form.Enter Email Address")}
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.email && (
                    <>
                      {errors.email.type === "required" && (
                        <span className="message-validation">
                          {t("form.Email is required")}
                        </span>
                      )}
                      {errors.email.type === "isEmail" && (
                        <span className="message-validation">
                          {t("form.Invalid email")}
                        </span>
                      )}{" "}
                    </>
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
                    {t("build_vehicle.trade_in_agreement")}
                  </label>
                  {errors.agree && (
                    <span className="message-validation">
                      {t("build_vehicle.trade_in_agreement_validation")}
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
                    {t("build_vehicle.submit")}
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
// const CustomDateInput = React.forwardRef((props, ref) => {
//   const { id, placeholder, value, onClick }: { [key: string]: any } = props;
//   return (
//     <div>
//       <input
//         id={id}
//         className="form-control"
//         placeholder={placeholder}
//         onClick={onClick}
//         value={value}
//       />
//     </div>
//   );
// });

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

export default connect(mapStateToProps, mapActionsToProps)(CommonRequestForm);
