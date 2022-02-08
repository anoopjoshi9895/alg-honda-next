import React from "react";
import ReactModal from "react-modal";
// import '../../assets/sass/common.scss';
// import '../../assets/sass/build.scss';
import classnames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  api,
  CartActions,
  CartStateModel,
  CombinationDetailsActions,
  ProductDetailsActions,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { customStyles, TabNames } from "../../components/build-vehicle/utils";
import Image360 from "../../components/image-360/Image360";
// import Tabs from "./Tabs";
// import { customStyles, TabNames } from "./utils";
import ImageRotaion from "../../components/image-rotation";
import Tabs from "../../components/build-vehicle/Tabs";
import ExteriorTabPane from "../../components/build-vehicle/exterior/ExteriorTabPane";
import InteriorTabPane from "../../components/build-vehicle/interior/InteriorTabPane";
import Campaign from "../../components/build-vehicle/campaign/Campaign";
import AccessoriesTabPane from "../../components/build-vehicle/accessory/AccessoriesTabPane";
import InsuranceServiceTabPane from "../../components/build-vehicle/insurance-service/InsuranceServiceTabPane";
import TradeInTabePane from "../../components/build-vehicle/trade-in/TradeInTabePane";
import FinanceTabPane from "../../components/build-vehicle/finance/FinanceTabPane";
import SummaryTabPane from "../../components/build-vehicle/summary/SummaryTabPane";
import SummaryPreview from "../../components/build-vehicle/summary/SummaryPreview";
import ActionFooter from "../../components/build-vehicle/action-footer/ActionFooter";
import SubHeader from "../../components/build-vehicle/SubHeader";
import { GetServerSideProps, NextPage } from "next";
import { RootState, store } from "../../app/store";
import { getFooterAsync } from "../../feature/footerSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IFooter } from "../../models/models";
import Layout from "../../components/Layout";

const years = [
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];

interface CustomProps {
  productData: ProductDetailsStateModel;
  images360: string[];
  iFrameUrl: string | undefined;
  getProductDetails: typeof ProductDetailsActions.getProductDetails;
  getCombinationDetails: typeof CombinationDetailsActions.getCombinationDetails;
  clearCart: typeof CartActions.clearCart;
  cartData: CartStateModel;
  getCartDetails: typeof CartActions.getCartDetails;
  id: string;
  footerData: IFooter;
}

const BuildVehicle: NextPage<CustomProps> = (props: CustomProps) => {
  const { t } = useTranslation();
  const [isShowAllVarients, setShowAllVarients] = React.useState(false);
  const [tabName, setTabName] = React.useState(TabNames.EXTERIOR);
  // const { id } = useParams<{
  //   id: string;
  // }>();
  const [isCartCleared, setCartCleared] = React.useState(false);
  const [iFrameUrl, setIFrameUrl] = React.useState("");
  React.useEffect(() => {
    api.setLanguageID(1);
    api.setWebsiteID(1);
    api.setSubsiteID(1);
    if (!props.cartData.configurationID) {
      props.clearCart();
    }

    props.getProductDetails(parseInt(props.id, 10), () => {
      setCartCleared(true);
    });
  }, []);
  const onTabChange = async (tab: TabNames) => {
    if (props.productData.productDetails) {
      if (!props.cartData.cartID) {
        try {
          const response = await api.build.createCart(
            props.productData.productDetails?.productID,
            props.cartData
          );
          if (response.responsecode === 200) {
            await props.getCartDetails(response.data?.cartID);
          }
        } catch (error) {}
      } else {
        try {
          const response = await api.build.updateCart(
            props.productData.productDetails?.productID,
            props.cartData
          );
          if (response.responsecode === 200) {
            await props.getCartDetails(response.data?.cartID);
          }
        } catch (error) {}
      }
    }
    setTabName(tab);
  };
  const [isRotationModelOpen, setRotationModelOpen] = React.useState(false);
  const onRotationPopupCancel = () => {
    setRotationModelOpen(false);
  };
  const onRotationPopupOpen = (iFrameUrlp?: string) => {
    setRotationModelOpen(true);
    setIFrameUrl(iFrameUrlp || "");
  };
  const onChangeExterior = (
    customOptionID: number,
    cutomOptionVariantID: number
  ) => {
    if (props.productData.productDetails?.productID) {
      props.getCombinationDetails(
        props.productData.productDetails?.productID,
        customOptionID,
        cutomOptionVariantID
      );
    }
  };

  const showAllVarientSelect = (isShow: boolean) => {
    setShowAllVarients(isShow);
  };

  const combinationData =
    props.cartData?.productInfo?.combinationInfo?.[0] ||
    props.productData?.productDetails?.combinations?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productData?.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const renderRotaionModal = () => {
    return (
      <ReactModal
        isOpen={isRotationModelOpen}
        contentLabel="Rotation"
        style={customStyles}
        onRequestClose={onRotationPopupCancel}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        {props.iFrameUrl && props.iFrameUrl !== "" ? (
          <></>
        ) : (
          // <ImageRotaion
          //   images={images}
          //   onPopupCancel={onRotationPopupCancel}
          //   iFrameUrl={props.iFrameUrl}
          // />
          <Image360
            images={props.images360}
            onPopupCancel={onRotationPopupCancel}
          />
        )}
      </ReactModal>
    );
  };

  return (
    <Layout footerData={props?.footerData} avoidFooter={true}>
      {/* {!isCartCleared && <FullPageLoader />} */}
      {isCartCleared && (
        <>
          {/* <AllPopUp /> */}
          <SubHeader />
          {renderRotaionModal()}
          {props.productData?.productDetails && (
            <Tabs
              headerText={props.productData?.productDetails?.productTitle}
              activeTab={tabName}
              onTabChange={onTabChange}
              isCampaignExits={!!productCombinations?.campaign?.length}
            />
          )}
          <>
            {props.productData?.productDetails !== undefined &&
              props.productData?.productDetails?.productID !== 0 && (
                <>
                  <div
                    className="tab-content build-tabContent"
                    id="build-tabContent"
                  >
                    <div className="container-fluid px-0 h-100">
                      <div className="row no-gutters h-100">
                        <div
                          className={`col-lg col-12  img-container-outer h-auto tab-menu-content ${
                            tabName === TabNames.SUMMARY
                              ? "summary-tab-menu-content"
                              : ""
                          }`}
                        >
                          {tabName === TabNames.EXTERIOR &&
                            props.productData?.productDetails?.customoptionsList?.filter(
                              (item) =>
                                item.customOptionName.toUpperCase() ===
                                TabNames.EXTERIOR
                            ).length > 0 && (
                              <>
                                <ExteriorTabPane
                                  onRotationPopupOpen={onRotationPopupOpen}
                                  onChangeColor={onChangeExterior}
                                  basePrice={
                                    props.productData.productDetails.salesPrice
                                  }
                                  is360Available={props.images360.length > 0}
                                  exteriorData={
                                    props.productData?.productDetails?.customoptionsList?.filter(
                                      (item) =>
                                        item.customOptionName.toUpperCase() ===
                                        TabNames.EXTERIOR
                                    )[0]
                                  }
                                  interiorData={
                                    props.productData?.productDetails?.customoptionsList?.filter(
                                      (item) =>
                                        item.customOptionName.toUpperCase() ===
                                        TabNames.INTERIOR
                                    )[0]
                                  }
                                  combinationData={
                                    props.productData?.productDetails
                                      ?.combinations[0]
                                  }
                                  showAllVarientSelect={showAllVarientSelect}
                                  isShowAllVarients={isShowAllVarients}
                                />
                              </>
                            )}
                          {tabName === TabNames.INTERIOR &&
                            props.productData?.productDetails !== undefined && (
                              <InteriorTabPane
                                productId={
                                  props.productData?.productDetails.productID
                                }
                                onRotationPopupOpen={onRotationPopupOpen}
                              />
                            )}
                          {tabName === TabNames.CAMPAIGNS &&
                            !!productCombinations?.campaign?.length &&
                            props.productData?.productDetails !== undefined && (
                              <Campaign
                                productDetails={
                                  props.productData?.productDetails
                                }
                              />
                            )}
                          {tabName === TabNames.ACCESSORIES &&
                            props.productData?.accessories &&
                            props.productData?.productDetails !== undefined && (
                              <AccessoriesTabPane
                                accessoriesData={props.productData?.accessories}
                                productID={
                                  props.productData.productDetails?.productID
                                }
                                productDetails={
                                  props.productData.productDetails
                                }
                                accessoryPackages={
                                  props.productData?.accessoryPackages
                                }
                              />
                            )}

                          {tabName === TabNames.INSURANCES &&
                            props.productData?.productDetails !== undefined &&
                            (props.productData?.servicesList ||
                              props.productData?.insurancesList ||
                              props.productData?.customerCarePackages ||
                              props.productData?.extendedWarrenty) && (
                              <InsuranceServiceTabPane
                                servicesData={props.productData?.servicesList}
                                insurancesData={
                                  props.productData?.insurancesList
                                }
                                warrentyDataData={
                                  props.productData?.extendedWarrenty
                                }
                                customerCarePackageData={
                                  props.productData?.customerCarePackages
                                }
                                productID={
                                  props.productData?.productDetails.productID
                                }
                                productDetails={
                                  props.productData.productDetails
                                }
                              />
                            )}
                          {tabName === TabNames.TRADEIN && <TradeInTabePane />}
                          {tabName === TabNames.FINANCE &&
                            props.productData.bankDetails !== null && (
                              <FinanceTabPane
                                banks={props.productData.bankDetails}
                              />
                            )}
                          {tabName === TabNames.SUMMARY && (
                            <SummaryTabPane onEditClick={onTabChange} />
                          )}
                        </div>
                        {tabName !== TabNames.SUMMARY && (
                          <SummaryPreview
                            onEditClick={onTabChange}
                            activeTab={tabName}
                            // productID={props.productData.productDetails?.productID}
                            // cartData={props.cartData}
                            // productDetails={props.productData?.productDetails}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
          </>
          {props.productData?.productDetails !== undefined && (
            <ActionFooter
              onNext={onTabChange}
              activeTab={tabName}
              productID={props.productData.productDetails?.productID}
              showroomsList={props.productData?.showroomsList}
              productDetails={props.productData?.productDetails}
            />
          )}
        </>
      )}
    </Layout>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      getProductDetails: ProductDetailsActions.getProductDetails,
      getCombinationDetails: CombinationDetailsActions.getCombinationDetails,
      clearCart: CartActions.clearCart,
      getCartDetails: CartActions.getCartDetails,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    productData: state.productDetailsState,
    cartData: state.cartState,
    images360:
      state.combinationState?.combinationInfo?.[0]?.combinationMedia
        ?.filter(
          (media: any) =>
            media.customOptionName === "Exterior" && +media.imageType === 360
        )
        .map((media: any) => media.image.toString()) || [],
    iFrameUrl: state.cartState?.productInfo?.combinationInfo?.[0]?.iFrameUrl,
  };
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  locales,
  query,
}: any) => {
  const id = query?.id;
  const start = new Date().getTime();
  await Promise.all([store.dispatch(getFooterAsync(locale))]);

  const footer = store.getState().footer.data;

  return {
    props: {
      footerData: footer,
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      locales,
      id,
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(BuildVehicle);
