import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface ILinkItem {
  label: string;
  relativeUrl?: string;
  absoluteUrl?: string;
}

export interface IFooterMenu {
  title: string;
  items: ILinkItem[];
  isDisable?: boolean;
}
export const ExtraLink = (props: { menu: IFooterMenu; type: string }) => {
  const router = useRouter()
  const lang = router.locale;

  const menu = props.menu;
  const buildRoutePath = (link: string) => {
    return {
      pathname: `/${lang}${link}`,
    };
  };
  return (
    <ul className="row gutter-8 justify-content-md-end justify-content-start list-unstyled p-0 mb-0 text-capitalize font-sm">
      {menu?.items?.map((p, index) => {
        return (
          <li key={props.type + index} className="col-auto">
            {p.relativeUrl != null && p.relativeUrl !== '' && (
              <Link
                href={buildRoutePath(p.relativeUrl)}
              // className="px-md-2 text-muted link"
              ><a
                className="px-md-2 text-muted link"
              >{p.label}</a>
              </Link>
            )}
            {p.absoluteUrl != null && p.absoluteUrl !== '' && (
              <Link href={p.absoluteUrl}
              // className="px-md-2 text-muted link"
              ><a
                className="px-md-2 text-muted link"
              >{p.label}</a>
              </Link>
            )}

            {(p as any).action != null && (p as any).action !== '' && (
              <Link
                href={'#' + (p as any).action}
              // className="px-md-2 text-muted link"
              ><a
                className="px-md-2 text-muted link"
              >{p.label}</a>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};
