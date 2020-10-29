import React from 'react'
import { Menu, Dropdown } from 'antd';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';
import message from '../../../assets/js/utils/model';


export default function index(props: { onLoginout: () => any; }) {
  const onClick = ({ key }: any) => {
    if (key === 'loginout') {
      message.showConfirmWithoutMsg({
        title: '确定退出登录吗?',
        onOk: () => { props.onLoginout && props.onLoginout(); }
      });
      // props.onLoginout && props.onLoginout();
    }
  }

  const menu = (
    <Menu className={styles.dorpdownmenus} onClick={onClick}>
      {/* <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item> */}
      {/* <Menu.Divider /> */}
      <Menu.Item key="loginout">
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <span>用户：</span><span>13655552236</span> <DownOutlined />
      </a>
    </Dropdown>
  )
}
