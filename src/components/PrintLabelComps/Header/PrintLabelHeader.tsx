import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import styles from './PrintLabelHeader.less';
import CommonNumInp from '../../Common/CommonNumInp/CommonNumInp';
import { debounce } from '@/assets/js/utils/throttle';
import  model from '@/assets/js/utils/model';

interface IProps {
  getPrintPackageOrderInfo: (orderId: string) => void,
  handlePackageSearch: (keyword: string) => void,
  searchWords: string,
  setPrintLabelSearchWords: (keyword: string) => void,
}

interface Istate {
  inpOrderVal: string,
  startTime: number | null,
}

export default function PrintLabelHeader(props: IProps) {

  const initState: Istate = {
    inpOrderVal: '',
    startTime: null,
  }

  const [state, setState] = useState(initState);

  const onInpChange = (value: string) => {
    const _str = value.replace('.', '');
    if (!_str) {
      setState({
        ...state,
        startTime: null,
        inpOrderVal: _str,
      });
    } else if (_str.length === 1) {
      setState({
        ...state,
        startTime: Date.now(),
        inpOrderVal: _str,
      });
    } else {
      setState({
        ...state,
        inpOrderVal: _str,
      });
    }
  };

  const onSearchChange = (value: string) => {
    props.setPrintLabelSearchWords(value.replace('.', ''));
  };

  const handleLabelPrint = () => {
    if (!state.inpOrderVal) return;
    if (state.inpOrderVal.length < 9) {
      message.error('订单号输入长度最少为9位!');
      return;
    }
    if (state.startTime && Date.now() - state.startTime > 1200) {
      model.showConfirm({
        title: '订单号信息核对',
        msg: `请检查订单号 [ ${state.inpOrderVal} ] 是否输入无误 ?`,
        okText: '确认无误',
        onOk: () => {
          props.getPrintPackageOrderInfo && props.getPrintPackageOrderInfo(state.inpOrderVal);
          onInpChange('');
        },
      })
    } else {
      props.getPrintPackageOrderInfo && props.getPrintPackageOrderInfo(state.inpOrderVal);
      onInpChange('');
    }
    
  }

  const handleLabelPrintWithModel = () => {
    if (!state.inpOrderVal) return;
    if (state.inpOrderVal.length < 9) {
      message.error('订单号输入长度最少为9位!');
      return;
    }
    model.showConfirm({
      title: '订单号信息核对',
      msg: `请检查订单号 [ ${state.inpOrderVal} ] 是否输入无误?`,
      okText: '确认无误',
      onOk: () => {
        props.getPrintPackageOrderInfo && props.getPrintPackageOrderInfo(state.inpOrderVal);
        onInpChange('');
      },
    })
  }

  const handleOrderSearch = () => {
    if (!props.searchWords) return;
    if (props.searchWords.length < 9) {
      message.error('订单号或包裹号输入长度最少为9位!');
      return;
    }
    props.handlePackageSearch(props.searchWords);
  }

  const onInpFocus = (e: { target: { select: () => any; }; }) => e.target.select();

  return (
    <ul className={styles['print-page-header']}>
      <li className='mp-print-label-header-inp-wrap'>
        <CommonNumInp value={state.inpOrderVal} onPressEnter={debounce(handleLabelPrint, 100, true)} onChange={onInpChange} onFocus={onInpFocus} />
        <Button onClick={handleLabelPrintWithModel} type="primary">打印标签</Button>
      </li>
      <li>
        <CommonNumInp value={props.searchWords} onPressEnter={debounce(handleOrderSearch, 100, true)} onChange={onSearchChange} placeholder='请输入订单号或包裹号' onFocus={onInpFocus} />
        <Button onClick={handleOrderSearch} icon={<i></i>}>订单搜索</Button>
      </li>
    </ul>
  )
}
