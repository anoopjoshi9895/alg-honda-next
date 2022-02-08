import React from "react";
import Image from "next/image";
import Head from "next/head";
import { useTranslation } from "next-i18next";

import Slider from "react-slick";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { IColorVariant } from "../models/models";
const sliderSettingsColor = {
  className: "color-slider",
  infinite: false,
  autoplay: false,
  speed: 500,
  fade: true,
  cssEase: "linear",
  arrows: true,
  dots: false,
  // asNavFor: '.color-thumb-slider',
  responsive: [
    {
      breakpoint: 992,
      settings: {
        arrows: false,
      },
    },
  ],
};
const sliderSettingsthumbColor = {
  key: "color-thumb-slider",
  className: "color-thumb-slider",
  infinite: false,
  autoplay: false,
  speed: 500,
  cssEase: "linear",
  arrows: true,
  dots: false,
  // variableWidth: true,
  slidesToShow: 10,
  slidesToScroll: 1,
  // asNavFor: '.color-slider',
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 349,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
};
interface CustomProps {
  model: string;
  data: IColorVariant[];
  onRequestCallback?: any;
  onDownloadBrochure?: any;
}
export const ExploreColorSection: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation('');
  const [topNav, setTopNav] = React.useState<any>(null);
  const [bottomNav, setBottomNav] = React.useState<any>(null);
  const variants = props.data;
  // const { currentLanguage } = useCMS();

  let _topSlider: any = [];
  let _bottomSlider: any = [];

  React.useEffect(() => {
    setTopNav(_topSlider);
    setBottomNav(_bottomSlider);
  }, [_topSlider, _bottomSlider]);

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <div className="py-4 pt-lg-5 d-block w-100" id="exploreColor">
        <div className="container exploreColor d-block w-100">
          <div className="px-lg-5 px-md-4 mx-lg-0 mx-2 d-block w-100">
            <Slider
              key={"top-slider" + variants?.length ?? 0}
              initialSlide={i18n.language === "ar" ? variants?.length - 1 : 0}
              asNavFor={bottomNav}
              ref={(slider) => {
                _topSlider = slider;
                //  _topSlider?.slickGoTo(0);
              }}
              {...sliderSettingsColor}
              rtl={i18n.language === "ar" ? true : false}
            // initialSlide={0}
            >
              {variants?.map((p, index: number) => {
                const i = index + 1;
                return (
                  <div className="slide" key={`car${index}`}>
                    <div className="position-relative w-100" style={{paddingTop: '40%'}}>
                    <Image
                      src={`${p.image?.url}`}
                      width={874}
                      height={439}
                      alt={p.title}
                      className="img-fluid mx-auto"
                      layout="fill"
                      objectFit="contain"
                    />
                    </div>
                    <div className="font-normal text-heading text-center">
                      {p.title}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="color-selection mt-4">
            <Slider
              {...sliderSettingsthumbColor}
              swipeToSlide={true}
              focusOnSelect={true}
              asNavFor={topNav}
              ref={(slider) => {
                _bottomSlider = slider;
                //  _bottomSlider?.slickGoTo(0);
              }}
            // rtl={i18n.language === 'ar' ? true : false}
            // initialSlide={0}
            >
              {variants?.map((p, index: number) => {
                const i = index + 1;
                return (
                  <div className="slide px-1" key={`thumb${index}`}>
                    {/* <img
                    src={p.colorIcon?.url}
                    // src={require(`assets/images/vehicle-landing/${props.model}/color-1.png`)}
                    alt={p.title}
                    className="img-fluid"
                  /> */}
                  <div className="position-relative" style={{width: '45px', height: '45px'}}></div>
                    <Image
                      src={`${p.colorIcon?.url}`}
                      // width={45}
                      // height={45}
                      alt={p.title}
                      className="img-fluid"
                      layout="fill"
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          {props.data?.length > 0 && (
            <div className="mt-4 mt-lg-5 d-flex justify-content-center">
              {props.onDownloadBrochure && (
                <button
                  onClick={() => props.onDownloadBrochure()}
                  className="btn btn-primary px-3 mr-2"
                >
                  <i className="icon-download mr-3"></i>
                  {t("common.download_brochure")}
                  {` `}
                </button>
              )}
              {props.onRequestCallback && (
                <button
                  onClick={() => props.onRequestCallback()}
                  className="btn btn-outline-secondary px-3"
                >
                  {t("common.request_a_callback")}
                  {` `}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
