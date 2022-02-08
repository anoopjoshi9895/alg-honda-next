import React from "react";
import { toastr } from "react-redux-toastr";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  commonActions,
  ShowRoomModelBV,
  ProductViewModelBV,
  api,
} from "alg-ecom-frontend-core";
import { bindActionCreators } from "redux";
import ShowRoomVisitForm from "./forms/ShowRoomVisitForm";
// import enquiryImage from "../../../assets/images/enquiry.svg";
import { useRouter } from "next/router";
import { QuickAccessFormsTypes, RouteKeys } from "../../../utils/route-keys";
import Link from "next/link";
import { RootState } from "../../../app/store";
interface CustomProps {
  // images: string[];
  onPopupCancel: any;
  productID: number;
  showroomsList: ShowRoomModelBV[];
  productDetails: ProductViewModelBV | undefined;
}
const ShowRoomVisitPopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [showTankyou, setShowThankyou] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.quickAccess.ShowRoomVisit({
        ...data,
        productID: props.productID,
        campaignTag: sessionStorage.getItem("campaign") || "",
        businessSource: sessionStorage.getItem("track") || "Alghanim website",
      });
      if (response.responsecode === 200) {
        router.push(
          `${RouteKeys.QuickAccessThankYou.replace(
            ":quickAccess",
            QuickAccessFormsTypes.showroomVisit
          )}`
        );
        // setShowThankyou(true);
        // toastr.success('Success', 'Request saved successfully');
      } else {
        toastr.error("Error", response?.message);
      }
    } catch (error: any) {
      toastr.error("Error", error?.response?.data?.message);
    }
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
              {!showTankyou ? (
                <div className="w-100">
                  <ShowRoomVisitForm
                    onSubmit={onSubmit}
                    showroomsList={props.showroomsList}
                    productDetails={props.productDetails}
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
  return {
    user: state.authState.user,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ShowRoomVisitPopUp);
