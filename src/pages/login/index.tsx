import styles from './index.less';
import React from 'react'
import LoginComp from '../../components/container/LoginContainer';

function index() {
  return (
    <div className={styles.loginWrap}>
      <ul>
        <li></li>
        <li>
          <LoginComp />
        </li>
      </ul>
    </div>
  )
}

index.title = '用户登录';

export default index;