import React from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { CaretDownOutlined } from '@ant-design/icons';

const { Option } = Select;

interface option {
  label: string,
  value: string | number,
  disabled?: boolean,
}

interface IProps {
  optionList?: option[],
  onchange?: (val: string | number) => void,
  defaultVal?: string | number,
}

export default function index(props:IProps) {

  const _arr = props.optionList ? props.optionList : [];

  const _optionList = [
    ..._arr,
    {
      label: '所有工厂',
      value: 0,
      disabled: false,
    },
    {
      label: '凌顶揽众',
      value: 1,
    },
    {
      label: '印之星',
      value: 2,
    }
  ] 

  const _defaultVal = (props.defaultVal || props.defaultVal === 0 ) ? props.defaultVal : _optionList[0].value;

  const handleChange = (val: any) => {
    console.log(`selected ${val}`);
    props.onchange && props.onchange(val);
  }
  // suffixIcon={<CaretDownOutlined twoToneColor="#eb2f96" />}
  return (
    <span>
      <Select className={styles.wrap} defaultValue={_defaultVal} style={{ width: 120 }} onChange={handleChange} >
        {
          _optionList && _optionList.length > 0 ? (
            _optionList.map(_option => (
              <Option value={_option.value} disabled={_option.disabled} key={_option.value}>{_option.label}</Option>
            ))
          ) : null
        }
      </Select>
    </span>
  )
}
