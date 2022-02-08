import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import _ from 'lodash';
import { RouteKeys } from '../../route/route-keys';

import { IPowerProducts, IProductDetails } from '../../models/models';

import ProductCard from './productCard';
import classnames from 'classnames';

interface CustomProps{
    response:IPowerProducts[]
}

const PowerProductList = ({response}:CustomProps) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { defaultLocale, isFallback, query,locale } = router;
  const lang = locale;
 
  const [tab, setTab] = useState('all');

  useEffect(() => {
    loadPowerProducts();
  }, []);
  const [isLaoding, setIsLoading] = React.useState(false);

  const loadPowerProducts = async () => {
    setIsLoading(true);
    try {
    //   const response = await loadPowerproductForLanding(lang);
      const sortedResponse = _.sortBy(response, 'category');
      setPowerProducts(sortedResponse ?? []);
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const [powerProducts, setPowerProducts] = React.useState<IPowerProducts[]>(
    []
  );

  const powerProductList =
    tab !== 'all'
      ? powerProducts.filter((p) => p.category === tab) ?? []
      : powerProducts;

  const createLink = (item: IPowerProducts) => {
    return `/${lang}${RouteKeys.PowerProductDetail.replace(':type', item.type)
      .replace(':model', item?.ecomProductId)
      .replace(':slug', item?.slug)}`;
  };

  const tabs = ['tiller', 'generator', 'water_pump', 'engine'];

  return (
    <>
      <div className="container pt-5">
        <div className="row pt-3">
          <div className="col-12">
            <h1 className="mb-4 pb-2 text-center">
              {t('detail.power_products')}
            </h1>
          </div>
          <div className="col-12 mb-5 pb-4">
            <div className="tab-underline nav overflow-auto flex-nowrap text-nowrap">
              <li className="nav-item px-md-3 ml-auto">
                <a
                  className={classnames({
                    'nav-link': true,
                    active: tab === 'all',
                  })}
                  onClick={() => setTab('all')}
                >
                  <span
                    className={classnames({
                      'font-lg font-weight-semibold ': true,
                      'text-primary': tab === 'all',
                      'text-gray-700': tab !== 'all',
                    })}
                  >
                    {t('popup.All')}
                  </span>
                </a>
              </li>
              {tabs?.map((item, index) => {
                return (
                  <li
                    className={classnames({
                      'nav-item px-md-3': true,
                      'mr-auto': index === tabs.length - 1,
                    })}
                    key={index}
                  >
                    <a
                      className={classnames({
                        'nav-link': true,
                        active: tab === item,
                      })}
                      onClick={() => setTab(item)}
                    >
                      <span
                        className={classnames({
                          'font-lg font-weight-semibold ': true,
                          'text-primary': tab === item,
                          'text-gray-700': tab !== item,
                        })}
                      >
                        {t(`landing.${item}`)}
                      </span>
                    </a>
                  </li>
                );
              })}
            </div>
          </div>
          {powerProductList?.map((p, index) => {
            return (
              <div
                key={'power-product-grouped-item' + index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3 pb-lg-4 mb-lg-5"
              >
                <div className="d-flex flex-column h-100 powerproduct-listing">
                  <figure className="marine-img-block text-center px-4 d-flex align-items-end justify-content-center mb-5">
                    <Link
                      href={createLink(p)}
                    ><a className="d-inline-block w-100 h-100">
                      <img
                        src={p?.displayImage?.url ?? p.megaMenuThumb?.url}
                        alt={p?.title}
                        className="img-fluid mx-auto"
                      />
                    </a></Link>
                  </figure>
                  <div className="content-marine text-center">
                    <h5 className="mb-2">
                      <Link href={createLink(p)} >
                          <a className="text-secondary">
                        {p?.title}
                      </a></Link>
                    </h5>
                    {p?.subTitle && (
                      <p className="font-normal text-heading mb-3 pb-1">
                        {p?.subTitle}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto text-center">
                    <h6 className="mb-3 pb-2">{p?.price}</h6>
                    <Link
                      href={createLink(p)}
                    >
                        <a className="cursor-pointer btn btn-outline-secondary btn-block border-width-2">
                      {t('build_vehicle.View Details')}
                      </a>
                    </Link>
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

export default PowerProductList;
