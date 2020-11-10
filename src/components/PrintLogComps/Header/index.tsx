import React, { useState } from 'react';
import styles from './index.less';
import SelectComp from '@/components/Common/SelectComp';
import CommonNumInp from '../../Common/CommonNumInp/CommonNumInp';
import { history } from 'umi';
import { Button, message } from 'antd';
import { debounce } from '@/assets/js/utils/throttle';

interface Factory {
  FactoryID: string,
  FactoryName: string,
}

interface IProps {
  FactoryID: number,
  FactoryList: Factory[],
  KeyWords: string,
  changeKeywords: (val: string) => void,
  changeOldKeywords: (val: string) => void,
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

  return (
    <ul className={styles['log-page-header-wrap']}>
      <li>
        <div>
          <span>外协工厂：</span>
          <SelectComp value={props.FactoryID} handleSelectChange={handleSelectChange} optionList={props.FactoryList} optionKeySet={{ label: 'FactoryName', value: 'FactoryID' }} />
        </div>
        {/* 此处时间筛选 */}
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
