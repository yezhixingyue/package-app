import { Form, Input, Button, Checkbox } from 'antd';
import styles from './LoginStyle.less';
import React, { useState } from 'react';
import validateCheck from '../../assets/js/validator/validateCheck';
import { Base64 } from 'js-base64';
import { history } from 'umi';


export default (props: { onLogin: (arg0: any) => any; }) => {
  const [form] = Form.useForm();

  const [state, setstate] = useState(false)

  let _info = localStorage.getItem('initialValues');
  let loginInfo = {
    username: '',
    password: '',
    remember: false,
  }
  if (_info) loginInfo = JSON.parse(_info);
  
  const onFinish = async (values: any) => {
    if (!props.onLogin) return;
    let _tempObj = { ...values };
    if (!_info || state) {
      const pwd = Base64.encode(values.password);
      _tempObj = {
        ...values,
        password: pwd,
      }
    }
    const res = await props.onLogin(_tempObj);
    setstate(false);
    if (!res && res !== undefined) {
      form.setFieldsValue({ password: '' });
      _info = null;
      return;
    }
    if (res) { // 登录成功
      history.push('/labelprint');
      if (values.remember) {
        localStorage.setItem('initialValues', JSON.stringify(_tempObj));
      } else if (_info) {
        localStorage.removeItem('initialValues');
      }
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
    // if (changedFields.length === 0) return;
    // const t = changedFields[0];
    // const fieldName = t.name[0];
    // const value = t.value;
    // if (fieldName === 'username' && value === loginInfo.username) return;
    // setstate(true);
    // if (fieldName === 'username') form.setFieldsValue({ password: '' });
    // if (fieldName === 'username' && value) {
    //   form.setFieldsValue({ username: value.replace(/[^\d]+/g, '') });
    // } else if (fieldName === 'password' && value) {
    //   form.setFieldsValue({ password: value.replace(/\s+/g, '') });
    // }
  }
  const onValuesChange = (changedField: object) => {
    // console.log(changedField);
    const fieldName = Object.keys(changedField)[0];
    const value = Object.values(changedField)[0];
    if (fieldName === 'username') {
      const username = value.replace(/[^\d]+/g, '');
      form.setFieldsValue({ username, password: ''  });
      setstate(true);
    } else if (fieldName === 'password') {
      setstate(true);
      if (!state) form.setFieldsValue({ password: '' });
      else form.setFieldsValue({ password: value.replace(/\s+/g, '') });
    } else if (fieldName === 'remember') {
      // console.log(value, state);
    }
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
      onValuesChange={onValuesChange}
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
