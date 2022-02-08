import * as React from 'react';
import classnames from 'classnames';
import { FieldProps, StateProps } from './props';
export class RadioSelect extends React.Component<FieldProps, StateProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  public componentDidUpdate(prevProps: FieldProps) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.updateDefault();
    }
  }

  public updateDefault() {
    if (this.props.defaultValue !== undefined) {
      this.setState({ value: this.props.defaultValue });
    }
  }

  public handleChange(event: { target: { value: any } }) {
    const value =
      this.props.type === 'boolean'
        ? event.target.value === 'true'
          ? true
          : false
        : event.target.value;
    this.setState({ value });
    if (this.props.onChange != null) {
      this.props.onChange(value);
    }
  }
  public render() {
    const {
      name,
      label,
      labelClass,
      options,
      optionLabel,
      optionValue,
      className,
      containerClass,
    } = this.props;

    return (
      <React.Fragment>
        <div className={containerClass}>
          {options.map((option, index) => {
            return (
              <div
                className={`${className} ${index === 1 ? 'border-left-0' : ''}`}
                key={option[optionValue || '']}
              >
                <input
                  type="radio"
                  id={`${name}-${option[optionValue || '']}`}
                  name={name}
                  value={option[optionValue || '']}
                  checked={
                    option[optionValue || ''] === this.props.defaultValue
                  }
                  onChange={this.handleChange}
                />
                <label
                  className={`${labelClass}`}
                  htmlFor={`${name}-${option[optionValue || '']}`}
                >
                  {option[optionLabel || '']}
                </label>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
