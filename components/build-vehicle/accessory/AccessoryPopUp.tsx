import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import enquiryImage from "../../../assets/images/enquiry.svg";
import { AccessoriesModelBV, numberWithCommas } from "alg-ecom-frontend-core";
import AccessoryCheckBox from "./checkbox";
import { RootState } from "../../../app/store";
import Image from "next/image";

interface CustomProps {
  accessory: AccessoriesModelBV;

  onPopupCancel: any;
  onSelect: any;
  // onConfirmConfig: (confirm: string) => void;
  discount: number;
}
export enum TintType {
  tintRear = "tintRear",
  tintWindshield = "tintWindshield",
  tintRow1 = "tintRow1",
  tintRow2 = "tintRow2",
  tintRow3 = "tintRow3",
}
const AccessoryPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();

  const [isDisabled, setDisabled] = React.useState<boolean>(false);
  const [tintRear, setTintRear] = React.useState<string | null>(null);
  const [tintWindshield, setTintWindshield] = React.useState<string | null>(
    null
  );
  const [tintRow1, setTintRow1] = React.useState<string | null>(null);
  const [tintRow2, setTintRow2] = React.useState<string | null>(null);
  const [tintRow3, setTintRow3] = React.useState<string | null>(null);

  const onChangeTint = (value: string, tintType: TintType) => {
    switch (tintType) {
      case TintType.tintRear:
        setTintRear(value);
        break;
      case TintType.tintWindshield:
        setTintWindshield(value);
        break;
      case TintType.tintRow1:
        setTintRow1(value);
        break;
      case TintType.tintRow2:
        setTintRow2(value);
        break;
      case TintType.tintRow3:
        setTintRow3(value);
        break;
    }
  };

  const onSelect = () => {
    setDisabled(!isDisabled);
    const tint = {
      tint_rear: tintRear,
      tint_row_1: tintRow1,
      tint_row_2: tintRow2,
      tint_row_3: tintRow3,
      tint_windshield: tintWindshield,
    };
    props.onSelect(tint);
  };

  const enableSelect = () => {
    if (
      tintRear === "Yes" ||
      tintWindshield === "Yes" ||
      tintRow1 === "Yes" ||
      tintRow2 === "Yes" ||
      tintRow2 === "Yes"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const salesPrice = props.accessory.salesPrice - props.discount;
  return (
    <>
      <div
        className="fade px-0 show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: "block" }}
      >
        <div className="m-0 h-100">
          <div className="modal-content rounded-0 h-100 overflow-auto">
            <div className="modal-body p-0">
              <button
                type="button"
                className="position-absolute right-0 top-0 zIndex-1 font-sm bg-gray-200 rounded-circle border-0 p-3 m-3 d-inline-block"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.onPopupCancel()}
              >
                <i className="icon-close text-muted"></i>
              </button>

              <div className="d-flex flex-wrap p-md-5 p-4">
                <div className="col-md-5 col-12 border-right">
                  <div className="pr-md-4">
                    <h3 className="font-weight-light mb-3">
                      {props.accessory.productTitle}
                    </h3>
                    <h3 className="font-weight-light mb-4">
                      {props.accessory.salesPrice !== salesPrice && (
                        <>
                          <del>
                            {`${
                              props.accessory.productCurrency
                            } ${numberWithCommas(props.accessory.salesPrice)}`}
                          </del>{" "}
                        </>
                      )}
                      {salesPrice === 0 ? (
                        <span className="text-primary">Free</span>
                      ) : (
                        `${props.accessory.productCurrency} ${numberWithCommas(
                          salesPrice
                        )}`
                      )}
                    </h3>
                    <p className="mb-5 pb-5">
                      {props.accessory.productDescription}
                    </p>
                    <button
                      className="btn btn-primary btn-block text-uppercase mb-2"
                      onClick={() => onSelect()}
                      disabled={!enableSelect() || isDisabled}
                    >
                      {t("common.select")}
                    </button>
                    <p className="font-xs mb-4 font-italic">
                      {t("build_vehicle.choose_tint_text")}
                    </p>
                    <div className="text-center">
                      <a
                        className="font-normal font-weight-bold text-decoration-underline"
                        onClick={() => props.onPopupCancel()}
                      >
                        {t("build_vehicle.Back to Build")}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-12">
                  <div className="pl-3">
                    <h5 className="border-bottom font-weight-normal pb-3 mb-3">
                      {t("build_vehicle.Included Accessories")}
                    </h5>
                    <div className="accessory-scroll">
                      <div className="border-bottom mb-3">
                        <div className="row">
                          <div className="col-md-3 col-2">
                            <Image
                              src={props.accessory.productImage}
                              className="img-fluid"
                              alt={props.accessory?.productTitle}
                              width={346}
                              height={248}
                            />
                          </div>
                          <div className="col-md-9 col-10 pb-2">
                            <h6 className="font-weight-semibold mb-2">
                              {props.accessory.productTitle}
                            </h6>
                            <p className="font-normal mb-3">
                              {props.accessory.productDescription}

                              {/* If you are going to use a passage of Lorem Ipsum,
                              you need to be sure there isn't anything
                              embarrassing hidden in the middle of text.{' '} */}
                            </p>
                            <AccessoryCheckBox
                              label={"Windshield"}
                              onChange={onChangeTint}
                              isSelected={tintWindshield === "Yes"}
                              tintType={TintType.tintWindshield}
                            />
                            {props.accessory?.tintRows >= 1 && (
                              <AccessoryCheckBox
                                label={"First Row"}
                                onChange={onChangeTint}
                                isSelected={tintRow1 === "Yes"}
                                tintType={TintType.tintRow1}
                              />
                            )}
                            {props.accessory?.tintRows >= 2 && (
                              <AccessoryCheckBox
                                label={"Second Row"}
                                onChange={onChangeTint}
                                isSelected={tintRow2 === "Yes"}
                                tintType={TintType.tintRow2}
                              />
                            )}
                            {props.accessory?.tintRows === 3 && (
                              <AccessoryCheckBox
                                label={"Third Row"}
                                onChange={onChangeTint}
                                isSelected={tintRow3 === "Yes"}
                                tintType={TintType.tintRow3}
                              />
                            )}
                            <AccessoryCheckBox
                              label={"Rear Window"}
                              onChange={onChangeTint}
                              isSelected={tintRear === "Yes"}
                              tintType={TintType.tintRear}
                            />
                            {props.accessory.displayDisclaimer && (
                              <div className="font-italic font-xs text-gray-700">
                                {t("build_vehicle.accessoryDisclaimer")}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      dispatch,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(AccessoryPopUp);
