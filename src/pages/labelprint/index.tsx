import React from 'react';
import PrintHeaderContainer from '../../components/PrintLabelComps/container/PrintHeaderContainer';
import PrintModelContainer from '@/components/PrintLabelComps/container/PrintModelContainer';

function index() {
  return (
    <section className='page-wrap'>
      <header>
        <div className='page-header-content'>
          <PrintHeaderContainer />
        </div>
      </header>
      <div className="page-content-wrap">
        <div className="page-content">
          page-content
        </div>
      </div>
      <PrintModelContainer />
    </section>
  )
}


index.title = '打印标签'
index.wrappers = ['@/routes/PrivateRouter'];

export default index;