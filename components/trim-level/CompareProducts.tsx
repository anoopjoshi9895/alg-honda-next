import {
  BankDetailsModel,
  bankListActions,
  BankListStateModel,
  CartActions,
  CompareAttributeViewModel,
  CompareVarientProductModel,
  ProductDetailsActions,
  numberWithCommas,
} from "alg-ecom-frontend-core";
import React, { useContext } from "react";
// import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import ReactHtmlParser from "react-html-parser";
import { decode } from "html-entities";
import Slider from "react-slick";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteKeys } from "../../utils/route-keys";
import { useRouter } from "next/router";
import {
  EqualHeight,
  EqualHeightContext,
  EqualHeightElement,
} from "react-equal-height/clean";
import Image from "next/image";

const compareProductSlider = {
  key: "compare-product-slider",
  className: "d-block w-100 compare-slider",
  arrows: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface CustomProps {
  products: CompareVarientProductModel[];
  clearCart: typeof CartActions.clearCart;
  clearProductDetails: typeof ProductDetailsActions.clearProductDetails;
  banks: BankListStateModel;
  getBankList: typeof bankListActions.getBankList;
}
const CompareProducts: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locales, locale: lang } = router;
  // const { lang, modelId } = useParams<{
  //   lang: string;
  //   modelId: string;
  // }>();
  const [accordion, setAccordion] = React.useState<string>("");
  const [selectedBank, setSelectedBank] = React.useState<
    BankDetailsModel | undefined
  >(undefined);
  const [compare, setCompare] =
    React.useState<[{ attName: string; attOpt: [] }]>();
  const [check, setCheck] = React.useState<boolean>(false);
  // const location = useLocation();

  const onProductClick = async (id: number) => {
    await props.clearProductDetails();
    props.clearCart(() => {
      if (location.pathname.indexOf("motorcycle") === -1) {
        router.push(`${RouteKeys.BuildVehicle.replace(":id", `${id}`)}`);
      } else {
        router.push(
          `${RouteKeys.MotorCycleBuildVehicle.replace(":id", `${id}`)}`
        );
      }
    });
  };

  const attributeList = (products: any) => {
    const NewArray: any = [];
    products.forEach((product: any) => {
      product.attributes.forEach((attrGroup: any, index: number) => {
        const obj: any = {};
        if (!NewArray.hasOwnProperty(attrGroup.attributeGroupName)) {
          obj[`${attrGroup?.attributeGroupName}`] = [];
        }
        const attrList: any = [];
        attrGroup.attrOptions.forEach((attr: any) => {
          const foundList = attrList.some(
            (val: any) => val.attributes === attr.attrName
          );
          if (!foundList) {
            attrList.push(attr.attrName);
          }
        });
        NewArray[index] = {
          attName: attrGroup?.attributeGroupName,
          attOpt: attrList,
        };
      });
    });
    setCompare(NewArray);
    setCheck(true);
  };

  React.useEffect(() => {
    // if (props.banks?.financeList?.length !== 0) {
    props.getBankList();
    // }

    attributeList(props.products);
  }, []);
  React.useEffect(() => {
    if (props.banks?.financeList?.length > 0) {
      const bank = props.banks.financeList?.find(
        (item) => item.bankName === "Almana"
      );
      if (bank) {
        setSelectedBank(bank);
      }
    }
  }, [props.banks]);

  const getVal = (v1: any, v2: any) => {
    const value = v2.attrOptions.find((val: any) => val.attrName === v1);
    const content = value?.attrOptValue ? value?.attrOptValue : "-";
    return ReactHtmlParser(decode(content.toString()));
  };

  // const { setForceUpdate } = useContext(EqualHeightContext ?? "");
  // const handleImage = () => {
  //   setForceUpdate((value: boolean) => !value);
  // };
  const isBrowser =
    typeof window !== "undefined" && typeof window.document !== "undefined";
  return (
    <>
      {isBrowser && (
        <EqualHeight>
          <div className="col-sm-3 col-4">
            <EqualHeightElement name="product">
              <h5 className="text-uppercase font-weight-bold mb-2 pt-4">
                {t("compare.Trims & Specs")}
              </h5>
              <h6 className="text-uppercase mb-lg-5 mb-0 font-normal text-uppercase position-sticky left-0 d-inline-block">
                {t("compare.Model Series")}
              </h6>
            </EqualHeightElement>

            {check === true && (
              <>
                {compare?.map((group: any) => {
                  return (
                    <>
                      <EqualHeightElement name={group.attName}>
                        <div
                          className="font-base font-weight-semibold text-gray-900 py-3 cursor-pointer px-lg-0 px-3 border-top compare-accord-head d-flex"
                          onClick={() => {
                            group.attName === accordion
                              ? setAccordion("")
                              : setAccordion(group.attName);
                          }}
                        >
                          <i className="icon-chevron-down font-xxxs mr-3"></i>
                          {ReactHtmlParser(decode(group.attName.toString()))}
                        </div>
                      </EqualHeightElement>
                      {check === true && accordion === group.attName && (
                        <>
                          {group.attOpt.map((attribute: any, index: number) => {
                            return (
                              <EqualHeightElement
                                key={"equal-height-" + index}
                                name={attribute}
                              >
                                <div
                                  className={`font-normal py-3 px-3 px-lg-2 px-3 d-block h-100 ${index % 2 ? "bg-white" : "bg-gray-100"
                                    }`}
                                >
                                  {ReactHtmlParser(
                                    decode(attribute.toString())
                                  )}
                                </div>
                              </EqualHeightElement>
                            );
                          })}
                        </>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </div>
          <div className="col-sm-9 col-8">
            <Slider
              {...compareProductSlider}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {props.products.map((product, index) => {
                return (
                  <div key={index}>
                    <EqualHeightElement name="product">
                      <div
                        className={`position-relative px-0 pr-1 pb-4 d-flex flex-wrap h-100 ${lang === "en"
                          ? "justify-content-start"
                          : "justify-content-end"
                          }`}
                      >
                        <div className="compare-car-name bg-gray-200 py-2 mb-2 d-flex align-items-center justify-content-center col-12 px-0">
                          <Image
                            src={
                              product.productImage !== ""
                                ? product.productImage
                                : ""
                            }
                            className="img-fluid img-cover bottom-0 left-0"
                            alt={product.productTitle}
                            width={230}
                            height={130}
                          />
                        </div>
                        <h6 className="font-lg text-uppercase mb-2 font-weight-semibold pt-1 col-12 px-0">
                          {product.productTitle}
                        </h6>
                        <div
                          className={`d-flex align-items-baseline mb-2 pb-1 col-12 px-0 ${lang === "en"
                            ? "justify-conent-start"
                            : "justify-content-end"
                            }`}
                        >
                          <p className="font-xs text-muted mb-0 mx-1">
                            {t("common.starting_at")}
                          </p>
                          <p className="font-normal text-gray-900 mb-0 font-weight-bold">
                            {`${product.productCurrency} ${numberWithCommas(product.offerPrice).split(".")[0]
                              }`}
                            <sup>*</sup>
                          </p>
                        </div>

                        {/* <div className="d-flex align-items-baseline mb-2 pb-1">
                        <p className="font-xs text-muted mb-0 mr-1">
                          {t('build_vehicle.monthly_payment')}
                        </p>
                        {selectedBank && (
                          <p className="font-normal text-gray-900 mb-0 font-weight-bold">
                            {`${product.productCurrency} ${calcMonthlyPayment(
                              product.offerPrice
                            )?.toFixed(2)}`}
                            <sup>*</sup>
                          </p>
                        )}
                      </div> */}

                        <button
                          className="btn btn-sm btn-trim text-uppercase font-normal mt-auto d-flex"
                          onClick={() => onProductClick(product.productID)}
                        >
                          <span className="">
                            {t("common.select")}
                            <i
                              className={`icon-chevron-right icon-flip-rtl font-xxxs d-lg-inline-flex d-none ${lang === "en" ? "ml-2 pl-1" : "mr-2 pr-1"
                                }`}
                            ></i>
                          </span>
                        </button>
                      </div>
                    </EqualHeightElement>
                    {product.attributes.map((attributeGroup, productIdx) => {
                      return (
                        <>
                          <EqualHeightElement
                            name={attributeGroup.attributeGroupName}
                            key={productIdx}
                          >
                            <div className="font-base font-weight-semibold text-gray-900 py-3 cursor-pointer px-lg-0 px-3 border-top h-100">
                              {" "}
                            </div>
                          </EqualHeightElement>
                          {check === true &&
                            accordion === attributeGroup.attributeGroupName && (
                              <>
                                {compare &&
                                  compare[productIdx]?.attOpt?.map(
                                    (attr: any, compareIdx: number) => {
                                      return (
                                        <EqualHeightElement
                                          name={attr}
                                          key={compareIdx}
                                        >
                                          <div
                                            className={`font-normal py-3 px-3 px-lg-2 px-3 d-block h-100 ${compareIdx % 2
                                              ? "bg-white"
                                              : "bg-gray-100"
                                              }`}
                                          >
                                            {getVal(attr, attributeGroup)}
                                          </div>
                                        </EqualHeightElement>
                                      );
                                    }
                                  )}
                              </>
                            )}
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </Slider>
          </div>
        </EqualHeight>
      )}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      clearCart: CartActions.clearCart,
      clearProductDetails: ProductDetailsActions.clearProductDetails,
      getBankList: bankListActions.getBankList,
    },
    dispatch
  );
};

const mapStateToProps = (state: any) => {
  return {
    banks: state.bankState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CompareProducts);
