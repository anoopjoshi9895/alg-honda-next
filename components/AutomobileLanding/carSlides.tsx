import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';

import _, { set } from 'lodash';
import { IHomepageSlider } from '../../models/models';
import classnames from 'classnames';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const sliderSettings = {
  key: 'w-slider',
  className: 'w-slider',
  centerMode: true,
  centerPadding: '20%',
  slidesToShow: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        // arrows: false,
        centerMode: true,
        centerPadding: '15%',
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
        centerPadding: '15%',
        autoplay: true,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 780,
      settings: {
        centerMode: true,
        centerPadding: '10%',
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



interface CustomProps {
  carItems: IHomepageSlider[];
  type: "powerproducts" | "automobiles" | "motorcycle" | "marines";
}
const CarSlides: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation('');
  const router = useRouter();
  const { defaultLocale, isFallback, query, locale } = router;
  const lang = locale;
  const [tab, setTab] = useState('all');

  const groupedData = _.groupBy(
    props?.carItems.filter((item) => item.type !== null),
    'type'
  );
  const categoriesOfMotorCycle = Object.keys(groupedData);
  const carItems: IHomepageSlider[] =
    tab === 'all'
      ? props?.carItems
      : props?.carItems?.filter((item) => item.type === tab);


  return (
    <>
      <div className="landing-slider overflow-hidden py-5">
        <div className="container-fluid text-center">
          <h1 className="mb-4 pb-1 text-white">{t('landing.Experience Amazing')}</h1>
          <ul className="list-unstyled mb-4 pb-4 d-md-inline-flex d-flex text-uppercase text-nowrap overflow-auto">
            <li className="ml-auto">
              <a
                onClick={() => setTab('all')}
                className={classnames({
                  'text-white d-inline-block px-4 py-2 mr-2 cursor-pointer':
                    true,
                  ' bg-primary': tab === 'all',
                })}
              >
                {t('popup.All')}
              </a>
            </li>
            {categoriesOfMotorCycle?.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => setTab(item)}
                    className={classnames({
                      'text-white d-inline-block px-4 py-2 mr-2 cursor-pointer':
                        true,
                      ' bg-primary': tab === item,
                    })}
                  >
                    {t(`header.${item}`)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          key={'automobile' + carItems?.length ?? '0'}
          className="tab w-slider-tab automobile-slider"
        >
          <Slider
            // ref={(slider) => (experianceSliderRef = slider)}
            {...sliderSettings}
          >
            {carItems?.map((p, index) => {
              return (
                <div
                  key={'automobile-slider' + index ?? '0'}
                  className="w-slide"
                >
                  <div className="px-lg-5 px-3 d-flex flex-column">
                    <figure className="car">
                      <div className="position-relative w-100" style={{paddingTop: '50%'}}>
                        <Image
                          src={p?.image?.url}
                          width={props.type=="automobiles"? 888 : 747}
                          height={props.type=="automobiles"? 339 : 385}
                          className="img-fluid"
                          alt={p?.title}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </figure>
                    <div className="row justify-content-md-between align-items-md-center w-content">
                      <div className="col-12">
                        <div className="row align-items-center justify-content-between">
                          <div className="col-12 text-center">
                            <div className="h2 mb-1 text-white text-uppercase">
                              {p?.title}
                            </div>
                            {p?.spec1 && p?.spec1 !== '' && (
                              <p className="font-normal text-white mb-4 pb-2 text-uppercase">
                                {p?.spec1}
                              </p>
                            )}
                            <Link href={`/${props.type}/${p?.slug}`}>
                              <a className="btn btn-primary px-5 mb-3">
                                {t('popup.Explore')}
                              </a></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CarSlides;
