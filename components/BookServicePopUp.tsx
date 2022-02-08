import React from 'react';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from "../app/store";
import {
  commonActions,
  ShowRoomModelBV,
  ProductViewModelBV,
  api,
  CartStateModel,
  TrimVarientProductModel,
  AllVehicleStateModel,
  allVehicleModelActions,
  ShowRoomDetailsModel,
} from 'alg-ecom-frontend-core';
import { bindActionCreators } from 'redux';
import BookServiceForm from './BookServiceForm';
import { useRouter } from 'next/router';
import Link from 'next/link'
import ContainerFitLoader from '../components/loader/container-fit-loader';
interface CustomProps {
  // images: string[];
  onPopupCancel?: any;
  productID?: number;
  showroomsList?: ShowRoomDetailsModel[];
  productDetails?: ProductViewModelBV | undefined;
  cartData: CartStateModel;
  trimList?: TrimVarientProductModel[];
  showModel?: boolean;
  vehicleModels: AllVehicleStateModel;
}
const BookServicePopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();
  const [showTankyou, setShowThankyou] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>();
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await api.quickAccess.BookService({
        ...data,
        userID: 1,
        campaignTag: sessionStorage.getItem('campaign') || '',
        businessSource: sessionStorage.getItem('track') || 'Alghanim website',
      });
      if (response.responsecode === 200) {
        router.push(
          `/service-appointment/thank-you`
        )

        props.onPopupCancel();
        // setShowThankyou(true);
        // toastr.success('Success', 'Test drive booked successfully');
      } else {
        toastr.error('Error', response?.message);
      }
    } catch (error: any) {
      toastr.error('Error', error?.response?.data?.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fade px-0 show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: 'block' }}
      >
        <div className="m-0 h-100">
          <div className="modal-content rounded-0 h-100 overflow-auto">
            <div className="modal-body p-0">
              {props.onPopupCancel && (
                <button
                  type="button"
                  className="position-absolute right-0 top-0 zIndex-1 font-sm bg-gray-200 rounded-circle border-0 p-3 m-3 d-inline-block"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.onPopupCancel()}
                >
                  <i className="icon-close text-muted"></i>
                </button>
              )}
              {!showTankyou ? (
                <div className="w-100 position-relative">
                  {props.vehicleModels?.modelsList && (
                    <BookServiceForm
                      onSubmit={onSubmit}
                      showroomsList={props.showroomsList}
                      productDetails={props.productDetails}
                      image={
                        props.cartData?.productInfo?.combinationInfo[0]
                          ?.combinationMedia[0]?.image
                      }
                      trimList={props.trimList}
                      showModel={props.showModel}
                      productID={props.productID}
                      modelsList={props.vehicleModels.modelsList?.filter(
                        (item) => item.vehicleType === 'honda cars'
                      )}
                    // default={{doorToDoor:'No'}}
                    />
                  )}
                  {loading && <ContainerFitLoader />}
                </div>
              ) : (
                <div className="thankyou-block py-5 text-center">
                  <div className="py-5">
                    <img src="/assets/images/enquiry.svg" alt="thank you" className="mb-4" />
                    <h3 className="text-uppercase mb-3">
                      {t('form.Thank you for the enquiry')}
                    </h3>
                    <p className="font-normal text-gray-700 mb-4 pb-2">
                      {t('form.Thank_You_Text')}
                    </p>
                    <Link
                      href={`/`}
                    >
                      <a
                        type="button"
                        onClick={props.onPopupCancel}
                        className="btn btn-primary font-md px-5"
                      >
                        <span className="d-block px-sm-4">
                          {t('form.BACK TO HOME')}
                        </span>
                      </a>
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
      getVehicleModelsList: allVehicleModelActions.getVehicleModelsList,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    cartData: state.cartState,
    vehicleModels: state.allVehicleState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(BookServicePopUp);
