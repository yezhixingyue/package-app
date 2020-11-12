import React from 'react'
import styles from './index.less';
import SelectComp from '@/components/Common/SelectComp';
import { history } from 'umi';

interface Factory {
  FactoryID: string,
  FactoryName: string,
}

interface IProps {
  FinishOrderCount: number,
  PackageCount: number,
  UnFinishOrderCount: number,
  factoryID: number,
  FactoryList: Factory[]
}

const handleSelectChange = (val: number | string) => {
  console.log(history.location.query, val);
  // const _str = history.location.search.length > 0 ? `${history.location.search}&factoryID=${val}` : `?factoryID=${val}`;
  // const _tempObj = val || val === 0 ? { ...history.location.query, factoryID: val } : { ...history.location.query };
  const _tempObj = { ...history.location.query, factoryID: val, Page: 1 };
  let str = '';
  Object.keys(_tempObj).forEach((key, index) => {
    const _temp = `${key}=${_tempObj[key]}`;
    str += index === 0 ? `?${_temp}` : `&${_temp}`;
  })
  history.push(str);
}

export default function SubmitPageHeader(props: IProps) {
  return (
    <div className={styles['submit-page-header-wrap']}>
      <div>
        <span>外协工厂：</span>
        <SelectComp value={props.factoryID} handleSelectChange={handleSelectChange} optionList={props.FactoryList} optionKeySet={{ label: 'FactoryName', value: 'FactoryID' }} />
      </div>
      <p className='is-black is-font-18'>
        {props.UnFinishOrderCount === 0 && props.PackageCount > 0 && props.FinishOrderCount > 0 && <i className={styles['success-img']}></i>}
        { props.FinishOrderCount > 0 && <span><i className='is-font-22 is-black is-bold'>{props.FinishOrderCount}</i> 个订单已打印完毕</span> }
        { props.FinishOrderCount > 0 && props.UnFinishOrderCount > 0 && <span>，</span> }
        {
          props.UnFinishOrderCount > 0 && (
            <>
              <span>剩余 <i className='is-font-22 is-pink'>{props.UnFinishOrderCount}</i> 个订单未完成，</span>
              <span>共计 <i className='is-font-22 is-pink is-bold'>{props.PackageCount}</i> 个包裹，未完成订单列表如下：</span>
            </>
          )
        }
        
      </p>
    </div>
  )
}
