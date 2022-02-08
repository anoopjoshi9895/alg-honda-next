import React from 'react';
import {
  numberWithCommas,
  BuildPriceProductModel,
  ProductModelItemModel,
} from 'alg-ecom-frontend-core';
import { useTranslation } from 'react-i18next';
interface CustomProps {
  product: ProductModelItemModel;
  onClick: any;
  price: string;
}
const ProductItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const onProductClick = () => {
    props.onClick(props.product.modelCode);
  };
  return (
    <div className="productBox col-12 border-top">
      <figure className="d-flex align-items-center justify-content-center m-0 position-relative">
        {/* <Link to={`/trim-level/${props.modelYear}/${props.product.modelCode}/`}> */}
        <img
          src={
            props.product.productImage !== ''
              ? props.product.productImage
              : '/assets/images/product/car.png'
          }
          className="img-fluid position-relative zIndex-1 w-100"
          alt=""
        // onClick={() => onProductClick()}
        />
        {/* </Link> */}
      </figure>
      <figcaption className="mb-0 text-center">
        <h4 className="text-uppercase mb-3 font-base">
          {props.product.productTitle}
        </h4>
        <div className=" mb-3">
          <p className="font-xs text-muted mb-1 text-uppercase letter-spacing">
            {t('common.starting_at')}
          </p>
          <h6 className="mb- font-weight-normal letter-spacing">
            {props.price}
            {/* {' '}
            {numberWithCommas(props.product.productPrice).split('.')[0]} */}
          </h6>
        </div>

        <button
          onClick={() => onProductClick()}
          className="btn btn-primary  font-weight-bold font-md position-relative px-5 productBox__select"
        >
          {t('popup.Explore')}
        </button>
      </figcaption>
    </div>
  );
};

export default ProductItem;
