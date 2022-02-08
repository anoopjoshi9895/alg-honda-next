import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import { IImageWithDescription } from "../models/models";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const sliderSettingsWidget = {
  className: "exterior-interior-slider sliding-content",
  slidesToShow: 1,
  arrows: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        adaptiveHeight: true,
      },
    },
  ],
};
const sliderSettingsthumbColor = {
  className: "exterior-interior-thumb-slider tab-style-left",
  arrows: false,
  infinite: false,
  vertical: true,
  verticalSwiping: true,
  slidesToShow: 6,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        vertical: false,
        verticalSwiping: false,
        variableWidth: true,
        slidesToShow: 1,
      },
    },
  ],
};

interface CustomProps {
  imageItems: IImageWithDescription[];
  align: "left" | "right";
  buildLink?: string;
}

const SliderWithListItems = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation();
  const [topNav, setTopNav] = React.useState<any>(null);
  const [bottomNav, setBottomNav] = React.useState<any>(null);

  let _topSlider: any = [];
  let _bottomSlider: any = [];

  React.useEffect(() => {
    setTopNav(_topSlider);
    setBottomNav(_bottomSlider);
  }, [_topSlider, _bottomSlider]);

  return (
    <div className="container">
      <div className="SliderWidgetDesign row">
        <div
          className={
            "col-12 col-lg-4 col-xl-3" +
            (props.align === "right" ? " order-lg-last" : "")
          }
        >
          <div className="widget-thumb-Designslider  mx-auto  tablist-slider">
            <Slider
              key={"exterior-interior-top-slider" + props.imageItems?.length}
              {...sliderSettingsthumbColor}
              swipeToSlide={true}
              focusOnSelect={true}
              initialSlide={
                i18n.language === "ar" ? props.imageItems?.length - 1 : 0
              }
              asNavFor={topNav}
              ref={(slider) => {
                _bottomSlider = slider;
                // _bottomSlider?.slickGoTo(0);
              }}
              // rtl={i18n.language === 'ar' ? true : false}
            >
              {props.imageItems?.map((item: any, index: number) => {
                return (
                  <li key={`thumb${index}`}>
                    <a className="cursor-pointer">{item.title}</a>
                  </li>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="col-12 col-lg-7 col-xl-8 widget-main-designslider pl-xl-0">
          <Slider
            key={"exterior-interior-bottom-slider" + props.imageItems?.length}
            asNavFor={bottomNav}
            initialSlide={
              i18n.language === "ar" ? props.imageItems?.length - 1 : 0
            }
            ref={(slider) => {
              _topSlider = slider;
              // _topSlider?.slickGoTo(0);
            }}
            {...sliderSettingsWidget}
            rtl={i18n.language === "ar" ? true : false}
          >
            {props.imageItems?.map((item, index: number) => {
              const i = index + 1;
              return (
                <div className="slide" key={`car${index}`}>
                  {/* <img
                    src={item.image?.url}
                    alt="honda"
                    className="img-fluid"
                  /> */}
                  <Image
                      src={`${item.image?.url}`}
                      width={838}
                      height={427}
                      alt={"p.title"}
                      className="img-fluid"
                      />
                  <div className="pt-3 pt-lg-4">
                    <h5>{item.title}</h5>
                    <div className="font-normal text-heading row align-items-center">
                      <div className="col-12 col-md">
                        {" "}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        ></div>
                        {/* <MarkdownRenderer markdown={item.description} /> */}
                      </div>
                      {props.buildLink && (
                        <div className="col-md-4 col-12 pt-md-0 pt-3">
                          <Link href={`${props.buildLink}`}>
                            <a className="btn btn-primary px-5 btn-block">
                              Build
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderWithListItems;
