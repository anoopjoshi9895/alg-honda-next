import React from 'react';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';
import { IImage } from '../models/models';
import Image from "next/image";

interface CustomProps {
  data: IImage[];
}
export const GallerySection: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation('');
  const sliderSettingsGallery = {
    key: 'gallery',
    className: 'gallery pb-5',
    centerMode: true,
    centerPadding: '25%',
    slidesToShow: 1,
    dots: true,
    arrows: false,
    afterChange: (index: any) => setGallerySliderIndex(index + 1),
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          centerMode: true,
          centerPadding: '20%',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          centerMode: true,
          centerPadding: '15%',
          autoplay: true,
          slidesToShow: 1,
          dots: false
        },
      },
      {
        breakpoint: 779,
        settings: {
          centerMode: true,
          centerPadding: '10%',
          arrows: false,
          autoplay: true,
          slidesToShow: 1,
          dots: false
        },
      },
      {
        breakpoint: 580,
        settings: {
          centerMode: true,
          centerPadding: '5%',
          arrows: false,
          autoplay: true,
          slidesToShow: 1,
          dots: false
        },
      },
    ],
  };
  const [gallerySliderIndex, setGallerySliderIndex] = React.useState(1);

  let gallerySliderRef: any = React.useRef<any>();
  const nextGalleryProduct = () => {
    gallerySliderRef.slickNext();
  };
  const prevGalleryProduct = () => {
    gallerySliderRef.slickPrev();
  };

  const images = props.data ?? [];
  return (
    <div className="py-4" id="gallery">
      <div className="container">
        <h2 className="h1 text-lg-center pb-4 pb-lg-5 mb-0">
          {t('common.gallery')}
        </h2>
      </div>
      <div className="gallery-slider-container overflow-hidden">
        <Slider
          ref={(slider) => (gallerySliderRef = slider)}
          {...sliderSettingsGallery}
        >
          {images?.map((item, index: number) => {
            const i = index + 1;
            return (
              <div className="gallery-slide" key={index}>
                <div className="px-2">
                  <div className="position-relative">
                    {/* <img
                      src={item.url}
                      width="793"
                      height="492"
                      className="img-fluid w-100"
                    /> */}
                     <Image
                        src={`${item.url}`}
                        width={793}
                        height={492}
                        className="img-fluid w-100"
                        alt={'car'}
                      />
                    <div className="align-items-end d-flex h-100 left-0 p-3 p-md-4 position-absolute top-0 w-100 overlay"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>

        <div className="action-btns mx-auto">
          <div className="row gutter-8 align-items-center justify-content-center">
            <div className="col-auto d-flex">
              <a
                className="align-items-center arrow d-flex justify-content-center mr-2 prev-slide"
                onClick={() => prevGalleryProduct()}
              >
                <i className="icon-chevron-left icon-flip-rtl mr-1"></i>
              </a>
              <a
                className="align-items-center arrow d-flex justify-content-center next-slide ml-2"
                onClick={() => nextGalleryProduct()}
              >
                <i className="icon-chevron-right icon-flip-rtl ml-1"></i>
              </a>
            </div>
            <div className="pagingInfo col d-lg-block d-none">{`${gallerySliderIndex} - ${props.data?.length}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
