import React from 'react'
import { Menu, Dropdown } from 'antd';
import styles from './index.less';
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import message from '../../../assets/js/utils/model';

interface user {
  Mobile: string,
}

interface IProps {
  onLoginout?: () => void,
  userInfo: user
}


export default function index(props: IProps) {
  const onClick = ({ key }: any) => {
    if (key === 'loginout') {
      message.showConfirmWithoutMsg({
        title: '确定退出登录吗?',
        onOk: () => { props.onLoginout && props.onLoginout(); }
      });
    }
  }

  console.log(props);

  const menu = (
    <Menu className={styles.dorpdownmenus} onClick={onClick}>
      <Menu.Item key="loginout">
        <span><PoweroffOutlined />退出登录</span>
        {/* <Button
          icon={<PoweroffOutlined />}
        >
          退出登录
        </Button> */}
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <span>用户：</span><span>{props.userInfo && props.userInfo.Mobile}</span> <DownOutlined />
      </a>
    </Dropdown>
  )
}
