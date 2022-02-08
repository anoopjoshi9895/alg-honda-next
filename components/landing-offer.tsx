import React from "react";
// import { useTranslation } from 'react-i18next';
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export interface IImage {
  id: number;
  name: string;
  url: string;
}
export interface ILandingOfferItem {
  title: string;
  image: IImage;
  description: string;
  link: string;
}
interface ImageProps{
  blurDataURL: String
  width?: string | number | undefined
  src: String
  type: String
  height?: string | number | undefined
  }
export interface ILandingOffer {
  title: string;
  subTitle: string;
  offers: ILandingOfferItem[];
}
interface CustomProps {
  data:ILandingOffer
  imageProps:any
}
export const LandingOffer = ({ data,imageProps }:CustomProps) => {
  //   const { t, i18n } = useTranslation();
  //   const { lang } = useParams<{
  //     lang: string;
  //   }>();
  // const data = props.data;
  const createLink = (text: string) => {
    // switch (text) {
    //   case 'motorcycle':
    //     return `/${lang}${RouteKeys.MotorcycleOfferListing}`;
    //   case 'car':
    //     return `/${lang}${RouteKeys.AutomobileOfferListing}`;
    //   case 'power_product':
    //     return `/${lang}${RouteKeys.PowerProductOfferListing}`;
    //   case 'marine':
    //     return `/${lang}${RouteKeys.MarineOfferListing}`;
    //   case 'service_offer':
    //     return `/${lang}${RouteKeys.ServiceOfferListing}`;
    //   default:
    //     return `/${lang}${RouteKeys.AutomobileOfferListing}`;
    // }
  };
  const { t } = useTranslation('common')

  return (
    <div className="bg-gray">
      <div className="container py-lg-5 py-4  text-md-center">
        <h2 className="mb-3 h1 text-capitalize">{data.title}</h2>
        <p className="font-base mx-auto mb-3 mb-lg-4 desc-block text-muted ">
          {data.subTitle}
        </p>
        <div className="row pt-4 text-left pb-lg-3 w-offer-list justify-content-lg-center">
          {data?.offers?.map((p, index) => {
            return (
              <div
                key={"landing-offer-item" + index}
                className="col-lg-4 col-sm-6 col-12 mb-5 mb-lg-0 widget-list d-flex flex-column"
              >
                <div className="img-zoom">
                  <Link
                    href={"/"}
                  // href={createLink(p.link)}
                  >
                    <a>
                      <Image
                        // src={p.image?.url}
                        alt="Lincoln Navigator"
                        width={396}
                        height={215}
                        layout="responsive"
                        className="img-fluid img-cover w-100"
                        {...imageProps} placeholder="blur"
                      />
                    </a>
                  </Link>
                </div>
                <h6 className="mt-4 mb-lg-0 pb-2 h6">
                  <a
                    //  href={"/"}
                    //  href={createLink(p.link)}
                    className="text-heading"
                  >
                    {p?.title}
                  </a>
                </h6>
                <div className="pb-3 text-muted">
                  <a
                    //   href={createLink(p.link)}
                    className="text-muted"
                  >
                    {p?.description}
                  </a>
                </div>
                <a
                  href={"/"}
                  // href={createLink(p.link)}
                  className="align-items-center d-inline-flex font-normal font-weight-bold text-muted link mt-auto"
                >
                  {/* {t('common.VIEW OFFERS')}{' '} */}
                  {t("common.VIEW OFFERS")}
                  <i className="icon-chevron-right icon-flip-rtl font-xxxs font-weight-bold ml-2"></i>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
