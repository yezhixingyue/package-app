import React from 'react'
import { Modal, Button } from 'antd';
import model from '@/assets/js/utils/model';
import styles from './PrintModel.less';
import CommonNumInp from '../../Common/CommonNumInp/CommonNumInp';

interface packageItem {
  IncludeKindCount: number,
  Status: number,
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
  IncludeKindCount: number,
}

export interface printInfoType {
  OrderID: number,
  IncludeKindCount: number,
  curOrderData: object,
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
    let _val = val.replace('.', '').slice(0, 3);
    // console.log(this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount);
    if (this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount < +_val) {
      _val = `${this.props.curPrintDiaInfo.UnPrintKindCount}`;
    }
    this.setState({
      ...this.state,
      userSettingNum: _val,
    });
  }
  handleUserDefineSubmit = () => {
    if (!this.props.curPrintDiaInfo || !this.state.userSettingNum) return;
    if (+this.state.userSettingNum > 0 && +this.state.userSettingNum <= this.props.curPrintDiaInfo.UnPrintKindCount) {
      // console.log('handleUserDefineSubmit', this.state.userSettingNum);
      this.getPrintPackageByKingCount(+this.state.userSettingNum);
    }
  }

  handleCancel = () => {
    this.props.closeModelAndInfo();
    this.setState({
      ...this.state,
      isUserSettingKind: false,
    })
  }

  getPrintPackage = () => { // 处理当剩余未打印款数为0时的打印处理
    if (this.props.getPrintPackage && this.props.curPrintDiaInfo) {
      const payload: printInfoType = {
        OrderID: this.props.curPrintDiaInfo.OrderID,
        IncludeKindCount: 1,
        curOrderData: this.props.curPrintDiaInfo,
      }
      if (this.props.curPrintDiaInfo.KindCount === 1) {
        this.props.getPrintPackage(payload);
        this.handleCancel();
      } else {
        let key = true;
        this.props.curPrintDiaInfo.PackageList.forEach(it => {
          if (!key || it.Status === 255) return;
          if (it.IncludeKindCount > 1) key = false;
        })
        if (!key) {
          model.showWarn({
            title: '该订单存在合包，不允许再拆包!',
            onOk: () => {
              this.handleCancel();
            },
            onCancel: () => {
              this.handleCancel();
            },
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
        curOrderData: this.props.curPrintDiaInfo,
      }
      this.props.getPrintPackage(payload);
      this.handleCancel();
      this.setState({
        ...this.state,
        userSettingNum: '',
        isUserSettingKind: false,
      })
    }
  }

  handleNoneOfTheAbove = () => {
    if (this.timer) return;
    console.log(this.timer);
    this.props.setModelState(false);
    this.timer = setTimeout(() => {
      this.props.setModelState(true);
      this.timer = null;
      this.setState({
        ...this.state,
        isUserSettingKind: true,
      })
    }, 150)
  }

  handleReturn = () => {
    this.props.setModelState(false);
    setTimeout(() => {
      this.props.setModelState(true);
      this.timer = null;
      this.setState({
        ...this.state,
        isUserSettingKind: false,
      })
    }, 150)
  }

  // componentDidUpdate() {
  //   if (this.props.curPrintDiaInfo && this.props.curPrintDiaInfo.UnPrintKindCount === 0) {
  //     let key = true;
  //     this.props.curPrintDiaInfo.PackageList.forEach(it => {
  //       if (!key || it.Status === 255) return;
  //       // if (it.IncludeKindCount > 1) key = false;
  //     })
  //     console.log(this.props.curPrintDiaInfo.PackageList);
  //     if (!key) {
  //       model.showWarn({
  //         title: '该订单存在合包，不允许再拆包!',
  //       });
  //       this.handleCancel();
  //     }
  //   }
  // }

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

    let _includeKindCount = 0;
    if (this.props.curPrintDiaInfo) {
      this.props.curPrintDiaInfo.PackageList.filter(it => it.Status !== 255).forEach(it => {
        _includeKindCount += it.IncludeKindCount;
      })
      if (_includeKindCount > this.props.curPrintDiaInfo.KindCount) _includeKindCount = this.props.curPrintDiaInfo.KindCount;
    }
  
    this.contentHeader = (this.props.curPrintDiaInfo ? <div>
      <span className='is-font-16'>订单号：</span>
      <span style={{ marginRight: '15px' }} className='is-font-28 is-black is-bold'>{this.props.curPrintDiaInfo.OrderID}</span>
      <span className='is-font-16'>共 <i className='is-font-26 is-pink is-bold'>{this.props.curPrintDiaInfo.KindCount}</i> 款</span>
      <span className='is-font-18'>
        （ {this.props.curPrintDiaInfo.ProductAmount + this.props.curPrintDiaInfo.Unit}/款 ），
        已打印 <i className='is-font-26 is-pink is-bold'>{this.props.curPrintDiaInfo.PackageList.filter(it => it.Status !== 255).length}</i> 个包裹
        （ 共包含 <i className='is-bold'>{_includeKindCount}</i> 款 ）
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
                  <span className='is-font-18 is-black'>（已打印 {this.props.curPrintDiaInfo.PackageList.filter(it => it.Status !== 255).length} 个包裹标签）</span>
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
            <ul className={styles['input-num-box']}>
              <li>{this.contentHeader}</li>
              <li>
                <span>当前包裹含</span>
                <CommonNumInp
                  value={this.state.userSettingNum}
                  onChange={this.handleUserSettingNum} placeholder={'请输入款数: [ 1 - ' + this.props.curPrintDiaInfo.UnPrintKindCount + ' ]款'}
                  onPressEnter={this.handleUserDefineSubmit}
                 />
                <span className='gray'>款</span>
              </li>
              <li >
                <Button onClick={this.handleReturn}>＜＜ 返回</Button>
                <Button type='primary'
                  disabled={this.state.userSettingNum ? +this.state.userSettingNum < 1 : true}
                  onClick={this.handleUserDefineSubmit}>
                  打印
                </Button>
              </li>
            </ul>
          </> : null
        }

      </Modal>
    );
  }
}


