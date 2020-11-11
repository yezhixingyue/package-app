import React from 'react';
import LogPageHeaderContainer from '@/components/PrintLogComps/container/LogPageHeaderContainer';
import LogPageContentContainer from '@/components/PrintLogComps/container/LogPageContentContainer';

function index() {
  return (
    <section className='page-common-style-wrap'>
      <header>
        <div className='page-header-content'>
          <LogPageHeaderContainer />
        </div>
      </header>
      <div className="page-content-wrap">
        <div className="page-content" style={{ paddingTop: '25px', minHeight: 'calc(100vh - 205px)', position: 'relative', paddingBottom: '50px' }}>
          <LogPageContentContainer />
        </div>
      </div>
    </section>
  )
}

index.title = '操作记录';
index.wrappers = ['@/routes/PrivateRouter'];

export default index;