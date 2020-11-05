import React, { useState } from 'react';
import { OrderItemProps, PackageItemProps } from '../../container/PrintContentContainer';
import styles from './PrintLabelContent.less';
import { formartDate } from '@/assets/js/utils/utils';
import { Button } from 'antd';
import PrintLabelContentModelContainer from '../../container/PrintLabelContentModelContainer';

interface IProps {
  hasPrintedPackageList: OrderItemProps[],
}
interface IState {
  visible: boolean,
  packageData: null | PackageItemProps,
  curPrintDiaInfo: null | OrderItemProps,
}

export default function PrintLabelContent(props: IProps) {

  const initialState: IState = {
    visible: false,
    packageData: null,
    curPrintDiaInfo: null,
  };

  const [state, setState] = useState(initialState);

  const setModelSwitch = (bool: boolean) => { // 单纯开关弹窗 不控制数据变动
    setState({
      ...state,
      visible: bool,
    });
  }

  const clearModelData = () => {
    setState({
      visible: false,
      packageData: null,
      curPrintDiaInfo: null,
    })
  }

  const onOperationPrintOrder = (subPackage: PackageItemProps, curPrintDiaInfo: OrderItemProps) => { // 操作功能函数
    setState({
      visible: true,
      packageData: subPackage,
      curPrintDiaInfo,
    })
  }

  const items = props.hasPrintedPackageList ? props.hasPrintedPackageList.map((it, index) => { // 每个订单项目
    return (<section key={it.OrderID} className={index === 0 ? styles['last-order-box'] : ''}>
      <header>
        <div>
          <div>
            <span>订单号：</span><span className={index === 0 ? 'is-font-24' : ''}>{it.OrderID}</span>
          </div>
          <div>
            <span>工厂：</span><span className={index === 0 ? 'is-font-20' : ''}>{it.Factory.Name}</span>
          </div>
        </div>
        <div>
          <div>
            <span>共 <i className={index === 0 ? 'is-font-20 is-bold is-pink' : 'is-bold is-pink'}>{it.KindCount}</i> 款</span>
          </div>
          <div>
            <span>{it.ProductAmount}{it.Unit} / 款</span>
          </div>
          <div>
            <span>印刷内容：</span><span>{it.Content}</span>
          </div>
          <div>
            <span>客户：</span><span><i>{it.CustomerName}</i><i>（{it.CustomerSN}）</i></span>
          </div>
          <div>
            <span>产品：</span><span>{it.ProductClass.Second} - {it.ProductName}</span>
          </div>
        </div>
      </header>
      <ul className={styles["content"]}>
        {it.PackageList.filter(it => it.Status !== 255).map((subPackage, subIndex) => (<li key={subPackage.PackageID} className={index === 0 && subIndex === 0 ? styles['last-package-box'] : ''}>
          <div>
            <span>包裹：</span><span>{subPackage.PackageID}</span>
          </div>
          <div>
            <span>含 <i>{subPackage.IncludeKindCount}</i> 款</span>
          </div>
          <div>
            <span>共打印 <i>{subPackage.PrintRecords.length}</i> 次</span>
          </div>
          <div>
            <span>最后打印时间：</span>
            <span>{index === 0 && subIndex === 0 ? '刚刚打印' : formartDate(subPackage.LastPrintTime)}</span>
          </div>
          <div>
            {index === 0 && subIndex === 0 ? <Button type="primary" onClick={() => onOperationPrintOrder(subPackage, it)}>操作</Button> : null}
          </div>
        </li>))}
      </ul>
      <footer className='is-font-14'>
        <span>已打印 <i className={index === 0 ? 'is-font-20 is-bold' : 'is-font-16 is-bold'}>{it.PackageList.length}</i> 个包裹（含 {it.KindCount - it.UnPrintKindCount} 款），
        剩余 <i className={index === 0 ? 'is-font-20 is-pink' : 'is-font-16 is-pink'}>{it.UnPrintKindCount}</i> 款未出标签 </span>
      </footer>
    </section>)
  }) : null;

  return (
    <>
      <article className={styles['mp-print-label-page-content']}>
        {items}
      </article>
      <PrintLabelContentModelContainer {...state} setModelSwitch={setModelSwitch} clearModelData={clearModelData} />
    </>
  )
}
