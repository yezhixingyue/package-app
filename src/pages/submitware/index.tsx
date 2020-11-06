import React, { Component } from 'react'
import SubmitPageHeader from '@/components/SubmitPageComps/SubmitPageHeader'

class index extends Component {
  static title: string;
  static wrappers: string[];
  render() {
    return (
      <section className='page-common-style-wrap'>
        <header>
          <div className='page-header-content'>
            <SubmitPageHeader />
          </div>
        </header>
        <div className="page-content-wrap">
          <div className="page-content">
            page-content
          </div>
        </div>
      </section>
    )
  }
}

index.title = '提交入库'
index.wrappers = ['@/routes/PrivateRouter'];

export default index;