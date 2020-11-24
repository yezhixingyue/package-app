import React, { useState } from 'react'
import { Modal, Button } from 'antd';
import { PackageItemProps, OrderItemProps } from '../../container/PrintContentContainer';
import CommonNumInp from '../../../Common/CommonNumInp/CommonNumInp';
import { formartDate } from '@/assets/js/utils/utils';
import styles from './PrintLabelContentModel.less';

interface IProps {
  visible: boolean,
  packageData: null | PackageItemProps,
  curPrintDiaInfo: null | OrderItemProps,
  setModelSwitch: (bool: boolean) => void,
  clearModelData: () => void,
  ReprintPackage: (packageID: number, callback: () => void, orderID: number) => void,
  getPrintPackageCancle: (packageID: number, callback: () => void, orderID: number) => void,
  getModifyKindChange: (packageID: number, includeKind: number, callback: () => void, orderID: number) => void,
}

export default function PrintLabelContentModel(props: IProps) {

  const [state, setState] = useState({
    modelType: '',
    userSettingNum: props.packageData ? `${props.packageData.IncludeKindCount}` : '',
  });
  
  const handleChangeKindcount = () => {
    props.setModelSwitch(false);
    setTimeout(() => {
      setState({
        ...state,
        modelType: 'changeKindCount',
        userSettingNum: props.packageData ? `${props.packageData.IncludeKindCount}` : '',
      })
      props.setModelSwitch(true);
    }, 100)
  }
  const handleCancelPackage = () => {
    props.setModelSwitch(false);
    setTimeout(() => {
      setState({
        ...state,
        modelType: 'cancelPackage',
        userSettingNum: props.packageData ? `${props.packageData.IncludeKindCount}` : '',
      })
      props.setModelSwitch(true);
    }, 100)
  }

  const handleUserSettingNum = (val: string) => {
    let _val = val.replace('.', '').slice(0, 3);
    if (props.curPrintDiaInfo && props.packageData && +props.curPrintDiaInfo.UnPrintKindCount + +props.packageData.IncludeKindCount < +_val) {
      _val = `${+props.curPrintDiaInfo.UnPrintKindCount + +props.packageData.IncludeKindCount}`;
    }
    setState({
      ...state,
      userSettingNum: _val,
    });
  }

  const onCancel = () => {
    setTimeout(() => {
      setState({
        userSettingNum: '',
        modelType: '',
      })
      props.clearModelData();
    }, 200);
    props.setModelSwitch(false);
  }

  const changeKindcount = () => {
    if (!props.packageData || !state.userSettingNum || !props.curPrintDiaInfo) return;
    props.getModifyKindChange(props.packageData.PackageID ,+state.userSettingNum, onCancel, props.curPrintDiaInfo.OrderID);
  }

  const rePrintPackage = () => {
    if (!props.packageData || !props.curPrintDiaInfo) return;
    props.ReprintPackage(props.packageData.PackageID, onCancel, props.curPrintDiaInfo.OrderID);
  }

  const cancelPackage = () => {
    if (!props.packageData || !props.curPrintDiaInfo) return;
    props.getPrintPackageCancle(props.packageData.PackageID, onCancel, props.curPrintDiaInfo.OrderID);
  }


  const modelTitle = (<ul className='text-model-title'>
    <li>操作说明：</li>
    <li>如果标签没有打印出来、打印模糊、打印机缺纸、标签丢失、标签损坏等，则选择“重新打印标签”，会重新打印一张内容一样的标签；</li>
    <li>如果包裹包含的款数输入错误，请选择“更改款数”，然后输入正确的款数；</li>
    <li>如果不小心多打印了这张包裹标签，请选择“撤销此包裹”；</li>
  </ul>);

  const custormInfoTitle = (
    <ul className={styles['print-model-title']}>
      <li>
        <span>产品：{props.curPrintDiaInfo && (props.curPrintDiaInfo.ProductClass.Second + '-' + props.curPrintDiaInfo.ProductName)}</span>
        <span>印刷内容：{props.curPrintDiaInfo && props.curPrintDiaInfo.Content}</span>
      </li>
      <li>
        <span>客户：</span>
        <span>{props.curPrintDiaInfo && props.curPrintDiaInfo.CustomerName}</span>
        <span>（{props.curPrintDiaInfo && props.curPrintDiaInfo.CustomerSN}）</span>
      </li>
    </ul>
  )

  const packageInfo = (props.packageData ? <ul className='package-info-title'>
    <li>
      <div>当前操作包裹：</div>
      <div>{props.packageData.PackageID}</div>
    </li>
    <li>
      <div>含 <i className={state.modelType && 'is-pink is-bold is-font-20'}>{props.packageData.IncludeKindCount}</i> 款 </div>
      <div>
        {
          props.packageData.PrintRecords.length === 1
           ? <>（共打印 <i className={state.modelType && 'is-black'}>{props.packageData.PrintRecords.length}</i> 次）</>
           : <>
              （共打印 <i className={state.modelType && 'is-black'}>{props.packageData.PrintRecords.length}</i> 次<em className='gray is-font-14'>（重新打印 <i className={state.modelType && 'is-black'}>{props.packageData.PrintRecords.length - 1}</i> 次）</em> ）
             </>
        }
        
      </div>
    </li>
    <li>
      打印时间：{formartDate(props.packageData.LastPrintTime)}
    </li>
  </ul> : null)

  const operaContent = (<ul className='first-opera-pannel'>
    <li>
      <span onClick={handleChangeKindcount}>更改款数</span>
      <span onClick={handleCancelPackage}>撤销此包裹</span>
      <Button type='primary' onClick={rePrintPackage}>重新打印标签</Button>
    </li>
    <li>
      <Button onClick={onCancel}>关闭此窗口</Button>
    </li>
  </ul>)

  const changeKindCountContent = (props.curPrintDiaInfo && props.packageData ? <ul className={styles['input-num-box']}>
    <li>
      <span>当前包裹含</span>
      <CommonNumInp
        value={state.userSettingNum}
        onChange={handleUserSettingNum} placeholder={'[ 1 - ' + (+props.curPrintDiaInfo.UnPrintKindCount + +props.packageData.IncludeKindCount) + ' ]款'}
        onFocus={(e: { target: { select: () => any; }; }) => e.target.select()}
        />
      <span className='gray'>款</span>
    </li>
    <li>
      <Button type='primary' onClick={changeKindcount} disabled={!state.userSettingNum} >确定</Button>
      <Button onClick={onCancel}>取消</Button>
    </li>
  </ul> : null)

  const cancelPackageContent = (props.curPrintDiaInfo && props.packageData ? <ul className={styles['input-num-box']}>
  <li className={styles['cancel-tip-box']}>
    <div>
      <span>确定撤销此包裹吗 ？</span>
    </div>
    <p>撤销后此包裹将被永久删除，且不能恢复 !!!</p>
  </li>
  <li>
    <Button type='primary' onClick={cancelPackage} >确定</Button>
    <Button onClick={onCancel}>取消</Button>
  </li>
  </ul> : null)


  return (
    <Modal
      title={!state.modelType ? modelTitle : custormInfoTitle}
      centered
      visible={props.visible}
      onCancel={() => onCancel()}
      closeIcon={<i className='iconfont icon-cha'></i>}
      width={1000}
      footer={null}
      wrapClassName={styles['operation-model-wrap']}
    >
      {packageInfo}
      { !state.modelType ? operaContent : null}
      { state.modelType === 'changeKindCount' ? changeKindCountContent : null}
      { state.modelType === 'cancelPackage' ? cancelPackageContent : null}
    </Modal>
  )
}
