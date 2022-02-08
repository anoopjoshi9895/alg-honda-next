import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from "next/image";

import { IConvenience } from '../models/models';
interface CustomProps {
  data: IConvenience[];
  buildLink?: string;
}
export const Convenience: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-light py-5">
      <div className="container">
        <h2 className="h1 text-lg-center pb-4">{t('detail.convenience')}</h2>
        <div className="row justify-content-center responsive-overflow-element mb-3 mb-lg-4 ">
          {props.data?.map((item, index: number) => {
            const i = index + 1;
            return (
              <div className="col col-lg-4 res-col mb-lg-5 mb-4 pb-lg-0 pb-2" key={index}>
                <div className="content-pane">
                  <div className=" img-block sensing position-relative">
                    {/* <img
                      src={item.image?.url}
                      // src={require('assets/images/vehicle-landing/sensing-img-1.png')}
                      alt={item.title}
                      className="img-fluid mx-auto w-100 mb-lg-2"
                    /> */}
                    <Image
                      src={`${item.image?.url}`}
                      width={571}
                      height={327}
                      className="img-fluid mx-auto w-100 mb-lg-2"
                      alt={'car'}
                    />
                    {/* <a className="cursor-pointer play-btn position-absolute d-flex align-items-center justify-content-center"></a> */}
                  </div>
                  <div className="pt-3">
                    <h6 className="mb-3">{item.title}</h6>
                    <div className="font-normal letter-spacing text-heading">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-0 col-7 com-sm-6 col-md-4 col-lg-3 mx-auto d-none">
          <a
            href={`${props.buildLink}`}
            className="cursor-pointer btn-block btn-outline-secondary btn"
          >
            Reserve Vehicle
          </a>
        </div>
      </div>
    </div>
  );
};
