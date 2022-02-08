import React from 'react';
// import 'assets/sass/common.scss';
// import 'assets/sass/trim-level.scss';
import ProductItem from './ProductItem';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from "../../../app/store";
import {
  api,
  bankListActions,
  BankListStateModel,
  EditionVarientActions,
  EditionVarientDataViewModel,
  EditionVarientProductModel,
  showRoomListActions,
  ShowRoomListStateModel,
} from 'alg-ecom-frontend-core';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import SubHeader from './SubHeader';
import { useDataLoader } from '../../../utils/useDataLoader';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
const customQuickStyles: ReactModal.Styles = {
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    height: 'auto',
    maxWidth: '1140px',
    width: '100%',
    border: '0',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.08)',
    padding: '0',
    margin: '20px auto',
  },
  overlay: {
    zIndex: 100000,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    overflow: 'auto',
  },
};

const customFinanceStyles: ReactModal.Styles = {
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    height: 'auto',
    maxWidth: '540px',
    width: '100%',
    border: '0',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.08)',
    padding: '0',
    margin: '20px auto',
  },
  overlay: {
    zIndex: 100000,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    overflow: 'auto',
  },
};
const customStyles: ReactModal.Styles = {
  content: {
    position: 'relative',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    height: '100%',
    maxWidth: '100%',
    width: '100%',
    border: '0',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.08)',
    padding: '0',
    margin: 'auto',
  },
  overlay: {
    zIndex: 100000,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    overflow: 'auto',
  },
};
enum TabNames {
  All = 'All',
  Cars = 'Cars',
  Suv = 'Suv',
  Trucks = 'Trucks',
}
const years = [
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
];

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
  arrows: false,
  className: 'product-slider d-lg-block d-flex flex-wrap',
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
  // editionData: EditionVarientDataViewModel;
  getEditionVarients: typeof EditionVarientActions.getEditionVarients;
  location?: any;
  banks: BankListStateModel;
  getBankList: typeof bankListActions.getBankList;
  showRooms: ShowRoomListStateModel;
  getShowRoomList: typeof showRoomListActions.getShowRoomList;
  year: number;
  modelCode: string;
  trim: string;
  onItemClick: any;
}

const TrimLevelSelectionTwo: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  // const { year, modelCode, trim } = useParams<{
  //   year: string;
  //   modelCode: string;
  //   trim: string;
  // }>();
  const [selectedProduct, setSelectedProduct] = React.useState<
    EditionVarientProductModel | undefined
  >(undefined);
  React.useEffect(() => {
    props.getBankList();
    props.getShowRoomList();
  }, []);
  const [
    isFinancialCalcActive,
    setIsFinancialCalcActive,
  ] = React.useState<boolean>(false);
  const [isTestDriveActive, setIsTestDriveActive] = React.useState<boolean>(
    false
  );
  const {
    data,
    reload,
    loaded,
    loading,
  } = useDataLoader<EditionVarientDataViewModel>(() =>
    api.build.trimWiseList(props.year, props.modelCode, props.trim)
  );
  const { t } = useTranslation();
  const [tabName, setTabName] = React.useState(TabNames.All);
  const [selectedVarient, setSelectedVarient] = React.useState<
    EditionVarientProductModel | undefined
  >(undefined);

  const [iFrameUrl, setIFrameUrl] = React.useState('');
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  React.useEffect(() => {
    props.getEditionVarients('', () => {
      setSelectedVarient(
        data?.productsList?.length > 0 ? data?.productsList[0] : undefined
      );
    });
    if (!loaded) {
      scrollTop();
    }
  }, []);
  React.useEffect(() => {
    setSelectedVarient(
      data?.productsList?.length > 0 ? data?.productsList[0] : undefined
    );
  }, [data]);

  return (
    <>
      <SubHeader headerText={data?.pageTitle} />
      <div className="product-list  overflow-hidden">
        <div className="container px-lg-3 px-0">
          <Slider {...sliderSettings}>
            {data &&
              data?.productsList.map((product: any) => {
                return (
                  <ProductItem
                    product={product}
                    key={product.productID}
                    isSelected={
                      selectedVarient?.productID === product.productID
                    }
                    onItemClick={() =>
                      props.onItemClick(
                        product.productID,
                        product.productImage,
                        product.salesPrice,
                        product.productTitle
                      )
                    }
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
      getEditionVarients: EditionVarientActions.getEditionVarients,
      getBankList: bankListActions.getBankList,
      getShowRoomList: showRoomListActions.getShowRoomList,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.editionVarientState.isLoading,
    editionData: state.editionVarientState.data,
    banks: state.bankState,
    showRooms: state.showRoomState,
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TrimLevelSelectionTwo);
