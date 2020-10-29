import React from 'react'

function index() {
  return (
    <div>
      打印标签页面
    </div>
  )
}


index.title = '打印标签'
index.wrappers = ['@/routes/PrivateRouter'];

export default index;