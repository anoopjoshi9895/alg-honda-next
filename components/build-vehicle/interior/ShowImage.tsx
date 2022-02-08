import React, { useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Image from "next/image";
import Slider from "react-slick";
import { RootState } from "../../../app/store";

interface CustomProps {
  images: string[];
  imageType: string | undefined;
}

const ShowImage: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  return (
    <>
      {/* <div className="text-center interior-img-block"> */}
      {props.imageType !== "gallery" && props.images[0] && (
        <div className="position-relative d-block" style={{width: '100%', paddingTop: '36.25%'}}>
          <Image
            src={props.images[0]}
            className="img-fluid h-100 img-cover w-100 view-area-height"
            alt="gallery"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      {props.imageType === "gallery" && (
        <Slider
          key={"build-slider"}
          dots={true}
          draggable
          infinite={false}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={2500}
          arrows={true}
          className="h-100 interior-slider"
        >
          {props.images.map((item, index) => {
            return item ? (
              <div className="position-relative d-block h-100" style={{width: '100%', paddingTop: '36.25%'}}>
                <Image
                  key={item}
                  src={item}
                  className="img-fluid h-100 img-cover view-area-height"
                  alt={`interior-${index}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <></>
            );
          })}
        </Slider>
      )}
      {/* </div> */}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(ShowImage);
