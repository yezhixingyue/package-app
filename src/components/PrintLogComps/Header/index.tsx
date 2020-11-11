import React, { useState } from 'react';
import styles from './index.less';
import SelectComp from '@/components/Common/SelectComp';
import CommonNumInp from '../../Common/CommonNumInp/CommonNumInp';
import { history } from 'umi';
import { Button, message } from 'antd';
import { debounce } from '@/assets/js/utils/throttle';
import DateSelector from '@/components/Common/DateSelector';

interface Factory {
  FactoryID: string,
  FactoryName: string,
}
interface PrintTimeType {
  First: string,
  Second: string,
}

interface IProps {
  FactoryID: number,
  FactoryList: Factory[],
  KeyWords: string,
  dataType: string,
  dateObj: PrintTimeType,
  changeKeywords: (val: string) => void,
  changeOldKeywords: (val: string) => void,
  changePrintTime: (val: object) => void,
}



export default function index(props: IProps) {

  const setPagePath = (obj: { [x: string]: any; }) => {
    let str = '';
    Object.keys(obj).forEach((key, index) => {
      const _temp = `${key}=${obj[key]}`;
      str += index === 0 ? `?${_temp}` : `&${_temp}`;
    })
    history.push(str);
  }

  const handleSelectChange = (val: number | string) => {
    const _tempObj = { ...history.location.query, FactoryID: val };
    setPagePath(_tempObj);
  }

  const handleOrderSearch = () => {
    if (props.KeyWords && props.KeyWords.length < 9) {
      message.error('订单号或包裹号输入长度最少为9位!');
      return;
    }
    const _tempObj = { ...history.location.query, KeyWords: props.KeyWords };
    props.changeOldKeywords(props.KeyWords);
    setPagePath(_tempObj);
  }

  const onSearchChange = (value: string) => {
    props.changeKeywords(value.replace('.', ''));
  };

  const onInpFocus = (e: { target: { select: () => any; }; }) => e.target.select();

  const handleDateChange = (date: { type: string, value: string | { First: string, Second: string } }) => {
    if (!date.value && date.type !== 'define') {
      const _tempObj = { ...history.location.query, dateType: date.type };
      if (_tempObj.First) delete _tempObj.First;
      if (_tempObj.Second) delete _tempObj.Second;
      setPagePath(_tempObj);
    }
    if (typeof date.value === 'object' && date.type === 'define') {
      console.log(date.value);
      const _tempObj = { ...history.location.query, dateType: date.type, ...date.value };
      setPagePath(_tempObj);
      return true;
    }
  }

  return (
    <ul className={styles['log-page-header-wrap']}>
      <li>
        <div>
          <span>外协工厂：</span>
          <SelectComp value={props.FactoryID} handleSelectChange={handleSelectChange} optionList={props.FactoryList} optionKeySet={{ label: 'FactoryName', value: 'FactoryID' }} />
        </div>
        {/* 此处时间筛选 */}
        <DateSelector
          dataType={props.dataType}
          handleDateChange={handleDateChange}
          changeDateTime={props.changePrintTime}
          dateObj={props.dateObj}
          />
      </li>
      <li>
        <div>
          <CommonNumInp value={props.KeyWords} onPressEnter={debounce(handleOrderSearch, 100, true)} onChange={onSearchChange} placeholder='请输入订单号或包裹号' onFocus={onInpFocus} />
          <Button onClick={handleOrderSearch} icon={<i></i>}>订单搜索</Button>
        </div>
      </li>
    </ul>
  )
}
