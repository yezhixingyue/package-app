import React from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { CaretDownOutlined } from '@ant-design/icons';

const { Option } = Select;

interface optionKeySetType {
  label: string,
  value: string,
}

type option = {
  disabled?: boolean,
}

interface IProps {
  optionList?: option[],
  handleSelectChange?: (val: string | number) => void,
  value?: string | number,
  optionKeySet: optionKeySetType,
}

export default function index(props:IProps) {

  const _arr = props.optionList ? props.optionList : [];

  const _optionList = [
    ..._arr,
  ] 


  const handleChange = (val: any) => {
    props.handleSelectChange && props.handleSelectChange(val);
  }
  // suffixIcon={<CaretDownOutlined twoToneColor="#eb2f96" />}
  return (
    <span>
      <Select className={styles.wrap} value={props.value} style={{ width: 120 }} onChange={handleChange} >
        {
          _optionList && _optionList.length > 0 ? (
            _optionList.map(_option => (
              <Option value={_option[props.optionKeySet.value]} disabled={_option.disabled} key={_option[props.optionKeySet.value]}>{_option[props.optionKeySet.label]}</Option>
            ))
          ) : null
        }
      </Select>
    </span>
  )
}
