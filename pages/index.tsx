import type { NextPage, GetStaticProps } from "next";
import { store } from "../app/store";
import { getSlideAsync } from "../feature/slideSlice";
import { getNewsAsync } from "../feature/newsSlice";
import SliderBanner from "../components/slider-banner";
import MidSliderWithTabs from "../components/mid-slider-with-tabs";
import { LandingOffer } from "../components/landing-offer";
import { StayConnected } from "../components/stay-connected";
import NewsItems from "../components/newsItems";
import { useRouter } from "next/router";
import { ILandingScreenData, INewsItem, IFooter } from "../models/models";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/Layout";
import { getFooterAsync } from "../feature/footerSlice";
import { getPlaiceholder } from "plaiceholder";
import SeoMetaDetails from "../components/seo-meta-details/SeoMetaDetails";

interface ImageProps {
  blurDataURL: String;
  width?: string | number | undefined;
  src: String;
  type: String;
  height?: string | number | undefined;
}

interface SSRHomeData {
  slide: ILandingScreenData;
  news: INewsItem;
  footerData: IFooter;
  imageProps: ImageProps;
}
const Home: NextPage<SSRHomeData> = ({
  slide,
  news,
  footerData,
  imageProps,
}: SSRHomeData) => {
  const router = useRouter();
  const {
    topSlider,
    automobileSlider,
    marineSlider,
    powerProductSlider,
    motorcycleSlider,
    offers,
    stayConnected,
    seo,
  } = slide;

  return (
    <Layout footerData={footerData}>
      {topSlider && (
        <div className="content-wrapper home overflow-hidden">
          <SliderBanner detail={topSlider} />
          <MidSliderWithTabs
            automobileSlider={automobileSlider}
            marineSlider={marineSlider}
            powerProductSlider={powerProductSlider}
            motorcycleSlider={motorcycleSlider}
          />
          <div className="">
            <LandingOffer data={offers} imageProps={imageProps} />
          </div>
          <div className="">
            <StayConnected data={stayConnected} />
          </div>
          <div className="">
            <NewsItems data={news} />
          </div>
        </div>
      )}
      <SeoMetaDetails seoDetails={seo} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
  locales,
}: any) => {
  await Promise.all([
    store.dispatch(getNewsAsync(locale)),
    store.dispatch(getSlideAsync(locale)),
    store.dispatch(getFooterAsync(locale)),
  ]);

  const news = store.getState().news.data;
  const slide: ILandingScreenData = store.getState().slide.data;
  const footer = store.getState().footer.data;
  //
  const base64Slider = await Promise.all(
    slide?.topSlider
      ?.filter((p) => p.image?.url)
      .map(async (sliderImage: { image: { url: string | Buffer } }) => {
        const { base64, img } = await getPlaiceholder(sliderImage?.image?.url);
        return {
          ...sliderImage,
          image: { ...sliderImage.image, blurDataURL: base64, ...img },
        };
      }) ?? []
  ).then((values) => values);

  const clone = { ...slide };
  clone.topSlider = base64Slider as any;
  //

  const { base64, img } = await getPlaiceholder(
    "https://alg-honda-staging-s3.s3.eu-central-1.amazonaws.com/public/uploads/honda/Service_Offer_785579cd79_896152c357.jpg",
    { size: 10 }
  );
  if (!news || !slide || !footer) {
    return {
      notFound: true,
      props: {},
      revalidate: 1,
    };
  } else {
    return {
      props: {
        locale: locale,
        locales: locales,
        ...(await serverSideTranslations(locale, ["common"])),
        // slide: slide,
        slide: clone,
        news: news,
        footerData: footer,
        imageProps: {
          ...img,
          blurDataURL: base64,
        },
      },
      revalidate: 60,
    };
  }
};

export default Home;
