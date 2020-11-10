import React, { useEffect } from 'react'
import styles from './index.less';
import { NavLink, history } from 'umi';
import { Affix, BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import RightDropDown from '../container/LayoutContainers/RightDropDownContainer';
import MaskContainer from '@/components/container/MaskContainer';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';




export default function header(props: { location: { pathname: string; }; children: any; userDetailInfo: object, getUserInfo: Function }) {
  if (props.location.pathname === '/login') return <>{props.children} <MaskContainer>登录中...</MaskContainer></>

  const onLogoClick = () => {
    history.push('/labelprint');
  }

  useEffect(() => {
    if (!props.userDetailInfo) props.getUserInfo && props.getUserInfo();
  }, [])

  const style = {
    height: 56,
    width: 56,
    lineHeight: '52px',
    borderRadius: 4,
    backgroundColor: '#428dfa',
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    // right: 80
  };

  return (
    <ConfigProvider locale={zhCN}>
      <section className={styles['layout-page']}>
        <Affix offsetTop={0.1} className={styles.header}>
          <div>
            <div>
              <div onClick={onLogoClick} className={styles.logo}></div>
              <ul className="menu-list">
                <li>
                  <NavLink to="/labelprint">打印标签</NavLink>
                </li>
                <li>
                  <NavLink exact to="/submitware?page=1&pageSize=6&factoryID=">提交入库</NavLink>
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
        {
          document.getElementsByClassName('page-common-style-wrap')[0] ?
            <BackTop style={style} visibilityHeight={400} target={() => document.getElementsByClassName('page-common-style-wrap')[0]}>
              <ArrowUpOutlined />
            </BackTop> : null
        }
        <div>{props.children}</div>
        <MaskContainer />
      </section>
    </ConfigProvider>
  )
}
