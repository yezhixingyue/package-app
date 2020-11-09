import React, { Component } from 'react';
import SubmitOrderListContainer from '@/components/SubmitPageComps/container/SubmitOrderListContainer';
import SubmitHeaderContainer from '@/components/SubmitPageComps/container/SubmitHeaderContainer';

class index extends Component {
  static title: string;
  static wrappers: string[];
  render() {
    return (
      <section className='page-common-style-wrap'>
        <header>
          <div className='page-header-content'>
            <SubmitHeaderContainer />
          </div>
        </header>
        <div className="page-content-wrap">
          <div className="page-content" style={{ paddingTop: '25px', minHeight: 'calc(100vh - 180px)', position: 'relative' }}>
            <SubmitOrderListContainer />
          </div>
        </div>
      </section>
    )
  }
}

index.title = '提交入库'
index.wrappers = ['@/routes/PrivateRouter'];

export default index;