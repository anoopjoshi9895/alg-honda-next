import React from "react";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";
import { decode } from "html-entities";
import {
  EqualHeight,
  EqualHeightContext,
  EqualHeightElement,
} from "react-equal-height/clean";
import Slider from "react-slick";

interface CustomProps {
  onPopupCancel: any;
}
const ExtraAddonPopup: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const addonSlider = {
    key: "addon-slider",
    className: "addon-slider",
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: false,
    afterChange: (index: any) => setAddonSliderIndex(index + 1),
    responsive: [
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
  const [addonSliderIndex, setAddonSliderIndex] = React.useState(1);
  let addonSliderRef: any = React.useRef<any>();
  const nextServiceSlide = () => {
    addonSliderRef.slickNext();
  };
  const prevServiceSlider = () => {
    addonSliderRef.slickPrev();
  };
  return (
    <>
      <div className="m-0 h-100">
        <div className="modal-content rounded-0 h-100 overflow-auto">
          <div className="modal-body p-4">
            <div className="row">
              <div className="col-sm col-12">
                <h3 className="mb-sm-4 mb-2 pr-sm-0 pr-5">
                  Premium Package AddOns
                </h3>
              </div>
              <div className="col-sm-auto col-12 d-flex align-items-start justify-content-end pr-sm-5 pr-0 mb-sm-0 mb-2">
                <div
                  className="border service-arrows d-inline-flex justify-content-center align-items-center cursor-pointer mr-2"
                  onClick={() => prevServiceSlider()}
                >
                  <i className="icon-chevron-left icon-flip-rtl pointer-none"></i>
                </div>
                <div
                  className="border service-arrows d-inline-flex justify-content-center align-items-center cursor-pointer mr-3"
                  onClick={() => nextServiceSlide()}
                >
                  <i className="icon-chevron-right icon-flip-rtl pointer-none"></i>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="position-absolute right-0 top-0 zIndex-1 font-sm bg-gray-200 rounded-circle border-0 p-3 m-3 d-inline-block"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.onPopupCancel()}
            >
              <i className="icon-close text-muted"></i>
            </button>
            <div className="row">
              <div className="d-inline-block w-100">
                <EqualHeight>
                  <Slider
                    ref={(slider) => (addonSliderRef = slider)}
                    {...addonSlider}
                  >
                    <div className="col-12">
                      {/* <div className="col-12"> */}
                      <EqualHeightElement name="title">
                        <div className="col p-0 insurance-feature-block title">
                          <div className="position-relative">
                            {/* <img
                      src={props.service.productImage}
                      className="img-fluid w-100 img-clip img-cover"
                      alt="Silver"
                    /> */}
                          </div>
                        </div>
                      </EqualHeightElement>
                      <div className="font-normal mb-5 d-block border">
                        <EqualHeightElement name="package">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                            <div className="col insurance-feature-block">
                              {/* <div className="d-inline-block px-1 bg-primary text-white text-uppercase font-xxxs font-weight-bold mt-2 insurance-tag">
                  Included
                </div> */}
                              <h6 className="font-base font-weight-bold text-uppercase text-gray-900 mb-1 mt-1">
                                Roadside assistance 4 years
                              </h6>
                              <div className="font-xs text-gray-800 font-weight-semibold text-uppercase mb-3">
                                Minimum Premium KD 121
                              </div>
                              <div className="font-normal text-gray-700 font-weight-semibold">
                                Service Package Option:{" "}
                                <span className="text-gray-900">
                                  Premium Package
                                </span>
                              </div>
                            </div>
                          </div>
                        </EqualHeightElement>
                        <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                          <div className="col insurance-feature-block">
                            <p className="font-xs font-weight-semibold text-gray-800 mb-1">
                              Price
                            </p>
                            <h2 className="mb-0 text-primary font-weight-light pb-2">
                              Free of cost
                            </h2>
                          </div>
                        </div>
                        <EqualHeightElement name="detail">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                            <div className="col insurance-feature-block">
                              <p className="font-sm font-weight-bold mb-1">
                                Details
                              </p>
                              <div className="font-normal text-gray-700">
                                Because website security is important, HostGator
                                has provided you with a complimentary scanner
                                from SiteLock that proactively checks for
                                malware and vulnerabilities.{" "}
                                <span className="text-secondary">
                                  View More
                                </span>
                              </div>
                            </div>
                          </div>
                        </EqualHeightElement>
                        {[
                          {
                            featureName: "Year of warranty",
                            featureValue: "5 Years / 100k kms",
                          },
                        ].map((feat) => {
                          return (
                            <EqualHeightElement
                              name={feat.featureName}
                              key={feat.featureName}
                            >
                              <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                                <div className="col insurance-feature-block">
                                  <p className="font-xs font-weight-bold mb-1">
                                    {feat.featureName}
                                  </p>
                                  <div className="font-normal font-weight-semibold text-gray-700">
                                    {ReactHtmlParser(
                                      decode(feat.featureValue),
                                      {
                                        decodeEntities: true,
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                            </EqualHeightElement>
                          );
                        })}

                        <EqualHeightElement name="btnBlock">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                            <div className="col insurance-feature-block">
                              {/* <button className="btn btn-primary btn-block font-normal text-uppercase d-flex align-items-center justify-content-center insurance-btn">
                  <i className="icon-tick-round mr-1"></i>Select This Package
                </button> */}
                              <button
                                type="button"
                                disabled={false}
                                // className={`${props.isChoosen
                                //   ? ' btn-primary-no-hover'
                                //   : ' btn-outline-secondary-no-hover '
                                //   } btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold`}
                                className="btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold btn-primary-no-hover"
                                onClick={() => {
                                  //
                                }}
                              >
                                <i
                                  // className={`icon-tick-round font-lg mr-2 ${props.isChoosen ? '' : 'text-gray-400'
                                  //   }`}
                                  className={`icon-tick-round font-lg mr-2 text-gray-400`}
                                ></i>
                                Select This ADD-ONS
                              </button>
                            </div>
                          </div>
                        </EqualHeightElement>
                      </div>
                    </div>
                    <div className="col-12">
                      {/* <div className="col-12"> */}
                      <EqualHeightElement name="title">
                        <div className="col p-0 insurance-feature-block title">
                          <div className="position-relative">
                            {/* <img
                      src={props.service.productImage}
                      className="img-fluid w-100 img-clip img-cover"
                      alt="Silver"
                    /> */}
                          </div>
                        </div>
                      </EqualHeightElement>
                      <div className="font-normal mb-5 d-block border">
                        <EqualHeightElement name="package">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                            <div className="col insurance-feature-block">
                              {/* <div className="d-inline-block px-1 bg-primary text-white text-uppercase font-xxxs font-weight-bold mt-2 insurance-tag">
                  Included
                </div> */}
                              <h6 className="font-base font-weight-bold text-uppercase text-gray-900 mb-1 mt-1">
                                Roadside assistance 4 years
                              </h6>
                              <div className="font-xs text-gray-800 font-weight-semibold text-uppercase mb-3">
                                Minimum Premium KD 121
                              </div>
                              <div className="font-normal text-gray-700 font-weight-semibold">
                                Service Package Option:{" "}
                                <span className="text-gray-900">
                                  Premium Package
                                </span>
                              </div>
                            </div>
                          </div>
                        </EqualHeightElement>
                        <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                          <div className="col insurance-feature-block">
                            <p className="font-xs font-weight-semibold text-gray-800 mb-1">
                              Price
                            </p>
                            <h2 className="mb-0 text-primary font-weight-light pb-2">
                              Free of cost
                            </h2>
                          </div>
                        </div>
                        <EqualHeightElement name="detail">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                            <div className="col insurance-feature-block">
                              <p className="font-sm font-weight-bold mb-1">
                                Details
                              </p>
                              <div className="font-normal text-gray-700">
                                Because website security is important, HostGator
                                has provided you with a complimentary scanner
                                from SiteLock that proactively checks for
                                malware and vulnerabilities.{" "}
                                <span className="text-secondary">
                                  View More
                                </span>
                              </div>
                            </div>
                          </div>
                        </EqualHeightElement>
                        {[
                          {
                            featureName: "Year of warranty",
                            featureValue: "5 Years / 100k kms",
                          },
                        ].map((feat) => {
                          return (
                            <EqualHeightElement
                              name={feat.featureName}
                              key={feat.featureName}
                            >
                              <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                                <div className="col insurance-feature-block">
                                  <p className="font-xs font-weight-bold mb-1">
                                    {feat.featureName}
                                  </p>
                                  <div className="font-normal font-weight-semibold text-gray-700">
                                    {ReactHtmlParser(
                                      decode(feat.featureValue),
                                      {
                                        decodeEntities: true,
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                            </EqualHeightElement>
                          );
                        })}

                        <EqualHeightElement name="btnBlock">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                            <div className="col insurance-feature-block">
                              {/* <button className="btn btn-primary btn-block font-normal text-uppercase d-flex align-items-center justify-content-center insurance-btn">
                  <i className="icon-tick-round mr-1"></i>Select This Package
                </button> */}
                              <button
                                type="button"
                                disabled={false}
                                // className={`${props.isChoosen
                                //   ? ' btn-primary-no-hover'
                                //   : ' btn-outline-secondary-no-hover '
                                //   } btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold`}
                                className="btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold btn-primary-no-hover"
                                onClick={() => {
                                  //
                                }}
                              >
                                <i
                                  // className={`icon-tick-round font-lg mr-2 ${props.isChoosen ? '' : 'text-gray-400'
                                  //   }`}
                                  className={`icon-tick-round font-lg mr-2 text-gray-400`}
                                ></i>
                                Select This ADD-ONS
                              </button>
                            </div>
                          </div>
                        </EqualHeightElement>
                      </div>
                    </div>
                    <div className="col-12">
                      {/* <div className="col-12"> */}
                      <EqualHeightElement name="title">
                        <div className="col p-0 insurance-feature-block title">
                          <div className="position-relative">
                            {/* <img
                      src={props.service.productImage}
                      className="img-fluid w-100 img-clip img-cover"
                      alt="Silver"
                    /> */}
                          </div>
                        </div>
                      </EqualHeightElement>
                      <div className="font-normal mb-5 d-block border">
                        <EqualHeightElement name="package">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                            <div className="col insurance-feature-block">
                              {/* <div className="d-inline-block px-1 bg-primary text-white text-uppercase font-xxxs font-weight-bold mt-2 insurance-tag">
                  Included
                </div> */}
                              <h6 className="font-base font-weight-bold text-uppercase text-gray-900 mb-1 mt-1">
                                Roadside assistance 4 years
                              </h6>
                              <div className="font-xs text-gray-800 font-weight-semibold text-uppercase mb-3">
                                Minimum Premium KD 121
                              </div>
                              <div className="font-normal text-gray-700 font-weight-semibold">
                                Service Package Option:{" "}
                                <span className="text-gray-900">
                                  Premium Package
                                </span>
                              </div>
                            </div>
                          </div>
                        </EqualHeightElement>
                        <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                          <div className="col insurance-feature-block">
                            <p className="font-xs font-weight-semibold text-gray-800 mb-1">
                              Price
                            </p>
                            <h2 className="mb-0 text-primary font-weight-light pb-2">
                              Free of cost
                            </h2>
                          </div>
                        </div>
                        <EqualHeightElement name="detail">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                            <div className="col insurance-feature-block">
                              <p className="font-sm font-weight-bold mb-1">
                                Details
                              </p>
                              <div className="font-normal text-gray-700">
                                Because website security is important, HostGator
                                has provided you with a complimentary scanner
                                from SiteLock that proactively checks for
                                malware and vulnerabilities.{" "}
                                <span className="text-secondary">
                                  View More
                                </span>
                              </div>
                            </div>
                          </div>
                        </EqualHeightElement>
                        {[
                          {
                            featureName: "Year of warranty",
                            featureValue: "5 Years / 100k kms",
                          },
                        ].map((feat) => {
                          return (
                            <EqualHeightElement
                              name={feat.featureName}
                              key={feat.featureName}
                            >
                              <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                                <div className="col insurance-feature-block">
                                  <p className="font-xs font-weight-bold mb-1">
                                    {feat.featureName}
                                  </p>
                                  <div className="font-normal font-weight-semibold text-gray-700">
                                    {ReactHtmlParser(
                                      decode(feat.featureValue),
                                      {
                                        decodeEntities: true,
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                            </EqualHeightElement>
                          );
                        })}

                        <EqualHeightElement name="btnBlock">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                            <div className="col insurance-feature-block">
                              {/* <button className="btn btn-primary btn-block font-normal text-uppercase d-flex align-items-center justify-content-center insurance-btn">
                  <i className="icon-tick-round mr-1"></i>Select This Package
                </button> */}
                              <button
                                type="button"
                                disabled={false}
                                // className={`${props.isChoosen
                                //   ? ' btn-primary-no-hover'
                                //   : ' btn-outline-secondary-no-hover '
                                //   } btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold`}
                                className="btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold btn-primary-no-hover"
                                onClick={() => {
                                  //
                                }}
                              >
                                <i
                                  // className={`icon-tick-round font-lg mr-2 ${props.isChoosen ? '' : 'text-gray-400'
                                  //   }`}
                                  className={`icon-tick-round font-lg mr-2 text-gray-400`}
                                ></i>
                                Select This ADD-ONS
                              </button>
                            </div>
                          </div>
                        </EqualHeightElement>
                      </div>
                    </div>
                    <div className="col-12">
                      {/* <div className="col-12"> */}
                      <EqualHeightElement name="title">
                        <div className="col p-0 insurance-feature-block title">
                          <div className="position-relative">
                            {/* <img
                      src={props.service.productImage}
                      className="img-fluid w-100 img-clip img-cover"
                      alt="Silver"
                    /> */}
                          </div>
                        </div>
                      </EqualHeightElement>
                      <div className="font-normal mb-5 d-block border">
                        <EqualHeightElement name="package">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                            <div className="col insurance-feature-block">
                              {/* <div className="d-inline-block px-1 bg-primary text-white text-uppercase font-xxxs font-weight-bold mt-2 insurance-tag">
                  Included
                </div> */}
                              <h6 className="font-base font-weight-bold text-uppercase text-gray-900 mb-1 mt-1">
                                Roadside assistance 4 years
                              </h6>
                              <div className="font-xs text-gray-800 font-weight-semibold text-uppercase mb-3">
                                Minimum Premium KD 121
                              </div>
                              <div className="font-normal text-gray-700 font-weight-semibold">
                                Service Package Option:{" "}
                                <span className="text-gray-900">
                                  Premium Package
                                </span>
                              </div>
                            </div>
                          </div>
                        </EqualHeightElement>
                        <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                          <div className="col insurance-feature-block">
                            <p className="font-xs font-weight-semibold text-gray-800 mb-1">
                              Price
                            </p>
                            <h2 className="mb-0 text-primary font-weight-light pb-2">
                              Free of cost
                            </h2>
                          </div>
                        </div>
                        <EqualHeightElement name="detail">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters">
                            <div className="col insurance-feature-block">
                              <p className="font-sm font-weight-bold mb-1">
                                Details
                              </p>
                              <div className="font-normal text-gray-700">
                                Because website security is important, HostGator
                                has provided you with a complimentary scanner
                                from SiteLock that proactively checks for
                                malware and vulnerabilities.{" "}
                                <span className="text-secondary">
                                  View More
                                </span>
                              </div>
                            </div>
                          </div>
                        </EqualHeightElement>
                        {[
                          {
                            featureName: "Year of warranty",
                            featureValue: "5 Years / 100k kms",
                          },
                        ].map((feat) => {
                          return (
                            <EqualHeightElement
                              name={feat.featureName}
                              key={feat.featureName}
                            >
                              <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                                <div className="col insurance-feature-block">
                                  <p className="font-xs font-weight-bold mb-1">
                                    {feat.featureName}
                                  </p>
                                  <div className="font-normal font-weight-semibold text-gray-700">
                                    {ReactHtmlParser(
                                      decode(feat.featureValue),
                                      {
                                        decodeEntities: true,
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                            </EqualHeightElement>
                          );
                        })}

                        <EqualHeightElement name="btnBlock">
                          <div className="row insurance-type-features flex-lg-wrap flex-nowrap justify-content-lg-center no-gutters h-100">
                            <div className="col insurance-feature-block">
                              {/* <button className="btn btn-primary btn-block font-normal text-uppercase d-flex align-items-center justify-content-center insurance-btn">
                  <i className="icon-tick-round mr-1"></i>Select This Package
                </button> */}
                              <button
                                type="button"
                                disabled={false}
                                // className={`${props.isChoosen
                                //   ? ' btn-primary-no-hover'
                                //   : ' btn-outline-secondary-no-hover '
                                //   } btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold`}
                                className="btn btn-block d-flex align-items-center justify-content-center text-uppercase px-3 font-weight-bold btn-primary-no-hover"
                                onClick={() => {
                                  //
                                }}
                              >
                                <i
                                  // className={`icon-tick-round font-lg mr-2 ${props.isChoosen ? '' : 'text-gray-400'
                                  //   }`}
                                  className={`icon-tick-round font-lg mr-2 text-gray-400`}
                                ></i>
                                Select This ADD-ONS
                              </button>
                            </div>
                          </div>
                        </EqualHeightElement>
                      </div>
                    </div>
                  </Slider>
                </EqualHeight>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExtraAddonPopup;
