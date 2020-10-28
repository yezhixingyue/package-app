import { Form, Input, Button, Checkbox } from 'antd';
import styles from './LoginStyle.less';
import React, { useState } from 'react';
import validateCheck from '../../assets/js/validator/validateCheck.js';
import { Base64 } from 'js-base64';
import { history } from 'umi';


export default (props: { onLogin: (arg0: any) => any; }) => {
  const [form] = Form.useForm();

  const _info = localStorage.getItem('initialValues');
  let loginInfo = {
    username: '',
    password: '',
    remember: false,
  }
  if (_info) loginInfo = JSON.parse(_info);
  
  const onFinish = async (values: any) => {
    if (!props.onLogin) return;
    const pwd = Base64.encode(values.password);
    const _tempObj = {
      ...values,
      password: pwd,
    }
    const res = await props.onLogin(_tempObj);
    if (!res) {
      form.setFieldsValue({ password: '' });
      if (values.remember) {
        localStorage.removeItem('initialValues');
      }
      return;
    }

    history.push('/');

    // 下面步骤需要在登录成功后执行
    if (values.remember) {
      localStorage.setItem('initialValues', JSON.stringify(values));
    } else if (_info) {
      localStorage.removeItem('initialValues');
    }
  };

  const validateMobile = (rule: any, value: string, callback: (arg0?: string | undefined) => void) => {
    const rules = [
      { strategy: 'isNotEmpty', errorMsg: '请输入手机号!' },
      { strategy: 'shouldLength:11', errorMsg: '请输入11位手机号码' },
      { strategy: 'isPhone', errorMsg: '手机号码格式不正确' },
    ];
    let msg = '';
    if (validateCheck(value, rules, (err:string) => msg = err)) return Promise.resolve();
    else return Promise.reject(msg);
  }

  const validatePassword = (rule: any, value: string, callback: (arg0?: string | undefined) => void) => {
    const rules = [
      { strategy: 'isNotEmpty', errorMsg: '请输入密码!' },
      { strategy: 'minLength:6', errorMsg: '密码最小长度为6位' },
      { strategy: 'maxLength:16', errorMsg: '密码最大长度为16位' },
    ];
    let msg = '';
    if (validateCheck(value, rules, (err:string) => msg = err)) return Promise.resolve();
    else return Promise.reject(msg);
  }

  const onFieldsChange = (changedFields: any[], allFields: any[]) => {
    if (changedFields.length === 0) return;
    const t = changedFields[0];
    const fieldName = t.name[0];
    const value = t.value;
    if (fieldName === 'username' && value) form.setFieldsValue({ username: value.replace(/[^\d]+/g, '') });
    else if (fieldName === 'password' && value) form.setFieldsValue({ password: value.replace(/\s+/g, '') });
  }

  return (
    <Form
      name="normal_login"
      form={form}
      className={styles['login-form']}
      initialValues={loginInfo}
      validateTrigger="onBlur"
      onFinish={onFinish}
      onFieldsChange={onFieldsChange}
    >
      <Form.Item
        name="username"
        className={styles.inpItem}
        rules={[{ validator: validateMobile }]}
      >
        <Input maxLength={11} prefix={<i className='iconfont icon-shouji'></i>} placeholder="请输入手机号" />
      </Form.Item>
      
      <Form.Item
        name="password"
        className={styles.inpItem}
        rules={[{ validator: validatePassword }]}
      >
        <Input
          prefix={<i className='iconfont icon-mima'></i>}
          type="password"
          maxLength={16}
          placeholder="请输入密码"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className='is-gray-light'>记住密码</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
      </Form.Item>
    </Form>
  );
};
