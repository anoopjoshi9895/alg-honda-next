/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import * as React from "react";
import moment from "moment";
import { format } from "date-fns";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CartActions, UserConfiguration } from "alg-ecom-frontend-core";

import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { RouteKeys } from "../../../route/route-keys";
import { RootState } from "../../../app/store";

export interface CustomProps {
  configuration: UserConfiguration;
  getCartDetails: typeof CartActions.getCartDetails;
  showConfigDetails: (id: number) => void;
}

export interface StateProps {
  isAuthenticationCompleted: boolean;
}

const calculateDateDifference = (d1: Date, d2: Date) => {
  const date1 = moment(d1, "DD-MM-YYYY");
  const date2 = moment(d2, "DD-MM-YYYY");
  return date2.diff(date1, "days");
};

const Item: React.FunctionComponent<CustomProps> = (props) => {
  const { t } = useTranslation();
  const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);
  const router = useRouter();

  const onContinueClick = () => {
    setIsSubmiting(true);
    props.getCartDetails(0, props.configuration.configID, () => {
      setIsSubmiting(false);
      router.push(
        `${RouteKeys.BuildVehicle.replace(
          ":id",
          `${props.configuration.productID}`
        )}`
      );
    });
  };

  const noOfDays = calculateDateDifference(
    new Date(props.configuration.addedDate),
    new Date()
  );

  return (
    <div className="border rounded px-3 py-4 cursor-pointer">
      <div className="row gutter-8 align-items-xl-center p-xl-2 my-xl-1">
        <div className="col">
          <div className="row gutter-12 align-items-xl-center">
            <div
              className="col-xl-7 col-12 mb-xl-0 mb-4 cursor-pointer"
              onClick={() =>
                props.showConfigDetails(props.configuration.configID)
              }
            >
              <div className="row gutter-10 align-items-xl-center">
                <div className="col-sm-6 col-12 mb-sm-0 mb-4">
                  <h6 className="font-base font-weight-normal m-0">
                    {props.configuration.productTitle}
                  </h6>
                  <span className="text-muted font-xs mr-3 text-uppercase">
                    {t("dashboard.Color")} : {props.configuration.Exterior}
                  </span>

                  {props.configuration?.Interior && (
                    <span className="text-muted font-xs mr-3 text-uppercase">
                      {t("dashboard.Trim")} :{props.configuration?.Interior}
                    </span>
                  )}
                </div>
                <div className="col-sm-3 col-12">
                  <span className="text-uppercase text-muted font-xxs text-uppercase">
                    {t("dashboard.Saved Configuration Stage")}
                  </span>
                  <h6 className="font-base font-weight-normal m-0 mt-2">
                    {props.configuration.stageName}
                  </h6>
                  <span className="text-uppercase text-muted font-xxs">
                    {format(
                      new Date(props.configuration.addedDate),
                      "MMM dd, yyyy, hh:mm a"
                    )}
                    {props.configuration.addedDate && noOfDays > 0
                      ? `(${
                          noOfDays === 1
                            ? noOfDays + "days ago"
                            : noOfDays + "day ago"
                        })`
                      : ""}
                  </span>
                  <div className="configuration-progress mt-3">
                    <div className="progress rounded-sm bg-gray-400 position-relative d-flex overflow-hidden">
                      <div
                        className="progress-bar position-absolute left-0 top-0 bg-primary h-100"
                        style={{
                          width: `${
                            16.6666666667 * props.configuration.stage
                          }%`,
                        }}
                      ></div>
                      <div className="progress-split position-relative zIndex-1 flex-fill"></div>
                      <div className="progress-split position-relative zIndex-1 flex-fill"></div>
                      <div className="progress-split position-relative zIndex-1 flex-fill"></div>
                      <div className="progress-split position-relative zIndex-1 flex-fill"></div>
                      <div className="progress-split position-relative zIndex-1 flex-fill"></div>
                      <div className="progress-split position-relative zIndex-1 flex-fill"></div>
                    </div>
                  </div>
                </div>
                {props.configuration?.quoteNumber !== "" && (
                  <div className="col-sm-3 col-12">
                    <span className="text-uppercase text-muted font-xxs text-uppercase">
                      {t("dashboard.Quotation No")}
                    </span>
                    <h6 className="font-base font-weight-normal m-0 mt-1 d-flex align-items-sm-center flex-sm-row flex-column">
                      {props.configuration?.quoteNumber}
                      <span className="ml-sm-1 mt-sm-0 mt-1">
                        <span
                          className={classnames({
                            status: true,
                            active:
                              calculateDateDifference(
                                new Date(),
                                new Date(props.configuration.quoteExpiry)
                              ) >= 0,
                            inactive:
                              calculateDateDifference(
                                new Date(),
                                new Date(props.configuration.quoteExpiry)
                              ) < 0,
                          })}
                        >
                          {calculateDateDifference(
                            new Date(),
                            new Date(props.configuration.quoteExpiry)
                          ) >= 0
                            ? "Active"
                            : "Expired"}
                        </span>
                      </span>
                    </h6>
                    <span className="text-uppercase text-muted font-xxs">
                      {format(
                        new Date(props.configuration.quoteExpiry),
                        "MMM dd, yyyy, hh:mm a"
                      )}
                      {props.configuration.quoteExpiry &&
                      calculateDateDifference(
                        new Date(),
                        new Date(props.configuration.quoteExpiry)
                      ) > 0
                        ? `(${calculateDateDifference(
                            new Date(),
                            new Date(props.configuration.quoteExpiry)
                          )} days ago)`
                        : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-5 col-12">
              <div className="row gutter-10 align-items-xl-center">
                <div
                  className="col-sm-6 col-12 mb-sm-0 mb-4 cursor-pointer"
                  onClick={() =>
                    props.showConfigDetails(props.configuration.configID)
                  }
                >
                  <div className="d-flex align-items-center text-uppercase">
                    <div>
                      <span className="text-muted font-xs">
                        {t("dashboard.Total Cost")}
                      </span>
                      <h6 className="font-normal font-weight-normal mb-0">
                        {`KWD ${
                          props.configuration?.orderTotalAmount -
                          (props.configuration?.totalDiscount || 0)
                        }`}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-12">
                  <button
                    type="button"
                    disabled={isSubmiting}
                    onClick={onContinueClick}
                    className="btn border border-primary text-uppercase font-sm px-3 py-2 cursor-pointer"
                  >
                    <span className="py-1 d-block">
                      {t("dashboard.Continue Configuration")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="action-block position-relative">
            {/* <span className="cursor-pointer d-flex px-1 py-3 text-muted">
              <i className="icon-ellipsis"></i>
            </span>
            <div className="action-popup bg-white position-absolute bottom-0 right-0 rounded">
              <ul className="list-unstyled p-0 m-0 font-sm text-right">
                <li>
                  <a href="#" className="p-3 d-block">
                    Cancel
                  </a>
                </li>
              </ul>
            </div> */}
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
      getCartDetails: CartActions.getCartDetails,
    },
    dispatch
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(Item);
