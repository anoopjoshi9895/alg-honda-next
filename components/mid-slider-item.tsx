import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

interface CustomProps {
  type: "powerproducts" | "automobiles" | "motorcycle" | "marines";
  slug: string;
  name: string;
  image: any;
  price: string;
  seats: string;
  year: string;
}

const MidSliderItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation("common");
  return (
    <div className="w-slide">
      <div className="px-lg-5 px-3 d-flex flex-column">
        <figure className="car">
          <Image
            src={`${props.image}`}
            width={888}
            height={339}
            className="img-fluid"
            objectFit="contain"
            alt={props.name}
          />
        </figure>
        <div className="row justify-content-md-between align-items-md-center w-content">
          <div className="col-12">
            <div className="row align-items-center justify-content-between">
              <div className="col col-xl-auto pr-xl-5">
                <span className="font-normal text-muted">{props.year}</span>

                <Link href={`/${props.type}/${props.slug}`}>
                  <a className="h2 d-flex align-items-center m-0 p-0">
                    {props.name}
                    <i className="icon-chevron-right font-md font-weight-bold mx-2"></i>
                  </a>
                </Link>
                <span className="font-normal text-muted">{props.seats} </span>
              </div>
              {props.price && (
                <div className="col-auto col-xl">
                  <span className="font-normal text-muted">
                    {t("common.starting_at")}
                  </span>
                  <h6 className="text-primary">{props.price}</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidSliderItem;
