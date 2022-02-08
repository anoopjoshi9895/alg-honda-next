import React from "react";
import Slider from "react-slick";
import MidSliderItem from "./mid-slider-item";
import { IHomepageSlider } from "../models/models";

const MidSliderTabContent = (props: {
  automobileSlider: IHomepageSlider[];
  type: "powerproducts" | "automobiles" | "motorcycle" | "marines";
}) => {
  const automobileSlider = props.automobileSlider;
  let experianceSliderRef: any = React.useRef<any>();
  const nextExperianceProduct = () => {
    experianceSliderRef.slickNext();
  };
  const prevExperianceProduct = () => {
    experianceSliderRef.slickPrev();
  };
  return (
    <>
      <div
        key={"automobile-key" + automobileSlider?.length ?? "0"}
        className="tab w-slider-tab automobile-slider"
      >
        <Slider
          ref={(slider) => (experianceSliderRef = slider)}
          {...sliderSettings}
        >
          {automobileSlider?.map((p, index) => {
            return (
              <MidSliderItem
                type={props.type}
                slug={p.slug}
                key={"slider-car-item" + index}
                name={p?.title}
                image={p?.image?.url}
                price={p?.price ?? ""}
                seats={p?.spec2 ?? ""}
                year={p?.spec1 ?? ""}
              />
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default MidSliderTabContent;

const sliderSettings: any = {
  key: "w-slider",
  className: "w-slider",
  lazyLoad: true,
  centerMode: true,
  centerPadding: "20%",
  slidesToShow: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        // arrows: false,
        centerMode: true,
        centerPadding: "15%",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        arrows: false,
      },
    },
    {
      breakpoint: 991,
      settings: {
        // arrows: false,
        centerMode: true,
        centerPadding: "15%",
        autoplay: true,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 780,
      settings: {
        centerMode: true,
        centerPadding: "10%",
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: false,
        infinite: false,
        // autoplay: true,
        slidesToShow: 1.15,
        slidesToMove: 1,
      },
    },
  ],
};
