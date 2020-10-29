import React, { Component } from 'react'

class index extends Component {
  static title: string;
  static wrappers: string[];
  render() {
    return (
      <div>
        提交入库页面
      </div>
    )
  }
}

index.title = '提交入库'
index.wrappers = ['@/routes/PrivateRouter'];

export default index;