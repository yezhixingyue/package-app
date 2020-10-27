import styles from './index.less';
import React from 'react'
import LoginComp from '../../components/LoginComps/LoginComp';

export default function index() {
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

