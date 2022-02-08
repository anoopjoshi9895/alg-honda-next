import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { IButton } from '../models/models';

interface CustomProps {
  data: IButton;
}

export const ButtonItem: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t, i18n } = useTranslation();
  const p = props.data;

  const buildRoutePath = (data: IButton, hash?: string) => {
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

  const buildRelativePath = (url: string) => {
    return {
      pathname: `/${i18n.language}${url}`,
    };
  };
  return (
    <>
      {(p?.automobile?.slug != null ||
        p?.motorcycle?.slug ||
        p?.power_product?.slug ||
        p?.marine?.slug) && (
          <Link
            href={buildRoutePath(p)}

          >
            <a type="button" className={
              'btn btn-primary text-uppercase letter-spacing ' +
              (p?.color === 'light_color' ? 'btn-light' : '')
            }>
              {p.text}</a>
          </Link>
        )}
      {p?.relativeUrl && (
        <Link
          href={buildRelativePath(p?.relativeUrl)}

        >
          <a type="button" className={
            'btn btn-primary text-uppercase letter-spacing ' +
            (p?.color === 'light_color' ? 'btn-light' : '')
          }>
            {p.text}</a>
        </Link>
      )}
      {p?.absoluteUrl && (
        <Link
          href={p?.absoluteUrl}

        >
          <a type="button" className={
            'btn btn-primary text-uppercase letter-spacing ' +
            (p?.color === 'light_color' ? 'btn-light' : '')
          }>
            {p.text}
          </a>
        </Link>
      )}
    </>
  );
};
