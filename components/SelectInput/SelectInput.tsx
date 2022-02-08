import React, { Component } from "react";
// import PropTypes from 'prop-types';
import Select from "react-select";
// import api from '../../../api';
// import { CrudListRequestModel } from '../../../api/models';
// import { Dict } from '../../../models/interfaces';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    height: "53px",
  }),

  // input: (provided) => ({
  //   ...provided,
  //   // padding: '1rem 0.8125rem',
  //   fontSize: '1rem',
  //   lineHeight: 'normal',
  //   // height: '80%',
  // }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: "10",
  }),
  option: (provided: any, state: any) => {
    return {
      ...provided,
      background: state.isFocused ? "#f2f9f9" : "#fff",
      color: "#1d1d1d",
    };
  },
};

interface CustomProps {
  default?: string | number;
  api?: string;
  data?: any[];
  placeholder?: string;
  label?: string;
  id?: string;
  optionLabel?: string;
  optionValue?: string;
  onChange: (value: any, selected: any) => void;
  gap?: "sm" | "md" | "lg";
  // size: PropTypes.oneOf(['lg']),
  error?: string;
  name?: string;
  defaultIfNotFound?: string | number;
  disabled?: boolean;
  stickyStyles?: {};
  isSearchable?: boolean;
  isRtl?: boolean;
  // queryParams?: Dict;
  menuPlacement?: "auto" | "bottom" | "top";
}

interface CustomState {
  isLoading?: boolean;
  isRtl?: boolean;
  isSearchable?: boolean;
  selected: any;
  options: any[];
  selectedValue?: string | number;
}

class SelectInput extends Component<CustomProps, CustomState> {
  static defaultProps: Partial<CustomProps> = {
    default: "",
    gap: "md",
    placeholder: "Select...",
    error: "",
    name: "",
    label: "",
    data: [],
    disabled: false,
    optionLabel: "label",
    optionValue: "value",
    stickyStyles: {},
    isSearchable: true,
    isRtl: false,
    menuPlacement: "auto",
  };

  constructor(props: CustomProps) {
    super(props);
    this.state = {
      isLoading: false,
      isRtl: props.isRtl,
      isSearchable: props.isSearchable,
      selected: "",
      options: [],
      selectedValue: props.default,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    // const options = [];

    this.setState(
      (prevState: CustomState): CustomState => ({
        ...prevState,
        options: this.props.data || [],
      })
    );
  }

  componentDidUpdate(prevProps: CustomProps) {
    if (prevProps.default !== this.props.default) {
      this.updateDefault();
    }
    if (prevProps.data !== this.props.data) {
      this.updateDefaultData();
    }
  }

  toggleLoading = () =>
    this.setState((state) => ({ isLoading: !state.isLoading }));

  toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));

  toggleSearchable = () =>
    this.setState((state) => ({ isSearchable: !state.isSearchable }));

  updateDefault() {
    if (this.props.default !== undefined) {
      this.setState({ selectedValue: this.props.default });
    }
  }

  updateDefaultData() {
    if (this.props.data !== undefined) {
      this.setState({ options: this.props.data || [] });
    }
  }
  handleChange(selected: any) {
    // const value = event.value;
    this.setState({
      selected,
      selectedValue: selected[this.props.optionValue || ""],
    });
    this.props.onChange(selected[this.props.optionValue || ""], selected);
  }

  showValue() {
    return this.state.options.filter((option) => {
      if (this.state.selectedValue !== undefined) {
        return (
          option[this.props.optionValue || ""] === this.state.selectedValue
        );
      }
      return (
        option[this.props.optionValue || ""] ===
        this.state.selected[this.props.optionValue || ""]
      );
    });
  }

  render() {
    const { gap, name, label, placeholder, stickyStyles, error, id } =
      this.props;
    const { isSearchable, isLoading, isRtl } = this.state;
    const inputIdCandidate = id || name || label || placeholder;
    const inputId = inputIdCandidate;
    return (
      <div className={`Input Input--gap-${gap}`} style={stickyStyles}>
        {label && (
          <label htmlFor={inputId} className="Input__label Input__label--full">
            {label}
          </label>
        )}
        <Select
          styles={customStyles}
          className="basic-single"
          classNamePrefix="select"
          isLoading={isLoading}
          isRtl={isRtl}
          isSearchable={isSearchable}
          placeholder={this.props.placeholder}
          getOptionLabel={(option) => option[this.props.optionLabel || ""]}
          getOptionValue={(option) => option[this.props.optionValue || ""]}
          options={this.state.options}
          onChange={this.handleChange}
          value={this.showValue()}
          isDisabled={this.props.disabled ? this.props.disabled : false}
          id={inputId}
          menuPlacement={this.props.menuPlacement}
        />
        {error && <span className="Input__error">{error}</span>}
      </div>
    );
  }
}

export default SelectInput;
