import React from "react";
import { toastr } from "react-redux-toastr";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import {
  api,
  ShowRoomModelBV,
  ProductViewModelBV,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import CommonRequestForm from "./forms/CommonRequestForm";
// import enquiryImage from "../../../assets/images/enquiry.svg";
import { useRouter } from "next/router";
import { QuickAccessFormsTypes } from "../../../utils/common";
import { RouteKeys } from "../../../utils/route-keys";
import Link from "next/link";
import { RootState } from "../../../app/store";
interface CustomProps {
  onPopupCancel: any;
  title: string;
  productID: number;
  showroomsList: ShowRoomModelBV[];
  productTitle: string;
  productImage: string;
  productDetails?: ProductViewModelBV | undefined;
}
const DownloadBrochurePopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [showTankyou, setShowThankyou] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.quickAccess.DownloadBrochure({
        ...data,
        productID: props.productID,
      });
      if (response.responsecode === 200) {
        downloadFile(props?.productDetails?.brochure || "");
        router.push(
          `${RouteKeys.QuickAccessThankYou.replace(
            ":quickAccess",
            QuickAccessFormsTypes.downloadBrochure
          )}`
        );
        // setShowThankyou(true);
      } else {
        toastr.error("Error", response?.message);
      }
    } catch (error: any) {
      toastr.error("Error", error?.response?.data?.message);
    }
  };

  const downloadFile = (URLToPDF: string) => {
    const oReq = new XMLHttpRequest();
    oReq.open("GET", URLToPDF, true);
    oReq.responseType = "blob";
    oReq.onload = () => {
      const file = new Blob([oReq.response], {
        type: "application/pdf",
      });
      saveAs(file, "mypdffilename.pdf");
    };

    oReq.send();
  };

  return (
    <>
      <div
        className="fade px-0 show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: "block" }}
        //   aria-labelledby="compareModalLabel"
        //   aria-hidden="true"
      >
        <div className="mm-0 h-100">
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
              {!showTankyou ? (
                <div className="w-100">
                  <CommonRequestForm
                    onSubmit={onSubmit}
                    title={props.title}
                    showroomsList={props.showroomsList}
                    productTitle={props.productTitle}
                    productImage={props.productImage}
                  />
                </div>
              ) : (
                <div className="thankyou-block py-5 text-center">
                  <div className="py-5">
                    {/* <img src={enquiryImage} alt="thank you" className="mb-4" /> */}
                    <h3 className="text-uppercase mb-3">
                      {t("form.Thank you for the enquiry")}
                    </h3>
                    <p className="font-normal text-gray-700 mb-4 pb-2">
                      {t("form.Thank_You_Text")}
                    </p>
                    <Link href={`${RouteKeys.Home}`} passHref>
                      <button
                        type="button"
                        onClick={props.onPopupCancel}
                        className="btn btn-primary font-md px-5"
                      >
                        <span className="d-block px-sm-4">
                          {t("form.BACK TO HOME")}
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
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
)(DownloadBrochurePopUp);
