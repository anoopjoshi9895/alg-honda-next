/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import * as React from "react";
import { api, UserBooking } from "alg-ecom-frontend-core";
import List from "./List";
import OrderDetails from "./Details";
import { useTranslation } from "react-i18next";
import { useDataLoader } from "../../../utils/useDataLoader";

export interface StateProps {
  isAuthenticationCompleted: boolean;
}

const Booking: React.FunctionComponent<any> = (props) => {
  const { t } = useTranslation();
  const [orderId, setOrderId] = React.useState<number>();

  const {
    data: orders,
    reload,
    loaded,
    loading,
  } = useDataLoader<UserBooking[]>(() => api.user.gerBookings());

  const backClick = () => {
    setOrderId(0);
  };

  return !orderId ? (
    <div className="px-lg-4 px-3 pb-3 pt-lg-3">
      <div className="dashboard-head d-lg-block d-none">
        <div className="row gutter-10 align-items-xl-center justify-content-end">
          <div className="col">
            <h5 className="m-0 text-uppercase">{t("dashboard.Booking")}</h5>
          </div>
          {/* <div className="col-auto">
            <a
              href=""
              className="btn btn-primary btn-sm text-uppercase py-2 d-inline-flex align-items-center"
            >
              <i className="icon-add mr-2 pr-1 font-xxxs font-weight-bold line-height-normal"></i>
              Add New
            </a>
          </div> */}
        </div>
      </div>
      {loading ? (
        <div className="text-center pt-lg-3 activities-list">
          {/* <ContainerLoader text={'Loading orders...'} /> */}
        </div>
      ) : (
        <div className="pt-lg-3 activities-list">
          {loaded && !orders ? (
            <div className="col-12 h5 mb-5 mt-5 pb-5 pt-5 text-center">
              <div className="mb-5">{t("dashboard.No orders yet")}</div>
            </div>
          ) : (
            <List
              orders={orders}
              showOrderDetails={(id: number) => setOrderId(id)}
            ></List>
          )}
        </div>
      )}
    </div>
  ) : (
    <OrderDetails orderId={orderId} backClick={backClick}></OrderDetails>
  );
};

export default Booking;
