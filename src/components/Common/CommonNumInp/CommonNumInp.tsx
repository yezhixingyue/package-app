import { Input, Tooltip } from 'antd';
import React from 'react';

function formatNumber(value:string) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = ` ${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

interface IProps {
  onChange: (value:string) => void,
  value: string | '',
  onBlur?: () => void,
  placeholder?: string,
  onPressEnter?: () => void,
}

export default class NumericInput extends React.Component<IProps, {}> {

  onChange = (e: { target: { value: any; }; }) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value))) {
      this.props.onChange(value);
    }
  };

  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { value, placeholder } = this.props;
    const title = value ? (
      <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
    ) : (
      placeholder || '请输入订单号'
    );
    return (
      <Tooltip
        trigger={['focus']}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          placeholder="请输入订单号"
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          maxLength={25}
        />
      </Tooltip>
    );
  }
}