import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  allVehicleModelActions,
  AllVehicleStateModel,
  api,
  commonActions,
  ProductModelItemModel,
  productModelsActions,
  ShowRoomDetailsModel,
  showRoomListActions,
  TrimVarientProductModel,
} from "alg-ecom-frontend-core";
import { RootState, store } from "../../app/store";
import FullPageLoader from "../../components/loader/full-page-loader";
import BookServicePopUp from "../../components/BookServicePopUp";
import FinanceCalculatorPopUp from "../../components/popup/FinanceCalculatorPopUp";
import BookTestDrivePopUp from "../../components/popup/BookTestDrivePopUp";
import RequestQuotePopUp from "../../components/popup/RequestQuotePopUp";
import DownloadBrochurePopUp from "../../components/popup/DownloadBrochurePopUp";
import RequestCallbackPopUp from "../../components/popup/RequestCallbackPopUp";
import { PopupValues } from "../../components/AllPopUp";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getFooterAsync } from "../../feature/footerSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IFooter } from "../../models/models";
import Layout from "../../components/Layout";

interface CustomProps {
  servicePopupOpen: boolean;
  bookTestDrivePopupOpen: boolean;
  toggleRequestCallback: typeof commonActions.toggleRequestCallback;
  toggleBookTestDrive: typeof commonActions.toggleBookTestDrive;
  toggleDownloadBrochure: typeof commonActions.toggleDownloadBrochure;
  toggleRequestQuote: typeof commonActions.toggleRequestQuote;
  toggleSheduleShowroomVisit: typeof commonActions.toggleSheduleShowroomVisit;
  toggleFinancePopUp: typeof commonActions.toggleFinancePopUp;
  toggleServicePopUp: typeof commonActions.toggleServicePopUp;
  vehicleModels: AllVehicleStateModel;
  showroomsList: ShowRoomDetailsModel[];
  getVehicleModelsList: typeof allVehicleModelActions.getVehicleModelsList;
  getShowRoomList: typeof showRoomListActions.getShowRoomList;
  financePopupOpen: boolean;
  downloadBrochurePopupOpen: boolean;
  requestQuotePopupOpen: boolean;
  requestCallbackPopUpOpen: boolean;
  getProductModels: typeof productModelsActions.getProductModels;
  locale: string;
  footerData: IFooter;
}

const QuickForms: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();
  const model = router.query?.model?.toString();
  const [modelLoading, setModelLoading] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<
    TrimVarientProductModel | undefined
  >(undefined);

  const formType = router?.query?.formType as string;
  const productModelsData = useSelector(
    (state: RootState) => state.productModelsState?.productModelsList
  );
  React.useEffect(() => {
    if (model && productModelsData?.length === 0) {
      props.getProductModels();
    }
  }, []);
  React.useEffect(() => {
    findProductByModel();
  }, [productModelsData]);

  const findProductByModel = async () => {
    if (productModelsData.length > 0) {
      if (model) {
        setModelLoading(true);
        const modelData = productModelsData.find(
          (item: any) => item.modelCode.toUpperCase() === model?.toUpperCase()
        );

        const yearsSelected = modelData?.productsby_modelyear?.map(
          (item: any) => {
            return item.modelyear;
          }
        );

        if (yearsSelected) {
          // setYears(yearsSelected);
          const data = await api.build.trimList(
            yearsSelected[yearsSelected?.length - 1],
            model
          );

          const selectedVarient: TrimVarientProductModel =
            data?.productsList?.length > 0
              ? data?.productsList?.[0]
              : undefined;
          if (selectedVarient) {
            setSelectedProduct(selectedVarient);
          }
        }
        setModelLoading(false);
      }
    }
  };

  if (modelLoading) {
    return (
      <div className="min-vh-100">
        <FullPageLoader text={"Loading..."} />
      </div>
    );
  }

  return (
    <Layout footerData={props?.footerData}>
      {formType === PopupValues.bookService && (
        <BookServicePopUp productID={1} showroomsList={props.showroomsList} />
      )}
      {formType === PopupValues.financeCalculator &&
        !selectedProduct &&
        !model && (
          <FinanceCalculatorPopUp showroomsList={props.showroomsList} />
        )}
      {formType === PopupValues.financeCalculator && selectedProduct && model && (
        <FinanceCalculatorPopUp
          showroomsList={props.showroomsList}
          product={{
            id: selectedProduct.productID,
            image: selectedProduct?.previewImage,
            price: selectedProduct?.offerPrice,
            title: selectedProduct?.productTitle,
          }}
        />
      )}
      {formType === PopupValues.bookTestDrive && !selectedProduct && !model && (
        <BookTestDrivePopUp showroomsList={props.showroomsList} />
      )}
      {formType === PopupValues.bookTestDrive && selectedProduct && model && (
        <BookTestDrivePopUp
          showroomsList={props.showroomsList}
          product={{
            id: selectedProduct.productID,
            image: selectedProduct?.previewImage,
            price: selectedProduct?.offerPrice,
            title: selectedProduct?.productTitle,
          }}
        />
      )}
      {formType === PopupValues.requestAQuote && selectedProduct && model && (
        <RequestQuotePopUp
          showroomsList={props.showroomsList}
          product={{
            id: selectedProduct.productID,
            image: selectedProduct?.previewImage,
            price: selectedProduct?.offerPrice,
            title: selectedProduct?.productTitle,
          }}
        />
      )}
      {formType === PopupValues.requestAQuote && !selectedProduct && !model && (
        <RequestQuotePopUp showroomsList={props.showroomsList} />
      )}

      {formType === PopupValues.downloadBrochure &&
        !selectedProduct &&
        !model && (
          <DownloadBrochurePopUp
            title={"Download brochure"}
            showroomsList={props.showroomsList}
          />
        )}
      {formType === PopupValues.downloadBrochure && selectedProduct && model && (
        <DownloadBrochurePopUp
          title={"Download brochure"}
          showroomsList={props.showroomsList}
          product={{
            id: selectedProduct.productID,
            image: selectedProduct?.previewImage,
            price: selectedProduct?.offerPrice,
            title: selectedProduct?.productTitle,
          }}
        />
      )}
      {formType === PopupValues.requestACallback &&
        !selectedProduct &&
        !model && (
          <RequestCallbackPopUp
            title={"RequestCallbackPopUp"}
            showroomsList={props.showroomsList}
          />
        )}
      {formType === PopupValues.requestACallback && selectedProduct && model && (
        <RequestCallbackPopUp
          title={"RequestCallbackPopUp"}
          showroomsList={props.showroomsList}
          product={{
            id: selectedProduct.productID,
            image: selectedProduct?.previewImage,
            price: selectedProduct?.offerPrice,
            title: selectedProduct?.productTitle,
          }}
        />
      )}
    </Layout>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      toggleRequestCallback: commonActions.toggleRequestCallback,
      toggleBookTestDrive: commonActions.toggleBookTestDrive,
      toggleDownloadBrochure: commonActions.toggleDownloadBrochure,
      toggleRequestQuote: commonActions.toggleRequestQuote,
      toggleSheduleShowroomVisit: commonActions.toggleSheduleShowroomVisit,
      toggleFinancePopUp: commonActions.toggleFinancePopUp,
      toggleServicePopUp: commonActions.toggleServicePopUp,
      getShowRoomList: showRoomListActions.getShowRoomList,
      getVehicleModelsList: allVehicleModelActions.getVehicleModelsList,
      getProductModels: productModelsActions.getProductModels,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    servicePopupOpen: state.commonState.servicePopupOpen,
    financePopupOpen: state.commonState.financePopupOpen,
    bookTestDrivePopupOpen: state.commonState.bookTestDrivePopupOpen,
    showroomsList: state.showRoomState.showroomsList,
    vehicleModels: state.allVehicleState,
    downloadBrochurePopupOpen: state.commonState.downloadBrochurePopupOpen,
    requestQuotePopupOpen: state.commonState.requestQuotePopupOpen,
    requestCallbackPopUpOpen: state.commonState.requestCallbackPopUpOpen,
  };
};
export const getServerSideProps: GetServerSideProps = async ({
  locale,
  locales,
}: any) => {
  await Promise.all([store.dispatch(getFooterAsync(locale))]);
  const footer = store.getState().footer.data;
  return {
    props: {
      footerData: footer,
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      locales,
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(QuickForms);
