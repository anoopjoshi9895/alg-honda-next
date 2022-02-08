import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { IAutoMobileCategoryItem,IContactUs } from '../../models/models';
import { RouteKeys } from '../../route/route-keys';
interface CustomProps {
  offer: IAutoMobileCategoryItem;
  locateUs: IAutoMobileCategoryItem;
  contactData:IContactUs
}
const AddressCard: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation('');
  const router = useRouter();
  const { defaultLocale, isFallback, query,locale } = router;
  const lang = locale;

  const data = props.contactData
  const contactPath = `/${lang}${RouteKeys.Contact}?type=automobiles`;

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-2">{t('landing.Find Honda Showrooms')}</h1>
            <p className="font-base text-gray-800 mb-4 pb-2">
              {t('landing.Visit your nearest Honda showroom')}
            </p>
          </div>
          <div className="col-md-4 col-12  widget-list d-flex flex-column mb-mb-0 mb-4">
            <div className="img-zoom">
              <Link 
              href={`/${lang}/${props?.offer?.link}`}
              ><a>
                <Image
                  src={props?.offer?.image?.url}
                  className="img-fluid img-cover w-100 map-min-height"
                  alt="Lincoln Navigator"
                  width={394}
                  height={364}
                />
                </a>
              </Link>
            </div>
            <h4 className="mt-4 mb-2 text-heading">{props?.offer?.title}</h4>
            <div className="pb-3 mb-1 text-muted font-normal">
              {props?.offer?.subTitle}
            </div>
            <Link
              href={`/${lang}/${props?.offer?.link}`}
            ><a className="align-items-center d-inline-flex font-normal font-weight-bold text-muted link mt-auto"
            >
              {t('common.VIEW OFFERS')}{' '}
              <i className="icon-chevron-right icon-flip-rtl font-xxxs font-weight-bold ml-2"></i>
              </a></Link>
          </div>
          <div className="col-md-8 col-12">
            <div className="bg-gray-100 pl-3 map-min-height">
              <div className="row">
                <div className="col-sm-6 col-12 py-3 pr-0">
                  {data?.autoMobiles?.showRooms?.map((item,index) => {
                    return (
                      <div className="bg-white p-3 rounded mb-3" key={index}>
                        <h6 className="font-normal my-1">{item?.title}</h6>
                        <p className="font-normal text-gray-800 mb-2 text-truncate">
                          {item?.address}
                        </p>
                        <div className="d-flex align-items-center font-xxxs text-uppercase font-weight-bold mb-1">
                          <Link
                          href={item?.link}
                          ><a
                            href={item?.link}
                            target="_blank"
                            rel="noreferrer"
                            className="mr-3 text-primary"
                          >
                            <i className="icon-direction mr-1"></i>{t('common.Get Direction')}
                          </a></Link>
                          <Link
                           href={contactPath}
                          ><a
                            href={contactPath}
                            className="mr-3 text-gray-800 text-decoration-underline"
                          >
                            {t('landing.View Timing')}
                          </a></Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-sm-6 col-12 pl-0">
                  <Image
                    src={props?.locateUs?.image?.url}
                    className="img-fluid w-100 h-100 img-cover"
                    alt=""
                    width={380}
                    height={403}
                  />
                </div>
              </div>
            </div>
            <h4 className="mt-4 mb-2 text-heading">{props?.locateUs?.title}</h4>
            <div className="pb-3 mb-1 text-muted font-normal">
              {props?.locateUs?.subTitle}
            </div>
            <Link
              href={contactPath}
            ><a className="align-items-center d-inline-flex font-normal font-weight-bold text-muted link mt-auto text-uppercase"
            >
              {t('landing.Find Us')}{' '}
              <i className="icon-chevron-right icon-flip-rtl font-xxxs font-weight-bold ml-2"></i>
              </a></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
