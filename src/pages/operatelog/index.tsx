import React from 'react'

function index() {
  return (
    <section className='page-wrap'>
      <header>
        <div className='page-header-content'>操作记录页面</div>
      </header>
      <div className="page-content-wrap">
        <div className="page-content">
          page-content
        </div>
      </div>
    </section>
  )
}

index.title = '操作记录';
index.wrappers = ['@/routes/PrivateRouter'];

export default index;