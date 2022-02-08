import {
  CompareVarientProductModel,
  CartActions,
  ProductDetailsActions,
} from "alg-ecom-frontend-core";
import React from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Image from "next/image";

interface CustomProps {
  products: CompareVarientProductModel[];
  clearCart: typeof CartActions.clearCart;
  clearProductDetails: typeof ProductDetailsActions.clearProductDetails;
  topSlider: (e: any) => void;
  bottomSlider: any;
}
const Products: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const { t } = useTranslation();
  const onTabChange = (tab: string) => {
    // props.onTabChange(tab);
  };
  // const { lang, modelId } = useParams<{
  //   lang: string;
  //   modelId: string;
  // }>();
  // const history = useHistory();
  const onProductClick = async (id: number) => {
    await props.clearProductDetails();
    // props.clearCart(() => {
    //   history.push(`/${lang}${RouteKeys.BuildVehicle.replace(':id', `${id}`)}`);
    // });
  };

  // React.useEffect(() => {
  //   props.topSlider(_topSlider);
  // }, [_topSlider]);

  return (
    <>
      <div className="col-lg-9 col-12">
        <div className="row row-compare no-gutters flex-nowrap w-100">
          {props.products && (
            <>
              {/* // <Slider
            //   {...compareProductSlider}
            //   swipeToSlide={true}
            //   focusOnSelect={true}
            //   asNavFor={props.bottomSlider}
            //   ref={(slider) => {
            //     _topSlider = slider;
            //     props.topSlider(slider);
            //     // slider?.slickGoTo(0)
            //   }}
            // > */}
              {props.products.map((item, index) => {
                return (
                  <div
                    key={"product-key" + index}
                    className="col px-0 compare-car d-flex flex-column"
                  >
                    <div className="position-relative px-0">
                      <div className="compare-car-name bg-gray-200 p-2 mb-2 d-flex align-items-center justify-content-center">
                        <Image
                          src={item.productImage}
                          alt={item.productTitle}
                          className="img-fluid img-cover bottom-0 left-0"
                          width={230}
                          height={130}
                        />{" "}
                      </div>
                      <h6 className="font-lg text-uppercase mb-2 font-weight-semibold pt-1">
                        {item.productTitle}
                      </h6>
                      <div className="d-flex align-items-baseline mb-2 pb-1">
                        <p className="font-xs text-muted mb-0 mr-1">
                          {t("common.starting_at")}
                        </p>
                        <p className="font-normal text-gray-900 mb-0 font-weight-bold">
                          {`${item.productCurrency} ${item.offerPrice}`}
                          <sup>*</sup>
                        </p>
                      </div>
                    </div>
                    <div className="pl-lg-0 pl-3">
                      <button
                        className="btn btn-sm btn-trim text-uppercase font-normal"
                        onClick={() => onProductClick(item.productID)}
                      >
                        <span className="">
                          select
                          <i className="icon-chevron-right icon-flip-rtl ml-2 pl-1 font-xxxs d-lg-inline-flex d-none"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* </Slider> */}
            </>
          )}
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

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(Products);
