export interface FieldProps {
  input?: any;
  data?: any;
  textField?: any;
  placeholder?: any;
  className?: any;
  defaultValue?: any;
  label?: any;
  labelClass?: any;
  errorClass?: any;
  meta?: any;
  classname?: any;
  parentClass?: any;
  type?: any;
  name?: any;
  disabled?: boolean;
  containerClass?: string;
  id?: any;
  options: { [key: string]: any }[];
  optionLabel?: string;
  optionValue?: string;
  key?: string;
  onChange?: (values: string | boolean) => void;
  outline?: boolean;
}

export interface StateProps {
  value?: string | boolean;
}
