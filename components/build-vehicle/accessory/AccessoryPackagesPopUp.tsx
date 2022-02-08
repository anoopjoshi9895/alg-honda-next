import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { bindActionCreators } from "redux";
import {
  numberWithCommas,
  AccessoryPackages,
  ConfigurationAccessoryPackageOptions,
  ProductDetailsStateModel,
  CartStateModel,
  CartActions,
} from "alg-ecom-frontend-core";
import { PriceOption, onSingleAccessoryPackageSelect } from "../utils";
import cloneDeep from "lodash/cloneDeep";
import { decode } from "html-entities";
import { RootState } from "../../../app/store";
import Image from "next/image";

interface CustomProps {
  accessoryPackage: AccessoryPackages;
  onPopupCancel: any;
  discountData: PriceOption;
  selectedAccessoryPackage?: any;
  productData: ProductDetailsStateModel;
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
}

const AccessoryPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();

  const [isDisabled, setDisabled] = React.useState<boolean>(false);
  const [windshieldDisclaimer, setWindshieldDisclaimer] =
    React.useState<boolean>(false);
  const [rearDisclaimer, setRearDisclaimer] = React.useState<boolean>(false);

  const [accessoryPackageOptions, setAccessoryPackageOptions] =
    React.useState<ConfigurationAccessoryPackageOptions>(
      props.selectedAccessoryPackage || {}
    );
  React.useEffect(() => {
    setAccessoryPackageOptions(props.selectedAccessoryPackage || {});
  }, [props.selectedAccessoryPackage]);

  const originalPrice = props.discountData.originalPrice;
  const offerPrice =
    props.discountData.originalPrice - props.discountData.discount;

  const tintAccessories = props.accessoryPackage?.tintAvailable
    ? props.accessoryPackage.accessories?.filter(
        (acc) =>
          acc.componentCode === props.accessoryPackage.tint?.componentCode
      )
    : [];

  const leatherAccessories =
    props.accessoryPackage.leatherPreferance &&
    props.accessoryPackage.leatherPreferanceComponentCode
      ? props.accessoryPackage?.accessories?.filter(
          (acc) =>
            acc.componentCode ===
            props.accessoryPackage.leatherPreferanceComponentCode
        )
      : [];

  const onTintSelected = (selected?: boolean) => {
    setAccessoryPackageOptions({
      ...accessoryPackageOptions,
      tintOptions: selected ? {} : undefined,
    });
  };

  const onLetherSelected = (selected?: boolean) => {
    setAccessoryPackageOptions({
      ...accessoryPackageOptions,
      leatherAccessory: selected ? leatherAccessories?.[0] : undefined,
    });
  };

  const isTintValid = (): boolean => {
    if (!props.accessoryPackage.tintAvailable || !tintAccessories?.length) {
      return true;
    }
    if (!accessoryPackageOptions.tintOptions) {
      return true;
    }
    if (
      accessoryPackageOptions.tintOptions.windsheild ||
      accessoryPackageOptions.tintOptions.rear
    ) {
      return true;
    }
    if (
      props.accessoryPackage.tint?.checkRows === "Yes" &&
      props.accessoryPackage.tint?.tintRows
    ) {
      for (let i = 0; i < props.accessoryPackage.tint?.tintRows; i++) {
        if (accessoryPackageOptions.tintOptions[`row_${i + 1}`]) {
          return true;
        }
      }
    }
    return false;
  };

  const onSubmit = async (selected: boolean) => {
    onSingleAccessoryPackageSelect(
      { ...props.accessoryPackage, ...accessoryPackageOptions },
      selected,
      props?.cartData,
      props?.productData
    );
    const cart: CartStateModel = cloneDeep(props.cartData);
    await props.addToCart(cart);
    // if (selected) {
    //   props?.onPopupCancel();
    // }
  };

  const renderTintRows = () => {
    const inputs = [];

    for (let i = 0; i < (props.accessoryPackage?.tint?.tintRows || 0); i++) {
      inputs.push(
        renderTintOption(`Row ${Number(i) + 1}`, `row_${Number(i) + 1}`)
      );
    }

    return inputs;
  };

  const renderTintOptions = () => {
    return (
      <>
        {renderTintOption("Windsheild", "windsheild")}
        {renderTintOption("Rear Window", "rear")}
        {props.accessoryPackage?.tint?.checkRows === "Yes" &&
          !!props.accessoryPackage?.tint?.tintRows &&
          renderTintRows()}
      </>
    );
  };

  const renderTintOption = (label: string, key: string) => {
    const value = accessoryPackageOptions?.tintOptions?.[key];
    const id = `${props.accessoryPackage.packageID}-tint-option-${key}`;

    return (
      <div className="d-flex align-items-baseline mb-2">
        <div className="col-md-4 col-sm-4 col-12 pl-0">
          <input
            type="checkbox"
            name=""
            id={id}
            checked={!!value}
            onChange={(e) => {
              setAccessoryPackageOptions({
                ...accessoryPackageOptions,
                tintOptions: {
                  ...accessoryPackageOptions?.tintOptions,
                  [key]: e.target.checked
                    ? tintAccessories?.[0]
                    : (undefined as any),
                },
              });
            }}
          />
          <label htmlFor={id} className="font-sm">
            {label}
          </label>
        </div>
        <div className="col-md-8 col-sm-6 col-12">
          <select
            className="form-control font-sm"
            value={value?.productID || ""}
            onChange={(e) => {
              setAccessoryPackageOptions({
                ...accessoryPackageOptions,
                tintOptions: {
                  ...accessoryPackageOptions?.tintOptions,
                  [key]: e.target.value
                    ? tintAccessories?.find(
                        (acc) => acc.productID?.toString() === e.target.value
                      )
                    : (undefined as any),
                },
              });
              const isDisclaimerAvailable =
                props?.accessoryPackage?.accessories.find(
                  (accessory) =>
                    accessory.productID.toString() === e.target.value
                )?.displayDisclaimer === "No"
                  ? false
                  : true;
              if (key === "windsheild") {
                setWindshieldDisclaimer(isDisclaimerAvailable);
              }
              if (key === "rear") {
                setRearDisclaimer(isDisclaimerAvailable);
              }
            }}
          >
            <option value={""}>Select Tint Level</option>
            {tintAccessories.map((acc) => (
              <option value={acc.productID} key={acc?.productID}>
                {acc.productTitle}
              </option>
            ))}
          </select>
          {key === "windsheild" && windshieldDisclaimer && (
            <div className="font-italic font-xs text-gray-700 mt-1">
              {t("build_vehicle.accessoryDisclaimer")}
            </div>
          )}
          {key === "rear" && rearDisclaimer && (
            <div className="font-italic font-xs text-gray-700 mt-1">
              {t("build_vehicle.accessoryDisclaimer")}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTintSelection = () => {
    const tintSelected = !!accessoryPackageOptions.tintOptions;
    return (
      <div className="border-bottom py-3">
        <h6 className="font-normal mb-2">Window Film</h6>
        <p className="font-sm text-gray-700">
          {ReactHtmlParser(
            decode(props.accessoryPackage?.packageDescription || ""),
            {
              decodeEntities: true,
            }
          )}
        </p>

        <p className="font-sm text-gray-700">Add this item to the package</p>
        <div className="d-flex mb-4">
          <div className="mr-3">
            <input
              type="checkbox"
              name="pack"
              id={`${props.accessoryPackage.packageID}-tint-yes`}
              checked={tintSelected}
              onChange={(e) => onTintSelected(e.target.checked)}
            />
            <label htmlFor={`${props.accessoryPackage.packageID}-tint-yes`}>
              Yes
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="pack"
              id={`${props.accessoryPackage.packageID}-tint-no`}
              checked={!tintSelected}
              onChange={(e) => onTintSelected(!e.target.checked)}
            />
            <label htmlFor={`${props.accessoryPackage.packageID}-tint-no`}>
              No
            </label>
          </div>
        </div>
        {tintSelected && renderTintOptions()}
      </div>
    );
  };

  const renderLeatherOptions = () => {
    const value = accessoryPackageOptions.leatherAccessory;
    return (
      <div className="border-bottom py-3">
        <h6 className="font-normal mb-2">Leather seat covers</h6>
        <p className="font-sm text-gray-700">Add this item to the package</p>
        <div className="d-flex mb-2 pb-1">
          <div className="mr-3">
            <input
              type="checkbox"
              name="pack"
              id={`${props.accessoryPackage.packageID}-leather-yes`}
              checked={!!value?.productID}
              onChange={(e) => onLetherSelected(e.target.checked)}
            />
            <label htmlFor={`${props.accessoryPackage.packageID}-leather-yes`}>
              Yes
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="pack"
              id={`${props.accessoryPackage.packageID}-leather-no`}
              checked={!value?.productID}
              onChange={(e) => onLetherSelected(!e.target.checked)}
            />
            <label htmlFor={`${props.accessoryPackage.packageID}-leather-no`}>
              No
            </label>
          </div>
        </div>
        {!!value?.productID && (
          <div className="col-md-12 col-sm-12 col-12 px-0">
            <select
              className="form-control rounded font-sm"
              value={value?.productID || ""}
              onChange={(e) =>
                setAccessoryPackageOptions({
                  ...accessoryPackageOptions,
                  leatherAccessory: e.target.value
                    ? leatherAccessories?.find(
                        (acc) => acc.productID?.toString() === e.target.value
                      )
                    : undefined,
                })
              }
            >
              <option value={""}>Select Leather</option>
              {leatherAccessories.map((acc) => (
                <option value={acc.productID} key={acc?.productID}>
                  {acc.productTitle}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="border-bottom pb-3 pt-3">
        <button
          className="btn btn-outline-primary px-lg-4 px-2 mb-sm-0 mb-1 font-weight-semibold align-self-sm-center btn-sm py-2"
          onClick={() => props.onPopupCancel}
        >
          Cancel
        </button>
        <button
          className="ml-2 btn btn-primary mr-lg-2 mr-1 px-lg-4 px-2 mb-sm-0 mb-1 font-weight-semibold align-self-sm-center btn-sm py-2"
          disabled={!isTintValid()}
          onClick={() => onSubmit(!props.selectedAccessoryPackage?.packageID)}
        >
          Save
        </button>
      </div>
    );
  };

  const renderAdditionalAccessories = () => {
    const additionalAccessories = props.accessoryPackage?.accessories?.filter(
      (acc) =>
        (!props.accessoryPackage.tintAvailable ||
          acc.componentCode !== props.accessoryPackage.tint?.componentCode) &&
        (!props.accessoryPackage.leatherPreferance ||
          acc.componentCode !==
            props.accessoryPackage.leatherPreferanceComponentCode)
    );
    return (
      <>
        {additionalAccessories.map((acc) => (
          <ul
            className="font-normal border-bottom py-2 px-3 font-weight-semibold"
            key={acc?.productID}
          >
            <li className="py-1">{acc.productTitle}</li>
          </ul>
        ))}
      </>
    );
  };

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
                    <h2 className="display-4 mb-3">
                      {props.accessoryPackage.packageName}
                    </h2>
                    <h2 className="display-4 mb-4">
                      {originalPrice === offerPrice ? (
                        <span className="font-lg font-weight-bold">
                          {`KWD ${numberWithCommas(originalPrice)}`}
                        </span>
                      ) : (
                        <span className="font-lg font-weight-bold">
                          <del>{`KWD ${numberWithCommas(originalPrice)}`}</del>{" "}
                          {offerPrice === 0 ? (
                            <span className="text-warning">Free</span>
                          ) : (
                            `KWD ${numberWithCommas(offerPrice)}`
                          )}
                        </span>
                      )}
                    </h2>
                    {(!!leatherAccessories?.length ||
                      !!tintAccessories?.length) && (
                      <button
                        className={`${
                          !!props.selectedAccessoryPackage?.packageID
                            ? " btn-primary-no-hover"
                            : " btn-outline-secondary-no-hover "
                        } btn btn-block text-uppercase mb-2`}
                        disabled={!isTintValid()}
                        onClick={() =>
                          onSubmit(!props.selectedAccessoryPackage?.packageID)
                        }
                      >
                        <i
                          className={`icon-tick-round font-lg mr-2 align-text-bottom ${
                            !!props.selectedAccessoryPackage?.packageID
                              ? ""
                              : "text-gray-400"
                          }`}
                        ></i>
                        {!!props.selectedAccessoryPackage?.packageID
                          ? "Remove"
                          : "select"}{" "}
                      </button>
                    )}

                    <p className="font-xs mb-4 font-italic">
                      *Choose the Tinting Option and Option for Product &quot;
                      Name &quot; before to proceed
                    </p>
                    <div className="text-center">
                      <a
                        className="font-normal font-weight-bold text-decoration-underline"
                        onClick={() => props.onPopupCancel()}
                      >
                        Back to Build
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-12">
                  <div className="pl-3">
                    <h5 className="border-bottom font-weight-normal pb-3 mb-3">
                      Included Accessories
                    </h5>
                    <div className="accessory-scroll">
                      <div className="border-bottom mb-3">
                        <div className="row">
                          <div className="col-md-3 col-2">
                            {props.accessoryPackage.packageImage && (
                              <Image
                                src={props.accessoryPackage.packageImage}
                                className="img-fluid"
                                alt="Window Filmff"
                                width={346}
                                height={248}
                              />
                            )}
                          </div>
                          <div className="col-md-9 col-10 pb-2">
                            {props.accessoryPackage.tintAvailable &&
                              !!tintAccessories?.length &&
                              renderTintSelection()}
                            {props.accessoryPackage.leatherPreferance &&
                              !!leatherAccessories?.length &&
                              renderLeatherOptions()}

                            {renderAdditionalAccessories()}
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
      addToCart: CartActions.addToCart,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(AccessoryPopUp);
