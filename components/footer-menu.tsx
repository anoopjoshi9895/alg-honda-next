import React from "react";
import Link from "next/link";
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
export const FooterMenu = (props: { menu: IFooterMenu; type: string }) => {
  const menu = props.menu;
  const [toggle, setToggle] = React.useState<boolean>(false);
  const buildRoutePath = (link: string) => {
    return {
      //   pathname: `/${i18n.language}${link}`,
    };
  };
  const toggleMenu = () => {
    if (window.innerWidth < 1024) {
      setToggle(!toggle);
    }
  };
  return (
    <div className="col-12 col-md-4 mb-4 mb-md-0">
      <h6
        className={`font-normal font-weight-bold text-uppercase  pb-3 m-0 ftr-grp-head ${
          toggle ? "expand" : ""
        }`}
        onClick={() => toggleMenu()}
      >
        {menu.title}
      </h6>
      <ul
        className={`list-unstyled p-0 m-0 font-normal ftr-grp-list ${
          toggle ? "expand" : ""
        }`}
      >
        {menu?.items?.map((p, index) => {
          return (
            <li key={props.type + index} className="mb-2">
              {p.relativeUrl != null && (
                <Link href={buildRoutePath(p.relativeUrl)} passHref>
                  <a className="d-block py-1">{p.label}</a>
                </Link>
              )}
              {p.absoluteUrl != null && (
                <Link href={p.absoluteUrl} passHref>
                  <a className="d-block py-1">{p.label}</a>
                </Link>
              )}

              {(p as any).action != null && (
                <Link href={"#" + (p as any).action} passHref>
                  <a className="d-block py-1">{p.label}</a>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
