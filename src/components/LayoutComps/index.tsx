import React, { useEffect } from 'react'
import styles from './index.less';
import { NavLink, history } from 'umi';
import { Affix } from 'antd';
import RightDropDown from '../container/LayoutContainers/RightDropDownContainer';
import MaskContainer from '@/components/container/MaskContainer';




export default function header(props: { location: { pathname: string; }; children: any; userDetailInfo: object, getUserInfo: Function }) {
  if (props.location.pathname === '/login') return <>{props.children} <MaskContainer>登录中...</MaskContainer></>

  const onLogoClick = () => {
    history.push('/labelprint');
  }

  useEffect(() => {
    if (!props.userDetailInfo) props.getUserInfo && props.getUserInfo();
  }, [])

  return (
    <section className={styles['layout-page']}>
      <Affix offsetTop={0.1} className={styles.header}>
        <div>
          <div>
            <div onClick={onLogoClick} className={styles.logo}></div>
            <ul className="menu-list">
              <li>
                <NavLink exact to="/labelprint">打印标签</NavLink>
              </li>
              <li>
                <NavLink exact to="/submitware">提交入库</NavLink>
              </li>
              <li>
                <NavLink exact to="/operatelog">操作记录</NavLink>
              </li>
            </ul>
          </div>
          <div className={styles.user}>
            <RightDropDown userInfo={props.userDetailInfo} />
          </div>
        </div>
      </Affix>
      <div>{props.children}</div>
      <MaskContainer />
    </section>
  )
}
