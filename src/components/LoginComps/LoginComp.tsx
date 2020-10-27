import { Form, Input, Button, Checkbox } from 'antd';
import styles from './LoginStyle.less';
import React from 'react';

export default () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className={styles['login-form']}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        className={styles.inpItem}
        rules={[
          {
            required: true,
            message: '请输入登录手机号码!',
          },
        ]}
      >
        <Input prefix={<i className='iconfont icon-shouji'></i>} placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        name="password"
        className={styles.inpItem}
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input
          prefix={<i className='iconfont icon-mima'></i>}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className='is-gray-light'>记住密码</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
