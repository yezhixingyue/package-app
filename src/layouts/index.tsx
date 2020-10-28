import React from 'react'
import styles from './index.less';
import { NavLink } from 'umi';
import { Menu, Dropdown, Affix } from 'antd';
import { DownOutlined } from '@ant-design/icons';




export default function header(props: { location: { pathname: string; }; children: any; }) {
  if (props.location.pathname === '/login') return <>{props.children}</>

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <section className={styles['layout-page']}>
      <Affix offsetTop={0.1} className={styles.header}>
        <div>
          <div>
            <div className={styles.logo}></div>
            <ul className="menu-list">
              <li>
                <NavLink to="/">首页</NavLink>
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="user">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Click me <DownOutlined />
            </a>
          </Dropdown>,
          </div>
        </div>
      </Affix>
      <div>{props.children}</div>
    </section>
  )
}
