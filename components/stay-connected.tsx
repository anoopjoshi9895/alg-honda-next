import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
export interface ISocialMedia {
  title: string;
  items: ISocialMediaItem[];
}
export interface ISocialMediaItem {
  url: string;
  iconClass: string;
  position: string;
  image: {
    url: string;
  };
}
interface CustomProps {
  data: ISocialMedia;
}
export const StayConnected: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const data = props.data;
  return (
    <div className="pt-lg-3">
      <div className="container py-lg-5 pt-4 text-md-center">
        <h2 className="mb-3 h1">{data?.title}</h2>
        <div className="social-media-images pt-2">
          <ul className="gutter-8 list-unstyled mb-0 pb-lg-0 pb-4 row">
            {data.items.length > 0 && (
              <li className="col-md-4 col-12">
                <Slider
                  className="social-slider"
                  dots={true}
                  arrows={false}
                  autoplay={true}
                  autoplaySpeed={2500}
                >
                  {data.items
                    .filter((item) => item?.position === "left")
                    .map((leftItem, index) => {
                      return (
                        <div
                          key={"stay-connected-item" + index}
                          className="py-lg-3 py-2"
                        >
                          <Link href={leftItem?.url ?? ""}>
                            <a
                              href={leftItem?.url ?? ""}
                              target="_blank"
                              rel="noreferrer"
                              className="d-block position-relative"
                            >
                              <div className="fig img-zoom d-flex">
                                {/* <img
                                src={leftItem?.image?.url}
                                alt=""
                                className="img-fluid w-100"
                              /> */}
                                <Image
                                  src={`${leftItem?.image?.url}`}
                                  width={404}
                                  height={401}
                                  alt={"connected"}
                                  className="img-fluid w-100"
                                />
                              </div>
                              <span className="text-white position-absolute bottom-0 right-0 d-inline-flex media-icon h4 m-0 p-3">
                                <i
                                  className={"icon-" + leftItem?.iconClass}
                                ></i>
                              </span>
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                </Slider>
              </li>
            )}
            {data.items.length > 1 && (
              <li className="col-md-4 col-12">
                <div className="py-lg-3 py-2">
                  <Slider
                    className="social-slider h-100"
                    dots={true}
                    arrows={false}
                    autoplay={true}
                    autoplaySpeed={2750}
                  >
                    {data.items
                      .filter((item) => item?.position === "top")
                      .map((topItem, index) => {
                        return (
                          <Link href={topItem?.url ?? ""} key={index}>
                            <a
                              key={"stay-connected-top-item" + index}
                              target="_blank"
                              rel="noreferrer"
                              className="d-block position-relative"
                            >
                              <div className="fig img-zoom d-flex">
                                <Image
                                  src={topItem?.image?.url}
                                  alt=""
                                  className="img-fluid w-100"
                                  width={404}
                                  height={192}
                                />
                                {/* <Image
                                    src={`${topItem?.image?.url}`}
                                    width={404}
                                    height={401}
                                    alt={"connected"}
                                    className="img-fluid w-100"
                                    /> */}
                              </div>
                              <span className="text-white position-absolute bottom-0 right-0 d-inline-flex media-icon h4 m-0 p-3">
                                <i className={"icon-" + topItem?.iconClass}></i>
                              </span>
                            </a>
                          </Link>
                        );
                      })}
                  </Slider>
                </div>
                {data.items.length > 2 && (
                  <div className="py-lg-0 py-2 d-md-block d-none">
                    <Slider
                      className="social-slider h-100"
                      dots={true}
                      arrows={false}
                      autoplay={true}
                      autoplaySpeed={3000}
                    >
                      {data.items
                        .filter((item) => item?.position === "bottom")
                        .map((bottomItem, index) => {
                          return (
                            <Link href={bottomItem?.url ?? ""} key={index}>
                              <a
                                key={"stay-connected-bottom-item" + index}
                                target="_blank"
                                rel="noreferrer"
                                className="d-block position-relative"
                              >
                                <div className="fig img-zoom d-flex">
                                  <Image
                                    src={bottomItem?.image?.url}
                                    alt=""
                                    className="img-fluid w-100"
                                    width={404}
                                    height={192}
                                  />
                                  {/* <Image
                                    src={`${bottomItem?.image?.url}`}
                                    width={404}
                                    height={401}
                                    alt={"connected"}
                                    className="img-fluid w-100"
                                    /> */}
                                </div>
                                <span className="text-white position-absolute bottom-0 right-0 d-inline-flex media-icon h4 m-0 p-3">
                                  <i
                                    className={"icon-" + bottomItem?.iconClass}
                                  ></i>
                                </span>
                              </a>
                            </Link>
                          );
                        })}
                    </Slider>
                  </div>
                )}
              </li>
            )}
            {data.items.length > 3 && (
              <li className="col-md-4 col-12">
                <Slider
                  className="social-slider"
                  dots={true}
                  arrows={false}
                  autoplay={true}
                  autoplaySpeed={3250}
                >
                  {data.items
                    .filter((item) => item?.position === "right")
                    .map((rightItem, index) => {
                      return (
                        <div
                          key={"stay-connected-right-item" + index}
                          className="py-lg-3 py-2"
                        >
                          <Link href={rightItem?.url ?? ""}>
                            <a
                              className="d-block position-relative"
                              rel="noreferrer"
                            >
                              <div className="fig img-zoom d-flex">
                                {/* <img
                                src={rightItem?.image?.url}
                                alt=""
                                className="img-fluid w-100"
                              /> */}
                                <Image
                                  src={`${rightItem?.image?.url}`}
                                  width={404}
                                  height={401}
                                  alt={"connected"}
                                  className="img-fluid w-100"
                                />
                              </div>
                              <span className="text-white position-absolute bottom-0 right-0 d-inline-flex media-icon h4 m-0 p-3">
                                <i
                                  className={"icon-" + rightItem?.iconClass}
                                ></i>
                              </span>
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                </Slider>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
