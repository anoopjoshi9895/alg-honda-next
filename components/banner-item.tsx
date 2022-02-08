import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { ButtonItem } from './button-item';
import { ITopBanner } from '../models/models';

interface CustomProps {
  data: ITopBanner;
  class?: string;
  landing?: boolean;
}

export const BannerItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { i18n } = useTranslation();
  const p = props.data;

  const router = useRouter()
  const lang = router.locale;

  const buildRoutePath = (data: ITopBanner, hash?: string) => {
    if (data.automobile) {
      return {
        pathname: `/${i18n.language}/automobiles/${data?.automobile?.slug}`,
        hash,
      };
    }
    if (data.marine) {
      return {
        pathname: `/${i18n.language}/marines/${data?.marine.slug}`,
        hash,
      };
    }
    if (data.motorcycle) {
      return {
        pathname: `/${i18n.language}/motorcycle/${data?.motorcycle?.slug}`,
        hash,
      };
    }
    if (data.power_product) {
      return {
        pathname: `/${i18n.language}/powerproduct/${data?.power_product?.slug}`,
        hash,
      };
    }
    return '';
  };

  return (
    <div
      className={
        props.class ?? 'detail-banner main-banner position-relative h-100'
      }
    >
      <div className="position-relative h-100">
        {p.type === 'video' ? (
          <video width="100%" height="100%" autoPlay loop muted className="float-left">
            <source src={p?.image?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={p?.image?.url} alt={p?.title} className="img-fluid w-100 h-100 img-cover" />
        )}
        {p?.relativeUrl != null && p?.relativeUrl !== '' ? (
          <Link href={`/${lang}/${p?.relativeUrl}`} >
            <a className="w-100 h-100">
              <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-lg-center zIndex-2 banner-content">
                <div className="container">
                  <div className="row">
                    <div className="text-white py-5 col-md-5 col-sm-6 col-12">
                      {props.landing ? (
                        <h1 className="display-1 text-white font-weight-bolder mb-5">
                          {p?.title}
                        </h1>
                      ) : (
                        <h3 className="text-white text-uppercase">{p?.title}</h3>
                      )}
                      {p?.description && (
                        <p className="font-weight-normal pb-3 mb-lg-2 mb-0 font-base text-white">
                          {p?.description}
                        </p>
                      )}
                      {p?.button?.map((q, index) => {
                        return (
                          <ButtonItem
                            key={p.title + q?.text + index}
                            data={q}
                          ></ButtonItem>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ) : p.absoluteUrl !== undefined &&
          p.absoluteUrl != null &&
          p.absoluteUrl !== '' ? (
          <a className="w-100 h-100" href={`${p.absoluteUrl}`} target="_blank" rel="noreferrer">
            <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-lg-center zIndex-2 banner-content">
              <div className="container">
                <div className="row">
                  <div className="text-white py-5 col-md-5 col-sm-6 col-12">
                    {props.landing ? (
                      <h1 className="display-1 text-white font-weight-bolder mb-5">
                        {p?.title}
                      </h1>
                    ) : (
                      <h3 className="text-white text-uppercase">{p?.title}</h3>
                    )}
                    {p?.description && (
                      <p className="font-weight-normal pb-3 mb-lg-2 mb-0 font-base">
                        {p?.description}
                      </p>
                    )}
                    {p?.button?.map((q, index) => {
                      return (
                        <ButtonItem
                          key={p.title + q?.text + index}
                          data={q}
                        ></ButtonItem>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </a>
        ) : (
          <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-lg-center zIndex-2 banner-content">
            <div className="container">
              <div className="row">
                <div className="text-white py-5 col-md-5 col-sm-6 col-12">
                  {props.landing ? (
                    <h1 className="display-1 text-white font-weight-bolder mb-5">
                      {p?.title}
                    </h1>
                  ) : (
                    <h3 className="text-white text-uppercase">{p?.title}</h3>
                  )}
                  {p?.description && (
                    <p className="font-weight-normal pb-3 mb-lg-2 mb-0 font-base">
                      {p?.description}
                    </p>
                  )}
                  {p?.button?.map((q, index) => {
                    return (
                      <ButtonItem
                        key={p.title + q?.text + index}
                        data={q}
                      ></ButtonItem>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
