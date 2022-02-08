import React from 'react';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { api, IBaseProductModel } from 'alg-ecom-frontend-core';
import { bindActionCreators } from 'redux';
import EnquireForm from './enquireForm';
import { QuickAccessFormsTypes, RouteKeys } from '../route/route-keys';
import ContainerFitLoader from './container-fit-loader';
import { useRouter } from "next/router";
import Link from "next/link";

export interface IProductModel {
  productID: number;
  productTitle: string;
  // variantSKU: string;
  // modelID: number;
  previewImage: string;
  offerPrice: string;
}

interface CustomProps {
  onPopupCancel: any;
  title: string;
  product: IProductModel;
  showRoomtype: string;
  enquireType: QuickAccessFormsTypes;
}
const EnquirePopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [showTankyou, setShowThankyou] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { defaultLocale, isFallback, query, locale } = router;
  const lang = locale;
  const [loading, setLoading] = React.useState<boolean>();
  const onSubmit = async (data: any) => {

    try {
      setLoading(true);
      const response = await api.quickAccess.SaveEnquiry({
        ...data,
        productID: props.product?.productID,
        campaignTag: sessionStorage.getItem('campaign') || '',
        businessSource: sessionStorage.getItem('track') || 'Alghanim website',
      });
      if (response.responsecode === 200) {
        // history.push(
        //   `/${lang}${RouteKeys.QuickAccessThankYou.replace(
        //     ':quickAccess',
        //     props.enquireType
        //   )}`
        // );
        props.onPopupCancel();
        // setShowThankyou(true);
      } else {
        toastr.error('Error', response?.message);
      }
    } catch (error) {
      //   toastr.error('Error', error?.response?.data?.message);
    }
    finally {
      setLoading(false);
    }
    // setIsSubmiting(false);
  };

  return (
    <>
      <div
        className="fade px-0 show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: 'block' }}
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
                <div className="w-100 position-relative">
                  <EnquireForm
                    onSubmit={onSubmit}
                    title={props.title}
                    product={props.product}
                    showRoomtype={props?.showRoomtype}
                  />
                  {loading && <ContainerFitLoader />}
                </div>
              ) : (
                <div className="thankyou-block py-5 text-center">
                  <div className="py-5">
                    <img src={'/thankyou-icon.svg'} alt="thank you" className="mb-5" />
                    <h3 className="text-uppercase mb-3">
                      {t('form.Thank you for the enquiry')}
                    </h3>
                    <p className="font-normal text-gray-700 mb-5">
                      {t('form.Thank_You_Text1')}
                    </p>
                    <Link
                      href={`/${lang}${RouteKeys.Home}`}
                    //   type="Link"

                    ><a
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


export default EnquirePopUp;