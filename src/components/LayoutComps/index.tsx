import React, { useEffect } from 'react'
import styles from './index.less';
import { NavLink, history } from 'umi';
import { Affix, BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import RightDropDown from '../container/LayoutContainers/RightDropDownContainer';
import MaskContainer from '@/components/container/MaskContainer';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import isChrome from '@/assets/js/utils/isChrome';
// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

const _isChrome = isChrome();
if(!_isChrome) {
  window.alert('请使用谷歌浏览器');
  // window.open('https://www.google.cn/intl/zh-CN/chrome/');
}



export default function header(props: { location: { pathname: string; }; children: any; userDetailInfo: object, getUserInfo: Function }) {
  if (!_isChrome) return <div style={{width: '100vw'}}> <div style={{margin: '118px auto', width: 500}}>系统不支持当前浏览器，请使用谷歌浏览器打开,  <a href="https://www.google.cn/intl/zh-CN/chrome/" target='_blank'> 点击跳转下载页面</a></div> </div>
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
