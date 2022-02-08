import React from "react";
import classnames from "classnames";
import Select from "react-select";
import { connect } from "react-redux";
import { RootState } from "../../app/store";
import {
  commonActions,
  BuildPriceBodyModelDataModel,
  api,
  BannerDataModel,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import Slider from "react-slick";
import { FullPageLoader } from "../../components/loader";
import ReactHtmlParser from "react-html-parser";
import XmlEntities from "html-entities";
import { useDataLoader } from "../../utils/useDataLoader";

const SliderBanners: React.FunctionComponent<{}> = (props) => {
  const { data, reload, loaded, loading } = useDataLoader<BannerDataModel>(() =>
    api.build.bannerList()
  );
  if (!data) {
    return <FullPageLoader />;
  }
  return (
    <>
      {data && data?.bannerList?.length > 0 && (
        <div className="home-slider-outer">
          <Slider
            key={"banner-slider"}
            dots={true}
            draggable
            infinite={false}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={2500}
            arrows={false}
            className="home-slider"
          >
            {data?.bannerList.map((banner) => {
              return (
                <div className="slide" key={banner.bannerID}>
                  <div className="position-relative">
                    <img
                      src={banner.bannerImage}
                      alt={banner.bannerTitle}
                      className="img-fluid w-100"
                    />
                    <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-lg-center align-items-end">
                      <div className="container pb-5 mb-5  mb-lg-0">
                        {ReactHtmlParser(
                          XmlEntities.decode(banner.bannerContent),
                          {
                            decodeEntities: true,
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="container  position-relative">
            <div className="action-btn-container position-absolute">
              <span className="cursor-pointer active pause icon-pause action-btn"></span>
              <span className="cursor-pointer  play action-btn"></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      toggleMenu: commonActions.toggleMenu,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isMenuOpen: state.commonState.headerMenuOpen,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SliderBanners);
