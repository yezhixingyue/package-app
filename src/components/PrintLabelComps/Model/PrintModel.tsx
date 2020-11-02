import React from 'react'
import { Modal, Button } from 'antd';
import model from '@/assets/js/utils/model';
import styles from './PrintModel.less';
import CommonNumInp from '../../Common/CommonNumInp/CommonNumInp';

interface packageItem {
  IncludeKindCount: number,
}

export interface printInfo {
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
  UnPrintKindCount: number,
  ProductAmount: number,
  Unit: string,
  PackageList: packageItem[],
}

export interface printInfoType {
  OrderID: number,
  IncludeKindCount: number,
}

interface IProps {
  curPrintDiaInfo: printInfo | null,
  curPrintDiaOnState: boolean,
  closeModelAndInfo: () => void,
  getPrintPackage: (arg0: printInfoType) => any,
  setModelState: (arg0: boolean) => void,
}

export default class PrintModel extends React.Component<IProps> {
  
  title: {} | null | undefined;
  contentHeader: {} | null | undefined;
  timer: NodeJS.Timeout | null = null;

  state = {
    isUserSettingKind: false,
    userSettingNum: '',
  }

  handleUserSettingNum = (val: string) => {
    this.setState({
      ...this.state,
      userSettingNum: val.replace('.', ''),
    });
  }

  handleCancel = () => {
    this.props.closeModelAndInfo();
    this.setState({
      isUserSettingKind: false,
    })
  }

  getPrintPackage = () => { // 处理当剩余未打印款数为0时的打印处理
    if (this.props.getPrintPackage && this.props.curPrintDiaInfo) {
      const payload: printInfoType = {
        OrderID: this.props.curPrintDiaInfo.OrderID,
        IncludeKindCount: 1,
      }
      if (this.props.curPrintDiaInfo.KindCount === 1) {
        this.props.getPrintPackage(payload);
        this.handleCancel();
      } else {
        let key = true;
        this.props.curPrintDiaInfo.PackageList.forEach(it => {
          if (!key) return;
          if (it.IncludeKindCount > 1) key = false;
        })
        if (!key) {
          model.showWarn({
            title: '该订单存在合包，不允许再拆包!',
            onOk: () => {
              this.handleCancel();
            }
          });
          return;
        }
        this.props.getPrintPackage(payload);
        this.handleCancel();
      }
    }
  }

  getPrintPackageByKingCount = (count: number) => { // 打印指定款数
    if (this.props.getPrintPackage && this.props.curPrintDiaInfo && count) {
      const payload: printInfoType = {
        OrderID: this.props.curPrintDiaInfo.OrderID,
        IncludeKindCount: count,
      }
      this.props.getPrintPackage(payload);
      this.handleCancel();
    }
  }

  handleNoneOfTheAbove = () => {
    console.log('handleNoneOfTheAbove');
    if (this.timer) return;
    console.log(this.timer);
    this.props.setModelState(false);
    this.timer = setTimeout(() => {
      this.props.setModelState(true);
      this.timer = null;
      this.setState({
        isUserSettingKind: true,
      })
    }, 300)
  }

  componentDidUpdate() {
    if (this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount === 0) {
      let key = true;
      this.props.curPrintDiaInfo.PackageList.forEach(it => {
        if (!key) return;
        if (it.IncludeKindCount > 1) key = false;
      })
      if (!key) {
        model.showWarn({
          title: '该订单存在合包，不允许再拆包!',
          onOk: () => {
            this.handleCancel();
          }
        });
        this.handleCancel();
      }
    }
  }

  render() {
    this.title = (
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
  
    this.contentHeader = (this.props.curPrintDiaInfo ? <div>
      <span className='is-font-16'>订单号：</span>
      <span style={{ marginRight: '15px' }} className='is-font-28 is-black is-bold'>{this.props.curPrintDiaInfo.OrderID}</span>
      <span className='is-font-16'>共 <i className='is-font-26 is-pink is-bold'>{this.props.curPrintDiaInfo.KindCount}</i> 款</span>
      <span className='is-font-18'>
        （ {this.props.curPrintDiaInfo.ProductAmount + this.props.curPrintDiaInfo.Unit}/款 ），已打印
        {this.props.curPrintDiaInfo.PackageList.length}个包裹（ 共{+(this.props.curPrintDiaInfo.KindCount - this.props.curPrintDiaInfo.UnPrintKindCount).toFixed(0)}款 ）
      </span>
    </div>
    : null)

    return (
      <Modal
        title={this.title}
        visible={this.props.curPrintDiaOnState}
        onCancel={this.handleCancel}
        closeIcon={<i className='iconfont icon-cha'></i>}
        footer={null}
        destroyOnClose
        maskClosable={false}
        width={this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount > 1 && !this.state.isUserSettingKind ? 1200 : 1000}
        wrapClassName={styles['print-model-wrap']}
      >
        { // 已有打印信息  且已打印包数 大于等于 总款数 （即 每款都有包裹记录  单款 或 多款） || 合包再分包的处理还没考虑（已处理 会报错提示）
          this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount === 0 ? <>
            <ul className={styles['is-full-records']}>
              <li>
                {this.contentHeader}
                <div style={{ marginTop: '58px', marginBottom: '15px' }}>
                  <span className='is-pink is-font-24'>{this.props.curPrintDiaInfo.KindCount} 款已全部打印</span>
                  <span className='is-font-18 is-black'>（已打印 {this.props.curPrintDiaInfo.PackageList.length} 个包裹标签）</span>
                </div>
                <div>
                  <span className='is-pink is-font-28'>确定打印新包裹标签吗?</span>
                </div>
              </li>
              <li style={{ marginTop: '120px' }}>
                <Button type='primary' onClick={this.getPrintPackage}>打印一张</Button>
                <Button onClick={this.handleCancel}>不打印了</Button>
              </li>
            </ul>
          </>
            : null
        }
        {
          this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount > 1 && !this.state.isUserSettingKind ? <>
            <ul className={styles['greater-than-1-count-wrap']}>
              <li>{this.contentHeader}</li>
              <li className={styles['greater-than-1-count-wrap-second-li']}>
                <Button type='primary' onClick={() => this.getPrintPackageByKingCount(1)}>
                  此包装 1 款
                </Button>
                <Button type='primary' onClick={() => this.getPrintPackageByKingCount(this.props.curPrintDiaInfo ? this.props.curPrintDiaInfo.UnPrintKindCount : 0)}>
                  此包装 {this.props.curPrintDiaInfo.UnPrintKindCount} 款
                </Button>
              </li>
              <li >
                {
                  this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount > 2 ?  <Button onClick={this.handleNoneOfTheAbove}>以上都不是</Button> : null
                }
              </li>
            </ul>
          </> : null
        }
        {
          this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount > 1 && this.state.isUserSettingKind ? <>
            <ul className={styles['greater-than-1-count-wrap']}>
              <li>{this.contentHeader}</li>
              <li className={styles['greater-than-1-count-wrap-second-li']}>
                <span>当前包裹含</span>
                <CommonNumInp value={this.state.userSettingNum} onChange={this.handleUserSettingNum} />
                <span>款</span>
              </li>
              <li >
                {
                  this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount > 2 ?  <Button onClick={this.handleNoneOfTheAbove}>以上都不是</Button> : null
                }
              </li>
            </ul>
          </> : null
        }

      </Modal>
    );
  }
}


