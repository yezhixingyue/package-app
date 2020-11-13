import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import styles from './PrintLabelHeader.less';
import CommonNumInp from '../../Common/CommonNumInp/CommonNumInp';
import { debounce } from '@/assets/js/utils/throttle';

interface IProps {
  getPrintPackageOrderInfo: (orderId: string) => void,
  handlePackageSearch: (keyword: string) => void,
  searchWords: string,
  setPrintLabelSearchWords: (keyword: string) => void,
}

export default function PrintLabelHeader(props: IProps) {
  const [inpOrderID, setInpOrderID] = useState('');

  // useEffect(() => {
  //   console.log('header inp effect');
  //   var beforePrint = function () {
  //     console.log('Functionality to run before printing.');
  //   };

  //   var afterPrint = function () {
  //     console.log('Functionality to run after printing');
  //   };

  //   if (window.matchMedia) {
  //     var mediaQueryList = window.matchMedia('print');
  //     console.log(mediaQueryList);
  //     // mediaQueryList.onchange = (e) => {
  //     //   console.log(e);
  //     // }
  //     mediaQueryList.addListener(function (mql) {
  //       console.log(mql);
  //       if (mql.matches) {
  //         beforePrint();
  //       } else {
  //         afterPrint();
  //       }
  //     });
  //   }
  // }, [])

  const onInpChange = (value: string) => {
    setInpOrderID(value.replace('.', ''));
  };

  const onSearchChange = (value: string) => {
    props.setPrintLabelSearchWords(value.replace('.', ''));
  };

  const handleLabelPrint = () => {
    if (!inpOrderID) return;
    if (inpOrderID.length < 9) {
      message.error('订单号输入长度最少为9位!');
      return;
    }
    props.getPrintPackageOrderInfo && props.getPrintPackageOrderInfo(inpOrderID);
    setInpOrderID('');
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
        <CommonNumInp value={inpOrderID} onPressEnter={debounce(handleLabelPrint, 100, true)} onChange={onInpChange} onFocus={onInpFocus} />
        <Button onClick={handleLabelPrint} type="primary">打印标签</Button>
      </li>
      <li>
        <CommonNumInp value={props.searchWords} onPressEnter={debounce(handleOrderSearch, 100, true)} onChange={onSearchChange} placeholder='请输入订单号或包裹号' onFocus={onInpFocus} />
        <Button onClick={handleOrderSearch} icon={<i></i>}>订单搜索</Button>
      </li>
    </ul>
  )
}
