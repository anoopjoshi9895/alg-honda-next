import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../../app/store";
// import enquiryImage from "../../../assets/images/enquiry.svg";
interface CustomProps {
  // images: string[];
  onPopupCancel: any;
  onConfirmConfig: (confirm: string) => void;
}
const SaveConfigConfirmPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="fade px-0 small-popup show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: "block" }}
      >
        <div className="m-0 h-100">
          <div className="modal-content rounded-0 h-100 overflow-auto">
            <div className="modal-body p-0">
              <button
                type="button"
                className="position-absolute right-0 top-0 zIndex-1 font-sm bg-gray-200 rounded-circle border-0 p-3 m-3 d-inline-block"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.onPopupCancel()}
              >
                <i className="icon-close text-muted"></i>
              </button>

              <div className="thankyou-block py-5 text-center">
                <div className="py-5">
                  {/* <img src={enquiryImage} alt="thank you" className="mb-4" /> */}

                  <p className="font-normal text-gray-700 mb-4 pb-2">
                    {t("build_vehicle.Confirm save or update configuration")}
                  </p>
                  <button
                    type="button"
                    onClick={() => props.onConfirmConfig("Yes")}
                    className="btn btn-primary font-md px-5 mr-3"
                  >
                    <span className="d-block px-sm-4">
                      {t("build_vehicle.Save")}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onConfirmConfig("No")}
                    className="btn btn-primary font-md px-5"
                  >
                    <span className="d-block px-sm-4">
                      {t("build_vehicle.Update")}
                    </span>
                  </button>
                </div>
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SaveConfigConfirmPopUp);
