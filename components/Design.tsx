import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IDesign } from "../models/models";
import SliderWithListItems from "./sliderWithDetails";

interface CustomProps {
  designItems: IDesign[];
  buildLink?: string;
}

const Design: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const items = props.designItems;

  const [innerDesignTab, setInnerDesignTab] = useState<IDesign>(items[0]);

  useEffect(() => {
    if (items.length > 0 && innerDesignTab == null) {
      setInnerDesignTab(items[0]);
    }
  }, [items]);

  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="detail-gallery py-lg-4 pt-4 pb-3">
        <h3 className="text-uppercase text-center mb-3 px-3">
          {t("detail.exterior_interior")}
        </h3>
        <div className="tab-content detail-banner">
          <div className={`tab-pane fade show active`}>
            <div className="position-relative mb-lg-3">
              <ul className="nav nav-pills tab-underline d-inline-flex mb-2 font-normal zIndex-1 top-0 left-0 w-100 justify-content-center pb-lg-4 pt-lg-0 py-3 text-uppercase">
                {items?.map((p, index) => {
                  return (
                    <li className="nav-item mr-md-5 mr-4" key={index}>
                      <a
                        className={`nav-link font-weight-bold px-0 bg-transparent ${
                          innerDesignTab?.id === p.id
                            ? `text-primary active`
                            : ""
                        }`}
                        onClick={() => setInnerDesignTab(p)}
                      >
                        {p.title}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="tab-content">
                {items[0]?.items && (
                  <div
                    key={
                      "slider-items" +
                      innerDesignTab?.items?.map((p) => p.id)?.join()
                    }
                    className={`tab-pane fade show active `}
                  >
                    <SliderWithListItems
                      title={""}
                      align={"left"}
                      items={innerDesignTab.items}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;
