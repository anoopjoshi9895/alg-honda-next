import * as React from 'react';
import { TintType } from '../AccessoryPopUp';
interface CustomProps {
  // accessory: AccessoriesModelBV;
  onChange: any;
  isSelected: boolean;
  label: string;
  tintType: TintType;
  // selectedId: number;
}
const AccessoryCheckBox: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const onChange = (value: any) => {
    props.onChange(value === true ? 'Yes' : 'No', props.tintType);
  };
  return (
    <div className="d-block mb-3">
      <input
        type="checkbox"
        name={props.label}
        id={props.label}
        checked={props.isSelected}
        onChange={() => onChange(!props.isSelected)}
      />
      <label
        htmlFor={props.label}
        className="font-normal font-weight-semibold pt-1"
      >
        {props.label}
      </label>
    </div>
  );
};

export default AccessoryCheckBox;
