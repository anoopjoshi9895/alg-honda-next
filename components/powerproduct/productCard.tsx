import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import Image from "next/image";
import { IAutoMobileCategoryItem } from '../../models/models';
import { useRouter } from "next/router";

interface CustomProps {
  categories: IAutoMobileCategoryItem[];
}

const ProductCard: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const { defaultLocale, isFallback, query, locale } = router;
  const lang = locale;

  return (
    <>
      <div className="container pt-5 pb-sm-5 pb-4">
        <div className="row no-gutters">
          <div className="col-12 text-center">
            <h1 className="mb-2">{t('landing.powerproductsTitle')}</h1>
            <p className="font-base text-gray-800 mb-4 pb-sm-2">
              {t('detail.Discover The Exciting Range of Honda')}{' '}{t('detail.power_products')}
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {props?.categories?.map((item, index) => {
            return (
              <div className={`col-md-6 col-12 px-5 py-4 ${index % 2 ? 'agricultural-box' : 'industry-box'}`} key={index}>
                <div className={`row align-items-center ${index % 2 ? 'flex-row-reverse' : ''}`}>
                  <div className="col-sm-6 col-12">
                    <img src={item?.image?.url} className="img-fluid" alt="" />
                  </div>
                  <div className="col-sm-6 col-12">
                    <h2 className={`text-uppercase mb-2 pb-1 ${index % 2 ? 'text-white' : ''}`}>{item?.title}</h2>
                    <p className={`text-gray-800 mb-4 pb-2 ${index % 2 ? 'text-white' : ''}`}>{item?.subTitle}</p>
                    <Link
                      href={`/${item?.link}`}
                    >
                      <a className="btn btn-primary px-4 py-2">
                        <span className="d-inline-block py-1 px-4">{t('popup.Explore')}</span>
                      </a></Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
