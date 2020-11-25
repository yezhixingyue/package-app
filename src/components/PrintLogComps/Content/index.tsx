import React from 'react'
import OrderItemComp from '../OrderItem';
import { OrderItemProps } from '@/assets/js/types';
import { Pagination, Popconfirm, Affix, Empty, Button } from 'antd';
import styles from './index.less';
import { history } from 'umi';
import getDate from '@/assets/js/date/index.js';
import model from '@/assets/js/utils/model';
import downLoadExcel from '@/assets/js/exprortExcel';
import api from '@/services';

interface queryType {
  dateType?: string,
  PrintTime?: {
    First: string,
    Second: string,
  },
  First?: string,
  Second?: string,
  Page?: string,
  PageSize?: string,
  KeyWords?: string,
}

const setAndFilterDate = (obj:queryType) => {
  if (!obj.dateType) return;
  switch (obj.dateType) {
    case 'all':
      delete obj.PrintTime;
      break;
    case 'today': 
      obj.PrintTime = getDate.TodayDate();
      break;
    case 'yestday': 
      obj.PrintTime = getDate.YesterdayDate();
      break;
    case 'week': 
      obj.PrintTime = getDate.curWeek();
      break;
    case 'month': 
      obj.PrintTime = getDate.curMonthDate();
      break;
    case 'define': 
      obj.PrintTime = {
        First: `${obj.First}T00:00:00.000`,
        Second: `${obj.Second}T23:59:59.997`,
      }
      delete obj.First;
      delete obj.Second;
      break;
    default:
      break;
  }
}


interface IProps {
  logList: OrderItemProps[],
  DataNumber: number,
  Page: number,
  PageSize: number,
  Message: number | string,
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

  const handleExportExcel = () => {
    const _tempObj = { ...history.location.query };
    setAndFilterDate(_tempObj);
    
    _tempObj.IncludeCancled = true;
    // _tempObj.HaveInstored = true;
    _tempObj.UsePrint = false;
    delete _tempObj.dateType;
    delete _tempObj.Page;
    delete _tempObj.PageSize;
    if (!_tempObj.FactoryID) delete _tempObj.FactoryID;
    if (!_tempObj.KeyWords) delete _tempObj.KeyWords;

    console.log(_tempObj);
    downLoadExcel(api.getPrintPackageExcel, _tempObj);
  }

  const onExcelBtnClick = () => {
    model.showConfirmWithoutMsg({
      title: '确定导出为表格吗?',
      onOk: handleExportExcel,
    })
  }

  const onShowSizeChange = (current: number, size: number) => {
    console.log(current, size);
    // const _tempObj = { ...history.location.query, Page: 1, PageSize:size  };
    // setPagePath(_tempObj);
  }

  return (
    <>
      {
        props.logList.length > 0
         ? props.logList.map(item => <OrderItemComp orderData={item} key={item.OrderID} />)
         : EmptyDom
      }
      {
        props.logList.length > 0 && <Affix offsetBottom={0}>
          <div className={styles.footer}>
            {props.DataNumber <= props.PageSize && <span></span>}
            <Pagination
              hideOnSinglePage
              className={styles.pagination}
              showQuickJumper
              current={props.Page}
              onChange={onChange}
              size='small'
              total={props.DataNumber}
              pageSize={props.PageSize}
              onShowSizeChange={onShowSizeChange}
            />
            <div className={styles.info}>
              <span>共计 <i>{props.DataNumber}</i> 个订单， <i className='is-pink is-font-18'>{props.Message}</i> 个包裹</span>
              {/* <Popconfirm
                placement="topRight"
                title={'确定导出Excel表格吗?'}
                onConfirm={handleExportExcel}
                okText="确定"
                cancelText="取消"
              > */}
                <Button type='primary' onClick={onExcelBtnClick}>导出Excel</Button>
              {/* </Popconfirm> */}
              
            </div>
          </div>
        </Affix>
      }
    </>
  )
}
