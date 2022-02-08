/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import * as React from 'react';
import moment from 'moment';
import { format } from 'date-fns';
import { UserOrder } from 'alg-ecom-frontend-core';
import { useTranslation } from 'react-i18next';

export interface CustomProps {
  order: UserOrder;
}

export interface StateProps {
  isAuthenticationCompleted: boolean;
}

const calculateDateDifference = (d1: Date, d2: Date) => {
  const date1 = moment(d1, 'DD-MM-YYYY');
  const date2 = moment(d2, 'DD-MM-YYYY');
  return date2.diff(date1, 'days');
};

const Tabs: React.FunctionComponent<CustomProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div className="border rounded px-3 py-4">
      <div className="row gutter-8 align-items-xl-center p-xl-2 my-xl-1">
        <div className="col-sm col-12">
          <div className="row gutter-12 align-items-xl-center">
            <div className="col-xl-7 col-12 mb-xl-0 mb-4">
              <div className="row gutter-10 align-items-xl-center">
                <div className="col-sm-6 col-12 mb-sm-0 mb-4">
                  <h6 className="font-base font-weight-normal m-0">
                    {props.order?.productTitle}
                  </h6>
                  <span className="text-muted font-xs mr-3 text-uppercase">
                    {t('dashboard.Color')} :{props.order?.Exterior}
                  </span>
                  {props.order?.Interior && (
                    <span className="text-muted font-xs mr-3 text-uppercase">
                      {t('dashboard.Trim')} :{props.order?.Interior}
                    </span>
                  )}
                  {props.order?.vinNumber && (
                    <span className="text-muted font-xs text-uppercase">
                      {t('dashboard.VIN')} :{props.order?.vinNumber}
                    </span>
                  )}
                </div>
                <div className="col-sm-6 col-12">
                  <span className="text-uppercase text-muted font-xxs text-uppercase">
                    {t('dashboard.Order ID')}
                  </span>
                  <h6 className="font-base font-weight-normal m-0 mt-1 d-flex align-items-sm-center flex-sm-row flex-column">
                    {props.order?.orderNumber}
                    <span className="ml-sm-1 mt-sm-0 mt-1">
                      <span className="status pending">
                        {props.order?.orderStatus}
                      </span>
                    </span>
                  </h6>
                  <span className="text-uppercase text-muted font-xxs">
                    {format(
                      new Date(props.order.addedDate),
                      'MMM dd, yyyy, hh:mm a'
                    )}
                    {props.order.addedDate
                      ? `(${calculateDateDifference(
                          new Date(props.order.addedDate),
                          new Date()
                        )} days ago)`
                      : ''}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-12">
              <div className="row gutter-10 align-items-xl-center">
                <div className="col-5">
                  <span
                    className="text-uppercase text-muted font-xxs
                            text-uppercase"
                  >
                    {t('dashboard.Total Cost')}
                  </span>
                  <h6 className="font-md font-weight-normal m-0 mt-1">
                    {t('dashboard.KWD')}{' '}
                    {props.order?.orderTotalAmount -
                      (props.order?.totalDiscount || 0)}
                  </h6>
                  <span className="text-uppercase text-muted font-xxs">
                    {t('dashboard.Paid')} :{' '}
                    <span className="text-gray-900">
                      {t('dashboard.KWD')} {props.order?.paidAmount}
                    </span>
                  </span>
                </div>
                <div className="col-7">
                  {/* <div className="d-flex align-items-center">
                                <div className="avatar overflow-hidden mr-2 pr-1">
                                    <img src="images/user.png" className="img-fluid img-cover w-100 h-100 rounded-circle" alt="user"/>
                                </div>
                                <div>
                                    <h6 className="font-normal font-weight-normal mb-0">
                                        Ahamd Dagher</h6>
                                    <span className="text-muted font-xs">Sales
                                        Executive</span>
                                </div>
                            </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-auto col-12">
          {/* {props.order?.orderTotalAmount > props.order?.paidAmount && (
            <a
              href=""
              className="btn border border-primary text-uppercase font-sm px-3 py-2 cursor-pointer font-weight-bold"
            >
              <span className="px-xl-2 py-1 d-block">Make payment</span>
            </a>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
