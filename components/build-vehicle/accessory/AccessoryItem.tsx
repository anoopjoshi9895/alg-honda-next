import React from "react";
import {
  numberWithCommas,
  AccessoriesModelBV,
  CampaignModel,
  TintDetailsModelCart,
  CartStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";
import { decode } from "html-entities";
import ReactModal from "react-modal";
import AccessoryPopUp from "./AccessoryPopUp";
import { isProductExcludedFromCampaign, EcomProductType } from "../utils";
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
  accessory: AccessoriesModelBV;
  onChange: any;
  isSelected: boolean;
  isLoading: boolean;
  selectedID?: number;
  campaigns?: CampaignModel[];
  cartData: CartStateModel;
}
const AccessoryItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const [accessoryPopup, setAccessoryPopup] = React.useState<boolean>(false);
  // const onChange = (selected: number) => {
  //   props.onChange(props.accessory, selected);
  // };

  const onChange = () => {
    if (props.isSelected) {
      props.onChange(props.accessory);
    } else {
      if (
        props.accessory.tintAvailable === "Yes" &&
        props.accessory.checkRows === "Yes"
      ) {
        setAccessoryPopup(true);
      } else {
        props.onChange(props.accessory);
      }
    }
  };

  const selectedID = props.selectedID;
  const onSelect = async (tint: TintDetailsModelCart) => {
    await props.onChange(props.accessory, tint);
    setAccessoryPopup(false);
  };

  const appliedItems = props?.campaigns?.[0]?.appliedItems?.find(
    (x) =>
      x.productType === "accessories" &&
      x.productID === props?.accessory?.productID
  );

  let discount = 0;
  if (appliedItems) {
    discount =
      (appliedItems?.campDiscountType === "percentage"
        ? (props.accessory.salesPrice * appliedItems.campDiscountValue) / 100
        : appliedItems.campDiscountValue) || 0;
  }
  const salesPrice = props.accessory.salesPrice - discount;

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
        <AccessoryPopUp
          onPopupCancel={() => setAccessoryPopup(false)}
          accessory={props.accessory}
          onSelect={onSelect}
          discount={discount}
        />
      </ReactModal>
    );
  };

  const isExcludedInCampaign = isProductExcludedFromCampaign(
    EcomProductType.Accessories,
    props.accessory.productID,
    props.cartData!
  );

  return (
    <>
      <div className="col-sm-6 col-12 mb-4 accessories-inner">
        <div className="item pr-xl-4">
          <div className="figure position-relative w-100 bg-light">
            {props?.accessory?.productType === "Genuine" && (
              <div className="position-absolute right-0 top-0 p-2">
                <div className="d-inline-flex align-items-center font-xxxs text-uppercase px-3 py-2 text-primary bg-white rounded-pill">
                  {props.accessory?.productType}
                </div>
              </div>
            )}
            <Image
              src={props.accessory?.productImage}
              className="img-fluid img-cover w-100"
              alt={props?.accessory?.productTitle}
              width={346}
              height={248}
            />
            {/* <div className="custom-checkbox">
              <input
                type="checkbox"
                id={`${props.accessory?.productID}`}
                name="radio"
                onChange={() => onChange()}
                checked={props.isSelected}
              />
              <label htmlFor={`${props.accessory?.productID}`}></label>
            </div> */}
            <div
              className={`custom-checkbox ${
                props.isLoading &&
                props.selectedID === props.accessory.productID
                  ? "loading"
                  : ""
              } ${
                props.isLoading &&
                props.selectedID !== props.accessory.productID
                  ? "disable"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                id={`${props.accessory.productID}`}
                name="radio"
                // onChange={() => {
                //   onChange(props.accessory.productID);
                // }}
                onChange={() => {
                  onChange();
                }}
                checked={props.isSelected}
              />
              <label htmlFor={`${props.accessory.productID}`}></label>
            </div>
          </div>
          <div className="figcaption py-3 mt-1">
            <h6 className="font-weight-bold my-2 pb-1">
              {ReactHtmlParser(decode(props.accessory?.productTitle), {
                decodeEntities: true,
              })}
            </h6>
            <span className="font-lg text-heading">
              {props.accessory.salesPrice === salesPrice ? (
                <span className="font-base">
                  {`${props.accessory.productCurrency} ${numberWithCommas(
                    props.accessory.salesPrice
                  )}`}
                </span>
              ) : (
                <span className="font-base">
                  <del>
                    {`${props.accessory.productCurrency} ${numberWithCommas(
                      props.accessory.salesPrice
                    )}`}
                  </del>{" "}
                  {salesPrice === 0 ? (
                    <span className="text-primary">Free</span>
                  ) : (
                    `${props.accessory.productCurrency} ${numberWithCommas(
                      salesPrice
                    )}`
                  )}
                  {!isExcludedInCampaign ? (
                    <span className="d-inline-block px-1 bg-secondary text-white text-uppercase font-xxxs font-weight-bold ml-2 insurance-tag letter-spacing align-middle">
                      {t("build_vehicle.Included")}
                    </span>
                  ) : (
                    <span className="d-inline-block px-1 bg-secondary text-white text-uppercase font-xxxs font-weight-bold ml-2 insurance-tag letter-spacing align-middle">
                      {t("build_vehicle.Excluded In Campaign")}
                    </span>
                  )}
                </span>
              )}
            </span>
            {/* <div className="font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              tempor euismod nunc
            </div> */}
          </div>
        </div>
      </div>
      {renderAccessoryModal()}
    </>
  );
};

export default AccessoryItem;
