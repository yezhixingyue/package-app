import React from 'react'
import OrderItemComp from '../OrderItem';
import { OrderItemProps } from '@/assets/js/types';
import { Pagination, Empty } from 'antd';
import styles from './index.less';
import { history } from 'umi';


interface IProps {
  logList: OrderItemProps[],
  DataNumber: number,
  Page: number,
  PageSize: number,
}

export default function index(props: IProps) {

  const setPagePath = (obj: { [x: string]: any; }) => {
    let str = '';
    Object.keys(obj).forEach((key, index) => {
      const _temp = `${key}=${obj[key]}`;
      str += index === 0 ? `?${_temp}` : `&${_temp}`;
    })
    history.push(str);
  }

  const EmptyDom = (
    (props.logList.length === 0)
    ? <div className={`gray ${styles['empty-wrap']}`}><Empty description='暂无记录' /></div>
    : null
  )

  const onChange = (val:number) => {
    const _tempObj = { ...history.location.query, Page: val };
    setPagePath(_tempObj);
  }

  return (
    <>
      {
        props.logList.length > 0
         ? props.logList.map(item => <OrderItemComp orderData={item} key={item.OrderID} />)
         : EmptyDom
      }
      <Pagination
        hideOnSinglePage
        className={styles.pagination}
        showQuickJumper
        current={props.Page}
        onChange={onChange}
        size='small'
        total={props.DataNumber}
        pageSize={props.PageSize}
       />
    </>
  )
}
