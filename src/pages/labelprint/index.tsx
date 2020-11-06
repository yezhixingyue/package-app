import React from 'react';
import PrintModelContainer from '@/components/PrintLabelComps/container/PrintModelContainer';
import PrintContentContainer from '@/components/PrintLabelComps/container/PrintContentContainer';

function index() {
  return (
    <>
      <div className="page-content-wrap">
        <div className="page-content">
          <PrintContentContainer />
        </div>
      </div>
      <PrintModelContainer />
    </>
  )
}


index.title = '打印标签'
index.wrappers = ['@/routes/PrivateRouter'];

export default index;