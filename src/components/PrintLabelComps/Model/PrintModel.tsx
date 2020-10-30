import React from 'react'
import { Modal, Button } from 'antd';
import styles from './PrintModel.less';

interface packageItem {
  IncludeKindCount: number,
}

interface printInfo {
  CustomerName: string,
  CustomerSN: string,
  ProductName: string,
  ProductClass: {
    First: string,
    Second: string,
  },
  Content: string,
  OrderID: number,
  KindCount: number,
  ProductAmount: number,
  Unit: string,
  PackageList: packageItem[],
}

interface IProps {
  curPrintDiaInfo: printInfo | null,
  curPrintDiaOnState: boolean,
  closeModelAndInfo: () => void,
}

export default class PrintModel extends React.Component<IProps> {
  handleCancel = () => {
    this.props.closeModelAndInfo();
  };

  title = (
    <ul className={styles['print-model-title']}>
      <li>
        <span>产品：{this.props.curPrintDiaInfo && (this.props.curPrintDiaInfo.ProductClass.Second + '-' + this.props.curPrintDiaInfo.ProductName)}</span>
        <span>印刷内容：{this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.Content}</span>
      </li>
      <li>
        <span>客户：</span>
        <span>{this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.CustomerName}</span>
        <span>（{this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.CustomerSN}）</span>
      </li>
    </ul>
  )

  

  render() {
    return (
      <Modal
        title={this.title}
        visible={this.props.curPrintDiaOnState}
        onCancel={this.handleCancel}
        closeIcon={<i className='iconfont icon-cha'></i>}
        footer={null}
        width={1000}
        wrapClassName={styles['print-model-wrap']}
      >
        {
          this.props.curPrintDiaInfo ? <>
            <div className='is-font-16'>
              <span>订单号：</span>
              <span style={{ marginRight: '15px' }} className='is-font-28 is-black is-bold'>{this.props.curPrintDiaInfo.OrderID}</span>
              <span>共 <i className='is-font-26 is-pink is-bold'>{this.props.curPrintDiaInfo.KindCount}</i> 款</span>
              <span className='is-font-18'> （ {this.props.curPrintDiaInfo.ProductAmount + this.props.curPrintDiaInfo.Unit}/款 ），已打印
                {this.props.curPrintDiaInfo.PackageList.length}个包裹（ 共1款 ）</span>
            </div>
            <div></div>
            <div></div>
          </>
            : null
        }

      </Modal>
    );
  }
}


