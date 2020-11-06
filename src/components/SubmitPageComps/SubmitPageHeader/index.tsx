import React from 'react'
import styles from './index.less';
import SelectComp from '@/components/Common/SelectComp';

export default function SubmitPageHeader() {
  return (
    <div className={styles['submit-page-header-wrap']}>
      <div>
        <span>外协工厂：</span>
        <SelectComp />
      </div>
      <p className='is-black is-font-18'>
        <span><i className='is-font-22 is-black is-bold'>106</i> 个订单已打印完毕，</span>
        <span>剩余 <i className='is-font-22 is-pink'>30</i> 个订单未完成，</span>
        <span>共计 <i className='is-font-22 is-pink is-bold'>175</i> 个包裹，未完成订单列表如下：</span>
      </p>
    </div>
  )
}
