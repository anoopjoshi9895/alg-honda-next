/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import * as React from "react";
import Item from "./Item";
import { UserConfiguration } from "alg-ecom-frontend-core";

export interface CustomProps {
  configurations: UserConfiguration[];
  showConfigDetails: (id: number) => void;
}

export interface StateProps {
  isAuthenticationCompleted: boolean;
}

const List: React.FunctionComponent<CustomProps> = (props) => {
  return (
    <ul className="list-unstyled p-0 m-0">
      {props.configurations?.map((item) => {
        return (
          <li className="py-2" key={item.configID}>
            <Item
              configuration={item}
              showConfigDetails={() => props.showConfigDetails(item.configID)}
            ></Item>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
