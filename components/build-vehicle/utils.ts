import {
  OptionsModelBV,
  AddonModelCart,
  AddonModelBV,
  CampaignModel,
  ProductViewModelBV,
  CartStateModel,
  ProductDetailsStateModel,
  InsurancesModelBV,
  InsurancesModelCart,
  CustomerCareModelCart,
  ExtendedWarrantyModelCart,
  ServicesModelCart,
  AccessoriesModelCart,
  ConfigurationAccessoryPackage,
  CartAccessoryPackage,
  ConfigurationCampaignCashBack,
  EcomCampaignAppliedItem,
} from "alg-ecom-frontend-core";

export enum TabNames {
  EXTERIOR = "EXTERIOR",
  INTERIOR = "INTERIOR",
  CAMPAIGNS = "CAMPAIGNS",
  ACCESSORIES = "ACCESSORIES",
  INSURANCES = "INSURANCES & SERVICES",
  TRADEIN = "TRADE IN",
  FINANCE = "FINANCE",
  SUMMARY = "SUMMARY",
}
export const TabList: { key: string; value: TabNames }[] = [
  { key: "EXTERIOR", value: TabNames.EXTERIOR },
  { key: "INTERIOR", value: TabNames.INTERIOR },
  { key: "CAMPAIGNS", value: TabNames.CAMPAIGNS },
  { key: "ACCESSORIES", value: TabNames.ACCESSORIES },
  { key: "INSURANCES", value: TabNames.INSURANCES },
  { key: "TRADEIN", value: TabNames.TRADEIN },
  { key: "FINANCE", value: TabNames.FINANCE },
  { key: "SUMMARY", value: TabNames.SUMMARY },
];

export enum AccessTabs {
  Exterior = "Exterior",
  Interior = "Interior",
  Electronics = "Electronics",
  Performance = "Performance",
}

export enum InsServTab {
  Insurance = "Insurance",
  Service = "Service",
  CustomerCarePackage = "CustomerCarePackage",
  ExtendedWarrenty = "ExtendedWarrenty",
}

export enum FinanceTab {
  Cash = "Cash",
  Payment = "Payment",
}

export interface TradeInFormProps {
  tradeInID: number;
  brand: string;
  modelYear: number;
  modelCode: any;
  trim: string;
  mileage: number;
  agree?: boolean;
}

export enum EcomProductType {
  Accessories = "accessories",
  AccessoryPackages = "accessorypackages",
  Insurance = "insurancesList",
  InsuranceAddons = "insuranceAddons",
  ServicePackage = "servicesList",
  ExtendedWarranty = "extendedWarrenty",
  CustomerCarePackage = "customerCarePackages",
  TPL = "tplPrice",
  Registration = "registrationPrice",
  CashBack = "cashBack",
}

export const myImage =
  "https://cdn.findyourbmw.ae/public/uploads/catalog/vehicles/large/image_panorama_4S31A_2019_C1G_LCL8_180.jpeg";

export const customStyles: ReactModal.Styles = {
  content: {
    position: "relative",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    height: "100%",
    maxWidth: "100%",
    width: "100%",
    border: "0",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
    padding: "0",
    margin: "auto",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "auto",
  },
};
export interface ContactFormProps {
  firstName: string;
  category: string;
  phoneNumber: string;
  email: string;
  comments: string;
}
export interface QuickAccessFormProps {
  accessType: string;
  productID: string;
  modelCode: string;
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  showroomID: number;
  comments: string;
  date?: string;
  time?: string;
  agree?: boolean;
}
export interface BookNowFormProps {
  firstName: string;
  lastName: string;
  gender: string;
  // modelCode: string;
  phoneNumber: string;
  email: string;
  agree?: boolean;
}

export interface BookNowOTPFormProps {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
}

export interface SignUpFormProps {
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  phoneNumber: string;
  email: string;
  agree?: boolean;
}

export interface ForgotPasswordFormProps {
  emailID: string;
}

export interface ResetPasswordFormProps {
  newPassWord: string;
  confirmPassword: string;
}

export const calculateEcomPlanPrice = (
  plan: { priceType: string; priceValue?: number },
  basePrice: number
) => {
  if (plan.priceType === "fixed") {
    return plan.priceValue || 0;
  }
  if (!plan.priceValue || plan.priceValue < 0 || !basePrice) {
    return 0;
  }
  return Math.ceil((plan.priceValue * basePrice) / 100) + 1;
};

export const getInsuarancePrice = (
  option: OptionsModelBV | undefined,
  paymode: string,
  combinationPrice: number,
  totalPrice: number
) => {
  let installmentCount: number | undefined = 0;
  let priceValue = 0;
  if (option && paymode !== "") {
    if (paymode !== "cash") {
      if (option.priceType === "percentage") {
        installmentCount = Number(paymode);

        const installmentItem = option.Installments?.find(
          (item) => item.noOfInstallments === installmentCount
        );

        let insuranceValue = 0;
        if (combinationPrice && installmentItem) {
          insuranceValue =
            (combinationPrice * installmentItem.installmentRate) / 100;
        }

        priceValue = Math.ceil(insuranceValue) + 1;
      } else {
        priceValue = Math.ceil(option.priceValue);
      }
    } else {
      priceValue = Math.ceil(
        calculateEcomPlanPrice(
          { priceValue: option.priceValue, priceType: option.priceType },
          totalPrice
        )
      );
    }
  }

  return priceValue;
};

export const getInsuaranceDiscount = (
  option: OptionsModelBV | undefined,
  paymode: string,
  combinationPrice: number,
  totalPrice: number,
  appliedItems: any
) => {
  const priceValue = getInsuarancePrice(
    option,
    paymode,
    combinationPrice,
    totalPrice
  );

  let discount = 0;
  if (priceValue > 0) {
    if (appliedItems) {
      discount =
        (appliedItems?.campDiscountType === "percentage"
          ? (priceValue * appliedItems.campDiscountValue) / 100
          : appliedItems.campDiscountValue) || 0;
    }
  }

  return discount;
};

export const getTotalInsuarancePrice = (
  option: OptionsModelBV | undefined,
  paymode: string,
  addons: AddonModelCart[],
  combinationPrice: number,
  totalPrice: number,
  isOffer: boolean
) => {
  let insuranceValue = getInsuarancePrice(
    option,
    paymode,
    combinationPrice,
    totalPrice
  );

  if (addons.length > 0) {
    addons.forEach((item) => {
      insuranceValue += isOffer ? item.price : item.originalPrice;
    });
  }

  return Math.ceil(insuranceValue);
};

export const htmlDecode = (input: string) => {
  const e = document.createElement("div");
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
};

export interface PriceOption {
  campaignID?: number;
  addonID?: number;
  originalPrice: number;
  discount: number;
}

export const calculateEcomNormalPrice = (
  plan: { priceType: string; priceValue?: number },
  basePrice: number
) => {
  if (plan.priceType === "fixed") {
    return plan.priceValue || 0;
  }
  if (!plan.priceValue || plan.priceValue < 0 || !basePrice) {
    return 0;
  }
  return (plan.priceValue * basePrice) / 100;
};

export const calculateDiscount = (
  type: string,
  value: number,
  basePrice: number
) => {
  if (!basePrice || !value) {
    return 0;
  }
  return type === "percentage" ? (basePrice * (value || 0)) / 100 : value;
};

const getSingleAddOnPriceOption = (
  addOn: AddonModelBV,
  basePrice: number
): PriceOption => {
  if (addOn.FOC === "Yes") {
    return {
      originalPrice: 0,
      discount: 0,
    };
  }

  const price =
    addOn.productType === EcomProductType.InsuranceAddons
      ? calculateEcomNormalPrice(
          {
            priceType: addOn.addonPriceType,
            priceValue: addOn.addonPriceValue,
          },
          basePrice
        )
      : calculateEcomCeilPrice(
          {
            priceType: addOn.addonPriceType,
            priceValue: addOn.addonPriceValue,
          },
          basePrice
        );
  if (!price) {
    return {
      originalPrice: 0,
      discount: 0,
    };
  }

  const addOnDiscount = calculateDiscount(
    addOn.discountType,
    addOn.discountValue || 0,
    price
  );
  return {
    originalPrice: price || 0,
    discount: addOnDiscount,
  };
};

export const getAppliedDiscountForPlanAddons = (
  addOn: AddonModelBV,
  basePrice: number,
  campaigns?: CampaignModel[]
): PriceOption => {
  const priceOption = getSingleAddOnPriceOption(addOn, basePrice);
  if (!priceOption.originalPrice) {
    return priceOption;
  }

  const priceOptions: PriceOption[] = [];

  campaigns?.forEach((camp) => {
    const appliedItem = camp?.appliedItems?.find(
      (ai) =>
        ai.productID === addOn.packageID &&
        ai.productType === "insuranceAddons" &&
        ai.productOptionID === addOn.packageOptionID
    );
    if (appliedItem) {
      const discount = calculateDiscount(
        appliedItem.campDiscountType,
        appliedItem.campDiscountValue,
        priceOption.originalPrice
      );
      priceOptions.push({
        campaignID: camp.campaignID,
        originalPrice: priceOption.originalPrice,
        discount,
      });
    }
  });

  if (!priceOptions?.length) {
    return priceOption;
  }

  return priceOptions?.reduce((min, cur) => {
    if (
      (min.originalPrice || 0) - (min.discount || 0) >
      (cur.originalPrice || 0) - (cur.discount || 0)
    ) {
      return cur;
    }
    return min;
  }, priceOption);
};

export const getAppliedDiscount = (
  productData: ProductDetailsStateModel | undefined,
  basePrice: number,
  productType: string,
  product: { productID: number; productOptionID?: number; sortOrder?: number },
  campaigns?: CampaignModel[],
  cartData?: CartStateModel,
  options?: { ignoreAddons?: boolean; expectedAddOn?: AddonModelBV }
): PriceOption => {
  const priceData = getProductPlanAndOriginalPrice(
    productData,
    basePrice,
    productType,
    product
  );

  if (!priceData?.price) {
    return {
      originalPrice: 0,
      discount: 0,
    };
  }

  const priceOptions: PriceOption[] = [];

  if (options?.expectedAddOn) {
    if (
      options.expectedAddOn.packageID === product.productID &&
      options.expectedAddOn.packageOptionID === product.productOptionID
    ) {
      priceOptions.push(
        getSingleAddOnPriceOption(options.expectedAddOn, basePrice)
      );
    }
  }

  const selectedCashback = cartData?.campaignCashbackItems?.find(
    (cashback) =>
      cashback.productType === productType &&
      cashback.productID === product.productID &&
      (productType === EcomProductType.Accessories ||
        productType === EcomProductType.AccessoryPackages ||
        cashback.productOptionID === product.productOptionID)
  );
  if (!selectedCashback) {
    campaigns?.forEach((camp) => {
      const appliedItem = camp?.appliedItems?.find(
        (ai) =>
          ai.productID === product.productID &&
          ai.productType === productType &&
          (productType === "accessories" ||
            productType === "accessorypackages" ||
            ai.productOptionID?.toString() ===
              product.productOptionID?.toString())
      );

      if (appliedItem) {
        const discount = calculateDiscount(
          appliedItem.campDiscountType,
          appliedItem.campDiscountValue,
          priceData.price
        );
        priceOptions.push({
          campaignID: camp.campaignID,
          originalPrice: priceData.price,
          discount,
        });
      } else if (
        product.sortOrder &&
        [
          EcomProductType.CustomerCarePackage,
          EcomProductType.ExtendedWarranty,
          EcomProductType.Insurance,
          EcomProductType.ServicePackage,
        ].includes(productType as EcomProductType)
      ) {
        const upgradeAppliedItems = camp?.appliedItems?.filter(
          (ai) =>
            ai.campInternalPrice &&
            ai.productType === productType &&
            ai.sortOrder !== undefined &&
            ai.sortOrder < product.sortOrder!
        );

        const bestUpgradeOffer = upgradeAppliedItems?.reduce((best, cur) => {
          if (!best || best.sortOrder! < cur.sortOrder!) {
            return cur;
          }

          if (
            best.sortOrder === cur.sortOrder &&
            best.campInternalPrice! < cur.campInternalPrice!
          ) {
            return cur;
          }

          return best;
        }, undefined as EcomCampaignAppliedItem | undefined);

        if (bestUpgradeOffer) {
          priceOptions.push({
            campaignID: camp.campaignID,

            originalPrice: priceData.price,

            discount: bestUpgradeOffer.campInternalPrice!,
          });
        }
      }
    });
  }
  if (!options?.ignoreAddons) {
    if (
      [
        "customerCarePackages",
        "extendedWarrenty",
        "insurancesList",
        "registrationPrice",
        "servicesList",
        "tplPrice",
      ].includes(productType) &&
      cartData
    ) {
      if (cartData.customerCare) {
        priceOptions.push(
          ...getPlanAddonsPriceOptions(
            productType,
            productData?.customerCarePackages,
            {
              productID: product.productID,
              productOptionID: product.productOptionID!,
            },
            {
              productID: cartData.customerCare?.[0]?.productID,
              productOptionID:
                cartData.customerCare?.[0]?.planDetails?.productOptionID,
            },
            basePrice
          )
        );
      }
      if (cartData.extendedWarranty) {
        priceOptions.push(
          ...getPlanAddonsPriceOptions(
            productType,
            productData?.extendedWarrenty,
            {
              productID: product.productID,
              productOptionID: product.productOptionID!,
            },
            {
              productID: cartData.extendedWarranty?.[0]?.productID,
              productOptionID:
                cartData.extendedWarranty?.[0]?.planDetails?.productOptionID,
            },
            basePrice
          )
        );
      }

      if (cartData.insuranceDetails) {
        priceOptions.push(
          ...getPlanAddonsPriceOptions(
            productType,
            productData?.insurancesList,
            {
              productID: product.productID,
              productOptionID: product.productOptionID!,
            },
            {
              productID: cartData.insuranceDetails?.[0]?.productID,
              productOptionID:
                cartData.insuranceDetails?.[0]?.planDetails?.productOptionID,
            },
            basePrice
          )
        );
      }
      if (cartData.registration) {
        priceOptions.push(
          ...getPlanAddonsPriceOptions(
            productType,
            productData?.registrationPrice,
            {
              productID: product.productID,
              productOptionID: product.productOptionID!,
            },
            {
              productID: cartData.registration?.[0]?.productID,
              productOptionID: cartData.registration?.[0]?.productOptionID,
            },
            basePrice
          )
        );
      }
      if (cartData.serviceDetails) {
        priceOptions.push(
          ...getPlanAddonsPriceOptions(
            productType,
            productData?.servicesList,
            {
              productID: product.productID,
              productOptionID: product.productOptionID!,
            },
            {
              productID: cartData.serviceDetails?.[0]?.productID,
              productOptionID:
                cartData.serviceDetails?.[0]?.planDetails?.productOptionID,
            },
            basePrice
          )
        );
      }
      if (cartData.tpl) {
        priceOptions.push(
          ...getPlanAddonsPriceOptions(
            productType,
            productData?.tplPrice,
            {
              productID: product.productID,
              productOptionID: product.productOptionID!,
            },
            {
              productID: cartData.tpl?.[0]?.productID,
              productOptionID: cartData.tpl?.[0]?.productOptionID,
            },
            basePrice
          )
        );
      }
    }
  }
  if (!priceOptions?.length) {
    return {
      originalPrice: priceData?.price || 0,
      discount: 0,
    };
  }

  return priceOptions?.reduce(
    (min, cur) => {
      if (
        (min.originalPrice || 0) - (min.discount || 0) >
        (cur.originalPrice || 0) - (cur.discount || 0)
      ) {
        return cur;
      }
      return min;
    },
    {
      originalPrice: priceData?.price || 0,
      discount: 0,
    }
  );
};

export const getProductPlanAndOriginalPrice = (
  productData: ProductDetailsStateModel | undefined,
  basePrice: number,
  productType: string,
  product: { productID: number; productOptionID?: number }
): { price: number } | undefined => {
  let matchingPlan: InsurancesModelBV | undefined;

  switch (productType) {
    case "accessories":
      const accessory = productData?.accessories?.find(
        (c) => c.productID?.toString() === product.productID?.toString()
      );
      return { price: accessory?.salesPrice || 0 };
    case "accessorypackages":
      const accessoryPackage = productData?.accessoryPackages?.find(
        (c) => c.packageID === product.productID
      );
      return { price: accessoryPackage?.packagePrice || 0 };
    case "customerCarePackages":
      matchingPlan = productData?.customerCarePackages?.find(
        (c) => c.productID?.toString() === product.productID?.toString()
      );
      break;
    case "extendedWarrenty":
      matchingPlan = productData?.extendedWarrenty?.find(
        (c) => c.productID?.toString() === product.productID?.toString()
      );
      break;
    case "insurancesList":
      matchingPlan = productData?.insurancesList?.find(
        (c) => c.productID?.toString() === product.productID?.toString()
      );
      break;
    case "registrationPrice":
      matchingPlan = productData?.registrationPrice?.find(
        (c) => c.productID?.toString() === product.productID?.toString()
      );
      break;
    case "servicesList":
      matchingPlan = productData?.servicesList?.find(
        (c) => c.productID?.toString() === product.productID?.toString()
      );
      break;
    case "tplPrice":
      matchingPlan = productData?.tplPrice?.find(
        (c) => c.productID?.toString() === product.productID?.toString()
      );
      break;
  }

  const matchingOption = matchingPlan?.optionsList?.find(
    (c) => c.productOptionID?.toString() === product.productOptionID?.toString()
  );

  if (!matchingPlan || !matchingOption) {
    return;
  }
  return {
    price: calculateEcomCeilPrice(
      {
        priceType: matchingOption.priceType,
        priceValue: matchingOption.priceValue,
      },
      basePrice
    ),
  };
};

export const calculateEcomCeilPrice = (
  plan: { priceType: string; priceValue?: number },
  basePrice: number
) => {
  if (plan.priceType === "fixed") {
    return plan.priceValue || 0;
  }
  if (!plan.priceValue || plan.priceValue < 0 || !basePrice) {
    return 0;
  }
  return Math.ceil((plan.priceValue * basePrice) / 100) + 1;
};

const getPlanAddonsPriceOptions = (
  productType: string,
  planList: InsurancesModelBV[] | undefined,
  product: { productID: number; productOptionID: number },
  plan: { productID: number; productOptionID: number },
  basePrice: number
): PriceOption[] => {
  const priceOptions: PriceOption[] = [];
  const matchingProduct = planList?.find(
    (ins) => ins.productID?.toString() === plan.productID?.toString()
  );
  const option = matchingProduct?.optionsList?.find(
    (op) => op.productOptionID?.toString() === plan.productOptionID?.toString()
  );
  option?.addons
    ?.filter(
      (add) =>
        add.productType === productType &&
        add.packageID === product.productID &&
        add.packageOptionID === product.productOptionID
    )
    .forEach((add) => {
      priceOptions.push(getSingleAddOnPriceOption(add, basePrice));
    });

  return priceOptions;
};

export const isCustomAddOnSelected = (
  addOn: AddonModelBV,
  cartData?: CartStateModel
): boolean => {
  switch (addOn.productType) {
    case "customerCarePackages":
      return (
        cartData?.customerCare?.[0]?.productID === addOn.packageID &&
        cartData?.customerCare?.[0]?.planDetails?.productOptionID ===
          addOn.packageOptionID
      );
    case "extendedWarrenty":
      return (
        cartData?.extendedWarranty?.[0]?.productID === addOn.packageID &&
        cartData?.extendedWarranty?.[0]?.planDetails?.productOptionID ===
          addOn.packageOptionID
      );
    case "insurancesList":
      return (
        cartData?.insuranceDetails?.[0]?.productID === addOn.packageID &&
        cartData?.insuranceDetails?.[0]?.planDetails?.productOptionID ===
          addOn.packageOptionID
      );
    case "registrationPrice":
      return (
        cartData?.registration?.[0]?.productID === addOn.packageID &&
        cartData?.registration?.[0]?.productOptionID === addOn.packageOptionID
      );
    case "servicesList":
      return (
        cartData?.serviceDetails?.[0]?.productID === addOn.packageID &&
        cartData?.serviceDetails?.[0]?.planDetails?.productOptionID ===
          addOn.packageOptionID
      );
    case "tplPrice":
      return (
        cartData?.tpl?.[0]?.productID === addOn.packageID &&
        cartData?.tpl?.[0]?.productOptionID === addOn.packageOptionID
      );
    default: {
      return false;
    }
  }
};

export const getSelectedPlanByProductAndOptionID = (
  plans: InsurancesModelBV[] | undefined,
  productID: number,
  productOptionID: number
) => {
  const matchingPlan = plans?.find(
    (c) => c.productID?.toString() === productID?.toString()
  );
  const matchingOption = matchingPlan?.optionsList?.find(
    (c) => c.productOptionID?.toString() === productOptionID?.toString()
  );

  if (!matchingPlan || !matchingOption) {
    return;
  }

  return {
    productID: matchingPlan.productID,
    productOptionID: matchingOption?.productOptionID || 0,
    productTitle: matchingPlan.productTitle,
    salesPrice: matchingOption?.priceValue,
    cartItemID: 0,
    menuCode: "",
    offerPrice: matchingOption?.priceValue,
    sortOrder: matchingPlan.sortOrder,
    planDetails: {
      payType: "cash",
      installments: 0,
      addons: matchingOption?.addons
        ?.filter(
          (add) =>
            add.FOC === "Yes" &&
            add.productType === EcomProductType.InsuranceAddons
        )
        ?.map((x) => {
          return {
            addonID: x.addonID,
            price: x.addonPriceValue,
            originalPrice: x.addonPriceValue,
            productType: x.productType,
            packageID: x.packageID,
            packageOptionID: x.packageOptionID,
            FOC: x.FOC,
          };
        }),
      installmentRate: 0,
      productOptionID: matchingOption?.productOptionID || 0,
    },
  };
};

export const checkIsValidPackage = (
  productType: string,
  productID: number,
  productOptionID: number,
  productData?: ProductDetailsStateModel
) => {
  switch (productType) {
    case "insuranceAddons": {
      return true;
    }
    case "customerCarePackages": {
      return !!getSelectedPlanByProductAndOptionID(
        productData?.customerCarePackages,
        productID,
        productOptionID
      );
    }

    case "extendedWarrenty": {
      return !!getSelectedPlanByProductAndOptionID(
        productData?.extendedWarrenty,
        productID,
        productOptionID
      );
    }
    case "insurancesList": {
      return !!getSelectedPlanByProductAndOptionID(
        productData?.insurancesList,
        productID,
        productOptionID
      );
    }
    case "registrationPrice": {
      return false;
    }
    case "servicesList": {
      return !!getSelectedPlanByProductAndOptionID(
        productData?.servicesList,
        productID,
        productOptionID
      );
    }
    case "tplPrice": {
      return false;
    }
    default: {
      return false;
    }
  }
};

// helpers
const getAllAddonsOfEcomConfigurationPlan = (
  plans: InsurancesModelBV[] | undefined,
  productID: number,
  productOptionID: number
) => {
  if (!plans?.length) {
    return;
  }
  const plan = plans?.find((p) => p.productID === productID);
  if (!plan) {
    return;
  }
  const option = plan.optionsList?.find(
    (op) => op.productOptionID === productOptionID
  );
  return option?.addons;
};

export const addFOCExtraAddonsToConfiguration = (
  ecomProductData: ProductDetailsStateModel | undefined,
  plans: InsurancesModelBV[],
  configuration: CartStateModel,
  product: { productID: number; productOptionID: number }
) => {
  if (!ecomProductData || !configuration || !plans.length) {
    return;
  }
  const allAddOns = getAllAddonsOfEcomConfigurationPlan(
    plans,
    product.productID,
    product.productOptionID
  );
  if (!allAddOns?.length) {
    return;
  }
  const addOns = allAddOns?.filter(
    (ad) =>
      ad.FOC === "Yes" && ad.productType !== EcomProductType.InsuranceAddons
  );
  if (!addOns?.length) {
    return;
  }

  for (const addOn of addOns) {
    switch (addOn.productType) {
      case EcomProductType.CustomerCarePackage: {
        if (!configuration.customerCare?.length) {
          configuration.customerCare = [
            getSelectedPlanByProductAndOptionID(
              ecomProductData.customerCarePackages,
              addOn.packageID,
              addOn.packageOptionID
            ) as CustomerCareModelCart,
          ];
          // reccursion
          addFOCExtraAddonsToConfiguration(
            ecomProductData,
            ecomProductData.customerCarePackages || [],
            configuration,
            {
              productID: addOn.packageID,
              productOptionID: addOn.packageOptionID,
            }
          );
        }
        break;
      }
      case EcomProductType.ExtendedWarranty: {
        if (!configuration.extendedWarranty?.length) {
          configuration.extendedWarranty = [
            getSelectedPlanByProductAndOptionID(
              ecomProductData.extendedWarrenty,
              addOn.packageID,
              addOn.packageOptionID
            ) as ExtendedWarrantyModelCart,
          ];
          // reccursion
          addFOCExtraAddonsToConfiguration(
            ecomProductData,
            ecomProductData.extendedWarrenty || [],
            configuration,
            {
              productID: addOn.packageID,
              productOptionID: addOn.packageOptionID,
            }
          );
        }
        break;
      }
      case EcomProductType.Insurance: {
        if (!configuration.insuranceDetails?.length) {
          configuration.insuranceDetails = [
            getSelectedPlanByProductAndOptionID(
              ecomProductData.insurancesList,
              addOn.packageID,
              addOn.packageOptionID
            ) as InsurancesModelCart,
          ];
          // reccursion
          addFOCExtraAddonsToConfiguration(
            ecomProductData,
            ecomProductData.insurancesList || [],
            configuration,
            {
              productID: addOn.packageID,
              productOptionID: addOn.packageOptionID,
            }
          );
        }
        break;
      }

      case EcomProductType.ServicePackage: {
        if (!configuration.serviceDetails?.length) {
          configuration.serviceDetails = [
            getSelectedPlanByProductAndOptionID(
              ecomProductData.servicesList,
              addOn.packageID,
              addOn.packageOptionID
            ) as ServicesModelCart,
          ];
          // reccursion
          addFOCExtraAddonsToConfiguration(
            ecomProductData,
            ecomProductData.servicesList || [],
            configuration,
            {
              productID: addOn.packageID,
              productOptionID: addOn.packageOptionID,
            }
          );
        }
        break;
      }
    }
  }
};

const setAccessoriesPriceAndCampaignDiscounts = (
  productData: ProductDetailsStateModel | undefined,

  accessory: any,

  basePrice?: number,

  campaigns?: CampaignModel[],

  configuration?: CartStateModel
) => {
  const discountData = getAppliedDiscount(
    productData,

    basePrice || 0,

    EcomProductType.Accessories,

    { productID: accessory.productID },

    campaigns,

    configuration
  );

  // accessory.campaignID = discountData?.campaignID;

  // accessory.discount = discountData?.discount;

  accessory.salesPrice = discountData.originalPrice;

  accessory.offerPrice = discountData.originalPrice - discountData.discount;

  return accessory;
};

export const setConfigurationPrices = (
  ecomProductData: ProductDetailsStateModel | undefined,
  configuration: CartStateModel | undefined
) => {
  if (!ecomProductData?.productDetails || !configuration) {
    return undefined;
  }

  const combinationData = configuration?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? ecomProductData.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const campaigns = !!configuration?.selCampaignDetails?.length
    ? productCombinations?.campaign?.filter(
        (c) =>
          !!configuration?.selCampaignDetails?.find(
            (x) => x.campaignID === c.campaignID
          )
      )
    : [];

  addMatchingAddonToCorrespondingEntities(
    ecomProductData,
    configuration,
    campaigns,
    productCombinations?.combinationOfferPrice
  );

  configuration.accessoriesInfo = configuration?.accessoriesInfo?.map((acc) =>
    setAccessoriesPriceAndCampaignDiscounts(
      ecomProductData,
      acc,
      productCombinations?.combinationOfferPrice,
      campaigns,
      configuration
    )
  );

  configuration.accessoryPackages = configuration?.accessoryPackages?.map(
    (acc) =>
      setAccessoryPackagesPriceAndCampaignDiscounts(
        ecomProductData,
        acc,
        productCombinations?.combinationOfferPrice,
        campaigns,
        configuration
      )
  );

  configuration.customerCare =
    configuration.customerCare?.length > 0
      ? [
          setPlanPriceAndCampaignDiscounts(
            ecomProductData,
            EcomProductType.CustomerCarePackage,
            configuration?.customerCare?.[0],
            productCombinations?.combinationOfferPrice,
            campaigns,
            configuration,
            ecomProductData?.customerCarePackages
          ),
        ]
      : [];

  configuration.extendedWarranty =
    configuration.extendedWarranty?.length > 0
      ? [
          setPlanPriceAndCampaignDiscounts(
            ecomProductData,
            EcomProductType.ExtendedWarranty,
            configuration.extendedWarranty[0],
            productCombinations?.combinationOfferPrice,
            campaigns,
            configuration,
            ecomProductData?.extendedWarrenty
          ),
        ]
      : [];
  configuration.insuranceDetails =
    configuration.insuranceDetails?.length > 0
      ? [
          setPlanPriceAndCampaignDiscounts(
            ecomProductData,
            EcomProductType.Insurance,
            configuration?.insuranceDetails?.[0],
            productCombinations?.combinationOfferPrice,
            campaigns,
            configuration,
            ecomProductData?.insurancesList
          ),
        ]
      : [];
  // configuration.registration = configuration.registration
  //   ? setPlanPriceAndCampaignDiscounts(
  //       ecomProductData,
  //       EcomProductType.Registration,
  //       configuration?.registration,
  //       configuration.netPrice,
  //       campaigns,
  //       configuration
  //     )
  //   : undefined;
  configuration.serviceDetails =
    configuration.serviceDetails?.length > 0
      ? [
          setPlanPriceAndCampaignDiscounts(
            ecomProductData,
            EcomProductType.ServicePackage,
            configuration?.serviceDetails?.[0],
            productCombinations?.combinationOfferPrice,
            campaigns,
            configuration,
            ecomProductData?.servicesList
          ),
        ]
      : [];

  // configuration.tpl = configuration.tpl
  //   ? setPlanPriceAndCampaignDiscounts(
  //       ecomProductData,
  //       EcomProductType.TPL,
  //       configuration?.tpl,
  //       configuration.netPrice,
  //       campaigns,
  //       configuration
  //     )
  //   : undefined;

  const campaignCashBackDiscount =
    campaigns?.reduce(
      (s, c) =>
        s +
        (c.appliedItems
          ?.filter((ai) => ai.productType === EcomProductType.CashBack)
          ?.reduce(
            (t, ai) =>
              t +
              (calculateDiscount(
                ai.campDiscountType,
                ai.campDiscountValue,
                productCombinations?.combinationOfferPrice || 0
              ) || 0),
            0
          ) || 0) +
        (configuration.campaignCashbackItems
          ?.filter((cash) => cash.campaignID === c.campaignID)
          ?.reduce((t, c1) => t + c1.cashbackAmount, 0) || 0),
      0
    ) || 0;

  const campaignCouponTotalDiscount =
    campaigns?.reduce((s, c) => {
      if (!c.couponCashBack || !configuration.coupons?.length) {
        return s;
      }

      const couponTotal = configuration.coupons
        ?.filter((co) => co.campaignID === c.campaignID)
        .reduce((t, co) => t + co.couponCashbackAmount, 0);

      return (
        s +
        Math.min(
          Math.max(couponTotal, c.couponCashBack.couponMinDiscount || 0),
          c.couponCashBack.couponMaxDiscount || 0
        )
      );
    }, 0) || 0;

  const financePrincipalAmount = getFinancePrinciaplAmount(
    configuration,
    ecomProductData,
    campaignCashBackDiscount
  );
  // handleFinancePrincipalChange(
  //   financePrincipalAmount,
  //   configuration
  // );
  configuration.netPrice = getTotalPrice(
    configuration,
    campaignCashBackDiscount,
    productCombinations?.combinationOfferPrice,
    campaignCouponTotalDiscount
  );

  return configuration;
};

const setAccessoryPackagesPriceAndCampaignDiscounts = (
  productData: ProductDetailsStateModel | undefined,

  accessoryPackage: CartAccessoryPackage,

  basePrice?: number,

  campaigns?: CampaignModel[],

  configuration?: CartStateModel
) => {
  const discountData = getAppliedDiscount(
    productData,

    basePrice || 0,

    EcomProductType.AccessoryPackages,

    { productID: accessoryPackage.packageID },

    campaigns,

    configuration
  );

  accessoryPackage.campaignID = discountData?.campaignID;

  accessoryPackage.discount = discountData?.discount;

  return accessoryPackage;
};
export const getTotalAccessoryPackagesPrice = (
  configuration?: CartStateModel
): number => {
  if (!configuration) {
    return 0;
  }

  const totalPrice =
    configuration.accessoryPackages?.reduce((sum, acc) => {
      return sum + acc.packagePrice - (acc.discount || 0);
    }, 0) || 0;

  return totalPrice;
};

export const getTotalPrice = (
  configuration?: CartStateModel,
  campaignCashBackDiscount?: number,
  basePrice?: number,
  campaignCouponTotalDiscount?: number
): number => {
  if (!configuration) {
    return 0;
  }

  const totalPrice =
    (basePrice || 0) +
    getTotalAccessoriesPrice(configuration) +
    getTotalAccessoryPackagesPrice(configuration) +
    (configuration?.tpl?.[0]?.offerPrice || 0) +
    (configuration?.registration?.[0]?.offerPrice || 0) +
    // (configuration.addons?.reduce((s, acc) => (acc.addonPrice || 0) + s, 0) ||
    //   0) +
    getTotalInsuranceServicePackagePrice(configuration) -
    (configuration?.productInfo?.tradeInDiscount || 0) -
    // (configuration.finance?.status === FinanceStatus.Approved &&
    // configuration.finance.attached
    //   ? configuration.finance?.lpo?.approvedLoanAmount || 0
    //   : 0) -
    (campaignCashBackDiscount || 0) -
    (campaignCouponTotalDiscount || 0);

  return totalPrice;
};

export const getFinancePrinciaplAmount = (
  configuration?: CartStateModel,
  ecomProductData?: ProductDetailsStateModel | undefined,
  campaignCashBackDiscount?: number
): number => {
  if (!configuration) {
    return 0;
  }
  const combinationData = configuration?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? ecomProductData?.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const totalPrice =
    (Number(configuration?.productInfo?.offerPrice) || 0) +
    getTPLAndRegistrationPrice(configuration) +
    getTotalAccessoriesPrice(configuration) +
    getTotalAccessoryPackagesPrice(configuration) +
    getTotalInsuranceServicePackagePrice(configuration) -
    configuration?.productInfo?.tradeInDiscount -
    (campaignCashBackDiscount || 0);

  return totalPrice;
};

export const getTPLAndRegistrationPrice = (
  configuration?: CartStateModel,
  options?: { excludeDiscount?: boolean }
): number => {
  if (!configuration) {
    return 0;
  }
  const totalPrice =
    (configuration.registration?.[0]?.offerPrice || 0) +
    (configuration.tpl?.[0]?.offerPrice || 0 || 0);

  return totalPrice;
};

export const getTotalInsuranceServicePackagePrice = (
  configuration?: CartStateModel
): number => {
  if (!configuration) {
    return 0;
  }

  const totalPrice =
    getTotalConfigurationEcomPlanPrice(configuration.customerCare?.[0]) +
    getTotalConfigurationEcomPlanPrice(configuration.extendedWarranty?.[0]) +
    getTotalConfigurationEcomPlanPrice(configuration.insuranceDetails?.[0]) +
    getTotalConfigurationEcomPlanPrice(configuration.serviceDetails?.[0]);

  return totalPrice;
};

export const getTotalConfigurationEcomPlanPrice = (
  plan?: InsurancesModelCart,
  options?: {
    ignorePaymentType?: boolean;
    excludeDiscount?: boolean;
  }
) => {
  if (
    !plan ||
    (!options?.ignorePaymentType && plan?.planDetails?.payType !== "cash")
  ) {
    return 0;
  }
  return (
    (plan?.offerPrice || 0) +
    (plan?.planDetails?.addons?.reduce((s, a) => {
      if (
        a.FOC === "Yes" ||
        a.productType !== EcomProductType.InsuranceAddons
      ) {
        return s;
      }
      return s + a.price;
    }, 0) || 0)
  );
};

export const getTotalAccessoriesPrice = (
  configuration?: CartStateModel
): number => {
  if (!configuration) {
    return 0;
  }
  const totalPrice =
    configuration.accessoriesInfo?.reduce((sum, acc) => {
      return sum + acc.offerPrice;
    }, 0) || 0;

  return totalPrice;
};

const setOrginalAddOns = (
  plan: InsurancesModelCart,
  Packages?: InsurancesModelBV[]
) => {
  const matchingPlan = Packages?.find(
    (c) => c.productID?.toString() === plan.productID?.toString()
  );
  const matchingOption = matchingPlan?.optionsList?.find(
    (c) => c.productOptionID === plan?.planDetails?.productOptionID
  );

  return matchingOption?.addons?.filter((a) =>
    plan?.planDetails?.addons?.find(
      (x) =>
        x.packageID === a.packageID && x.packageOptionID === a.packageOptionID
    )
  ) as AddonModelBV[];
};
const setPlanPriceAndCampaignDiscounts = (
  productData: ProductDetailsStateModel | undefined,
  productType: EcomProductType,
  plan: InsurancesModelCart,
  basePrice?: number,
  campaigns?: CampaignModel[],
  configuration?: CartStateModel,
  Packages?: InsurancesModelBV[]
) => {
  const addOns = setOrginalAddOns(plan, Packages);
  addOns?.forEach((addOn) => {
    if (addOn.FOC === "Yes") {
      addOn.addonPrice = 0;
      addOn.discount = 0;
    } else {
      const addOnDiscountData =
        addOn.productType === EcomProductType.CashBack
          ? {
              originalPrice: calculateEcomNormalPrice(
                {
                  priceType: addOn.addonPriceType,
                  priceValue: addOn.addonPriceValue,
                },

                basePrice || 0
              ),

              discount: 0,
            }
          : addOn.productType === EcomProductType.InsuranceAddons
          ? getAppliedDiscountForPlanAddons(addOn, basePrice || 0, campaigns)
          : getAppliedDiscount(
              productData,
              basePrice || 0,
              addOn.productType,
              {
                productID: addOn.packageID,
                productOptionID: addOn.packageOptionID,
              },
              campaigns,
              configuration
            );

      addOn.addonPrice = addOnDiscountData.originalPrice;
      addOn.campaignID = addOnDiscountData.campaignID;
      addOn.discount = addOnDiscountData.discount;
    }
  });
  const discountData = getAppliedDiscount(
    productData,
    basePrice || 0,
    productType,
    {
      productID: plan.productID,
      productOptionID: plan?.planDetails?.productOptionID,
      sortOrder: plan.sortOrder,
    },
    campaigns,
    configuration
  );

  plan.salesPrice = discountData.originalPrice;
  // plan.campaignID = discountData?.campaignID;
  plan.offerPrice = discountData.originalPrice - discountData.discount;

  return plan;
};

const addMatchingAddonToCorrespondingEntities = (
  ecomProductData: ProductDetailsStateModel | undefined,
  configuration?: CartStateModel,
  campaigns?: CampaignModel[] | undefined,
  basePrice?: number
) => {
  if (!ecomProductData || !configuration) {
    return;
  }

  const allSelectedPackages = getAllSelectedPackages(configuration);

  if (configuration.customerCare?.length) {
    const allAddons = getAllAddonsOfEcomConfigurationPlan(
      ecomProductData.customerCarePackages,
      configuration.customerCare?.[0]?.productID,
      configuration.customerCare?.[0]?.planDetails.productOptionID
    );
    const addOns = addMatchingAddons(
      configuration.customerCare?.[0]?.planDetails?.addons || [],
      allAddons || [],
      allSelectedPackages,
      basePrice || 0,
      campaigns,
      ecomProductData,
      configuration
    );
    const customerCare = {
      ...configuration.customerCare?.[0],
      planDetails: {
        ...configuration.customerCare?.[0]?.planDetails,
        addons: addOns,
      },
    };

    configuration.customerCare = [customerCare];
  }
  if (configuration.extendedWarranty?.length) {
    const allAddons = getAllAddonsOfEcomConfigurationPlan(
      ecomProductData.extendedWarrenty,
      configuration.extendedWarranty?.[0]?.productID,
      configuration.extendedWarranty?.[0]?.planDetails.productOptionID
    );
    const addOns = addMatchingAddons(
      configuration.extendedWarranty?.[0]?.planDetails?.addons || [],
      allAddons || [],
      allSelectedPackages,
      basePrice || 0,
      campaigns,
      ecomProductData,
      configuration
    );

    const extendedWarranty = {
      ...configuration.extendedWarranty?.[0],
      planDetails: {
        ...configuration.extendedWarranty?.[0]?.planDetails,
        addons: addOns,
      },
    };

    configuration.extendedWarranty = [extendedWarranty];
  }
  if (configuration.insuranceDetails?.length) {
    const allAddons = getAllAddonsOfEcomConfigurationPlan(
      ecomProductData.insurancesList,
      configuration.insuranceDetails?.[0]?.productID,
      configuration.insuranceDetails?.[0]?.planDetails.productOptionID
    );
    const addOns = addMatchingAddons(
      configuration.insuranceDetails?.[0]?.planDetails?.addons || [],
      allAddons || [],
      allSelectedPackages,
      basePrice || 0,
      campaigns,
      ecomProductData,
      configuration
    );

    const insuranceDetails = {
      ...configuration.insuranceDetails?.[0],
      planDetails: {
        ...configuration.insuranceDetails?.[0]?.planDetails,
        addons: addOns,
      },
    };

    configuration.insuranceDetails = [insuranceDetails];
  }
  if (configuration.registration?.length) {
    const allAddons = getAllAddonsOfEcomConfigurationPlan(
      ecomProductData?.registrationPrice,
      configuration.registration?.[0]?.productID,
      configuration.registration?.[0]?.productOptionID
    );
    const addOns = addMatchingAddons(
      configuration.registration?.[0]?.addons || [],
      allAddons || [],
      allSelectedPackages,
      basePrice || 0,
      campaigns,
      ecomProductData,
      configuration
    );
    const registration = {
      ...configuration.registration?.[0],
      addons: addOns,
    };

    configuration.registration = [registration];
  }
  if (configuration.tpl?.length) {
    const allAddons = getAllAddonsOfEcomConfigurationPlan(
      ecomProductData?.tplPrice,
      configuration.tpl?.[0]?.productID,
      configuration.tpl?.[0]?.productOptionID
    );
    const addOns = addMatchingAddons(
      configuration.tpl?.[0]?.addons || [],
      allAddons || [],
      allSelectedPackages,
      basePrice || 0,
      campaigns,
      ecomProductData,
      configuration
    );
    const tpl = {
      ...configuration.tpl?.[0],
      addons: addOns,
    };
    configuration.tpl = [tpl];
  }
  if (configuration.serviceDetails?.length) {
    const allAddons = getAllAddonsOfEcomConfigurationPlan(
      ecomProductData.servicesList,
      configuration.serviceDetails?.[0]?.productID,
      configuration.serviceDetails?.[0]?.planDetails.productOptionID
    );
    const addOns = addMatchingAddons(
      configuration.serviceDetails?.[0]?.planDetails?.addons || [],
      allAddons || [],
      allSelectedPackages,
      basePrice || 0,
      campaigns,
      ecomProductData,
      configuration
    );
    const serviceDetails = {
      ...configuration.serviceDetails?.[0],
      planDetails: {
        ...configuration.serviceDetails?.[0]?.planDetails,
        addons: addOns,
      },
    };
    configuration.serviceDetails = [serviceDetails];
  }
};

const getAllSelectedPackages = (
  configuration?: CartStateModel
): {
  productType: EcomProductType;
  productID: number;
  productOptionID: number;
}[] => {
  if (!configuration) {
    return [];
  }
  const allSelectedPackages: {
    productType: EcomProductType;
    productID: number;
    productOptionID: number;
  }[] = [];
  if (configuration.customerCare?.length) {
    allSelectedPackages.push({
      productType: EcomProductType.CustomerCarePackage,
      productID: configuration.customerCare?.[0]?.productID,
      productOptionID:
        configuration.customerCare?.[0]?.planDetails?.productOptionID,
    });
  }
  if (configuration.extendedWarranty?.length) {
    allSelectedPackages.push({
      productType: EcomProductType.ExtendedWarranty,
      productID: configuration.extendedWarranty?.[0]?.productID,
      productOptionID:
        configuration.extendedWarranty?.[0]?.planDetails?.productOptionID,
    });
  }
  if (configuration.insuranceDetails?.length) {
    allSelectedPackages.push({
      productType: EcomProductType.Insurance,
      productID: configuration.insuranceDetails?.[0]?.productID,
      productOptionID:
        configuration.insuranceDetails?.[0]?.planDetails?.productOptionID,
    });
  }
  if (configuration.registration?.length) {
    allSelectedPackages.push({
      productType: EcomProductType.Registration,
      productID: configuration.registration?.[0]?.productID,
      productOptionID: configuration.registration?.[0]?.productOptionID,
    });
  }
  if (configuration.serviceDetails?.length) {
    allSelectedPackages.push({
      productType: EcomProductType.ServicePackage,
      productID: configuration.serviceDetails?.[0]?.productID,
      productOptionID:
        configuration.serviceDetails?.[0]?.planDetails?.productOptionID,
    });
  }
  if (configuration.tpl?.length) {
    allSelectedPackages.push({
      productType: EcomProductType.TPL,
      productID: configuration.tpl?.[0]?.productID,
      productOptionID: configuration.tpl?.[0]?.productOptionID,
    });
  }

  return allSelectedPackages;
};

const addMatchingAddons = (
  existingAddOns: AddonModelCart[],
  allAddOns: AddonModelBV[],
  selectedPackages: {
    productType: EcomProductType;
    productID: number;
    productOptionID: number;
  }[],
  basePrice: number,
  campaign?: CampaignModel[] | undefined,
  productData?: ProductDetailsStateModel | undefined,
  cartData?: CartStateModel
): AddonModelCart[] => {
  const addOns = existingAddOns.filter(
    (ad) => ad.productType === EcomProductType.InsuranceAddons
  );

  const newAddons = allAddOns
    .filter((add) =>
      selectedPackages.find(
        (sp) =>
          add.productType === sp.productType &&
          add.packageID === sp.productID &&
          add.packageOptionID === sp.productOptionID
      )
    )
    ?.map((n) => {
      const addOnDiscountData =
        n.productType === "insuranceAddons"
          ? getAppliedDiscountForPlanAddons(n, basePrice || 0, campaign)
          : getAppliedDiscount(
              productData,
              basePrice || 0,
              n.productType,
              {
                productID: n.packageID,
                productOptionID: n.packageOptionID,
              },
              campaign,
              cartData
            );

      return {
        addonID: n.addonID,
        price: addOnDiscountData.originalPrice - addOnDiscountData.discount,
        originalPrice: addOnDiscountData.originalPrice,
        productType: n.productType,
        packageID: n.packageID,
        packageOptionID: n.packageOptionID,
        FOC: n.FOC,
      };
    });
  if (newAddons.length) {
    addOns.push(...newAddons);
  }
  return addOns;
};

export const checkIsValidProduct = (
  productType: EcomProductType,
  product: {
    productID: number;
    productOptionID: number;
  },
  options?: { addOnMode?: boolean },
  productData?: ProductDetailsStateModel | undefined
) => {
  switch (productType) {
    case EcomProductType.CashBack: {
      if (options?.addOnMode) {
        return false;
      }
      return true;
    }

    case EcomProductType.Accessories: {
      if (options?.addOnMode) {
        return false;
      }

      return productData?.accessories?.some(
        (acc) => acc.productID?.toString() === product.productID?.toString()
      );
    }
    case EcomProductType.AccessoryPackages: {
      if (options?.addOnMode) {
        return false;
      }

      return productData?.accessoryPackages?.some(
        (acc) => acc.packageID?.toString() === product.productID?.toString()
      );
    }

    case EcomProductType.InsuranceAddons: {
      return true;
    }

    case EcomProductType.CustomerCarePackage: {
      return !!getSelectedPlanByProductAndOptionID(
        productData?.customerCarePackages,

        product.productID,

        product.productOptionID
      );
    }

    case EcomProductType.ExtendedWarranty: {
      return !!getSelectedPlanByProductAndOptionID(
        productData?.extendedWarrenty,

        product.productID,

        product.productOptionID
      );
    }

    case EcomProductType.Insurance: {
      return !!getSelectedPlanByProductAndOptionID(
        productData?.insurancesList,

        product.productID,

        product.productOptionID
      );
    }

    case EcomProductType.Registration: {
      if (options?.addOnMode) {
        return false;
      }

      return !!getSelectedPlanByProductAndOptionID(
        productData?.registrationPrice,

        product.productID,

        product.productOptionID
      );
    }

    case EcomProductType.ServicePackage: {
      return !!getSelectedPlanByProductAndOptionID(
        productData?.servicesList,

        product.productID,

        product.productOptionID
      );
    }

    case EcomProductType.TPL: {
      if (options?.addOnMode) {
        return false;
      }

      return !!getSelectedPlanByProductAndOptionID(
        productData?.tplPrice,

        product.productID,

        product.productOptionID
      );
    }

    default: {
      return false;
    }
  }
};

export const isProductSelectedInConfiguration = (
  productType: EcomProductType,
  product: { productID: number; productOptionID: number },
  cartData?: CartStateModel,
  campaigns?: CampaignModel[]
): boolean | undefined => {
  switch (productType) {
    case EcomProductType.Accessories:
      return cartData?.accessoriesInfo?.some(
        (acc) => acc.productID?.toString() === product.productID?.toString()
      );
    case EcomProductType.AccessoryPackages:
      return cartData?.accessoryPackages?.some(
        (acc) => acc.packageID?.toString() === product.productID?.toString()
      );
    case EcomProductType.CashBack:
      return campaigns?.some((c) =>
        c.appliedItems?.find(
          (ai) =>
            ai.productID?.toString() === product.productID?.toString() &&
            ai.productOptionID?.toString() ===
              product.productOptionID?.toString()
        )
      );

    case EcomProductType.CustomerCarePackage:
      return (
        cartData?.customerCare?.[0]?.productID === product.productID &&
        cartData?.customerCare?.[0]?.planDetails?.productOptionID ===
          product.productOptionID
      );

    case EcomProductType.ExtendedWarranty:
      return (
        cartData?.extendedWarranty?.[0]?.productID === product.productID &&
        cartData?.extendedWarranty?.[0]?.planDetails?.productOptionID ===
          product.productOptionID
      );

    case EcomProductType.Insurance:
      return (
        cartData?.insuranceDetails?.[0]?.productID?.toString() ===
          product.productID?.toString() &&
        cartData?.insuranceDetails?.[0]?.planDetails?.productOptionID?.toString() ===
          product.productOptionID?.toString()
      );

    case EcomProductType.InsuranceAddons: {
      const criteria = (ia: AddonModelCart) =>
        ia.productType === productType &&
        ia.packageID === product.productID &&
        ia.packageOptionID === product.productOptionID;

      return (
        cartData?.customerCare?.[0]?.planDetails?.addons?.some(criteria) ||
        cartData?.extendedWarranty?.[0]?.planDetails?.addons?.some(criteria) ||
        cartData?.insuranceDetails?.[0]?.planDetails?.addons?.some(criteria) ||
        cartData?.registration?.[0]?.addons?.some(criteria) ||
        cartData?.serviceDetails?.[0]?.planDetails?.addons?.some(criteria) ||
        cartData?.tpl?.[0]?.addons?.some(criteria)
      );
    }

    case EcomProductType.Registration:
      return (
        cartData?.registration?.[0]?.productID === product.productID &&
        cartData?.registration?.[0]?.productOptionID === product.productOptionID
      );

    case EcomProductType.ServicePackage:
      return (
        cartData?.serviceDetails?.[0]?.productID === product.productID &&
        cartData?.serviceDetails?.[0]?.planDetails?.productOptionID ===
          product.productOptionID
      );

    case EcomProductType.TPL:
      return (
        cartData?.tpl?.[0]?.productID === product.productID &&
        cartData?.tpl?.[0]?.productOptionID === product.productOptionID
      );

    default: {
      return false;
    }
  }
};

export const onProductSelection = (
  productType: EcomProductType,
  product: { productID: number; productOptionID: number },
  selected: boolean,
  productData: ProductDetailsStateModel | undefined,
  cartData: CartStateModel
) => {
  const selectedCashback = cartData?.campaignCashbackItems?.filter(
    (cashback) =>
      !(
        cashback.productType === productType &&
        cashback.productID === product.productID &&
        (productType === EcomProductType.Accessories ||
          productType === EcomProductType.AccessoryPackages ||
          cashback.productOptionID === product.productOptionID)
      )
  );

  cartData.campaignCashbackItems = selectedCashback;

  switch (productType) {
    case EcomProductType.Accessories: {
      const accessory = productData?.accessories?.find(
        (acc) => acc.productID?.toString() === product.productID?.toString()
      );

      if (accessory) {
        onSingleAccessorySelect(accessory, selected, cartData!, productData!);
      }
      return;
    }
    case EcomProductType.AccessoryPackages: {
      const accessoryPackage = productData?.accessoryPackages?.find(
        (acc) => acc.packageID?.toString() === product.productID?.toString()
      );

      if (accessoryPackage) {
        onSingleAccessoryPackageSelect(
          accessoryPackage,
          selected,
          cartData!,
          productData!
        );
      }

      return;
    }
    case EcomProductType.CustomerCarePackage: {
      onCustomerCarePackageChange(
        selected
          ? getSelectedPlanByProductAndOptionID(
              productData?.customerCarePackages,
              product.productID,
              product.productOptionID
            )
          : undefined,
        cartData!,
        productData!
      );
      return;
    }
    case EcomProductType.ExtendedWarranty: {
      onWarrantyPackageChange(
        selected
          ? getSelectedPlanByProductAndOptionID(
              productData?.extendedWarrenty,
              product.productID,
              product.productOptionID
            )
          : undefined,
        cartData!,
        productData!
      );
      return;
    }
    case EcomProductType.Insurance: {
      onInsuranceChange(
        selected
          ? getSelectedPlanByProductAndOptionID(
              productData?.insurancesList,
              product.productID,
              product.productOptionID
            )
          : undefined,
        cartData!,
        productData!
      );
      return;
    }
    case EcomProductType.ServicePackage: {
      onServicePackageChange(
        selected
          ? getSelectedPlanByProductAndOptionID(
              productData?.servicesList,
              product.productID,
              product.productOptionID
            )
          : undefined,
        cartData!,
        productData!
      );
      return;
    }
    default: {
      return;
    }
  }
};

const onSingleAccessorySelect = (
  accessory: any,

  selected: boolean,

  configuration: CartStateModel,

  productData: ProductDetailsStateModel
) => {
  const newAccessories = [
    ...(configuration?.accessoriesInfo?.filter(
      (acc) => accessory.productID !== acc.productID
    ) || []),
  ];

  if (selected) {
    newAccessories.push(accessory);
  }

  configuration.accessoriesInfo = newAccessories;

  setConfigurationPrices(productData, configuration);
};

const onCustomerCarePackageChange = (
  customerCare: any,

  configuration: CartStateModel,

  productData: ProductDetailsStateModel
) => {
  configuration.customerCare = customerCare ? [customerCare] : [];

  if (configuration.customerCare) {
    addFOCExtraAddonsToConfiguration(
      productData,

      productData?.customerCarePackages || [],

      configuration,

      {
        productID: configuration.customerCare?.[0]?.productID,

        productOptionID:
          configuration.customerCare?.[0]?.planDetails?.productOptionID,
      }
    );
  }

  setConfigurationPrices(productData, configuration);
};

const onWarrantyPackageChange = (
  extendedWarranty: any,

  configuration: CartStateModel,

  productData: ProductDetailsStateModel
) => {
  configuration.extendedWarranty = extendedWarranty ? [extendedWarranty] : [];

  if (configuration.extendedWarranty) {
    addFOCExtraAddonsToConfiguration(
      productData,

      productData?.extendedWarrenty || [],

      configuration,

      {
        productID: configuration.extendedWarranty?.[0]?.productID,

        productOptionID:
          configuration.extendedWarranty?.[0]?.planDetails?.productOptionID,
      }
    );
  }

  setConfigurationPrices(productData, configuration);
};

const onInsuranceChange = (
  insuranceDetails: any,
  configuration: CartStateModel,
  productData: ProductDetailsStateModel
) => {
  configuration.insuranceDetails = insuranceDetails ? [insuranceDetails] : [];

  if (configuration.insuranceDetails) {
    addFOCExtraAddonsToConfiguration(
      productData,
      productData?.insurancesList || [],
      configuration,
      {
        productID: configuration.insuranceDetails?.[0]?.productID,

        productOptionID:
          configuration.insuranceDetails?.[0]?.planDetails?.productOptionID,
      }
    );
  }

  setConfigurationPrices(productData, configuration);
};

const onServicePackageChange = (
  serviceDetails: any,

  configuration: CartStateModel,

  productData: ProductDetailsStateModel
) => {
  configuration.serviceDetails = serviceDetails ? [serviceDetails] : [];

  if (configuration.serviceDetails) {
    addFOCExtraAddonsToConfiguration(
      productData,

      productData?.servicesList || [],

      configuration,

      {
        productID: configuration.serviceDetails?.[0]?.productID,

        productOptionID:
          configuration.serviceDetails?.[0]?.planDetails?.productOptionID,
      }
    );
  }

  setConfigurationPrices(productData, configuration);
};

export const addProductToConfigurationIfNotExists = (
  configuration: CartStateModel,
  ecomProductData: ProductDetailsStateModel | undefined,
  productType: EcomProductType,
  product: { productID: number; productOptionID: number }
) => {
  switch (productType) {
    case EcomProductType.Accessories: {
      if (
        !configuration.accessoriesInfo?.find(
          (acc) => acc.productID?.toString() === product.productID?.toString()
        )
      ) {
        const accesory = ecomProductData?.accessories?.find(
          (ac) => ac.productID?.toString() === product.productID?.toString()
        );

        if (accesory) {
          configuration.accessoriesInfo = configuration.accessoriesInfo || [];

          configuration.accessoriesInfo.push(accesory as any);
        }
      }

      break;
    }

    case EcomProductType.CustomerCarePackage: {
      if (!configuration.customerCare?.length) {
        configuration.customerCare = [
          getSelectedPlanByProductAndOptionID(
            ecomProductData?.customerCarePackages,

            product.productID,

            product.productOptionID
          ) as CustomerCareModelCart,
        ];

        // reccursion

        addFOCExtraAddonsToConfiguration(
          ecomProductData,

          ecomProductData?.customerCarePackages || [],

          configuration,

          product
        );
      }

      break;
    }

    case EcomProductType.ExtendedWarranty: {
      if (!configuration.extendedWarranty?.length) {
        configuration.extendedWarranty = [
          getSelectedPlanByProductAndOptionID(
            ecomProductData?.extendedWarrenty,

            product.productID,

            product.productOptionID
          ) as ExtendedWarrantyModelCart,
        ];

        // reccursion

        addFOCExtraAddonsToConfiguration(
          ecomProductData,

          ecomProductData?.extendedWarrenty || [],

          configuration,

          product
        );
      }

      break;
    }

    case EcomProductType.Insurance: {
      if (!configuration.insuranceDetails?.length) {
        configuration.insuranceDetails = [
          getSelectedPlanByProductAndOptionID(
            ecomProductData?.insurancesList,

            product.productID,

            product.productOptionID
          ) as InsurancesModelCart,
        ];

        // reccursion

        addFOCExtraAddonsToConfiguration(
          ecomProductData,

          ecomProductData?.insurancesList || [],

          configuration,

          product
        );
      }

      break;
    }

    // case EcomProductType.Registration: {

    //   if (!configuration.registration) {

    //     configuration.registration = getSelectedPlanByProductAndOptionID(

    //       ecomProductData.product?.registrationPrice,

    //       addOn.packageID,

    //       addOn.packageOptionID

    //     );

    //     // reccursion

    //     addFOCExtraAddonsToConfiguration(

    //       ecomProductData,

    //       ecomProductData.product?.registrationPrice || [],

    //       configuration,

    //       {

    //         productID: addOn.packageID,

    //         productOptionID: addOn.packageOptionID,

    //       }

    //     );

    //   }

    //   break;

    // }

    case EcomProductType.ServicePackage: {
      if (!configuration.serviceDetails?.length) {
        configuration.serviceDetails = [
          getSelectedPlanByProductAndOptionID(
            ecomProductData?.servicesList,

            product.productID,

            product.productOptionID
          ) as ServicesModelCart,
        ];

        // reccursion

        addFOCExtraAddonsToConfiguration(
          ecomProductData,

          ecomProductData?.servicesList || [],

          configuration,

          product
        );
      }

      break;
    }

    // case EcomProductType.TPL: {

    //   if (!configuration.tpl) {

    //     configuration.tpl = getSelectedPlanByProductAndOptionID(

    //       ecomProductData.product?.tplPrice,

    //       addOn.packageID,

    //       addOn.packageOptionID

    //     );

    //     // reccursion

    //     addFOCExtraAddonsToConfiguration(

    //       ecomProductData,

    //       ecomProductData.product?.tplPrice || [],

    //       configuration,

    //       {

    //         productID: addOn.packageID,

    //         productOptionID: addOn.packageOptionID,

    //       }

    //     );

    //   }

    //   break;

    // }

    default:
      break;
  }
};

export const onSingleAccessoryPackageSelect = (
  accessoryPackage: CartAccessoryPackage,

  selected: boolean,

  configuration: CartStateModel,

  productData: ProductDetailsStateModel
) => {
  const newAccessoryPackages = [
    ...(configuration?.accessoryPackages?.filter(
      (acc) => accessoryPackage.packageID !== acc.packageID
    ) || []),
  ];

  if (selected) {
    newAccessoryPackages.push({
      ...accessoryPackage,

      accessories: accessoryPackage.accessories?.filter(
        (acc) =>
          (!accessoryPackage.tintAvailable ||
            !accessoryPackage.tint?.componentCode ||
            accessoryPackage?.tint?.componentCode !== acc.componentCode) &&
          (!accessoryPackage.leatherPreferance ||
            !accessoryPackage.leatherPreferanceComponentCode ||
            accessoryPackage?.leatherPreferanceComponentCode !==
              acc.componentCode)
      ),
    });
  }

  configuration.accessoryPackages = newAccessoryPackages;

  const config = setConfigurationPrices(productData, configuration);
  return config;
};

export const onSingleCampaignCashbackSelection = (
  cashback: ConfigurationCampaignCashBack,

  selected: boolean,

  cartData: CartStateModel,

  productData: ProductDetailsStateModel
) => {
  const newCashbacks = [
    ...(cartData?.campaignCashbackItems?.filter(
      (cb) =>
        cb.productType !== cashback.productType ||
        (![
          EcomProductType.CustomerCarePackage,

          EcomProductType.ExtendedWarranty,

          EcomProductType.Insurance,

          EcomProductType.Registration,

          EcomProductType.ServicePackage,

          EcomProductType.TPL,
        ].includes(cb.productType as EcomProductType) &&
          cb.productID !== cashback.productID)
    ) || []),
  ];

  if (selected) {
    newCashbacks.push(cashback);

    removeProductIfAlreadyAdded(
      cashback.productType,

      {
        productID: cashback.productID,

        productOptionID: cashback.productOptionID,
      },

      productData,

      cartData
    );
  }

  cartData.campaignCashbackItems = newCashbacks;

  setConfigurationPrices(productData, cartData);
};

const removeProductIfAlreadyAdded = (
  productType: string,

  product: { productID: number; productOptionID: number },

  productData: ProductDetailsStateModel,

  cartData: CartStateModel
) => {
  switch (productType) {
    case EcomProductType.Accessories: {
      const accessory = productData?.accessories?.find(
        (acc) => acc.productID === product.productID
      );

      if (accessory) {
        onSingleAccessorySelect(accessory, false, cartData, productData);
      }

      return;
    }

    case EcomProductType.AccessoryPackages: {
      const accessoryPackage = productData?.accessoryPackages?.find(
        (acc) => acc.packageID === product.productID
      );

      if (accessoryPackage) {
        onSingleAccessoryPackageSelect(
          accessoryPackage,

          false,

          cartData,

          productData
        );
      }

      return;
    }

    case EcomProductType.CustomerCarePackage: {
      if (
        cartData?.customerCare &&
        cartData?.customerCare?.[0]?.productID === product.productID &&
        cartData.customerCare?.[0]?.planDetails?.productOptionID ===
          product.productOptionID
      ) {
        onCustomerCarePackageChange(undefined, cartData, productData);
      }

      return;
    }

    case EcomProductType.ExtendedWarranty: {
      if (
        cartData?.extendedWarranty &&
        cartData?.extendedWarranty?.[0]?.productID === product.productID &&
        cartData.extendedWarranty?.[0]?.planDetails?.productOptionID ===
          product.productOptionID
      ) {
        onWarrantyPackageChange(undefined, cartData, productData);
      }

      return;
    }

    case EcomProductType.Insurance: {
      if (
        cartData?.insuranceDetails &&
        cartData?.insuranceDetails?.[0]?.productID === product.productID &&
        cartData?.insuranceDetails?.[0]?.planDetails?.productOptionID ===
          product.productOptionID
      ) {
        onInsuranceChange(undefined, cartData, productData);
      }

      return;
    }

    case EcomProductType.ServicePackage: {
      if (
        cartData?.serviceDetails &&
        cartData?.serviceDetails?.[0]?.productID === product.productID &&
        cartData?.serviceDetails?.[0]?.planDetails?.productOptionID ===
          product.productOptionID
      ) {
        onServicePackageChange(undefined, cartData, productData);
      }

      return;
    }

    default: {
      return;
    }
  }
};

export const isCashbackSelectedInConfiguration = (
  productType: EcomProductType,

  product: { productID: number; productOptionID?: number },

  cartData: CartStateModel
): boolean | undefined => {
  return cartData?.campaignCashbackItems?.some(
    (cashback) =>
      cashback.productType === productType &&
      cashback.productID === product.productID &&
      cashback.productOptionID === product.productOptionID
  );
};

export const isProductExcludedFromCampaign = (
  productType: EcomProductType,

  productID: number,

  cartData: CartStateModel
): boolean | undefined => {
  return cartData?.campaignCashbackItems?.some(
    (cashback) =>
      cashback.productType === productType &&
      ([
        EcomProductType.CustomerCarePackage,

        EcomProductType.ExtendedWarranty,

        EcomProductType.Insurance,

        EcomProductType.Registration,

        EcomProductType.ServicePackage,

        EcomProductType.TPL,
      ].includes(productType) ||
        cashback.productID === productID)
  );
};

export const getFinanceCampaignOffer = (
  bankID: number,

  campaigns?: CampaignModel[]
) => {
  const campaign = campaigns?.find((c) =>
    c.financeDetails?.find((fd) => fd.bankID === bankID)
  );

  if (!campaign) {
    return undefined;
  }

  const campaignOffer = campaign.financeDetails?.find(
    (fd) => fd.bankID === bankID
  );

  if (!campaignOffer) {
    return undefined;
  }

  campaignOffer.campaignID = campaign.campaignID;

  return { ...campaignOffer };
};

export const getCampaignFinance = (
  campaign: CampaignModel,
  productData: ProductDetailsStateModel,
  cartData: CartStateModel
) => {
  if (!campaign?.financeDetails) {
    return undefined;
  }
  const banks = productData.bankDetails;

  const financeDetails = campaign?.financeDetails?.find((c) =>
    banks?.find((b) => b.bankID === c.bankID)
  );

  if (!financeDetails) {
    return undefined;
  }
  const selectedBank = banks.find(
    (item) => item.bankID === financeDetails?.bankID
  );

  const cOffer = selectedBank?.bankID
    ? getFinanceCampaignOffer(selectedBank.bankID, [campaign])
    : undefined;

  const effRate =
    (selectedBank?.annualInterestRate || 0) -
    calculateDiscount(
      "percentage",
      cOffer?.campDiscountPercentage || 0,
      selectedBank?.annualInterestRate || 0
    );

  const combinationData = cartData?.productInfo?.combinationInfo?.[0];
  const productCombinations = combinationData?.combinationID
    ? productData?.productDetails?.combinations?.find(
        (x) => x.combinationID === combinationData?.combinationID
      )
    : undefined;

  const campaigns = [campaign];

  const campaignCashBackDiscount =
    campaigns?.reduce(
      (s, c) =>
        s +
        (c.appliedItems
          ?.filter((ai) => ai.productType === EcomProductType.CashBack)
          ?.reduce(
            (t1, ai) =>
              t1 +
              (calculateDiscount(
                ai.campDiscountType,
                ai.campDiscountValue,
                productCombinations?.combinationOfferPrice || 0
              ) || 0),
            0
          ) || 0) +
        (cartData.campaignCashbackItems
          ?.filter((cash) => cash.campaignID === c.campaignID)
          ?.reduce((t2, c1) => t2 + c1.cashbackAmount, 0) || 0),
      0
    ) || 0;

  const principalAmount = getFinancePrinciaplAmount(
    cartData,
    productData,
    campaignCashBackDiscount
  );

  const finance = {
    term: selectedBank?.maximumTenure || 60,
    bankID: financeDetails?.bankID,
    monthlyPayment: calculateMonthlyPayment(
      principalAmount - (selectedBank?.minDownPayment || 0),
      effRate / 100,
      selectedBank?.maximumTenure || 60
    ),
    downPayment: selectedBank?.minDownPayment || 0,
    bankName: selectedBank?.bankName || "",
    interestRate: selectedBank?.annualInterestRate || 0,
    campDiscountPercentage: cOffer?.campDiscountPercentage,
    numOfFreeEmi: cOffer?.numOfFreeEmi,
    campCashback: cOffer?.campCashback,
    campaignID: cOffer?.campaignID,
    effectiveInterestRate: effRate,
  };

  return { ...finance };
};

export const calculateMonthlyPayment = (
  principalAmount: number,

  rate: number,

  tenure: number
): number => {
  if (rate < 0) {
    return 0;
  }

  if (tenure <= 0) {
    return 0;
  }

  if (principalAmount <= 0) {
    return 0;
  }

  const denominator = tenure;

  if (denominator === 0) {
    return 0;
  }

  const totalRate = rate * (tenure / 12);

  const numerator = principalAmount * (1 + totalRate);

  return numerator / denominator;
};


export enum productTypes {
  automobiles = 'automobiles',
  powerproduct = 'powerproduct',
  motorcycle = 'motorcycle',
  marine = 'marine',
}
