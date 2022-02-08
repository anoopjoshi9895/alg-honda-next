import React from "react";
import { connect } from "react-redux";
import {
  numberWithCommas,
  CampaignModel,
  AccessoryPackages,
  ProductDetailsStateModel,
  CartStateModel,
  CartActions,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";
import { decode } from "html-entities";
import ReactModal from "react-modal";
import { getAppliedDiscount, onSingleAccessoryPackageSelect } from "../utils";
import AccessoryPackagesPopUp from "./AccessoryPackagesPopUp";
import cloneDeep from "lodash/cloneDeep";
import { bindActionCreators } from "redux";
import { RootState } from "../../../app/store";
import Image from "next/image";

export const customStyles: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "auto",
    maxWidth: "1130px",
    width: "100%",
    border: "0",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
    padding: "0",
    margin: "20px auto",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "auto",
  },
};

interface CustomProps {
  accessory: AccessoryPackages;
  onChange: any;
  isLoading: boolean;
  campaigns?: CampaignModel[];
  productData: ProductDetailsStateModel;
  basePrice?: number;
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
}
const AccessoryPackagesItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();

  const [accessoryPopup, setAccessoryPopup] = React.useState<boolean>(false);

  const selectedAccessoryPackage = props?.cartData?.accessoryPackages?.find(
    (ap) => ap.packageID?.toString() === props.accessory?.packageID?.toString()
  );

  const selectedID = selectedAccessoryPackage?.packageID!;

  const discountData = getAppliedDiscount(
    props?.productData,
    props?.basePrice || 0,
    "accessorypackages",
    { productID: props.accessory?.packageID },
    props?.campaigns,
    props?.cartData
  );

  const originalPrice = discountData.originalPrice;
  const offerPrice = discountData.originalPrice - discountData.discount;

  const leatherAccessories =
    props.accessory.leatherPreferance &&
    props.accessory.leatherPreferanceComponentCode
      ? props.accessory?.accessories?.filter(
          (acc) =>
            acc.componentCode === props.accessory.leatherPreferanceComponentCode
        )
      : [];

  const tintAccessories = props.accessory?.tintAvailable
    ? props.accessory.accessories?.filter(
        (acc) => acc.componentCode === props.accessory.tint?.componentCode
      )
    : [];

  const onChange = async (selected: boolean) => {
    if (selected) {
      if (!leatherAccessories?.length && !tintAccessories?.length) {
        const cart: CartStateModel = cloneDeep(props.cartData);
        const config = onSingleAccessoryPackageSelect(
          props.accessory,
          true,
          cart,
          props?.productData
        );
        if (config) {
          await props.addToCart(config);
        }
      } else {
        setAccessoryPopup(true);
      }
    } else {
      if (!leatherAccessories?.length && !tintAccessories?.length) {
        const cart: CartStateModel = cloneDeep(props.cartData);
        const config = onSingleAccessoryPackageSelect(
          props.accessory,
          false,
          cart,
          props?.productData
        );

        if (config) {
          await props.addToCart(config);
        }
      } else {
        setAccessoryPopup(true);
      }
    }
  };

  const renderAccessoryModal = () => {
    return (
      <ReactModal
        isOpen={accessoryPopup}
        contentLabel="Accessory Popup"
        className=""
        style={customStyles}
        onRequestClose={() => setAccessoryPopup(false)}
        shouldCloseOnOverlayClick={true}
      >
        <AccessoryPackagesPopUp
          onPopupCancel={() => setAccessoryPopup(false)}
          accessoryPackage={props.accessory}
          discountData={discountData}
          productData={props.productData}
          cartData={props.cartData}
          selectedAccessoryPackage={selectedAccessoryPackage}
        />
      </ReactModal>
    );
  };

  return (
    <>
      <div className="col-sm-6 col-12 mb-4 accessories-inner">
        <div className="item pr-xl-4">
          <div className="figure position-relative w-100 bg-light">
            {props.accessory?.packageImage && (
              <Image
                src={props.accessory?.packageImage}
                className="img-fluid img-cover w-100"
                alt={props.accessory?.productTitle}
                width={346}
                height={248}
              />
            )}

            <div
              className={`custom-checkbox ${
                props.isLoading && selectedID === props.accessory.packageID
                  ? "loading"
                  : ""
              } ${
                props.isLoading && selectedID !== props.accessory.packageID
                  ? "disable"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                id={`${props.accessory.packageID}`}
                name="radio"
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
                checked={!!selectedAccessoryPackage}
              />
              <label htmlFor={`${props.accessory.packageID}`}></label>
            </div>
          </div>
          <div className="figcaption py-3 mt-1">
            <h6 className="font-weight-bold my-2 pb-1">
              {ReactHtmlParser(decode(props.accessory?.packageName), {
                decodeEntities: true,
              })}
            </h6>
            {originalPrice === offerPrice ? (
              <span className="font-lg text-heading">
                {`KWD ${numberWithCommas(originalPrice)}`}
              </span>
            ) : (
              <span className="font-lg text-heading">
                <del>{`KWD ${numberWithCommas(originalPrice)}`}</del>{" "}
                {offerPrice === 0 ? (
                  <span className="text-primary">
                    {t("build_vehicle.Free")}
                  </span>
                ) : (
                  `KWD ${numberWithCommas(offerPrice)}`
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      {renderAccessoryModal()}
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AccessoryPackagesItem);
