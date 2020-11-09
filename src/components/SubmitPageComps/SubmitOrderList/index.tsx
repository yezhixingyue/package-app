import { OrderItemProps } from '@/assets/js/types';
import OrderItemComp from '@/components/Common/OrderItem';
import { Pagination } from 'antd';
import { Empty, Button, Modal, Input } from 'antd';
import styles from './index.less';
import { history } from 'umi';
import model from '@/assets/js/utils/model';
import api from '@/services';

import React, { useState } from 'react'

interface IProps {
  submitList: OrderItemProps[],
  FinishOrderCount: number,
  PackageCount: number,
  UnFinishOrderCount: number,
  page: number,
  pageSize: number,
  DataNumber: number,
  factoryID: number,
}

interface requestObjType {
  IsCoerced: boolean,
  Remark?: string,
  FactoryID?: number,
}

export default function ListComp(props: IProps) {

  const [state, setstate] = useState({
    showModel: false,
    reMark: '',
  })

  const EmptyDom = (
    (props.FinishOrderCount === 0 && props.PackageCount === 0 && props.UnFinishOrderCount === 0)
    ? <div style={{marginTop: '88px'}} className='gray'><Empty description='暂无订单' /></div>
    : null
  )

  const onChange = (val:number) => {
    history.push(`?page=${val}&pageSize=${props.pageSize}&factoryID=${props.factoryID}`);
  }

  const onModelCancel = () => {
    setstate({
      ...state,
      showModel: false,
    })
  }
  
 const onTextAreaChange = (e: { target: { value: string; }; }) => {
  const { value } = e.target;
  const _val = value.replace(/\s/g, '');
  setstate({
    ...state,
    reMark: _val,
  })
 }

  const { TextArea } = Input;

  const handleForceSubmit = () => {
    console.log(state.reMark);
    if (!state.reMark) {
      model.showWarnWithoutMsg({
        title: '请输入强制入库理由!'
      })
      return;
    }
  }

  const CoerceModelCom = (
    <Modal
      title={null}
      centered
      visible={state.showModel}
      onCancel={() => onModelCancel()}
      closeIcon={<i className='iconfont icon-cha'></i>}
      width={700}
      footer={null}
      wrapClassName={styles['in-store-model-wrap']}
    >
      <ul className={styles.modelList}>
        <li>
          <span>确定要强行入库吗?</span>
        </li>
        <li>
          <span>该工厂有 <i className='is-pink is-font-18'>{props.UnFinishOrderCount}</i> 个订单未完成!!!</span>
        </li>
        <li>
          <span>强行入库理由：</span>
          <TextArea placeholder='请输入强行入库理由' value={state.reMark} onChange={onTextAreaChange} showCount maxLength={180} />
        </li>
        <li>
          <Button type='primary' danger onClick={handleForceSubmit}>强行入库</Button>
          <Button type='primary' onClick={onModelCancel}>暂不入库</Button>
        </li>
      </ul>
    </Modal>
  )

  const handleNormalSubmit = async () => {
    const _tempObj:requestObjType = { IsCoerced: false };
    if (props.factoryID) _tempObj.FactoryID = props.factoryID;
    const res = await api.getPrintPackageInStore(_tempObj);
    if (res.data.Status === 1000) {
      model.showSuccess({
        title: '提交成功',
        onOk: () => {
          history.push(`?page=1&pageSize=${props.pageSize}&factoryID=${props.factoryID}`);
        }
      })
    }

  }

  const onBtnClick = () => {
    if (props.PackageCount === 0) return;
    if (props.UnFinishOrderCount === 0) {
      model.showConfirm({
        title: '确定提交入库吗?',
        msg: `本次共有${props.PackageCount}个包裹可入库`,
        onOk: handleNormalSubmit
      })
    } else {
      // 强制入库
      setstate({
        ...state,
        showModel: true,
      })
    }
    
  }

  return (
    <>
      {
        props.submitList.length > 0
         ? props.submitList.map(item => <OrderItemComp orderData={item} key={item.OrderID} />)
         : EmptyDom
      }
      <Pagination
        hideOnSinglePage
        className={styles.pagination}
        showQuickJumper
        current={props.page}
        onChange={onChange}
        total={props.DataNumber}
        pageSize={props.pageSize}
       />
      {
        props.PackageCount > 0 ? (
          <div className={props.UnFinishOrderCount > 0 ? styles['submit-btn-wrap'] : `${styles['submit-btn-wrap']} ${styles.fixed}`}>
            <Button type='primary' onClick={onBtnClick}>提交入库</Button>
          </div>
        ) : null
      }
      {CoerceModelCom}
    </>
  )
}

