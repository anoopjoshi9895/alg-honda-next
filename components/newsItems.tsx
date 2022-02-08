import React, { useEffect } from 'react';
// import '../styles/sass/home.scss';
// import '../styles/sass/common.scss'
import Link from 'next/link'
import { INewsItem } from '../models/models'
import Image from "next/image";
import { useTranslation } from "next-i18next";

import Slider from 'react-slick';


const sliderSettingsHome = {
  key: 'home-slider',
  className: 'home-slider',
  infinite: true,
  autoplay: true,
  speed: 500,
  // fade: true,
  // cssEase: 'linear',
  arrows: false,
  dots: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {},
    },
  ],
};

const sliderNews: any = {
  // key: 'news',
  className: 'news',
  lazyLoad: true,
  slidesToShow: 4,
  dots: false,
  arrows: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 779,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const NewsItems: React.FunctionComponent<any> = (props: { data: INewsItem[] }) => {

  const { t } = useTranslation('common')

  const { data } = props

  const truncate = (text: string, count: number) => {
    if (text?.length > count) {
      const trim = text?.substr(0, count);
      return `${trim.substr(0, trim.lastIndexOf(' '))}...`;
    }
    return text;
  };

  return (
    <>
      <div className="content-wrapper home overflow-hidden">



        <div className="">
          <div className="container pt-lg-5 py-4 text-md-center">
            <h2 className="mb-md-5 mb-0 mt-4 h1">
              {t('common.Latest News')}
            </h2>
          </div>
          <div className="latest-news-container">
            <Slider
              key={'news' + data?.length}
              {...sliderNews}
            // rtl={i18n.language === 'ar' ? true : false}
            // initialSlide={i18n.language === 'en' ? 0 : data.length - 1}
            >
              {data?.map((item, index) => {
                return (
                  <div
                    className="latest-news-box d-flex flex-column h-100"
                    key={`latest-news-${index}`}
                  >
                    <div className="px-md-5 px-3 border-right col d-flex flex-column">
                      <h6 className="font-weight-bold mb-3">
                        {truncate(item.title, 100)}
                      </h6>
                      {item?.shortDescription && (
                        <p className="text-gray-700 mb-4 pb-3 font-weight-normal font-normal">
                          {truncate(item?.shortDescription, 100)}
                        </p>
                      )}
                      {/* <Link
                        to={buildRoutePath(item.slug)}
                        className="text-gray-700 font-normal text-uppercase font-weight-bold mb-4 d-inline-block mt-auto"
                      >
                        {t('common.Read more')}{' '}
                      <i className="icon-chevron-right font-sm ml-2"></i>
                      </Link> */}
                    </div>
                    {/* <img
                      src={item.image?.url}
                      className="img-fluid w-100 img-cover mt-auto"
                      alt="news"
                    /> */}
                    <Image
                      src={`${item.image?.url}`}
                      className="img-fluid w-100 img-cover mt-auto"
                      alt="news"
                      width={640}
                      height={860}
                      priority
                      // width={256}
                      // height={384}
                      objectFit='cover'
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItems;
