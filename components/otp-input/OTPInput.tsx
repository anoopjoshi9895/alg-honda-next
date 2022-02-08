import React from 'react';
// import PropTypes from 'prop-types';

// import '../Input.scss';
// import './OTPInput.scss';

interface CustomProps {
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  size?: number;
}

interface CustomState {
  otp: string[];
}

class OTPInput extends React.Component<CustomProps, CustomState> {
  static defaultProps = {
    // value: '',
    error: '',
    size: 4,
  };

  size: number;
  inputRefArray: any[];

  constructor(props: CustomProps) {
    super(props);
    this.size = props.size || OTPInput.defaultProps.size;
    this.state = {
      otp: Array.from(Array(this.size)).map(() => ''),
    };

    this.inputRefArray = Array.from(Array(this.size)).map(React.createRef);
    this.getInput = this.getInput.bind(this);
  }

  isTextSelected = (input: any) => {
    if (typeof input.selectionStart === 'number') {
      return input.selectionStart === 0 && input.selectionEnd === 1;
    }
    return false;
  };

  isCursonOnStart = (input: any) => {
    if (typeof input.selectionStart === 'number') {
      return input.selectionStart === 0;
    }
    return false;
  };

  onChange = (otpValue: string[]) => {
    this.setState((prevState: CustomState) => {
      const state: CustomState = {
        ...prevState,
        otp: otpValue,
      };
      const otpNumber = otpValue.join('');
      this.props.onChange(otpNumber);
      return state;
    });
  };

  getInput(index: number, value: string) {
    if (index < 0 || index >= this.size) {
      return;
    }

    const current = [] as string[];
    current.push(...this.state.otp.slice(0, index));
    current.push(value);
    current.push(...this.state.otp.slice(index + 1, this.size));
    this.onChange(current);
  }
  removeInput = (index: number) => {
    if (index < 0 || index >= this.size) {
      return;
    }

    const current = [] as string[];
    current.push(...this.state.otp.slice(0, index));
    current.push('');
    current.push(...this.state.otp.slice(index + 1, this.size));
    this.onChange(current);
  };

  getValue = (index: number) => {
    if (index < 0 || index >= this.size) {
      return '';
    }

    return this.state.otp[index];
  };

  onKeyDownEvent = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const eventCode = event.which || event.keyCode;
    if (eventCode === 229) {
      // Handling android input
      return;
    }
    if (eventCode === 8) {
      // Backspace
      if (
        this.isCursonOnStart(this.getCodeBoxElement(index)) ||
        this.getCodeBoxElement(index).value.length === 0
      ) {
        if (index !== 0) {
          // this.removeInput(index - 1);
          this.getCodeBoxElement(index - 1).focus();
        }
      } else {
        this.removeInput(index);
        if (index !== 0) {
          this.getCodeBoxElement(index - 1).focus();
        } else {
          this.getCodeBoxElement(0).focus();
        }
      }
    } else {
      if (
        (eventCode >= 48 && eventCode <= 57) ||
        (eventCode >= 96 && eventCode <= 105)
      ) {
        // Numbers only
        let value = String.fromCharCode(eventCode);
        if (eventCode >= 96 && eventCode <= 105) {
          value = String.fromCharCode(eventCode - 48);
        }
        if (
          !this.isCursonOnStart(this.getCodeBoxElement(index)) &&
          !this.isTextSelected(this.getCodeBoxElement(index)) &&
          this.getCodeBoxElement(index).defaultValue.length === 1
        ) {
          if (index !== this.size - 1) {
            this.getCodeBoxElement(index + 1).focus();
            this.getInput(index + 1, value);
            if (index < this.size - 2) {
              this.getCodeBoxElement(index + 2).focus();
            }
          }
        } else {
          this.getInput(index, value);
          if (index !== this.size - 1) {
            this.getCodeBoxElement(index + 1).focus();
          } else {
            this.getCodeBoxElement(index).focus();
          }
        }
      }
    }
  };
  onInputEvent = (index: number, event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.currentTarget.value;

    if (
      !this.isCursonOnStart(this.getCodeBoxElement(index)) &&
      !this.isTextSelected(this.getCodeBoxElement(index)) &&
      this.getCodeBoxElement(index).defaultValue.length === 1
    ) {
      if (index !== this.size - 1) {
        this.getCodeBoxElement(index + 1).focus();
        this.getInput(index + 1, value);
        if (index < this.size - 2) {
          this.getCodeBoxElement(index + 2).focus();
        }
      }
    } else {
      this.getInput(index, value);
      if (index !== this.size - 1) {
        this.getCodeBoxElement(index + 1).focus();
      }
    }
  };

  getCodeBoxElement = (index: number) => {
    return this.inputRefArray[index].current;
  };

  renderOTPInput = (index: number) => {
    return (
      <div className="col-3" key={index}>
        <input
          key={this.getValue(index)}
          ref={this.inputRefArray[index]}
          className="form-control text-center"
          type="text"
          maxLength={1}
          onKeyDown={(event) => this.onKeyDownEvent(index, event)}
          onInput={(event) => this.onInputEvent(index, event)}
          defaultValue={this.getValue(index)}
          autoComplete="off"
        />
      </div>
    );
  };

  render() {
    const half = Math.floor(this.size / 2);
    return (
      <div className={this.props.className}>
        <div className="row gutter-10">
          {Array.from(Array(half)).map((val, index) =>
            this.renderOTPInput(index)
          )}
          <span className="OTPInput__separator" />
          {Array.from(Array(this.size - half)).map((val, index) =>
            this.renderOTPInput(half + index)
          )}
        </div>
        {this.props.error && (
          <div className="Input__error">{this.props.error}</div>
        )}
      </div>
    );
  }
}

export default OTPInput;
