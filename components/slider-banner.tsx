import React from "react";
import Image from "next/image";

import Slider from "react-slick";
import { ITopBanner, IKeyValue } from "../models/models";

interface CustomProps {
  detail: ITopBanner[];
  specs?: IKeyValue[];
  landing?: boolean;
  className?: string;
}

const SliderBanners = (props: CustomProps) => {
  const topSlider = props.detail;
  return (
    <>
      <div
        className={`home-slider-outer ${
          props.className ? props.className : ""
        }`}
      >
        <Slider
          key={"banner-slider"}
          dots={true}
          // draggable
          lazyLoad="progressive"
          infinite={false}
          //   speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={8000}
          arrows={false}
          className="home-slider"
        >
          {topSlider.map((banner: any, index: number) => {
            return (
              <div className="slide" key={"banner-" + index + banner.bannerID}>
                <div className="position-relative">
                  {banner.image ? (
                    banner.image?.blurDataURL ? (
                      <Image
                        {...banner.image}
                        placeholder="blur"
                        alt="Picture of the author"
                        layout="responsive"
                        priority
                      />
                    ) : (
                      <Image
                        src={`${banner.image.url}`}
                        // {...(banner.image)}
                        alt="Picture of the author"
                        width={130}
                        height={52}
                        layout="responsive"
                        priority
                      />
                    )
                  ) : null}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default SliderBanners;
