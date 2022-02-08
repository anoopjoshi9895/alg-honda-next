import React from 'react';
import {
  numberWithCommas,
  TrimVarientProductModel,
  BuildPriceProductModel,
  CartActions,
  ProductDetailsActions,
} from 'alg-ecom-frontend-core';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { RootState } from "../../../app/store";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
interface CustomProps {
  product: TrimVarientProductModel;
  isSelected: boolean;
  onItemClick: any;
  year: number;
  modelCode: string;
}

const ProductItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const onProductClick = async (id: number, image: string) => {
    props.onItemClick();
    // await props.clearCart();
    // await props.clearProductDetails();
    // if (
    //   props.product.trimCode === undefined ||
    //   props.product.trimCode === null ||
    //   props.product.trimCode === ''
    // ) {
    //   history.push(`/build-vehicle/${props.product.productID}`);
    // } else {
    //   history.push(
    //     `/edition/${props.year}/${props.modelCode}/${props.product.trimCode}`
    //   );
    // }
  };
  return (
    <>
      <div
        className={classnames({
          'pb-0 trim-level-products col-lg-12 col-sm-6 col-12 px-lg-0 px-0 mb-lg-0 mb-5':
            true,
          active: props.isSelected,
        })}
      >
        <div className="px-3">
          <div className="row">
            <div className="col-12">
              <div className="trim-image position-relative mx-auto text-center  mb-3">
                <img
                  src={
                    props.product.productImage !== ''
                      ? props.product.productImage
                      : 'assets/images/product/car.png'
                  }
                  className="img-fluid mx-auto"
                  alt=""
                />
              </div>
            </div>
            <div className="col-12">
              <div className="trim-content ml-md-5 d-flex flex-column">
                <h4 className="text-uppercase mb-3 font-base">
                  {props.product.productTitle}
                </h4>

                <div className="d-flex align-items-center mb-4">
                  <p className="font-xs text-muted mb-0 mr-1 text-uppercase">
                    {t('common.starting_at')}
                  </p>
                  <h6 className="mb-0">{`${props.product.productCurrency
                    } ${numberWithCommas(props.product.offerPrice)}`}</h6>
                  <span className="tooltip position-relative">
                    <i className="icon-info-sm font-sm text-muted ml-1 cursor-pointer"></i>
                    <div className="tooltip-content font-weight-normal text-muted font-normal position-absolute border border-secondary bg-white zIndex-1 px-3 py-4">
                      {t('build_vehicle.net_price_popupText')}
                    </div>
                  </span>
                </div>

                <div className="align-items-lg-center trim-footer zIndex-1 bottom-0 left-0 w-100 pt-1">
                  <button
                    // to={`/build-vehicle/${props.product.productID}`}
                    onClick={() =>
                      onProductClick(
                        props.product.productID,
                        props.product.previewImage
                      )
                    }
                    className="btn btn-primary  px-4 font-normal"
                  >
                    <span className="px-lg-4 px-3 text-capitalize">{t('common.select')}</span>
                  </button>
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
      clearCart: CartActions.clearCart,
      clearProductDetails: ProductDetailsActions.clearProductDetails,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(ProductItem);
