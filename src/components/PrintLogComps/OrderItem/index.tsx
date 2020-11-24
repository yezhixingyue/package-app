import React from 'react'
import styles from './index.less';
import { OrderItemProps } from '@/assets/js/types'
import { formartDate } from '@/assets/js/utils/utils';
import lib from '@umijs/test';

interface IProps {
  orderData: OrderItemProps,
}

export default function OrderItem(prop: IProps) {
  const _showPackageList = prop.orderData.PackageList.filter(it => it.Status !== 255);
  // if (_showPackageList.length === 0) {
  //   return null;
  // }
  const _unShowPackageIDList = prop.orderData.PackageList.filter(it => it.Status === 255).map(it => it.PackageID);
  return (
    
    <section key={prop.orderData.OrderID} className={styles['common-order-item-wrap']}>
      <header>
        <div>
          <div>
            <span>订单号：</span><span>{prop.orderData.OrderID}</span>
          </div>
          <div>
            <span>工厂：</span><span>{prop.orderData.Factory.Name}</span>
          </div>
        </div>
        <div>
          <div>
            <span>共 <i className='is-bold is-pink'>{prop.orderData.KindCount}</i> 款</span>
          </div>
          <div>
            <span>{prop.orderData.ProductAmount}{prop.orderData.Unit} / 款</span>
          </div>
          <div>
            <span>印刷内容：</span><span>{prop.orderData.Content}</span>
          </div>
          <div>
            <span>客户：</span><span><i>{prop.orderData.CustomerName}</i><i>（{prop.orderData.CustomerSN}）</i></span>
          </div>
          <div>
            <span>产品：</span><span>{prop.orderData.ProductClass.Second} - {prop.orderData.ProductName}</span>
          </div>
        </div>
      </header>
      <ul className={styles["content"]}>
        {/* {prop.orderData.PackageList.map((subPackage, subIndex) => (<li key={subPackage.PackageID} className={index === 0 && subIndex === 0 ? styles['last-package-box'] : ''}> */}
        {_showPackageList.length > 0
         ? _showPackageList.map((subPackage, subIndex) => (<li key={subPackage.PackageID}>
            <div>
              <span>包裹：</span><span>{subPackage.PackageID}</span>
            </div>
            <div>
              <span>含 <i>{subPackage.IncludeKindCount}</i> 款</span>
            </div>
            <div>
              {
                subPackage.PrintRecords.length === 1
                 ? <span>共打印 <i>{subPackage.PrintRecords.length}</i> 次</span>
                 : (<span>共打印 <i>{subPackage.PrintRecords.length}</i> 次<em className='is-font-13 gray'>（重新打印 <i>{subPackage.PrintRecords.length - 1}</i> 次）</em></span>)
              }
              
            </div>
            <div>
              {subPackage.Status === 200 && <span className='is-success'>已入库</span> }
              {subPackage.Status === 0 && <span className='is-pink'>未入库</span> }
              {subPackage.Status === 255 && <span className='is-cancel'>已取消</span> }
            </div>
            <div>
              <span>最后打印时间：</span>
              <span>{formartDate(subPackage.LastPrintTime)}</span>
            </div>
            <div>
              {/* {
                subPackage.Status !== 255 ? <span onClick={() => onOperationPrintOrder(subPackage, it)}>操作</span> : <i className='is-cancel'>已撤销</i>
              } */}
              <span>打印人：</span><span>{subPackage.Printer.Name}</span>
            </div>
          </li>))
          : <li className='is-gray is-font-13' style={{justifyContent: 'center'}}> <span>暂无有效包裹记录</span> </li>}
      </ul>
      <footer className='is-font-14'>
        {_unShowPackageIDList.length > 0 ? <div className='is-gray'><span>已撤包：</span><span>{_unShowPackageIDList.join('、')}</span></div> : <div></div> }
        <span>共 <i className={'is-font-16 is-bold'}>{_showPackageList.length}</i> 个包裹</span>
      </footer>
    </section>
  )
}
