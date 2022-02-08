import React from "react";
import { connect } from "react-redux";
import { commonActions } from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
// import "assets/sass/login.scss";
import { Controller, useForm } from "react-hook-form";
import { RadioSelect } from "./radio-select";
import { useTranslation } from "react-i18next";
import { RootState } from "../../app/store";

enum AuthTab {
  signUp = "signUp",
  signIn = "signIn",
}
interface CustomProps {
  onSubmit: any;
  // onLogin: any;
  // errorMessage?: string;
  // onSocialSubmit?: () => void;
}
const UserConfirmForm: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const [tabName, setTabName] = React.useState(AuthTab.signIn);
  const [isShowOtpForm, setShowOtpForm] = React.useState(false);
  const [userId, setUserId] = React.useState<number>(0);
  const [userToken, setUserToken] = React.useState<string>("");
  const { control, errors, handleSubmit, watch } = useForm<{
    confirm: string;
  }>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = (data: any) => {
    props.onSubmit?.(data);
  };
  return (
    <>
      <>
        <div className=" form-group pb-3 mb-1 position-relative">
          <Controller
            control={control}
            name="confirm"
            rules={{ required: true }}
            render={({ onChange, name }) => (
              <RadioSelect
                defaultValue={watch("confirm")}
                options={[
                  {
                    label: t(
                      "form.Yes the email and phone number given is correct"
                    ),
                    value: "Yes",
                  },
                  { label: t("form.No I am not this user"), value: "No" },
                ]}
                optionLabel={"label"}
                optionValue={"value"}
                onChange={onChange}
                className="col-12 mb-3"
                containerClass="row mt-1"
                // labelClass="w-100"
              />
            )}
          />
          {errors.confirm && (
            <span className="message-validation">
              {t("form.Please select any of the above")}
            </span>
          )}
        </div>
        <div className=" mt-4 pb-1">
          <button
            type="submit"
            value="Confirm"
            className="btn btn-primary btn-block text-uppercase font-md"
            onClick={handleSubmit(onSubmit)}
          >
            {t("form.Confirm")}
          </button>
        </div>
      </>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      toggleMenu: commonActions.toggleMenu,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isMenuOpen: state.commonState.headerMenuOpen,
    cartData: state.cartState,
    productData: state.productDetailsState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(UserConfirmForm);
