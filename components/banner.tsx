import React from "react";
import Image from "next/image";

export interface ITopBanner {
  title: string;
  description: string;
  type: string;
  image: {
    url: string;
    formats: IimageFormat;
  };
}
export interface IimageFormat {
  small: { url: string };
}

interface CustomProps {
  banner: ITopBanner;
}
const Banner: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  return (
    <div className="about-banner">
      <div className="position-relative">
        <Image
          src={props.banner.image?.url}
          className="img-fluid w-100 d-none d-lg-block"
          alt={props.banner.image?.url}
          width={1853}
          height={670}
        />
        <Image
          src={props.banner.image?.formats?.small?.url}
          alt={props.banner.image?.formats?.small?.url}
          className="img-fluid w-100 d-block d-lg-none"
          width={332}
          height={335}
        />
        <div className="position-absolute top-0 left-0 w-100 h-100 d-flex  zIndex-1 banner-shadow">
          <div className="container">
            <div className="row text-white py-5 h-100 align-items-end">
              <div className="col-12 col-sm-7 col-lg-7 pb-5 mb-4">
                <h2 className="display-1 font-weight-bold mb-2 text-white pt-5">
                  {props.banner.title}
                </h2>
                <p className="pb-5 mb-xl-5">{props.banner.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
