import React from "react";
import { useTranslation } from "react-i18next";

interface CustomProps {
  onPopupCancel: any;
}
const TermsPopup: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="m-0 h-100">
        <div className="modal-content rounded-0 h-100 overflow-auto">
          <div className="modal-body px-4 py-5">
            <div className="row">
              <div className="col-12">
                <h3 className="mb-3 pr-sm-0 pr-5">Terms & Conditions</h3>
              </div>
            </div>
            <button
              type="button"
              className="position-absolute right-0 top-0 zIndex-1 font-sm bg-gray-200 rounded-circle border-0 p-3 m-3 d-inline-block"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.onPopupCancel()}
            >
              <i className="icon-close text-muted"></i>
            </button>
            <div className="row">
              <div className="col-12">
                <p className="font-normal mb-4">
                  Please read the terms and conditions of use carefully before
                  selecting any products or services. By selecting, you agree to
                  be bound by these terms and conditions (&quot;Terms&quot;) and
                  our Privacy Policy.
                </p>
                <button className="btn btn-secondary text-uppercase">
                  I Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPopup;
