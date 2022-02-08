import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { IAutoMobileCategoryItem } from "../../models/models";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface CustomProps {
  categories: IAutoMobileCategoryItem[];
}
const ListCard: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { defaultLocale, isFallback, query, locale } = router;
  const lang = locale;
  return (
    <>
      <div className="container py-5">
        <div className="row no-gutters">
          <div className="col-12 text-center">
            <h1 className="mb-2">{t("landing.autoTitle")}</h1>
            <p className="font-base text-gray-800 mb-4 pb-2">
              {t("landing.autoSubTitle")}
            </p>
          </div>
          {props?.categories?.map((item, index) => {
            return (
              <div className="col-md-4 col-12" key={index}>
                <Link href={`/${lang}/${item?.link}`}>
                  <a>
                    <Image
                      src={item?.image?.url}
                      className="img-flluid w-100 h-100"
                      alt={item?.title}
                      height={580}
                      width={416}
                      objectFit="contain"
                    />
                    <div className="position-absolute left-0 top-0 w-100 h-100 p-4 d-flex align-items-start justify-content-end flex-column">
                      <h2 className="text-white mb-1">{item?.title}</h2>
                      <p className="text-white mb-4">{item?.subTitle}</p>
                      <Link href={`/${lang}/${item?.link}`}>
                        <a className="btn bg-white text-primary mb-3 px-5">
                          {t("popup.Explore")}
                        </a>
                      </Link>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListCard;
