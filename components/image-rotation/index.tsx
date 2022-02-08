import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Iframe from "react-iframe";
import { bindActionCreators } from "redux";
import { RootState } from "../../app/store";
// import { FullPageLoader } from "../../components/loader";
interface CustomProps {
  images: any;
  onPopupCancel: any;
  iFrameUrl: string;
}
const ImageRotaion: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [isLoaded, setLoaded] = React.useState(false);
  const { t } = useTranslation();
  const setIframeLoaded = () => {
    setTimeout(() => setLoaded(true), 3000);
  };

  return (
    <>
      <div
        className="modal fade px-0 compare-popup show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: "block" }}
        //   aria-labelledby="compareModalLabel"
        //   aria-hidden="true"
      >
        <div className="modal-dialog m-0 h-100">
          <div className="modal-content rounded-0 h-100 overflow-auto">
            <div className="modal-body p-0">
              <button
                type="button"
                className="position-absolute right-0 top-0 zIndex-1 font-sm bg-gray-200 rounded-circle border-0 p-3 m-3 d-lg-inline-block d-none"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.onPopupCancel()}
              >
                <i className="icon-close text-muted"></i>
              </button>
              <div className="w-100 col-md-11 col-12 mx-auto">
                {/* {!isLoaded && <FullPageLoader></FullPageLoader>} */}
                <Iframe
                  url={props.iFrameUrl}
                  height="700px"
                  id="myId"
                  className="w-100"
                  frameBorder={0}
                  position="relative"
                  loading="lazy"
                  onLoad={() => setIframeLoaded()}
                />
                {/* <Rotation>
                  {props.images.map((item) => {
                    return <img src={item} key={item} />;
                  })}
                </Rotation> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(ImageRotaion);
