import React from "react";
// import DropdownList from 'react-widgets/lib/DropdownList';
import Select from "react-select";
import { useDataLoader } from "../../../utils/useDataLoader";

const RemoteDataDropDown: React.FunctionComponent<{
  loadData: () => Promise<any[]>;
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  valueField?: string;
  textField?: string | ((dataItem: any) => string);
}> = (props) => {
  const { loadData, ...dropDownProps } = props;
  const { data, loading, loaded } = useDataLoader(loadData);

  return (
    <Select
      {...dropDownProps}
      isLoading={!loaded || loading}
      data={data || []}
    />
  );
  // return <DropdownList {...dropDownProps} busy={!loaded || loading} data={data || []} filter={'contains'} />;
};

export default RemoteDataDropDown;
