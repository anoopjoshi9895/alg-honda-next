import { TrimVarientProductModel } from 'alg-ecom-frontend-core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
interface CustomProps {
  products: TrimVarientProductModel[];
  onTabChange: any;
  selectedVarientId: number;
}
const MobileTabs: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const onTabChange = (product: TrimVarientProductModel) => {
    props.onTabChange(product);
  };
  return (
    <>
      <ul
        className="nav nav-pills mb-lg-2 pb-lg-1 d-lg-none font-normal text-uppercase font-weight-bold px-3"
        id="vechile-tab"
        role="tablist"
      >
        {props.products.map((product) => {
          return (
            <li
              className="nav-item pr-lg-2 pr-4"
              role="presentation"
              onClick={() => onTabChange(product)}
              key={product.productTitle}
            >
              <a
                className={classnames({
                  'nav-link': true,
                  active: props.selectedVarientId === product.productID,
                })}
                id="all-vehicles-tab"
                data-toggle="pill"
                href="javascript:void(0)"
                role="tab"
                aria-controls="all-vehicles"
                aria-selected="true"
              >
                {product.productTitle}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MobileTabs;
