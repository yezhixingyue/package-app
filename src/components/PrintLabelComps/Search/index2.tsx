import React, { useState } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { OrderItemProps, PackageItemProps } from '@/components/PrintLabelComps/container/PrintContentContainer';
import PrintLabelContentModelContainer from '@/components/PrintLabelComps/container/PrintLabelContentModelContainer';
import { formartDate } from '@/assets/js/utils/utils';

interface IProps {
  searchList: null | OrderItemProps[],
  jumpToListPage: () => void,
}

interface IState {
  visible: boolean,
  packageData: null | PackageItemProps,
  curPrintDiaInfo: null | OrderItemProps,
}

export default function LabelPrintPageSearchIndex(props: IProps) {

  const initialState: IState = {
    visible: false,
    packageData: null,
    curPrintDiaInfo: null,
  };

  const [state, setState] = useState(initialState);

  const onOperationPrintOrder = (subPackage: PackageItemProps, curPrintDiaInfo: OrderItemProps) => { // 操作功能函数
    setState({
      visible: true,
      packageData: subPackage,
      curPrintDiaInfo,
    })
  }

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


  return (
    <article className={styles['label-print-page-search-content-wrap']}>
      {
        props.searchList ? props.searchList.map((it, index) => { // 每个订单项目
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
              {/* {it.PackageList.map((subPackage, subIndex) => (<li key={subPackage.PackageID} className={index === 0 && subIndex === 0 ? styles['last-package-box'] : ''}> */}
              {it.PackageList.map((subPackage, subIndex) => (<li key={subPackage.PackageID}>
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
                  <span>{formartDate(subPackage.LastPrintTime)}</span>
                </div>
                <div>
                  {
                    subPackage.Status !== 255 ? <span onClick={() => onOperationPrintOrder(subPackage, it)}>操作</span> : <i className='is-cancel'>已撤销</i>
                  }
                </div>
              </li>))}
            </ul>
            <footer className='is-font-14'>
              <span>已打印 <i className={index === 0 ? 'is-font-20 is-bold' : 'is-font-16 is-bold'}>{it.PackageList.filter(it => it.Status !== 255).length}</i> 个包裹（含 {it.IncludeKindCount} 款），
              剩余 <i className={index === 0 ? 'is-font-20 is-pink' : 'is-font-16 is-pink'}>{it.UnPrintKindCount}</i> 款未出标签 </span>
            </footer>
          </section>)
        }) : null
      }
      {
        (!props.searchList || props.searchList.length === 0) && ( <p>
          { props.searchList && <span>搜索不到该订单，请检查输入的订单号或包裹号是否正确</span> }
        </p> )
      }
      <PrintLabelContentModelContainer {...state} setModelSwitch={setModelSwitch} clearModelData={clearModelData} />
      <footer>
        <Button onClick={props.jumpToListPage}>＜＜ 返回</Button>
      </footer>
    </article>
  )
}
