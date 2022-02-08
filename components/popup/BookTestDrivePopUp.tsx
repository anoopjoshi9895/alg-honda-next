import React from 'react';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from "../../app/store";
import {
  api,
  TrimVarientProductModel,
  ShowRoomDetailsModel,
} from 'alg-ecom-frontend-core';
import { bindActionCreators } from 'redux';
import BookTestDriveForm from '../forms/BookTestDriveForm';
import CarSelection from '../car-selection';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ContainerFitLoader from '../../components/loader/container-fit-loader';

interface CustomProps {
  onPopupCancel?: any;
  product?: { id: number; image: string; price: number; title: string };
  showroomsList: ShowRoomDetailsModel[];
}
const BookTestDrivePopUp: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {

  const [showTankyou, setShowThankyou] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = React.useState<
    { id: number; image: string; price: number; title: string } | undefined
  >(props.product || undefined);
  const [codeYear, setCodeYear] = React.useState<{
    code: string;
    year: number;
    trim: string;
  }>({
    code: '',
    year: 0,
    trim: '',
  });
  const [trimList, setTrimList] = React.useState<TrimVarientProductModel[]>();
  const [loading, setLoading] = React.useState<boolean>();
  const router = useRouter()
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await api.quickAccess.BookTestDrive({
        ...data,
        productID: selectedProduct?.id,
        campaignTag: sessionStorage.getItem('campaign') || '',
        businessSource: sessionStorage.getItem('track') || 'Alghanim website',
      });
      if (response.responsecode === 200) {
        router.push(
          "/test-drive/thank-you"
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

  const onSelectProduct = (
    productID: number,
    image: string,
    price: number,
    title: string
  ) => {
    setSelectedProduct({ id: productID, image, price, title });
  };

  const onSelectedTirm = (code: any, year: any, trim: any) => {
    setCodeYear({ code, year, trim });
  };

  React.useEffect(() => {
    async function getTrimList() {
      if (!codeYear?.trim) {
        const data = await api.build.trimList(codeYear?.year, codeYear?.code);
        setTrimList(data?.productsList);
      } else {
        // const data = await api.build.trimList(codeYear?.year, codeYear?.code);
        const data = await api.build.trimWiseList(
          codeYear?.year,
          codeYear?.code,
          codeYear?.trim
        );
        setTrimList(data?.productsList);
      }
    }
    getTrimList();
  }, [codeYear]);

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
        <div className="m-0 h-100">
          <div className="modal-content rounded-0 h-100 overflow-auto">
            <div className="modal-body p-0">
              {props.onPopupCancel && (
                <button
                  type="button"
                  className="position-absolute right-0 top-0 zIndex-1 font-sm bg-transparent rounded-circle border-0 p-1 m-2 d-inline-block"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.onPopupCancel()}
                >
                  <i className="icon-close text-muted"></i>
                </button>
              )}
              {!showTankyou ? (
                <div className="w-100 product-selection">
                  {selectedProduct && (
                    <>
                      <BookTestDriveForm
                        onSubmit={onSubmit}
                        showroomsList={props.showroomsList}
                        productImage={selectedProduct.image}
                        productId={selectedProduct.id}
                        productTitle={selectedProduct.title}
                      />
                      {loading && <ContainerFitLoader />}
                    </>
                  )}
                  {!selectedProduct && (
                    <CarSelection
                      onSelectComplete={onSelectProduct}
                      onSelectTrim={onSelectedTirm}
                    />
                  )}
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
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(BookTestDrivePopUp);
