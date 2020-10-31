import React, { useState } from 'react';
import { Button, message } from 'antd';
import styles from './PrintLabelHeader.less';
import CommonNumInp from '../../Common/CommonNumInp/CommonNumInp';
import { debounce } from '@/assets/js/utils/throttle';

interface IProps {
  getPrintPackageOrderInfo: (orderId:string) => void,
}

export default function PrintLabelHeader(props: IProps) {
  const [inpOrderID, setInpOrderID] = useState('');
  const [searchInpVal, setSearchInpVal] = useState('');

  const onInpChange = (value: string) => {
    setInpOrderID(value.replace('.', ''));
  };

  const onSearchChange = (value: string) => {
    setSearchInpVal(value.replace('.', ''));
  };

  const handleLabelPrint = () => {
    if (!inpOrderID) return;
    if (inpOrderID.length < 9) {
      message.error('订单号输入长度最少为9位!');
      return;
    }
    console.log(inpOrderID);
    props.getPrintPackageOrderInfo && props.getPrintPackageOrderInfo(inpOrderID);
    setInpOrderID('');
  }

  const handleOrderSearch = () => {
    console.log(searchInpVal);
  }

  return (
    <ul className={styles['print-page-header']}>
      <li>
        <CommonNumInp value={inpOrderID} onPressEnter={debounce(handleLabelPrint, 100, true)} onChange={onInpChange} />
        <Button onClick={handleLabelPrint} type="primary">打印标签</Button>
      </li>
      <li>
        <CommonNumInp value={searchInpVal} onPressEnter={debounce(handleOrderSearch, 100, true)} onChange={onSearchChange} placeholder='请输入订单号或包裹号' />
        <Button onClick={handleOrderSearch} icon={<i></i>}>订单搜索</Button>
      </li>
    </ul>
  )
}
