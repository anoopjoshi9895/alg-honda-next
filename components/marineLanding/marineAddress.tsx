import Link from 'next/link';
import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import {IContactUs} from '../../models/models'

interface CustomProps{
    contactData:IContactUs
}

const MarineAddress = ({contactData}:CustomProps) => {
  const { t, i18n } = useTranslation();


  const data = contactData;
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-2">{t('form.Reach to Us')}</h1>
            <p className="font-base text-gray-800 mb-4 pb-2">
              {t('landing.Visit your nearest Honda showroom')}
            </p>
          </div>
          {data?.marine?.showRooms?.map((item,index) => {
            return (
              <div className="col-md-12 col-12 map-box mx-auto" key={index}>
                <div className="bg-gray-100 pl-3">
                  <div className="row">
                    <div className="col-sm-6 col-12 py-3 pr-0">
                      <div className="bg-white p-3 rounded mb-3 h-100">
                        <h6 className="font-normal my-2">{item?.title}</h6>
                        <p className="font-normal text-gray-800 mb-4">
                          {item?.address}
                        </p>
                        <div className="row mb-4 font-normal">
                          <div className="col-md-4 col-6 mb-2">{t('header.city')}</div>
                          <div className="col-md-8 col-6 mb-2">
                            : {item.city}
                          </div>
                          <div className="col-md-4 col-6 mb-2">{t('common.Timings')}</div>
                          <div className="col-md-8 col-6 mb-2">
                            : {item.timings}
                          </div>
                          <div className="col-md-4 col-6 mb-2">{t('car_service.phone')}</div>
                          <div className="col-md-8 col-6 mb-2">
                            : {item.phone}
                          </div>
                          <div className="col-md-4 col-6 mb-2">{t('common.Fax')}</div>
                          <div className="col-md-8 col-6 mb-2">: </div>
                          <div className="col-md-4 col-6 mb-2">{t('common.Postal Code')}</div>
                          <div className="col-md-8 col-6 mb-2">
                            : {item.postalCode}
                          </div>
                          <div className="col-md-4 col-6 mb-2">{t('form.Email')}</div>
                          <div className="col-md-8 col-6 mb-2">
                            : {item.email}
                          </div>
                          <div className="col-md-4 col-6 mb-2">{t('form.Category')}</div>
                          <div className="col-md-8 col-6 mb-2">
                            : {item.category}
                          </div>
                        </div>
                        <Link href={item?.link}>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="mr-3 text-primary font-normal mb-3"
                        >
                          <i className="icon-direction mr-1"></i>{t('common.Get Direction')}
                        </a>
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm-6 col-12 pl-0 text-right">
                      <img
                        src={'/motorcycle-map.png'}
                        className="img-fluid img-cover"
                        alt=""
                        width={407}
                        height={437}
                      />
                    </div>
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

export default MarineAddress;
