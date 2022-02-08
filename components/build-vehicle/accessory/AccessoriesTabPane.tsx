import React from "react";
import {
  AccessoriesModelBV,
  AccessoriesModelCart,
  api,
  CartActions,
  CartStateModel,
  BuildPriceProductModel,
  ProductViewModelBV,
  AccessoryPackages,
  ProductDetailsStateModel,
} from "alg-ecom-frontend-core";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AccessoryItem from "./AccessoryItem";
import { AccessTabs } from "../utils";
import AccessoryTabs from "./AccessoryTabs";
import classnames from "classnames";
import cloneDeep from "lodash/cloneDeep";

import AccessoryPackagesItem from "./AccessoryPackagesItem";
import { RootState } from "../../../app/store";

interface CustomProps {
  accessoriesData: AccessoriesModelBV[];
  cartData: CartStateModel;
  addToCart: typeof CartActions.addToCart;
  getCartDetails: typeof CartActions.getCartDetails;
  productID: number;
  productDetails?: ProductViewModelBV;
  accessoryPackages?: AccessoryPackages[];
  productData: ProductDetailsStateModel;
}

const AccessoriesTabPane: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [tabName, setTabName] = React.useState("");
  const { t } = useTranslation();

  const [accessTabs, setAccessTabs] = React.useState<string[]>([]);
  const [selectedID, setSelectedID] = React.useState<number>();
  const [isCartLoading, setCartLoading] = React.useState(false);

  React.useEffect(() => {
    const tabs: string[] = [];
    const uniques = Array.from(
      new Set(props.accessoriesData.map((item) => item.productCategoryName))
    );
    if (!!props.accessoryPackages?.length) {
      uniques.unshift("Packages");
    }
    setAccessTabs(uniques);
    if (uniques.length > 0) {
      setTabName(uniques[0]);
    }
    // props.accessoriesData.forEach(item=>{
    //   if (item.productCategoryName not in distinct)
    //   distinct.push(array[i].age)
    // })
  }, []);

  const onTabChange = (tab: string) => {
    setTabName(tab);
  };

  const onChangeAccessory = async (
    product: AccessoriesModelBV,
    productID: number
  ) => {
    setSelectedID(productID);
    setCartLoading(true);
    const cart: CartStateModel = cloneDeep(props.cartData);
    const accessory: AccessoriesModelCart = {
      cartItemId: "",
      productID: 0,
      productTitle: "",
      productImage: "",
      salesPrice: 0,
      offerPrice: 0,
      itemQuantity: 0,
      itemSubtotal: 0,
      tintDetails: {
        tint_rear: null,
        tint_row_1: null,
        tint_row_2: null,
        tint_row_3: null,
        tint_windshield: null,
      },
    };

    const accessoryIndex = cart?.accessoriesInfo?.findIndex(
      (item) => item.productID === product.productID
    );

    if (accessoryIndex !== undefined && accessoryIndex > -1) {
      cart?.accessoriesInfo?.splice(accessoryIndex, 1);
    } else {
      accessory.productID = product.productID;
      accessory.productTitle = product.productTitle;
      accessory.productImage = product.productImage;
      accessory.salesPrice = product.salesPrice;
      accessory.offerPrice = product.offerPrice;
      if (!cart.accessoriesInfo) {
        cart.accessoriesInfo = [accessory];
      } else {
        cart.accessoriesInfo.push(accessory);
      }
    }
    props.addToCart(cart);
    if (!cart.cartID) {
      try {
        const response = await api.build.createCart(props.productID, cart);
        if (response.responsecode === 200) {
          props.getCartDetails(response.data?.cartID);
        }
      } catch (error) {
        //
      }
    } else {
      try {
        const response = await api.build.updateCart(props.productID, cart);
        if (response.responsecode === 200) {
          props.getCartDetails(response.data?.cartID);
        }
      } catch (error) {
        //
      }
    }
    setCartLoading(false);
  };
  const checkAccessorySelected = (id: number) => {
    const cart: CartStateModel = cloneDeep(props.cartData);
    if (cart.accessoriesInfo !== undefined) {
      const accessoryIndex = cart.accessoriesInfo?.findIndex(
        (item) => item.productID === id
      );

      if (accessoryIndex !== undefined && accessoryIndex > -1) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const combinationData = props.cartData?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? props.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const campaign = !!props.cartData?.selCampaignDetails?.length
    ? productCombinations?.campaign?.filter(
        (c) =>
          !!props.cartData?.selCampaignDetails?.find(
            (x) => x.campaignID === c.campaignID
          )
      )
    : [];

  return (
    <div
      className="tab-pane  fade show active pb-4"
      id="insurance-services"
      role="tabpanel"
      aria-labelledby="insurance-services-tab"
    >
      <div className="insurance-services py-lg-5 py-4 w-100">
        <div className="container w-100">
          <h4 className="text-uppercase font-weight-bold mb-5 d-lg-block d-none">
            {t("build_vehicle.ACCESSORIES")}
          </h4>
          {(accessTabs.length || props.accessoriesData?.length) > 0 && (
            <AccessoryTabs
              activeTab={tabName}
              onTabChange={onTabChange}
              tabs={accessTabs}
            />
          )}

          <div className="tab-content w-100" id="insuranceTabContent">
            {accessTabs.length > 0 &&
              accessTabs.map((tab) => {
                return (
                  <div
                    key={tab}
                    className={classnames({
                      "tab-pane fade": true,
                      "show active": tabName === tab,
                    })}
                  >
                    <div className="row accessories-card">
                      {props.accessoriesData
                        .filter((item) => item.productCategoryName === tab)
                        .map((accessItem) => {
                          return (
                            <AccessoryItem
                              accessory={accessItem}
                              key={accessItem.productID}
                              onChange={onChangeAccessory}
                              isSelected={checkAccessorySelected(
                                accessItem.productID
                              )}
                              isLoading={isCartLoading}
                              selectedID={selectedID}
                              campaigns={campaign}
                              cartData={props.cartData}
                            />
                          );
                        })}
                      {!!props.accessoryPackages?.length && tab === "Packages" && (
                        <>
                          {props.accessoryPackages?.map((accessItem) => {
                            return (
                              <AccessoryPackagesItem
                                accessory={accessItem}
                                key={accessItem.packageID}
                                onChange={onChangeAccessory}
                                isLoading={isCartLoading}
                                campaigns={campaign}
                                productData={props.productData}
                                basePrice={
                                  productCombinations?.combinationOfferPrice
                                }
                                cartData={props.cartData}
                              />
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      addToCart: CartActions.addToCart,
      getCartDetails: CartActions.getCartDetails,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.cartState.isLoading,
    cartData: state.cartState,
    productData: state.productDetailsState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AccessoriesTabPane);
