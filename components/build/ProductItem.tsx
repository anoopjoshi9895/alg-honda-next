import React from "react";
import {
  numberWithCommas,
  BuildPriceProductModel,
  ProductModelItemModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/router";
import { RouteKeys } from "../../utils/route-keys";
import Image from "next/image";
interface CustomProps {
  product: ProductModelItemModel;
  // modelYear: number;
  onFinanceSelect: any;
  onTestDriveSelect: any;
}
const ProductItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const router = useRouter();

  const onProductClick = async () => {
    router.push(
      `${RouteKeys.TrimLEvel.replace(":modelCode", props.product.modelCode)}`
    );
  };
  return (
    <div className="productBox px-3">
      <figure className="d-flex align-items-center justify-content-center mb-md-4 mb-3 position-relative">
        {/* <Link
          to={`/${lang}${RouteKeys.TrimLEvel.replace(':year', '2020').replace(
            ':modelCode',
            props.product.modelCode
          )}`}
        > */}
        <Image
          src={props.product?.productImage}
          className="img-fluid zIndex-1 w-100"
          alt={props.product?.productTitle}
          onClick={() => onProductClick()}
          width={278}
          height={156}
        />
        {/* </Link> */}
      </figure>
      <figcaption className="">
        <h6 className="text-uppercase mb-2 pb-1 font-base text-center">
          {props.product.productTitle}
        </h6>
        <div className="d-flex align-items-center mb-4 flex-column">
          <p className="font-xs text-muted mb-2 text-uppercase">
            {t("common.starting_at")}
          </p>
          <h6 className="mb-0 font-base font-weight-semibold">
            {props.product.productCurrency}{" "}
            {numberWithCommas(props.product.productPrice)}
          </h6>
        </div>

        <span
          onClick={() => onProductClick()}
          className="btn btn-primary text-uppercase font-weight-bold font-normal position-relative productBox__select text-white btn-block px-3"
        >
          {t("common.Build Your Honda")}
        </span>
      </figcaption>
    </div>
  );
};

export default ProductItem;
