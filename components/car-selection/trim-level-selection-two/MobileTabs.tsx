import { EditionVarientProductModel } from 'alg-ecom-frontend-core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
interface CustomProps {
  products: EditionVarientProductModel[];
  onTabChange: any;
  selectedVarientId: number;
}
const MobileTabs: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  const onTabChange = (product: EditionVarientProductModel) => {
    props.onTabChange(product);
  };
  return (
    <>
      <ul
        className="nav nav-pills mb-lg-2 pb-lg-1 d-lg-none font-normal text-uppercase font-weight-bold px-3"
        id="vechile-tab"
        role="tablist"
      >
        {props.products.map((product, key) => {
          return (
            <li
              className="nav-item pr-lg-2 pr-4"
              role="presentation"
              key={key}
              onClick={() => onTabChange(product)}
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
