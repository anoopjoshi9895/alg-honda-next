import React from 'react';
import { useTranslation } from 'next-i18next';
import { ITrims } from '../models/models';
import { useRouter } from "next/router";
import Slider from 'react-slick';
import Image from "next/image";

interface CustomProps {
  data: ITrims[];
  buildLink?: string;
  model?: string;
}

const trimSpecSlider = {
  key: 'trim-spec-slider',
  className: 'd-block w-100 trim-spec-slider',
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

export const TrimSection: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();
  const { defaultLocale,locale} = router;
  const lang = locale
  const { t, i18n } = useTranslation("common");
//   const { currentLanguage } = useCMS();
  const trims = props.data ?? [];
  return (
    <div className="py-4 mb-4" id="trimsSpecs">
      <div className="container">
        <h2 className="h1 text-lg-center pb-0 mb-lg-5 mb-4">
          {t('detail.trim_and_specs')}
        </h2>

        <div className="detail-listing row">
          <Slider {...trimSpecSlider} swipeToSlide={true} focusOnSelect={true}>
            {trims.map((p, index) => {
              return (
                <div key={'trim-item' + index} className="col-12 item">
                  <div className="search-card row no-gutters h-100">
                    <div className="col-12 d-flex flex-column">
                      <div className="img-thumb d-flex align-items-center justify-content-center px-4 py-3 bg-light">
                       
                        <Image
                      src={`${p.image?.url}`}
                      width={281}
                      height={155}
                      alt={p.title}
                          className="img-fluid mx-auto"
                     
                    />
                      </div>
                      <div className="content pt-3">
                        <h5 className="text-uppercase pb-1">
                          {p.title}{' '}
                          {p.subTitle && (
                            <sup className="font-xs text-muted ml-3 font-weight-normal">
                              {' '}
                              ({p.subTitle})
                            </sup>
                          )}
                        </h5>
                        <div
                          className={`d-flex align-items-center mb-3 justify-content-lg-start ${lang === 'en'
                              ? 'justify-content-start dir-ltr'
                              : 'justify-content-end dir-rtl'
                            }`}
                        >
                          <p className="mb-0 d-inline-block font-weight-bold font-xl">
                            <span
                              className={`font-weight-normal font-xs text-muted text-uppercase mr-lg-2 ml-lg-0 ${lang === 'ar' ? 'ml-2' : ''
                                }`}
                            >
                              {t('common.starting_at')}
                            </span>
                            {p.price}
                          </p>
                          <span
                            className={`tooltip position-relative ml-lg-3 mr-lg-0 ${lang === 'ar' ? 'mr-3' : ''
                              }`}
                          >
                            <i className="icon-info-sm font-normal cursor-pointer text-muted"></i>
                            <div className="tooltip-content font-weight-normal text-muted font-normal position-absolute border border-secondary bg-white zIndex-1 px-3 py-4">
                              {p.infoText
                                ? p.infoText
                                : t('build_vehicle.net_price_popupText')}
                            </div>
                          </span>
                        </div>
                        
                      </div>
                      
                    </div>
                    {props.buildLink && (
                      <div className="col-12 mt-auto">
                        <a
                          href={`${props.buildLink}`}
                          className="btn btn-primary btn-block"
                        >
                          Build
                        </a>
                      </div>
                    )}
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
