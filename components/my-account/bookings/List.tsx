/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import * as React from "react";
import Item from "./Item";
import { UserBooking } from "alg-ecom-frontend-core";

export interface CustomProps {
  orders: UserBooking[];
  showOrderDetails: (id: number) => void;
}

export interface StateProps {
  isAuthenticationCompleted: boolean;
}

const List: React.FunctionComponent<CustomProps> = (props) => {
  return (
    <ul className="list-unstyled p-0 m-0">
      {props.orders?.map((item) => {
        return (
          <li
            key={item?.orderNumber}
            className="py-2 cursor-pointer"
            onClick={() => props.showOrderDetails(item.masterOrderID)}
          >
            <Item order={item}></Item>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
