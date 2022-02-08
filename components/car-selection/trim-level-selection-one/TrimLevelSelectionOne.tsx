import React from 'react';
// import 'assets/sass/common.scss';
// import 'assets/sass/trim-level.scss';
import ProductItem from './ProductItem';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { RootState } from "../../../app/store";
import {
  api,
  bankListActions,
  BankListStateModel,
  showRoomListActions,
  ShowRoomListStateModel,
  TrimVarientActions,
  TrimVarientDataViewModel,
  TrimVarientProductModel,
  BuildPriceProductModel,
} from 'alg-ecom-frontend-core';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import SubHeader from './SubHeader';
import MobileTabs from './MobileTabs';

import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import Select from 'react-select';

enum TabNames {
  All = 'All',
  Cars = 'Cars',
  Suv = 'Suv',
  Trucks = 'Trucks',
}

const unslick = 'unslick' as const;

const sliderSettings = {
  key: 'product-slider',
  dots: false,
  draggable: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  // slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: false,
  autoplaySpeed: 2500,
  arrows: true,
  className: 'product-slider d-lg-block d-flex flex-wrap trim-slider',
  responsive: [
    {
      breakpoint: 1119,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 991,
      settings: unslick,
    },
  ],
};

interface CustomProps {
  isLoading: boolean;
  trimData: TrimVarientDataViewModel;
  getTrimVarients: typeof TrimVarientActions.getTrimVarients;
  productsList: BuildPriceProductModel[];
  productLoaded?: boolean;
  modelCode: string;
  // year: number;
  onItemClick: (
    modelCodeA: string,
    trimCodeA: string,
    productID: number,
    image: string,
    price: number,
    productTitle: string,
    year: number
  ) => void;
  onBack: any;
}

const TrimLevelSelectionOne: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  // const { year, modelCode } = useParams<{ year: string; modelCode: string }>();
  const [trimLoaded, setTrimLoaded] = React.useState(false);

  const [productTitle, setProductTitle] = React.useState('');
  const [trimList, setTrimList] = React.useState<TrimVarientProductModel[]>();

  const { t } = useTranslation();
  const [tabName, setTabName] = React.useState(TabNames.All);
  const [selectedVarient, setSelectedVarient] = React.useState<
    TrimVarientProductModel | undefined
  >(undefined);

  const [modelYear, setModelYear] = React.useState<number | undefined>(
    undefined
  );
  const [modelYears, setYears] = React.useState<number[] | undefined>(
    undefined
  );

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const productModelsData = useSelector(
    (state: RootState) => state.productModelsState?.productModelsList
  );
  React.useEffect(() => {
    if (!trimLoaded) {
      const modelData = productModelsData.find(
        (item: any) => item.modelCode === props.modelCode
      );
      const yearsSelected = modelData?.productsby_modelyear?.map((item: any) => {
        return item.modelyear;
      });
      if (yearsSelected) {
        setModelYear(yearsSelected[yearsSelected?.length - 1]);
        setYears(yearsSelected);
        loadTrimList(yearsSelected[yearsSelected?.length - 1]);
      }

      scrollTop();
    }
  }, []);

  const loadTrimList = async (choosenYear: number) => {
    setTrimLoaded(false);
    const data = await api.build.trimList(choosenYear, props.modelCode);
    setTrimList(data?.productsList);
    setProductTitle(data?.pageTitle);
    setSelectedVarient(
      data?.productsList?.length > 0 ? data?.productsList?.[0] : undefined
    );
    setTrimLoaded(true);
  };
  const onModelYearChange = (value: number) => {
    setModelYear(value);
    setTabName(TabNames.All);
    // reload(value.modelyear, TabNames.All);
    loadTrimList(value);
  };
  return (
    <>
      <div className="align-items-center border-bottom d-flex font-normal px-3 py-2">
        <div className="d-inline-flex align-items-center cursor-pointer" onClick={() => props.onBack()}>
          <i
            className="font-lg icon-arrow-left mr-2 text-muted"
          ></i>{' '}
          {t('dashboard.Back')}
        </div>
        <div className="col-auto">
          {modelYears && modelYear && (
            <Select
              placeholder={'Year'}
              getOptionLabel={(option) => `${option.modelyear}`}
              getOptionValue={(option) => `${option.modelyear}`}
              options={modelYears?.map((item) => {
                return { modelyear: item };
              })}
              isSearchable={false}
              defaultValue={{ modelyear: modelYear }}
              onChange={(value) => {
                if (value && value?.modelyear) {
                  onModelYearChange(value?.modelyear);
                }
              }}
              className="select-model select position-relative zIndex-9 trim-select"
            />
          )}
        </div>
      </div>

      <div className="product-list  overflow-hidden">
        <div className="container  px-lg-3 px-0">
          <Slider {...sliderSettings}>
            {trimList &&
              modelYear &&
              trimList?.map((product) => {
                return (
                  <ProductItem
                    product={product}
                    key={product.productID}
                    onItemClick={() =>
                      props.onItemClick(
                        props.modelCode,
                        product.trimCode,
                        product.productID,
                        product.productImage,
                        product.salesPrice,
                        product.productTitle,
                        modelYear
                      )
                    }
                    isSelected={
                      selectedVarient?.productID === product.productID
                    }
                    year={modelYear}
                    modelCode={props.modelCode}
                  />
                );
              })}
          </Slider>
        </div>
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      dispatch,
      getTrimVarients: TrimVarientActions.getTrimVarients,
      getBankList: bankListActions.getBankList,
      getShowRoomList: showRoomListActions.getShowRoomList,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.trimVarientState.isLoading,
    trimData: state.trimVarientState.data,
    banks: state.bankState,
    showRooms: state.showRoomState,
    productsList: state.buildPriceReducer.productsList,
    productLoaded: state.buildPriceReducer.productLoaded,
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TrimLevelSelectionOne);
