import React, { useState } from 'react';
import styles from './index.less';
import { Modal, DatePicker } from 'antd';
import { history } from 'umi';
import { SettingOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

interface PrintTimeType {
  First: string,
  Second: string,
}

interface IProps {
  dataType: string,
  dateObj: PrintTimeType,
  // handleDateChange: (val:{ type: string, value: string | PrintTimeType }) => undefined | true;
  changeDateTime: (val: object) => void,
  dateTypeList: {label: string, value: string}[],
}

/**
 * @description: 日期选择组件
 * @param {*} datetype: 当前所选日期字段
 * @return {*}
 */
export default function index(props: IProps) {

  const [state, setState] = useState({
    // _value: 'today',
    visible: false,
  })

  const setPagePath = (obj: { [x: string]: any; }) => {
    let str = '';
    Object.keys(obj).forEach((key, index) => {
      const _temp = `${key}=${obj[key]}`;
      str += index === 0 ? `?${_temp}` : `&${_temp}`;
    })
    history.push(str);
  }

  const handleDateChange = (date: { type: string, value: string | { First: string, Second: string } }) => {
    if (!date.value && date.type !== 'define') {
      const _tempObj = { ...history.location.query, dateType: date.type, Page: 1 };
      if (_tempObj.First) delete _tempObj.First;
      if (_tempObj.Second) delete _tempObj.Second;
      setPagePath(_tempObj);
    }
    if (typeof date.value === 'object' && date.type === 'define') {
      const _tempObj = { ...history.location.query, dateType: date.type, ...date.value, Page: 1 };
      setPagePath(_tempObj);
      return true;
    }
  }

  
  const handleClick = (val: string) => {
    if (val === props.dataType) return;
    handleDateChange({ type: val, value: '' });
  }
  const handleDefineBtnClick = () => {
    setState({
      ...state,
      visible: true,
    })
  }
  const handleModelCancel = () => {
    setState({
      ...state,
      visible: false,
    })
  }
  const handleModelOK = () => {
    if (!props.dateObj.First || !props.dateObj.Second) return;
    const key = handleDateChange({ type: 'define', value: {
      First: props.dateObj.First.slice(0, 10),
      Second: props.dateObj.Second.slice(0, 10),
    } });
    if (key) {
      setState({
        ...state,
        visible: false,
      })
    }
  }
  const handleDatePickerChange = (dates: [object, object], dateStrings: [string, string]) => {
    const [ First, Second ] = dateStrings;
    props.changeDateTime({First: First.slice(0, 10), Second: Second.slice(0, 10)});
  }

  const Title = (
    <div className='gray'><SettingOutlined /><span className='is-font-15' style={{marginLeft: '10px'}}>设置自定义时间</span></div>
  )

  const pickerVal = props.dateObj ? [ props.dateObj.First ? moment(props.dateObj.First): null, props.dateObj.Second ? moment(props.dateObj.Second): null ] : [null, null];

  const defineTitle = props.dateObj && props.dateObj.First && props.dateObj.Second ? `${props.dateObj.First.slice(0, 10)}至${props.dateObj.Second.slice(0, 10)}` : '自定义时间';

  return (
    <div className={styles['date-select-comp-wrap']}>
      <span>打印时间：</span>
      <ul>
        {
          props.dateTypeList.map(it => (<li key={it.value} className={ it.value === props.dataType ? styles.active : '' } onClick={() => handleClick(it.value)}>
            {it.label}
          </li>))
        }
        <li className={ props.dataType === 'define' ? styles.active : '' } onClick={handleDefineBtnClick}>{defineTitle}</li>
      </ul>
      <Modal
        title={Title}
        visible={state.visible}
        onOk={handleModelOK}
        onCancel={handleModelCancel}
        closeIcon={<i className='iconfont icon-cha'></i>}
        destroyOnClose
        width={680}
        wrapClassName={`${styles['date-model']} ${styles['print-model-wrap']}`}
      > 
        <span>请选择时间：</span>
        <RangePicker
          size='large'
          value={pickerVal}
          onChange={handleDatePickerChange}
         />
      </Modal>
    </div>
  )
}
