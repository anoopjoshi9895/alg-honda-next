import React from "react";
import Image from "next/image";
import classnames from "classnames";
import MidSliderTabContent from "./mid-slider-tab-content";
import { useTranslation } from "next-i18next";
import { IHomepageSlider } from "../models/models";

interface CustomProps {
  automobileSlider: IHomepageSlider[];
  marineSlider: IHomepageSlider[];
  powerProductSlider: IHomepageSlider[];
  motorcycleSlider: IHomepageSlider[];
}

const MidSliderWithTabs: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const {
    automobileSlider,
    marineSlider,
    powerProductSlider,
    motorcycleSlider,
  } = props;
  const { t } = useTranslation("common");

  const sliderItems: IMidsliderItem[] = [
    {
      title: t("common.automobiles"),
      tab: MidSlliderTabs.Automobiles,
      image: "/car.png",
      component: () => (
        <MidSliderTabContent
          type="automobiles"
          automobileSlider={automobileSlider}
        />
      ),
    },
    {
      title: t("common.motorcycles"),
      tab: MidSlliderTabs.Motorcycles,
      image: "/bike.png",
      component: () => (
        <MidSliderTabContent
          type="motorcycle"
          automobileSlider={motorcycleSlider}
        />
      ),
    },
    {
      title: t("common.power_product"),
      tab: MidSlliderTabs.PowerProduct,
      image: "/product.png",
      component: () => (
        <MidSliderTabContent
          type="powerproducts"
          automobileSlider={powerProductSlider}
        />
      ),
    },
    {
      title: t("common.marine"),
      tab: MidSlliderTabs.Marine,
      image: "/marine.png",
      component: () => (
        <MidSliderTabContent type="marines" automobileSlider={marineSlider} />
      ),
    },
  ];
  const [activeTab, setActiveTab] = React.useState<IMidsliderItem>(
    sliderItems[0]
  );

  return (
    <div className="widget-slider pt-lg-3">
      <div className="container-fluid py-lg-5 py-4 text-md-center">
        <h2 className="mb-3 h1">{t("home.defining_unlimited_boundaries")}</h2>
        <p className="font-base mx-auto mb-3 mb-lg-4 desc-block text-muted ">
          {t("home.dub_text")}
        </p>
        <nav className="justify-content-center nav">
          {sliderItems.map((p, index) => {
            return (
              <div
                key={"slider-item" + p.title + index}
                className={classnames({
                  "nav-link": true,
                  active: activeTab.tab === p.tab,
                })}
                onClick={() => {
                  setActiveTab(p);
                }}
              >
                <div className="icons d-flex align-items-center justify-content-center">
                  {/* <Image src={p.image} alt={p.title} width={40} height={24} />{" "} */}
                  <img src={p.image} alt={p.title} />
                </div>
                <span className="font-base font-weight-semibold">
                  {p.title}
                </span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="tab-content pb-lg-5 pb-4 experience-tabs">
        {activeTab.component()}
      </div>
    </div>
  );
};

export default MidSliderWithTabs;

export interface IMidsliderItem {
  title: string;
  tab: MidSlliderTabs;
  image: string;
  component: any;
}

enum MidSlliderTabs {
  Automobiles = "Automobiles",
  Motorcycles = "Motorcycles",
  PowerProduct = "Power Product",
  Marine = "Marine",
}
